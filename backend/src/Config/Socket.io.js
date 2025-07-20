import { Server } from "socket.io";
import { secureRoomId } from "../Utils/SecureRoomId.js"
import { chat } from "../Models/Chat.model.js";
import { messageModel } from "../Models/message.model.js";

const onlineUsers = new Map();
const activeCalls = new Map();  

export const initializeSocket = (httpServer) => {
 const io = new Server(httpServer, {
  path: "/api/listenify", 
  cors: {
    origin: "https://listenify-phi.vercel.app",
    credentials: true,
  },
});

  

  io.on("connection", (socket) => {
    console.log("⚡️ Client connected:", socket.id);

 
    socket.on("onlineUsers", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(onlineUsers);
      io.emit("updated-onlineUsers", [...onlineUsers.keys()]);
    });

  
    socket.on("JoinChat", ({ myId, toUserId }) => {
      let uniqueRoomId = secureRoomId(myId, toUserId);
      socket.join(uniqueRoomId);
    });
 
    socket.on("sendMessages", async ({ myId, toUserId, userName, message }) => {
      try {
        let uniqueRoomId = secureRoomId(myId, toUserId);

        let isChatExists = await chat.findOne({ participants: { $all: [myId, toUserId] } });
        if (!isChatExists) {
          isChatExists = await chat.create({
            participants: [myId, toUserId],
            lastMessage: null
          });
        }

        const newMsg = await messageModel.create({
          chatId: isChatExists._id,
          senderId: myId,
          text: message,
          messageType: "text"
        });

        isChatExists.lastMessage = newMsg._id;
        await isChatExists.save();

        io.to(uniqueRoomId).emit("receivedMessages", {
          userName,
          message: newMsg.text,
        });
      } catch (error) {
        console.log(error);
      }
    });

 
    socket.on("start-call", ({ from, to, type, callId }) => {
      console.log(`Call initiated from ${from} to ${to}, type: ${type}, callId: ${callId}`);
       
      activeCalls.set(callId, {
        from,
        to,
        type,
        callId
      });

      const toSocketId = onlineUsers.get(to);
      if (toSocketId) {
        io.to(toSocketId).emit("incoming-call", { 
          from,
          type,
          callId 
        });
      } else {
       
        activeCalls.delete(callId);
        const fromSocketId = onlineUsers.get(from);
        if (fromSocketId) {
          io.to(fromSocketId).emit("call-rejected", { to });
        }
      }
    });

    
    socket.on("accept-call", ({ from, to }) => {
      const callId = `call_${[from, to].sort().join("_")}`;
      const call = activeCalls.get(callId);
      
      if (call) {
        const fromSocketId = onlineUsers.get(from);
        if (fromSocketId) {
          io.to(fromSocketId).emit("call-accepted", { 
            to,
            callId,
            type: call.type
          });
        }
      }
    });

    
    socket.on("reject-call", ({ from, to }) => {
      const callId = `call_${[from, to].sort().join("_")}`;
      activeCalls.delete(callId);
      
      const fromSocketId = onlineUsers.get(from);
      if (fromSocketId) {
        io.to(fromSocketId).emit("call-rejected", { to });
      }
    });
 
    socket.on("end-call", ({ from, to }) => {
      const callId = `call_${[from, to].sort().join("_")}`;
      activeCalls.delete(callId);
      
      const toSocketId = onlineUsers.get(to);
      if (toSocketId) {
        io.to(toSocketId).emit("call-ended");
      }
    });

    
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);

      
      for (const [callId, call] of activeCalls.entries()) {
        if (call.from === socket.id || call.to === socket.id) {
          activeCalls.delete(callId);
          const otherUserId = call.from === socket.id ? call.to : call.from;
          const otherUserSocketId = onlineUsers.get(otherUserId);
          if (otherUserSocketId) {
            io.to(otherUserSocketId).emit("call-ended");
          }
        }
      }

      
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit("updated-onlineUsers", [...onlineUsers.keys()]);
          break;
        }
      }
    });
  });

  return io;
};
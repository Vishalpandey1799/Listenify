
import {successThrow} from "../Utils/Success.js"
import {errorThrow} from "../Utils/Error.js"
import { UserModel } from "../Models/User.model.js"
import { chat } from "../Models/Chat.model.js"
import {messageModel} from "../Models/message.model.js"

export const chatOfUser = async (req, res) => {
  try {
    if (!req.user) return errorThrow(res, 401, "Unauthorized!");

    const { toUserId } = req.params;
    const myId = req.user._id;

    if (myId.equals(toUserId)) {
      return errorThrow(res, 400, "You can't chat with yourself");
    }

    const findUser = await UserModel.findById(toUserId);
    if (!findUser) return errorThrow(res, 404, "User not found");

    if (!findUser.friends.includes(myId)) {
      return errorThrow(res, 403, "Not friends");
    }

    let findChat = await chat.findOne({
      participants: { $all: [myId, toUserId] },
    });

    // If no chat, create it
    if (!findChat) {
      findChat = await chat.create({
        participants: [myId, toUserId],
        lastMessage: null,
      });

      return successThrow(res, 200, {
        chat: findChat,
        messages: [],
      });
    }

    // Get all messages of this chat
    const messages = await messageModel
      .find({ chatId: findChat._id })
      .sort({ createdAt: 1 }) // oldest to newest
      .populate("senderId", "name userImage createdAt");

    return successThrow(res, 200, {
      chat: findChat,
      messages,
    });

  } catch (error) {
    console.error("chatOfUser Error:", error);
    return errorThrow(res, 500, "Internal Server Error");
  }
};

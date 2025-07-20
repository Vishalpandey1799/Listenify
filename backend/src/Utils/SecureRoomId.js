import crypto from "crypto"

 export const secureRoomId = ({myid , toUserId}) => {
      return crypto.createHash("sha256").update(`${myid}-${toUserId}`).digest("hex");
  }
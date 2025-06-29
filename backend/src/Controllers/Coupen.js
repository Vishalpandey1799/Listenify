import { UserModel } from "../Models/User.model.js";
import { errorThrow } from "../Utils/Error.js";
import { successThrow } from "../Utils/Success.js";

export const claimCoupon = async (req, res) => {
  try {
    if (!req.user) {
      return errorThrow(res, 401, "Unauthorized");
    }



    const findUser = await UserModel.findById(req.user._id).select("-password");
    if (!findUser) {
      return errorThrow(res, 404, "User not found");
    }

    const {coupencode} = req.body;

 

    if(!coupencode){
      return errorThrow(res, 400, "Please enter coupon code.");
    }

    let validcoupenCode = await UserModel.findOne({ coupon: coupencode });

    if (!validcoupenCode) {
      return errorThrow(res, 400, "Invalid coupon code.");
    }
    if (findUser.couponClaimed) {
      return errorThrow(res, 400, "Coupon already claimed");
    }
 
    if (findUser.audioCredits > 0) {
      return errorThrow(res, 400, "You still have audio tokens left.");
    }
 
    const tokensToAdd = 2;
    findUser.audioCredits = Math.min(findUser.audioCredits + tokensToAdd, 10);

  
    findUser.couponClaimed = true;
    findUser.coupon = ""; 

    await findUser.save();

    return successThrow(res, 200, "Coupon claimed successfully!", {
      audioCredits: findUser.audioCredits,
    });
  } catch (error) {
    console.error(error);
    return errorThrow(res, 500, "Something went wrong while claiming coupon.");
  }
};

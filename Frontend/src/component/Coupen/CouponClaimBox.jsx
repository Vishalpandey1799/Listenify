import { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useCoupenStore } from "../../Apicalls/coupen.api.js";
import { Loader, Loader2 } from "lucide-react";
const CouponClaimBox = ({ claimed }) => {
  console.log(claimed);

  const { claimCoupen } = useCoupenStore();
  const [couponCode, setCouponCode] = useState("");
  const [isCouponClaimed] = useState(claimed);
  const [loading, setLoading] = useState(false);

  const handleCouponClaim = async () => {
    try {
      if (!couponCode || couponCode === "") {
        toast.error("Enter coupon code");
        return;
      }

      setLoading(true);
      let res = await claimCoupen(couponCode);

      console.log(res);
      if (res.success) {
        toast.success(res.message);
        setCouponCode("");
        window.location.reload();
      } else {
        toast.error(res.message);
        setCouponCode("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="mt-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-4 rounded-xl border border-purple-500/30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold text-lg text-purple-300">Special Offer!</h3>
          <p className="text-sm text-gray-400">
            Use code{" "}
            <span className="font-mono bg-gray-800 px-2 py-1 rounded text-purple-300">
              LISTENIFY-VISHAL
            </span>{" "}
            to get 2 extra audio conversions
          </p>
        </div>

        {!isCouponClaimed ? (
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="px-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm w-full"
            />
            <button
              onClick={handleCouponClaim}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Claiming...</span>
                </div>
              ) : (
                <span>Claim Offer</span>
              )}
            </button>
          </div>
        ) : (
          <div className="px-4 py-2 bg-green-900/30 border border-green-500/30 rounded-lg text-green-400 text-sm">
            🎉 Coupon claimed!
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CouponClaimBox;

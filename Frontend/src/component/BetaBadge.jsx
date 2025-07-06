import { FlaskConical } from "lucide-react";

const BetaBadge = ({ className = "" }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 bg-purple-500/20 text-purple-400 text-xs font-medium px-2 py-1 rounded-full ${className}`}
    >
      <FlaskConical className="h-3 w-3" />
      <span>Beta</span>
    </span>
  );
};

export default BetaBadge;

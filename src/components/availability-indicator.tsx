import { StatusType } from "~/interfaces/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitialsFallback } from "~/lib/utils";
import { Minus, Moon } from "lucide-react";
import { cn } from "~/lib/utils";

function StatusBadge({ status }: { status: StatusType }) {
  const baseClasses = "absolute -bottom-1 -right-1 size-5.5 rounded-full border-2 border-background flex items-center justify-center";

  switch (status) {
    case StatusType.Online:
      return <span className={cn(baseClasses, "bg-green-500")} />;
    case StatusType.Invisible:
      return <span className={cn(baseClasses, "bg-background border-gray-400")} />;
    case StatusType.DoNotDisturb:
      return (
        <span className={cn(baseClasses, "bg-red-500")}>
          <Minus className="size-5 text-background" strokeWidth={4} />
        </span>
      );
    case StatusType.Idle:
      return (
        <span className={cn(baseClasses, "bg-background")}>
          <Moon className="size-5 text-background fill-yellow-500" />
        </span>
      );
    default:
      return null;
  }
}

const AvailabilityIndicator: React.FC<{ status: StatusType; imageUrl: string; name: string }> = ({ status, imageUrl, name }) => {
  return (
    <div className="relative inline-block">
      <Avatar className="size-11.5">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>{getInitialsFallback(name)}</AvatarFallback>
      </Avatar>
      <StatusBadge status={status} />
    </div>
  );
};

export default AvailabilityIndicator;

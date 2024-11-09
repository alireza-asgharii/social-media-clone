import { cn } from "../../lib/utils";

type props = {
  value?: string;
  className?: React.ComponentProps<"span">["className"];
};

const DefaultProfile = ({ value = "P", className }: props) => {
  return (
    <span
      className={cn(
        `flex-center inline-block h-8 w-8 rounded-full bg-purple-500 uppercase`,
        className,
      )}
    >
      {value}
    </span>
  );
};

export default DefaultProfile;

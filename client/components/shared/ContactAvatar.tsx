import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/format";

interface ContactAvatarProps {
  name?: string;
  photoUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-11 text-sm",
  lg: "size-14 text-base",
};

export function ContactAvatar({
  name,
  photoUrl,
  size = "md",
  className,
}: ContactAvatarProps) {
  return (
    <Avatar
      className={cn(
        sizeClasses[size],
        "ring-1 ring-border shadow-sm",
        className
      )}
    >
      {photoUrl ? <AvatarImage src={photoUrl} alt={name ?? ""} /> : null}
      <AvatarFallback className="bg-sage-soft text-foreground font-semibold">
        {name ? initials(name) : "?"}
      </AvatarFallback>
    </Avatar>
  );
}

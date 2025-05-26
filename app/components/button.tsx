import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "disabled";
  disabled?: boolean;
};

function Button({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = "",
  icon,
  variant = "primary",
}: ButtonProps) {
  const variants = {
    primary: "bg-[#1B263B] hover:bg-[#778DA9]",
    secondary: "bg-[#4C2A85] hover:bg-[#3A1F63]",
    disabled: "bg-[#2C3E50] cursor-not-allowed opacity-50",
  };

  const baseStyles =
    "flex items-center gap-2 text-white font-bold py-2 px-6 text-4xl transition cursor-pointer border-3 rounded border-[#3A1F63] hover:border-[#4C2A85] focus:outline-none focus:ring-2 focus:ring-[#4C2A85] focus:ring-offset-2";

  const extraStyles =
    "rounded shadow-[4px_4px_0px_0px_#1B263B] hover:shadow-[6px_6px_0px_0px_#1B263B]";

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${baseStyles} ${extraStyles} ${variants[variant]} ${className}`}
      disabled={variant === "disabled"}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;

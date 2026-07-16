import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "blue" | "outline" | "ghost";
  children: ReactNode;
};

export function Button({ variant = "gold", className = "", children, ...props }: ButtonProps) {
  return (
    <button className={`button button--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

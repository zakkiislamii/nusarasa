import React, { ButtonHTMLAttributes } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`bg-[#F4991A] hover:bg-[#fdce40] mt-5 w-[80%] max-w-full py-3 text-white font-bold rounded-3xl ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

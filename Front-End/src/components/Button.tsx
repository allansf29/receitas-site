import React from "react";

export const DrawOutlineButton = ({
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      {...rest}
      className={`group relative px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-text ${className} bg-black rounded-sm dark:bg-amber-50 dark:text-black dark:hover:text-orange-600 cursor-pointer`}
    >
      <span>{children}</span>

      {/* TOP */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-white transition-all duration-100 group-hover:w-full dark:bg-orange-400" />

      {/* RIGHT */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-white transition-all delay-100 duration-100 group-hover:h-full dark:bg-orange-400" />

      {/* BOTTOM */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all delay-200 duration-100 group-hover:w-full dark:bg-orange-400" />

      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-white transition-all delay-300 duration-100 group-hover:h-full dark:bg-orange-400" />
    </button>
  );
};

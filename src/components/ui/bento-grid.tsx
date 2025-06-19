import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto lg:mx-0 grid grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={cn(
        "group/bento cursor-pointer dark:shadow-input shadow-xl dark:shadow-none row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition-transform duration-300 hover:shadow-2xl dark:border-white/[0.2] dark:bg-black hover:scale-[1.025] ease-out",
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:-translate-y-2">
        {icon}
        <div className="mt-2 mb-2 font-bold text-neutral-700 dark:text-neutral-200 break-words">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-700 dark:text-neutral-300 break-words">
          {description}
        </div>
      </div>
    </div>
  );
};

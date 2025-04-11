"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: number[];
  onValueChange?: (value: number[]) => void;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      if (onValueChange) {
        onValueChange([newValue]);
      }
    };

    return (
      <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value ? value[0] : undefined}
          onChange={handleChange}
          className="w-full h-2 appearance-none bg-secondary rounded-full outline-none"
          style={{
            background: value 
              ? `linear-gradient(to right, var(--primary) ${(value[0] - Number(min)) / (Number(max) - Number(min)) * 100}%, var(--secondary) ${(value[0] - Number(min)) / (Number(max) - Number(min)) * 100}%)`
              : undefined
          }}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };


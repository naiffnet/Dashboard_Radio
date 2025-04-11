"use client";

import { useState, useEffect } from "react";

export function TimeDisplay() {
  const [time, setTime] = useState<string>("");
  
  useEffect(() => {
    // Only update the time on the client side
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(timeString);
    };
    
    // Update immediately
    updateTime();
    
    // Then update every second
    const interval = setInterval(updateTime, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);
  
  // Return a placeholder during SSR to avoid hydration mismatch
  return (
    <span className="text-xl font-bold">
      {time}
    </span>
  );
}
"use client";

import React, { useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}

export default function AnimatedCounter({
  target,
  duration = 1000,
  decimals = 0,
  suffix = "",
}: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrent(easeProgress * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  const formatted =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString();

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

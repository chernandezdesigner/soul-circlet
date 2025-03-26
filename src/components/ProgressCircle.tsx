
import { useEffect, useState } from "react";
import { DailyProgress } from "@/types";

interface ProgressCircleProps {
  progress: DailyProgress;
}

const ProgressCircle = ({ progress }: ProgressCircleProps) => {
  const [mounted, setMounted] = useState(false);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the offset for each ring
  const bodyOffset = circumference * (1 - progress.body / 100);
  const mindOffset = circumference * (1 - progress.mind / 100);
  const soulOffset = circumference * (1 - progress.soul / 100);
  
  // Animation delay for rings
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex items-center justify-center my-8 animate-fade-in">
      <svg width="200" height="200" viewBox="0 0 120 120">
        {/* Track rings */}
        <circle
          className="progress-ring-track"
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          strokeWidth="4"
        />
        <circle
          className="progress-ring-track"
          cx="60"
          cy="60"
          r={radius - 8}
          fill="transparent"
          strokeWidth="4"
        />
        <circle
          className="progress-ring-track"
          cx="60"
          cy="60"
          r={radius - 16}
          fill="transparent"
          strokeWidth="4"
        />
        
        {/* Progress rings */}
        <circle
          className="progress-ring-circle progress-ring-body"
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? bodyOffset : circumference}
          style={{ transitionDelay: "0.2s" }}
        />
        <circle
          className="progress-ring-circle progress-ring-mind"
          cx="60"
          cy="60"
          r={radius - 8}
          fill="transparent"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? mindOffset : circumference}
          style={{ transitionDelay: "0.4s" }}
        />
        <circle
          className="progress-ring-circle progress-ring-soul"
          cx="60"
          cy="60"
          r={radius - 16}
          fill="transparent"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? soulOffset : circumference}
          style={{ transitionDelay: "0.6s" }}
        />
      </svg>
      
      {/* Percentage in the middle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-medium">{progress.overall}%</span>
      </div>
    </div>
  );
};

export default ProgressCircle;


import { useState } from "react";
import { Task } from "@/types";
import { Droplet, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string, completed: boolean) => void;
  onUpdate?: (taskId: string, current: number) => void;
}

const TaskCard = ({ task, onComplete, onUpdate }: TaskCardProps) => {
  const [current, setCurrent] = useState(task.current || 0);
  
  const handleIncrement = () => {
    if (task.goal && current < task.goal) {
      const newValue = current + 1;
      setCurrent(newValue);
      onUpdate?.(task.id, newValue);
    }
  };
  
  const handleDecrement = () => {
    if (current > 0) {
      const newValue = current - 1;
      setCurrent(newValue);
      onUpdate?.(task.id, newValue);
    }
  };
  
  const handleComplete = () => {
    onComplete(task.id, !task.completed);
  };
  
  const getIcon = () => {
    switch (task.icon) {
      case 'water':
        return <Droplet className="h-6 w-6 text-body" />;
      case 'run':
        return <Activity className="h-6 w-6 text-body" />;
      default:
        return null;
    }
  };
  
  const getProgressPercent = () => {
    if (!task.goal) return 0;
    return (current / task.goal) * 100;
  };

  const categoryColor = {
    body: "text-body",
    mind: "text-mind",
    soul: "text-soul"
  }[task.category] || "text-body";

  return (
    <div 
      className={cn(
        "task-card rounded-xl p-4 bg-white/90 dark:bg-gray-800/90 border-l-4 shadow-sm transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary/50",
        task.completed ? "opacity-75 border-gray-300 dark:border-gray-600" : `border-${task.category}`,
        {
          "border-body": task.category === "body",
          "border-mind": task.category === "mind",
          "border-soul": task.category === "soul"
        }
      )}
      role="region"
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn("p-1.5 rounded-full", {
            "bg-body/10": task.category === "body",
            "bg-mind/10": task.category === "mind",
            "bg-soul/10": task.category === "soul"
          })}>
            {getIcon()}
          </div>
          <span className={cn("font-medium text-gray-900 dark:text-gray-100", categoryColor)}>
            {task.title}
          </span>
        </div>
        <button 
          onClick={handleComplete}
          className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          role="checkbox"
          aria-checked={task.completed}
        >
          {task.completed && (
            <div className={cn("h-3 w-3 rounded-full", {
              "bg-body": task.category === "body",
              "bg-mind": task.category === "mind",
              "bg-soul": task.category === "soul",
            })} />
          )}
        </button>
      </div>
      
      {task.goal ? (
        <>
          <div className="mb-2 space-y-1">
            <Progress 
              value={getProgressPercent()} 
              className={cn("h-2.5 bg-gray-100 dark:bg-gray-700", {
                "[&>div]:bg-body": task.category === "body",
                "[&>div]:bg-mind": task.category === "mind",
                "[&>div]:bg-soul": task.category === "soul",
              })}
              aria-label={`Progress: ${current} out of ${task.goal} ${task.unit}`}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{current} / {task.goal} {task.unit}</span>
              <span>{Math.round(getProgressPercent())}%</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button 
              onClick={handleDecrement}
              disabled={current <= 0}
              variant="outline"
              size="sm"
              className="w-1/2 h-8 rounded-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Decrease ${task.title} count`}
            >
              <span aria-hidden="true">−</span>
            </Button>
            <Button 
              onClick={handleIncrement}
              disabled={task.goal ? current >= task.goal : false}
              variant="outline"
              size="sm"
              className="w-1/2 h-8 rounded-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Increase ${task.title} count`}
            >
              <span aria-hidden="true">+</span>
            </Button>
          </div>
        </>
      ) : (
        <Button 
          onClick={handleComplete}
          className={cn("w-full h-9 rounded-md mt-2 flex items-center justify-center transition-all", {
            "bg-body text-white hover:bg-body/90": task.category === "body" && !task.completed,
            "bg-mind text-white hover:bg-mind/90": task.category === "mind" && !task.completed,
            "bg-soul text-white hover:bg-soul/90": task.category === "soul" && !task.completed,
            "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200": task.completed
          })}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? "Completed" : "Mark Complete"}
        </Button>
      )}
    </div>
  );
};

export default TaskCard;

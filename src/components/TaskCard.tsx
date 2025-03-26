
import { useState } from "react";
import { Task } from "@/types";
import { Droplet, Activity } from "lucide-react";

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

  return (
    <div className={`task-card ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-medium">{task.title}</span>
        </div>
        <div className="h-4 w-4 rounded-full border flex items-center justify-center">
          {task.completed && <div className="h-2 w-2 rounded-full bg-primary" />}
        </div>
      </div>
      
      {task.goal ? (
        <>
          <div className="relative h-8 bg-gray-100 rounded-sm mb-2">
            <div 
              className="absolute left-0 top-0 h-full bg-gray-800 transition-all duration-300"
              style={{ width: `${getProgressPercent()}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
              {current} / {task.goal} {task.unit}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleDecrement}
              className="w-1/2 h-8 border rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <button 
              onClick={handleIncrement}
              className="w-1/2 h-8 border rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
        </>
      ) : (
        <button 
          onClick={handleComplete}
          className={`w-full h-8 rounded-md flex items-center justify-center transition-colors ${
            task.completed 
              ? 'bg-primary text-primary-foreground' 
              : 'border hover:bg-gray-50'
          }`}
        >
          {task.completed ? 'Done' : 'Mark Complete'}
        </button>
      )}
    </div>
  );
};

export default TaskCard;

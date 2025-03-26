
import { useState } from "react";
import { Task, TaskCategory } from "@/types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string, completed: boolean) => void;
  onTaskUpdate: (taskId: string, current: number) => void;
}

const TaskList = ({ tasks, onTaskComplete, onTaskUpdate }: TaskListProps) => {
  const [activeTab, setActiveTab] = useState<TaskCategory>("body");
  
  const filteredTasks = tasks.filter(task => task.category === activeTab);
  
  return (
    <div className="w-full rounded-t-3xl bg-white p-6 pb-24 min-h-[300px] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] animate-fade-in" style={{ animationDelay: "0.3s" }}>
      {/* Tab Navigation */}
      <div className="flex rounded-full bg-gray-100 p-1 mb-6">
        <button 
          onClick={() => setActiveTab("body")}
          className={`tab-button flex-1 ${activeTab === "body" ? "active" : ""}`}
        >
          Body
        </button>
        <button 
          onClick={() => setActiveTab("mind")}
          className={`tab-button flex-1 ${activeTab === "mind" ? "active" : ""}`}
        >
          Mind
        </button>
        <button 
          onClick={() => setActiveTab("soul")}
          className={`tab-button flex-1 ${activeTab === "soul" ? "active" : ""}`}
        >
          Soul
        </button>
      </div>
      
      {/* Task Cards */}
      <div className="overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-4 w-max">
          {filteredTasks.map(task => (
            <TaskCard 
              key={task.id}
              task={task}
              onComplete={onTaskComplete}
              onUpdate={onTaskUpdate}
            />
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="flex items-center justify-center w-full h-32 text-gray-400">
              No tasks for this category
            </div>
          )}
        </div>
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center gap-1 mt-4">
        {["body", "mind", "soul"].map((category) => (
          <button
            key={category}
            className={`h-1.5 rounded-full transition-all ${
              activeTab === category ? "w-6 bg-primary" : "w-1.5 bg-gray-300"
            }`}
            onClick={() => setActiveTab(category as TaskCategory)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

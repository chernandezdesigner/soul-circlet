
import { useState, useEffect } from "react";
import { format } from "date-fns";
import ProgressCircle from "@/components/ProgressCircle";
import DateSelector from "@/components/DateSelector";
import TaskList from "@/components/TaskList";
import { Task, DailyProgress, TaskCategory } from "@/types";
import { mockTasks } from "@/data/mockData";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [progress, setProgress] = useState<DailyProgress>({
    body: 0,
    mind: 0,
    soul: 0,
    overall: 0
  });

  // Calculate progress for each category and overall
  useEffect(() => {
    const calculateProgress = (category: TaskCategory) => {
      const categoryTasks = tasks.filter(task => task.category === category);
      
      if (categoryTasks.length === 0) return 0;
      
      const completedCount = categoryTasks.filter(task => task.completed).length;
      const withGoalProgress = categoryTasks
        .filter(task => task.goal && task.current !== undefined)
        .reduce((acc, task) => {
          if (!task.goal || task.current === undefined) return acc;
          return acc + (task.current / task.goal);
        }, 0);
        
      const withGoalCount = categoryTasks.filter(task => task.goal).length;
      const noGoalCount = categoryTasks.filter(task => !task.goal).length;
      
      // Calculate the weighted average
      const totalProgress = withGoalProgress + completedCount;
      const totalTasks = withGoalCount + noGoalCount;
      
      return Math.round((totalProgress / totalTasks) * 100);
    };
    
    const bodyProgress = calculateProgress("body");
    const mindProgress = calculateProgress("mind");
    const soulProgress = calculateProgress("soul");
    const overallProgress = Math.round((bodyProgress + mindProgress + soulProgress) / 3);
    
    setProgress({
      body: bodyProgress,
      mind: mindProgress,
      soul: soulProgress,
      overall: overallProgress
    });
  }, [tasks]);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    // In a real app, we would fetch tasks for the selected date
    // For now, we'll use the same mock data
  };

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  const handleTaskUpdate = (taskId: string, current: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, current } : task
      )
    );
  };

  // Get user's name - in a real app this would come from auth
  const userName = "Christian";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="px-4 pt-8 pb-2 w-full max-w-md mx-auto animate-fade-in">
        <h1 className="text-2xl font-semibold">Welcome Back {userName}</h1>
        <p className="text-gray-500 text-sm">{format(selectedDate, "EEEE, MMMM d")}</p>
      </header>

      {/* Date Selector */}
      <DateSelector onSelectDate={handleSelectDate} />
      
      {/* Progress Circle */}
      <ProgressCircle progress={progress} />
      
      {/* Task List with Tabs */}
      <TaskList 
        tasks={tasks}
        onTaskComplete={handleTaskComplete}
        onTaskUpdate={handleTaskUpdate}
      />
    </div>
  );
};

export default Index;

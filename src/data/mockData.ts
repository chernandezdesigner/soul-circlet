
import { Task } from "@/types";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Water",
    category: "body",
    completed: false,
    goal: 8,
    current: 3,
    unit: "glasses",
    icon: "water"
  },
  {
    id: "2",
    title: "1 Mile Jog",
    category: "body",
    completed: false,
    icon: "run"
  },
  {
    id: "3",
    title: "Stretching",
    category: "body",
    completed: true
  },
  {
    id: "4",
    title: "Meditation",
    category: "mind",
    completed: false,
    goal: 15,
    current: 5,
    unit: "min"
  },
  {
    id: "5",
    title: "Reading",
    category: "mind",
    completed: true
  },
  {
    id: "6",
    title: "Journaling",
    category: "mind",
    completed: false
  },
  {
    id: "7",
    title: "Gratitude",
    category: "soul",
    completed: false,
    goal: 3,
    current: 2,
    unit: "things"
  },
  {
    id: "8",
    title: "Volunteering",
    category: "soul",
    completed: false
  },
  {
    id: "9",
    title: "Call family",
    category: "soul",
    completed: true
  }
];

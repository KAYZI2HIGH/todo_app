import React, { useEffect, useState, createContext, useContext } from "react";
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}
interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, dueDate?: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
}
const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  reorderTasks: () => {},
});
export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (title: string, dueDate?: string) => {
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title,
        completed: false,
        dueDate,
      },
    ]);
  };
  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
            }
          : task
      )
    );
  };
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const reorderTasks = (startIndex: number, endIndex: number) => {
    const newTasks = [...tasks];
    const [removed] = newTasks.splice(startIndex, 1);
    newTasks.splice(endIndex, 0, removed);
    setTasks(newTasks);
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export const useTasks = () => useContext(TaskContext);

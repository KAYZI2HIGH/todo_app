import { useState } from "react";
import { Plus, Calendar, Trash2, Check } from "lucide-react";
import { useTasks, Task } from "../context/TaskContext";
import { useTheme } from "../context/ThemeProvider";
const Dashboard = () => {
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { isDark } = useTheme();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask, dueDate);
      setNewTask("");
      setDueDate("");
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex gap-2"
      >
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className={`flex-1 p-2 border rounded ${
            isDark
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          } transition-colors duration-200`}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`p-2 border rounded ${
            isDark
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          } transition-colors duration-200`}
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          <Plus size={20} />
        </button>
      </form>
      <div >
        <div >
            <div
              className="space-y-2"
            >
              {tasks.map((task: Task,) => (
                <div
                  key={task.id}
                >
                    <div
                      className={`p-4 rounded-lg shadow-sm flex items-center justify-between ${
                        isDark ? "bg-gray-800" : "bg-white"
                      } ${
                        task.completed ? "opacity-60" : ""
                      } transition-colors duration-200`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateTask(task.id, {
                              completed: !task.completed,
                            })
                          }
                          className={`p-1 rounded-full ${
                            task.completed
                              ? "bg-green-500 text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {task.completed && <Check size={16} />}
                        </button>
                        <span className={task.completed ? "line-through" : ""}>
                          {task.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {task.dueDate && (
                          <span
                            className={`flex items-center text-sm ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <Calendar
                              size={16}
                              className="mr-1"
                            />
                            {task.dueDate}
                          </span>
                        )}
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

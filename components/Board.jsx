import { useState } from "react";
import data from "./data";

export default function Board() {
  const [columns, setColumns] = useState(data.columns);
  const [tasks, setTasks] = useState(data.tasks);
  const [newTask, setNewTask] = useState("");

  const handleDragStart = (e, { sourceColumnId, taskId }) => {
    e.dataTransfer.setData("task", JSON.stringify({ sourceColumnId, taskId }));
  };

  const handleDrop = (e, targetColumnId) => {
    const task = JSON.parse(e.dataTransfer.getData("task"));
    if (!task) return;

    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find(
        (col) => col.id === task.sourceColumnId
      );
      const targetColumn = prevColumns.find((col) => col.id === targetColumnId);

      if (!sourceColumn || !targetColumn) return prevColumns;

      if (sourceColumn.id === targetColumn.id) {
        const updatedTasks = [...sourceColumn.taskIds];
        updatedTasks.splice(updatedTasks.indexOf(task.taskId), 1);
        updatedTasks.push(task.taskId);

        return prevColumns.map((col) =>
          col.id === sourceColumn.id ? { ...col, taskIds: updatedTasks } : col
        );
      }

      const updatedSourceTasks = sourceColumn.taskIds.filter(
        (id) => id !== task.taskId
      );
      const updatedTargetTasks = [...targetColumn.taskIds, task.taskId];

      return prevColumns.map((col) =>
        col.id === sourceColumn.id
          ? { ...col, taskIds: updatedSourceTasks }
          : col.id === targetColumn.id
          ? { ...col, taskIds: updatedTargetTasks }
          : col
      );
    });
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const newTaskId = `task-${tasks.length + 1}`;
    const newTaskObj = { id: newTaskId, content: newTask };

    setTasks([...tasks, newTaskObj]);
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === "column-1"
          ? { ...col, taskIds: [...col.taskIds, newTaskId] }
          : col
      )
    );

    setNewTask("");
  };

  const columnColors = [
    "bg-purple-100 text-purple-900",
    "bg-blue-100 text-blue-900",
    "bg-yellow-100 text-yellow-900",
    "bg-red-100 text-red-900",
    "bg-green-100 text-green-900",
  ];

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 min-h-screen">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="p-2 rounded border border-gray-300"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Task
        </button>
      </div>
      <div className="flex justify-center flex-wrap gap-6">
        {columns.map((column, index) => (
          <div
            key={column.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, column.id)}
            className={`flex flex-col ${
              columnColors[index % columnColors.length]
            } shadow-lg rounded-lg p-6 w-72`}
          >
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              {column.title}
            </h2>
            <div className="flex flex-col gap-4">
              {column.taskIds.map((taskId) => {
                const task = tasks.find((task) => task.id === taskId);
                return (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, { sourceColumnId: column.id, taskId })
                    }
                    className="bg-white text-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-move"
                  >
                    {task.content}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

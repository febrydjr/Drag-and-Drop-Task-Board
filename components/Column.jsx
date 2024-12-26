import { Droppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

export default function Column({ column, tasks }) {
  const columnTasks = column.taskIds.map((taskId) =>
    tasks.find((task) => task.id === taskId)
  );

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-200 rounded-lg shadow w-72">
      <h2 className="text-lg font-bold">{column.title}</h2>
      <Droppable id={column.id}>
        <div className="flex flex-col gap-2">
          {columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </Droppable>
    </div>
  );
}

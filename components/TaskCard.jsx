import { Draggable } from "@dnd-kit/core";

export default function TaskCard({ task }) {
  return (
    <Draggable id={task.id}>
      <div className="p-4 bg-white rounded-lg shadow">{task.content}</div>
    </Draggable>
  );
}

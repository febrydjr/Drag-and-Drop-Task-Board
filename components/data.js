const data = {
  columns: [
    {
      id: "column-1",
      title: "Backlog",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    {
      id: "column-2",
      title: "To Do",
      taskIds: ["task-4", "task-5"],
    },
    {
      id: "column-3",
      title: "In Progress",
      taskIds: ["task-6", "task-7"],
    },
    {
      id: "column-4",
      title: "Code Review",
      taskIds: ["task-8"],
    },
    {
      id: "column-5",
      title: "Done",
      taskIds: ["task-9", "task-10"],
    },
  ],
  tasks: [
    { id: "task-1", content: "Define project scope" },
    { id: "task-2", content: "Gather requirements" },
    { id: "task-3", content: "Research best practices" },
    { id: "task-4", content: "Create wireframes" },
    { id: "task-5", content: "Set up development environment" },
    { id: "task-6", content: "Develop login functionality" },
    { id: "task-7", content: "Implement drag-and-drop feature" },
    { id: "task-8", content: "Review drag-and-drop implementation" },
    { id: "task-9", content: "Deploy initial version to staging" },
    { id: "task-10", content: "Conduct user testing" },
  ],
};

export default data;

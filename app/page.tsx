"use client";
import { useState } from "react";

export default function Home() {
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [tasks, setTasks] = useState<{ title: string; deadline: string }[]>([]);
  const [step, setStep] = useState<"form" | "tasks">("form");

  const handleAddTask = () => {
    setTasks([...tasks, { title: "", deadline: "" }]);
  };

  const handleUpdateTask = (index: number, field: string, value: string) => {
    const updated = [...tasks];
    updated[index] = { ...updated[index], [field]: value };
    setTasks(updated);
  };

  const handleAIgenerate = async () => {
    // later hook this up to backend AI endpoint
    const aiTasks = [
      { title: "Research competitors", deadline: "2025-09-01" },
      { title: "Draft design mockups", deadline: "2025-09-05" },
      { title: "Kickoff meeting", deadline: "2025-09-07" },
    ];
    setTasks(aiTasks);
    setStep("tasks");
  };

  return (
    <section className="max-w-2xl mx-auto mt-12">
      <h1 className="text-3xl font-semibold mb-6">Create a New Project</h1>

      {step === "form" && (
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
          <textarea
            placeholder="Describe your project..."
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            className="w-full border rounded-lg p-3 h-32"
          />

          <div className="flex gap-4">
            <button
              onClick={() => {
                setTasks([{ title: "", deadline: "" }]);
                setStep("tasks");
              }}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700"
            >
              Add Tasks Manually
            </button>

            <button
              onClick={handleAIgenerate}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
            >
              Generate with AI
            </button>
          </div>
        </div>
      )}

      {step === "tasks" && (
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Project Tasks</h2>

          {tasks.map((task, i) => (
            <div key={i} className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Task title"
                value={task.title}
                onChange={(e) =>
                  handleUpdateTask(i, "title", e.target.value)
                }
                className="flex-1 border rounded-lg p-2"
              />
              <input
                type="date"
                value={task.deadline}
                onChange={(e) =>
                  handleUpdateTask(i, "deadline", e.target.value)
                }
                className="border rounded-lg p-2"
              />
            </div>
          ))}

          <button
            onClick={handleAddTask}
            className="mt-2 text-blue-600 hover:underline"
          >
            + Add another task
          </button>

          <button
            onClick={() => alert("Project saved! (Hook up DB later)")}
            className="block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500"
          >
            Save Project
          </button>
        </div>
      )}
    </section>
  );
}

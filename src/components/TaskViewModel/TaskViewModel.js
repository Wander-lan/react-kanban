import React from "react";
import "./TaskViewModel.css"
import Tasklist from "../Tasklist/Tasklist";
import { useState } from 'react';

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function TaskContainer() {
    const [tasks, setTasks] = useState([])

    const addTask = (title, state) => {
      const newTask = {
        id: generateId(),
        title,
        state,
      };
      setTasks((existingTasks) => {
        return [...existingTasks, newTask]
      });
    }
  
    const updateTask = (id, title, state) => {
      setTasks((existingTasks) => {
        return existingTasks.map((task) => {
          if (task.id === id) {
            return { ...task, title, state };
          } else {
            return task;
          }
        })
      })
    };
  
    const removeTask = (id) => {
      setTasks((existingTasks) => {
        return existingTasks.filter((t) => t.id !== id);
      })
    }
  
    return (
        <div className='task-lists-container'>
          <Tasklist
            title="Pending"
            taskState="pending"
            tasks={tasks.filter((t) => t.state === "pending")}
            onAddTask={addTask}
            onTaskUpdate={updateTask}
            onRemoveTask={removeTask}
          />
          <Tasklist
            title="Doing"
            taskState="doing"
            tasks={tasks.filter((t) => t.state === "doing")}
            onAddTask={addTask}
            onTaskUpdate={updateTask}
            onRemoveTask={removeTask}
          />
          <Tasklist 
            title="Done"
            taskState="done"
            tasks={tasks.filter((t) => t.state === "done")}
            onAddTask={addTask}
            onTaskUpdate={updateTask}
            onRemoveTask={removeTask}
          />
        </div>
    );
}
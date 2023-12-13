import React from "react";
import "./Tasklist.css"
import PropTypes from "prop-types"
import TaskItem from "../TaskItem/TaskItem";

export default function Tasklist({title, tasks, taskState, onAddTask, onTaskUpdate, onRemoveTask}) {
    const addTask = () => {
        onAddTask("Nova Tarefa", taskState);
    }

    return (
        <div className="task-list">
            <div className="title">{title}</div>
            <div className="content">
                {tasks.map((task) => {
                    return (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            taskState={task.state}
                            onTaskUpdate={onTaskUpdate}
                            onRemoveTask={onRemoveTask}
                        />
                    );
                })}
                { tasks.length === 0 && <div className="empty-list">Lista Vazia</div>}
            </div>
            <button onClick={addTask}>Add Task</button>
        </div>
    );
}

Tasklist.propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    onAddTask: PropTypes.func.isRequired,
    taskState: PropTypes.string.isRequired,
    onTaskUpdate: PropTypes.func.isRequired,
    onRemoveTask: PropTypes.func.isRequired,
};
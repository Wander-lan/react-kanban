import React, { useState } from "react";
import "./TaskItem.css"
import PropTypes from "prop-types"

export default function TaskItem({id, title, taskState, onTaskUpdate, onRemoveTask}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableTitle, setEditableTitle] = useState(title);

    const onTitleChange = (event) => {
        const newTitle = event.target.value;
        setEditableTitle(newTitle);
    };

    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            if (editableTitle.length === 0) {
                onRemoveTask(id);
                return;
            }

            onTaskUpdate(id, editableTitle, taskState);
            setIsEditing(false);
        }
    }

    const onTaskStateChange = (event) => {
        onTaskUpdate(id, title, event.target.value);
    };

    if (isEditing) {
        return <input type="text" value={editableTitle} onChange={onTitleChange} onKeyDown={onKeyDown}/>;
    } else {
        return (
            <div>
                <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
                <select onChange={onTaskStateChange} value={taskState}>
                    <option value="pending">Pending</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </div>
        );
    }
}

TaskItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    taskState: PropTypes.string.isRequired,
    onTaskUpdate: PropTypes.func.isRequired,
    onRemoveTask: PropTypes.func.isRequired,
}
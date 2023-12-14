import React, { useState } from "react";
import "./TaskItem.css"
import PropTypes from "prop-types"

export default function TaskItem({id, title, taskState, onTaskUpdate, onRemoveTask}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableTitle, setEditableTitle] = useState(title);
    const [isTaskOpen, setIsTaskOpen] = useState(false);

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

    return (
        <div className="task-item">
            <div className="task-closed" onClick={(e) => setIsTaskOpen(true)}>
                <div className="title-task-closed">{editableTitle}</div>
            </div>
            {isTaskOpen &&
                <div className="task-open-modal">
                    <div className="modal-container">
                        <div className="modal-header">
                            <div
                                className="close-btn"
                                onClick={(e) => {
                                    if (editableTitle.length > 0) {
                                        setIsTaskOpen(false)
                                    }
                                }}
                            >
                                X
                            </div>
                        </div>
                        <div className="modal-content">
                            {isEditing && 
                                <input
                                    className="title-input"
                                    type="text"
                                    value={editableTitle}
                                    onChange={onTitleChange}
                                    onKeyDown={onKeyDown}
                                />
                            }
                            {!isEditing &&
                                <div className="editable-title-container" onClick={(e) => setIsEditing(true)}>
                                    {editableTitle}
                                </div>
                            }
                            <select onChange={onTaskStateChange} value={taskState}>
                                <option value="pending">Pending</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
    
}

TaskItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    taskState: PropTypes.string.isRequired,
    onTaskUpdate: PropTypes.func.isRequired,
    onRemoveTask: PropTypes.func.isRequired,
}
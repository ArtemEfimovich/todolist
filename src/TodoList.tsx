import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import './App.css'


type TodoListPropsType = {
    title: string
    todoListFilter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
}


function Todolist(props: TodoListPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const setAllFilterValue = () => props.changeTodoListFilter('all')
    const setActiveFilterValue = () => props.changeTodoListFilter('active')
    const setCompletedFilterValue = () => props.changeTodoListFilter('completed')
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const allBtnClass = props.todoListFilter === "all" ? 'active-filter' : ""
    const activeBtnClass = props.todoListFilter === "active" ? 'active-filter' : ""
    const completedBtnClass = props.todoListFilter === "completed" ? 'active-filter' : ""


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}

            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAllFilterValue}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilterValue}>Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={setCompletedFilterValue}>Completed
                </button>
            </div>
        </div>
    )
}


export default Todolist;
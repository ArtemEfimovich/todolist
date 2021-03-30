import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import './App.css'


type TodoListPropsType = {
    id: string
    title: string
    todoListFilter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
}


function Todolist(props: TodoListPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
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
    const setAllFilterValue = () => props.changeTodoListFilter('all', props.id)
    const setActiveFilterValue = () => props.changeTodoListFilter('active', props.id)
    const setCompletedFilterValue = () => props.changeTodoListFilter('completed', props.id)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
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
    const removeTodolist = () => props.removeTodoList(props.id)
    const allBtnClass = props.todoListFilter === "all" ? 'active-filter' : ""
    const activeBtnClass = props.todoListFilter === "active" ? 'active-filter' : ""
    const completedBtnClass = props.todoListFilter === "completed" ? 'active-filter' : ""


    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
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
                    onClick={setAllFilterValue}
                >All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilterValue}
                >Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={setCompletedFilterValue}
                >Completed
                </button>
            </div>
        </div>
    )
}


export default Todolist;
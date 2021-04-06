import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import './App.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle:(title: string, todoListID: string)=>void
}


function Todolist(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)

        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        return (
            <li key={t.id} className={t.isDone ? "not-active" : ""}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                {/*<span>{t.title}</span>*/}
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const setAllFilterValue = () => props.changeTodoListFilter('all', props.id)

    const setActiveFilterValue = () => props.changeTodoListFilter('active', props.id)

    const setCompletedFilterValue = () => props.changeTodoListFilter('completed', props.id)

    const addTask = (title: string) => props.addTask(title, props.id)

    const removeTodolist = () => props.removeTodoList(props.id)

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title,props.id)

    const allBtnClass = props.todoListFilter === "all" ? 'active-filter' : ""
    const activeBtnClass = props.todoListFilter === "active" ? 'active-filter' : ""
    const completedBtnClass = props.todoListFilter === "completed" ? 'active-filter' : ""


    return (
        <div>
            <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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
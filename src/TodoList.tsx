import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import './App.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
               <Checkbox
                   color={"primary"}
                   checked={t.isDone}
                   onChange={changeStatus}
               />
                {/*<input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                {/*<span>{t.title}</span>*/}
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
               {/* <button onClick={removeTask}>x</button>*/}
            </li>
        )
    })

    const setAllFilterValue = () => props.changeTodoListFilter('all', props.id)

    const setActiveFilterValue = () => props.changeTodoListFilter('active', props.id)

    const setCompletedFilterValue = () => props.changeTodoListFilter('completed', props.id)

    const addTask = useCallback((title: string) => props.addTask(title, props.id),[])

    const removeTodolist = () => props.removeTodoList(props.id)

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title,props.id)

    const allBtnClass = props.todoListFilter === "all" ? 'active-filter' : ""
    const activeBtnClass = props.todoListFilter === "active" ? 'active-filter' : ""
    const completedBtnClass = props.todoListFilter === "completed" ? 'active-filter' : ""


    return (
        <div>
            <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            {/*<Button
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "all" ? "outlined" :"contained"}
                    onClick={removeTodolist}>x</Button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <Button
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "all" ? "outlined" :"contained"}
                    //className={allBtnClass}
                    onClick={setAllFilterValue}
                >All
                </Button>
                <Button
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "active" ? "outlined" :"contained"}
                    //className={activeBtnClass}
                    onClick={setActiveFilterValue}
                >Active
                </Button>
                <Button
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "completed" ? "outlined" :"contained"}
                    //className={completedBtnClass}
                    onClick={setCompletedFilterValue}
                >Completed
                </Button>
            </div>
        </div>
    )
}


export default Todolist;
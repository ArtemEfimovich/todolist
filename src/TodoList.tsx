import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import './App.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";


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
    changeTodoListTitle: (title: string, todoListID: string) => void
}


const Todolist = React.memo((props: TodoListPropsType) => {
    console.log("Todolist called")

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id),[props.removeTask,props.id])
    const changeStatus = useCallback((taskId: string, newIsDoneValue: boolean) => props.changeTaskStatus(taskId, newIsDoneValue, props.id),[props.changeTaskStatus,props.id])
    const changeTaskTitle =useCallback((taskId: string, title: string) => {
        props.changeTaskTitle(taskId, title, props.id)
    },[props.changeTaskTitle,props.id])


    const tasks = getTaskForTodolist().map(t => <Task
        key={t.id}
        task={t}
        removeTask={removeTask}
        changeStatus={changeStatus}
        changeTaskTitle={changeTaskTitle}
    />)


    const setAllFilterValue = useCallback(() =>
        props.changeTodoListFilter('all', props.id), [props.changeTodoListFilter, props.id])

    const setActiveFilterValue = useCallback(() =>
        props.changeTodoListFilter('active', props.id), [props.changeTodoListFilter, props.id])

    const setCompletedFilterValue = useCallback(() =>
        props.changeTodoListFilter('completed', props.id), [props.changeTodoListFilter, props.id])

    const addTask = useCallback((title: string) =>
        props.addTask(title, props.id), [props.addTask, props.id])

    const removeTodolist = () => props.removeTodoList(props.id)

    const changeTodoListTitle = useCallback((title: string) =>
        props.changeTodoListTitle(title, props.id), [props.changeTodoListTitle, props.id])

    /*const allBtnClass = props.todoListFilter === "all" ? 'active-filter' : ""
    const activeBtnClass = props.todoListFilter === "active" ? 'active-filter' : ""
    const completedBtnClass = props.todoListFilter === "completed" ? 'active-filter' : ""*/

    function getTaskForTodolist(): Array<TaskType> {
        switch (props.todoListFilter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "completed":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }


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
                    variant={props.todoListFilter === "all" ? "outlined" : "contained"}
                    //className={allBtnClass}
                    onClick={setAllFilterValue}
                >All
                </Button>
                <Button
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "active" ? "outlined" : "contained"}
                    //className={activeBtnClass}
                    onClick={setActiveFilterValue}
                >Active
                </Button>
                <Button
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "completed" ? "outlined" : "contained"}
                    //className={completedBtnClass}
                    onClick={setCompletedFilterValue}
                >Completed
                </Button>
            </div>
        </div>
    )
})


export default Todolist;
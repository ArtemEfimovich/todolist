import React, {useReducer} from 'react';
import {v1} from "uuid";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Container,
    Grid,
    Paper,
    useScrollTrigger,
} from '@material-ui/core';
import {Menu} from '@material-ui/icons'
import Todolist from "./TodoList";
import AddItemForm from "./AddItemForm";
import {
    AddTodoListAC,
    changeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const gridStyles = {padding: "20px 0px"}

function AppWithRedux() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()


    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID, newTitle, todoListID))
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
    }


    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatch(changeTodoListFilterAC(newFilterValue, todoListID))
    }

    function removeTodoList(todoListID: string) {
        dispatch(RemoveTodolistAC(todoListID))
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatch(action)


    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(ChangeTodoListTitleAC(title, todoListID))
    }


    function getTaskForTodolist(todoList: TodoListType): Array<TaskType> {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
            return (
                <Grid item key={tl.id}>
                    <Paper elevation={6} style={{padding: "20px"}}>
                        <Todolist
                            id={tl.id}
                            title={tl.title}
                            tasks={getTaskForTodolist(tl)}
                            changeTodoListFilter={changeTodoListFilter}
                            removeTask={removeTask}
                            addTask={addTask}
                            todoListFilter={tl.filter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            )
        }
    )


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button variant={"outlined"} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container={true} style={gridStyles}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;



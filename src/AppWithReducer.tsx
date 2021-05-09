import React, {useReducer} from 'react';
import {v1} from "uuid";
import {AppBar, Toolbar, Typography, Button, IconButton, Container, Grid, Paper,} from '@material-ui/core';
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

function AppWithReducer() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()


    const [todoLists, dispatchTodoList] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Cheese', isDone: false},
        ],
    })

    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatchToTasks(action)
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID, newTitle, todoListID))
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
    }


    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatchTodoList(changeTodoListFilterAC(newFilterValue, todoListID))
    }

    function removeTodoList(todoListID: string) {
        dispatchTodoList(RemoveTodolistAC(todoListID))
        dispatchToTasks(RemoveTodolistAC(todoListID))
    }

    function addTodoList(title: string) {
         let action=AddTodoListAC(title)
        dispatchToTasks(action)
        dispatchTodoList(action)

    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchTodoList(ChangeTodoListTitleAC(title, todoListID))
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

export default AppWithReducer;



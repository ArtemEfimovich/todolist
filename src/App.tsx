import React, {useState} from 'react';
import './App.css';
import Todolist from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Toolbar, Typography, Button, IconButton, Container, Grid, Paper,} from '@material-ui/core';
import {Menu} from '@material-ui/icons'


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

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
    //const task: Array<TaskType> = [
    //    {id: 1, title: 'HTML', isDone: true},
    //    {id: 2, title: 'CSS', isDone: true},
    //    {id: 3, title: 'React', isDone: false},
    //];

    /*const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ])*/

    //let [todoListFilter, setTodoListFilter] = useState<FilterValuesType>('all')

    function removeTask(taskID: string, todoListID: string) {//удаление таски
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {// добавление таски
        // const task: TaskType = {
        //    id: v1(),
        //    title: title,//можно просто title
        //   isDone: false
        // }
        //const newTasks = [task, ...tasks]
        //newTasks.unshift(task)
        const newTask = {
            id: v1(),
            title: title,//можно просто title
            isDone: false
        }
        const updatedTasks = [newTask, ...tasks[todoListID]]
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => t.id === taskID ? {...t, title: newTitle} : t)
        //const updatedTasks = tasks.map(t=>{
        //  if(t.id === taskID){
        //       return {...t, isDone: !t.isDone}
        //   }
        //   return t
        //  })
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        //const updatedTasks = tasks.map(t=>{
        //  if(t.id === taskID){
        //       return {...t, isDone: !t.isDone}
        //   }
        //   return t
        //  })
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }


    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const updatedTodoLis = todoLists.map(t1 => t1.id === todoListID ? {...t1, filter: newFilterValue} : t1)
        setTodoLists(updatedTodoLis)
    }

    function removeTodoList(todoListID: string) {
        const updatedTodoLis = todoLists.filter(t1 => t1.id !== todoListID)
        setTodoLists(updatedTodoLis)
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID, title, filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const updatedTodoList = todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        setTodoLists(updatedTodoList)
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

export default App;



import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodoListTC,
    fetchTodosThunk,
    FilterValuesType,
    TodolistDomainType
} from './state/todolists-reducer'
import {createTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType} from './api/todolists-api'
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./app/components/ErrorSnackbar/ErrorSnackbar";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {


    useEffect(() => {
        dispatch(fetchTodosThunk)

    }, [])


    const status = useSelector<AppRootStateType,RequestStatusType>((state) => state.app.status)

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId);
        dispatch(thunk);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(createTaskTC(todolistId, title))
    }, []);

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string,) {

        dispatch(updateTaskStatusTC(taskId, status, todolistId))
        /*const action = changeTaskStatusAC(id, status, todolistId);
        dispatch(action);*/
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {

        dispatch(updateTaskTitleTC(id, newTitle, todolistId))
        /* const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);*/
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {

        dispatch(deleteTodoListTC(id))
        /*const action = removeTodolistAC(id);
        dispatch(action);*/
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {

        dispatch(changeTodolistTitleTC(id, title))
        /*  const action = changeTodolistTitleAC(id, title);
          dispatch(action);*/
    }, []);

    const addTodolist = useCallback((title: string,) => {
        dispatch(addTodolistTC(title))
        /*const action = addTodolistAC(title);
        dispatch(action);*/
    }, [dispatch]);

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        entityStatus={tl.entityStatus}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;

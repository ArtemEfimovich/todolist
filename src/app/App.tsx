import React, {useEffect} from 'react'
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {TaskType} from '../api/todolists-api'
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login";
import TodolistsList from "../features/TodolistsList/TodolistsList";
import {Redirect, Route, Switch} from "react-router-dom";
import {logoutTC} from "../features/auth-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType>((state)=>state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType>((state)=>state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler =()=>{
        dispatch(logoutTC())
    }


    if(!isInitialized){
        return <div
            style = {{position:"fixed",top:"30%",textAlign:"center",width:"100%"}}>
            <CircularProgress/>
        </div>
    }
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
                    {isLoggedIn && <Button color="inherit" style={{position:'absolute',right:'20px'}} onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1 style={{'textAlign': 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>

        </div>
    );
}

export default App;

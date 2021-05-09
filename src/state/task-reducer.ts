import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


type RemoveTaskAT = {
    type: "REMOVE_TASK"
    taskId: string
    todolistId: string

}

type addTaskAT = {
    type: "ADD_TASK"
    title: string
    todolistId: string

}

type changeTaskStatusAT = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

type changeTaskTitleAT = {
    type: "CHANGE_TASK_TITLE"
    taskId: string
    title: string
    todolistId: string
}


type ActionType = RemoveTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT |AddTodoListAT|RemoveTodoListAT


const initialState:TasksStateType = {}




export const tasksReducer = (state=initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case "ADD_TASK": {
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            let newTasksTodoList = [newTask, ...state[action.todolistId]]
            return {
                ...state,
                [action.todolistId]: newTasksTodoList
            }
        }
        case "CHANGE_TASK_STATUS": {
            let copyState = {...state}
            let updateTaskStatus = copyState[action.todolistId].map(t => {
                if (t.id === action.taskId) {
                    return {...t, isDone: action.isDone}
                } else {
                    return t
                }
            })
            return {
                ...state,
                [action.todolistId]: updateTaskStatus
            }
        }
        case "CHANGE_TASK_TITLE": {
            let copyState = {...state}
            let updateTaskTitle = copyState[action.todolistId].map(t => {
                if (t.id === action.taskId) {
                    return {...t, title: action.title}
                } else {
                    return t
                }
            })
            return {
                ...state,
                [action.todolistId]: updateTaskTitle
            }
        }
        case "ADD_TODOLIST": {
            return {...state,[action.id]:[]}
        }
        case "REMOVE_TODOLIST":{
            let copyState={...state}
            delete copyState[action.todoListID]
            return copyState
        }
        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {type: "REMOVE_TASK", taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskAT => {
    return {type: "ADD_TASK", title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusAT => {
    return {type: "CHANGE_TASK_STATUS", taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleAT => {
    return {type: "CHANGE_TASK_TITLE", taskId, title, todolistId}
}





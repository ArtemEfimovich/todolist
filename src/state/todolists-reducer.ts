import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTodoListAT = {
    type: "REMOVE_TODOLIST"
    todoListID: string
}

type AddTodoListAT = {
    type: "ADD_TODOLIST"
    title: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE_TODOLIST_TITLE"
    title: string
    todoListID: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE_TODOLIST_FILTER"
    newFilterValue: FilterValuesType
    todoListID: string
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT


export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType):Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return todoLists.filter(t1 => t1.id !== action.todoListID)
        case "ADD_TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: "all"
            }
            return [...todoLists, newTodoList]
        case "CHANGE_TODOLIST_TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE_TODOLIST_FILTER":
            return todoLists.map(t1 => t1.id === action.todoListID ? {...t1, filter: action.newFilterValue} : t1)
        default:
            return todoLists
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return { type: "REMOVE_TODOLIST",  todoListID: todolistId}
}
export const AddTodoListAC = (todolistId: string): AddTodoListAT => {
    return { type: "ADD_TODOLIST",  title: todolistId}
}


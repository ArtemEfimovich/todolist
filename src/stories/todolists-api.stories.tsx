import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todoApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoApi.getTodos().then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let title = 'React'
        todoApi.createTodo(title).then((res) => {
            setState(res.data);
        })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    let todoId = '663f2d40-ded2-4b00-a02a-996304d28d84'
    useEffect(() => {
        todoApi.deleteTodo(todoId).then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let todoId = '7eab9c06-9cac-4538-8c57-004643f02cfd'
    let title = 'ANGULAR'
    useEffect(() => {
        todoApi.updateTodoTitle(todoId, title).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

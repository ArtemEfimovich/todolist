import axios from 'axios';

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': '369a3457-d3e2-4331-b490-319ddee29442'
        }
    }
)

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}


type CommonResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}


export const todoApi = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodo(title: string) {
        let promise = instance.post<CommonResponseType<{ item: TodoType }>>('todo-lists', {title})
        return promise
    },
    deleteTodo(todoId: string) {
        let promise = instance.delete<CommonResponseType<{}>>(`todo-lists/${todoId}`)
        return promise
    },
    updateTodoTitle(todoId: string, title: string) {
        let promise = instance.put<CommonResponseType<{}>>(`todo-lists/${todoId}`, {title})
        return promise
    }
}
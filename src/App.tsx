import React, {useState} from 'react';
import './App.css';
import Todolist from "./TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    //const task: Array<TaskType> = [
    //    {id: 1, title: 'HTML', isDone: true},
    //    {id: 2, title: 'CSS', isDone: true},
    //    {id: 3, title: 'React', isDone: false},
    //];

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ])

    function removeTask(taskID: string) {//удаление таски
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {// добавление таски
        // const task: TaskType = {
        //    id: v1(),
        //    title: title,//можно просто title
        //   isDone: false
        // }
        //const newTasks = [task, ...tasks]
        //newTasks.unshift(task)
        setTasks([{
            id: v1(),
            title: title,//можно просто title
            isDone: false
        }, ...tasks])
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean) {
        const updatedTasks = tasks.map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        //const updatedTasks = tasks.map(t=>{
        //  if(t.id === taskID){
        //       return {...t, isDone: !t.isDone}
        //   }
        //   return t
        //  })
        setTasks(updatedTasks)
    }


    let [todoListFilter, setTodoListFilter] = useState<FilterValuesType>('all')

    function changeTodoListFilter(newFilterValue: FilterValuesType) {
        setTodoListFilter(newFilterValue)
    }


    function getTaskForTodolist() {
        switch (todoListFilter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={getTaskForTodolist()}
                changeTodoListFilter={changeTodoListFilter}
                removeTask={removeTask}
                addTask={addTask}
                todoListFilter={todoListFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;



import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";


type TaskPropsType = {
    task: TaskType
    changeStatus:(taskId: string,newIsDoneValue: boolean)=>void
    changeTaskTitle:(taskId: string,title: string)=>void
    removeTask:(taskId:string)=>void

}


 const Task = React.memo(({task,changeStatus,changeTaskTitle,removeTask}: TaskPropsType)=> {


     const onClickHandler = () => removeTask(task.id)
     const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => changeStatus( task.id,e.currentTarget.checked)
     const onTitleChangeHandler  = ( title: string) => {
         changeTaskTitle( title, task.id)
     }

    return <li key={task.id} className={task.isDone ? "not-active" : ""}>
         <Checkbox
             color={"primary"}
             checked={task.isDone}
             onChange={onChangeHandler}
         />
         {/*<input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />*/}
         <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
         {/*<span>{t.title}</span>*/}
         <IconButton onClick={onClickHandler}>
             <Delete/>
         </IconButton>
         {/* <button onClick={removeTask}>x</button>*/}
     </li>
 })


export default Task;
import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";


type AddItemFormPropsType = {
    addItem: (title: string) => void //parents callback
}


function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<string | null>(null)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <TextField

                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                error={!!error}
                helperText={error}
            />
           {/* <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                className={error ? "error" : ""}
            />*/}
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
           {/* <button onClick={addItem}>+</button>*/}
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}


export default AddItemForm;
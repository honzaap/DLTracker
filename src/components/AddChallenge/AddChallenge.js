import { useState } from "react";
import InputGroup from "../shared/InputGroup/InputGroup"
import "./AddChallenge.scss"

const AddChallenge = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(!title){
            return;
        }

        onAdd({
            title: title,
            description: description,
            value: value
        });

        setTitle("");
        setDescription("");
    }

    return (
        <form onSubmit={onSubmit} className="add-challenge-form">
            <InputGroup id="add_Title" defaultValue={title} onChange={(e) => { setTitle(e) }} label="Title" placeholder="Kill zombies"></InputGroup>
            <InputGroup id="add_Desc" defaultValue={description} onChange={(e) => { setDescription(e) }} label="Description" placeholder="Kill zombies using any weapon"></InputGroup>
            <InputGroup id="add_Value" defaultValue={value} onChange={(e) => { setValue(e) }} label="Value" placeholder="How many times?"></InputGroup>
            <button className="btn-dl" type="submit">Add Challenge</button>
        </form>
    );
};

export default AddChallenge;
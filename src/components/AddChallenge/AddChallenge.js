import { useState } from "react";

const AddChallenge = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if(!title){
            return;
        }

        onAdd({
            title: title,
            description: description
        });

        setTitle("");
        setDescription("");
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Title</label>
                <input type="text" placeholder="Challenge Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Description</label>
                <input type="text" placeholder="Challenge Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <button type="submit">Add Challenge</button>
        </form>
    );
};

export default AddChallenge;
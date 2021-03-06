import { useState, useEffect, useRef } from "react";
import InputGroup from "../shared/InputGroup/InputGroup";
import BtnDL from "../shared/BtnDL/BtnDL";
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import "./AddChallenge.scss"

const AddChallenge = ({ onAdd, onToggleForm }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [expandedForm, setExpandedForm] = useState(false);
    
    const formContent = useRef(null);
    const form = useRef(null);

    const titleRef = useRef(null);
    const descRef = useRef(null);
    const valueRef = useRef(null);


    useEffect(() => {
        form.current.style.height = `${formContent.current.clientHeight}px`;
    })

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

        titleRef.current.resetValue();
        descRef.current.resetValue();
        valueRef.current.resetValue();
    }

    const onShowForm = () => {
        setShowForm(!showForm);
        onToggleForm(showForm)
        setTimeout(() => {
            setExpandedForm(!expandedForm)
        }, 400);
    }

    return (
        <div className="add-challenge-form-container">
            <form ref={form} onSubmit={onSubmit} className={`${showForm ? "show" : ""} ${expandedForm ? "expanded" : ""}`}>
                <div ref={formContent} className="form-content">
                    <InputGroup ref={titleRef} id="add_Title" maxLength={30} required={true} defaultValue={title} onChange={(e) => { setTitle(e) }} label="Title" placeholder="Kill zombies"></InputGroup>
                    <InputGroup ref={descRef} id="add_Desc" maxLength={85} defaultValue={description} onChange={(e) => { setDescription(e) }} label="Description" placeholder="Kill zombies using any weapon"></InputGroup>
                    <InputGroup ref={valueRef} id="add_Value" defaultValue={value} onChange={(e) => { setValue(e) }} type="number" label="Value" placeholder="How many times?"></InputGroup>
                    <BtnDL text="Add challenge"></BtnDL>
                </div>
            </form>
            <a className="form-toggle" onClick={onShowForm}>
                <p hidden={!showForm} >Hide form <FaAngleUp className="up"></FaAngleUp></p>
                <p hidden={showForm} >Add new challenge <FaAngleDown className="down"></FaAngleDown></p>
            </a>
        </div>
    );
};

export default AddChallenge;
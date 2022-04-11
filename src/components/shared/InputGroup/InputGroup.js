import { useState } from "react";
import "./InputGroup.scss";

const InputGroup = ({id, onChange, label, placeholder, defaultValue, type="text"}) => {
    const [fieldFocus, setFieldFocus] = useState("");
    const [value, setValue] = useState(defaultValue);

    return (
        <div className="input-group">
            <label className={fieldFocus ? "focus" : ""} htmlFor={id}>{label}</label>
            <div className="input-wrap">
                <input id={id} type={type} placeholder={placeholder} value={value} onFocus={() => {setFieldFocus(true)}}
                onBlur={() => {setFieldFocus(false)}} onChange={(e) => {setValue(e.target.value); onChange(value)}}
                autoComplete="off"
                />
                <img className={`focus-outline ${fieldFocus ? "focus" : ""}`} src={require("../../../images/containers/input_active_container.png")}/>
            </div>
     </div>
    )
}

export default InputGroup;
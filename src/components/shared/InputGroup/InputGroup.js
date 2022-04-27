import { useState, forwardRef, useImperativeHandle } from "react";
import "./InputGroup.scss";

const InputGroup = forwardRef(({id, onChange, label, placeholder, defaultValue, required, type="text", maxLength}, ref) => {
    const [fieldFocus, setFieldFocus] = useState("");
    const [value, setValue] = useState(defaultValue);

    useImperativeHandle(ref, () => ({
        resetValue() {
            setValue("");
        }
    }));

    const onInputChange = (e) => {
        setValue(e.target.value); 
        onChange(e.target.value)
    }

    return (
        <div className="input-group">
            <label className={fieldFocus ? "focus" : ""} htmlFor={id}>{label}</label>
            <div className="input-wrap">
                <input maxLength={maxLength} required={required} id={id} type={type} placeholder={placeholder} value={value} onFocus={() => {setFieldFocus(true)}}
                onBlur={() => {setFieldFocus(false)}} onChange={onInputChange}
                autoComplete="off"
                />
                <img className={`focus-outline ${fieldFocus ? "focus" : ""}`} src={require("../../../images/containers/input_active_container.png")}/>
            </div>
     </div>
    )
})

export default InputGroup;
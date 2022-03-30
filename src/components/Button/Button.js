import "./Button.scss";

const Button = ({text, onClick}) => {

    return (
        <button onClick={onClick}>{text}</button>
    )
}

Button.defaultProps = {
    text: "Add",
    onClick: () => {}
}


export default Button;

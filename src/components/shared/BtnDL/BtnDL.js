import "./BtnDL.scss";

const BtnDL = ({text, onClick, dark=false}) => {
    return (
        <button className="btn-dl" onClick={() => {if(onClick != null)onClick()}}>
            <img className="container" src={require("../../../images/containers/btn_dl_container.png" )} />
            <img className={`border ${dark===true ? "dark" : ""}`} src={require("../../../images/containers/btn_dl_border.png" )} />
            <span>{text}</span>
        </button>
    )
}

export default BtnDL;
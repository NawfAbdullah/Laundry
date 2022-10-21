import '../../styles/buttons.css'

const PrimaryButton = ({children,onClick,isDisable})=>{
    return <button disabled={isDisable!==null?isDisable:false} className="PrimaryButton" onClick={onClick}>
        {children}
    </button>
}

export default PrimaryButton 
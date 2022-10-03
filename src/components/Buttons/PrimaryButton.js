import '../../styles/buttons.css'

const PrimaryButton = ({children,onClick})=>{
    return <button className="PrimaryButton" onClick={onClick}>
        {children}
    </button>
}

export default PrimaryButton 
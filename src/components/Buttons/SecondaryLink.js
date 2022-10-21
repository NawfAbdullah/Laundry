import '../../styles/buttons.css'

const SecondaryLink = ({children,onClick})=>{
    return <p className="Secondary" onClick={onClick}>
        {children}
    </p>
}

export default SecondaryLink 
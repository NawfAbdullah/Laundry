import '../styles/PendingItem.css'

const PendingItem = ({children,block,room,date,progress})=>{
    return <div className='pendingItem'>
        <div className='student-block'>
            <h3>{children}</h3>
            <p>{block}-{room}</p>
        </div>
        <div className='progress-date'>
            <p className='progress'>Progress: {progress}</p>
            <p className='date'>Date Added: {date}</p>
        </div>
    </div>
}

export default PendingItem
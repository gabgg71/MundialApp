export const Reclama=({setReclama})=>{
    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setReclama(false)}}></button>
            <p>Reclama tus fichas</p>
        </div>
    )
}
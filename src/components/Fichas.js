import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Fichas =({setFichas})=>{
    let { misFichas, setMisFichas } = useContext(userContext);
    let [porcentaje, setPorcentaje] = useState((misFichas.length/(11*24))*(100))





  
    
    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setFichas(false)}}></button>
            <h1 className='titulo'>Mis fichas</h1>
            <p>{porcentaje}</p>
            <div className="fichas_tengo">
            {misFichas.map((obj, ind)=>(
                  (obj.pegado && obj.cantidad <2)?(
                    <></>
                  ):(
                    <div className="tarjeta">
                    <b>{obj.ficha.jugador}</b>
                    <img src={obj.ficha.imagen} class="img_tengo"></img>
                    <p>Rol: {obj.ficha.rol}</p>
                    <p>Equipo: {obj.ficha.equipo}</p>
                  </div>
                  )
                    
                ))}
            </div>
            
        
            

        </div>
    );

}
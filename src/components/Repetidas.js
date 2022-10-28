import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Repetidas =({setRepetidas})=>{
    let { misFichas, setMisFichas } = useContext(userContext);

  
    
    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setRepetidas(false)}}></button>
            <h1 className='titulo'>Repetidas</h1>
            <div className="fichas_tengo">
            {misFichas.map((obj, ind)=>(
              (obj.cantidad>1)?(
                <div className="tarjeta">
                    <b>{obj.ficha.jugador}</b>
                    <img src={obj.ficha.imagen} class="img_tengo"></img>
                    <p>Rol:{obj.ficha.rol}</p>
                    <p>Equipo:{obj.ficha.equipo}</p>
                    <p>Repetidas:{obj.cantidad}</p>
                  </div>
              ):(<></>) 
                ))}
            </div>
            

        </div>
    );

}
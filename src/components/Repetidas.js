import React, { useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Repetidas =({setRepetidas})=>{
    let { misFichas} = useContext(userContext);

    
    
    return(
        <div className="mis-fichas" style={{ background: 'url("https://static.vecteezy.com/system/resources/thumbnails/003/368/024/small/football-for-banner-soccer-championship-2022-in-qatar-vector.jpg") 60% 50%'}}>
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setRepetidas(false)}}></button>
            <h1 className='titulo'>Fichas Repetidas</h1>
            <div className="fichas_tengo">
            {misFichas.map((obj,ind)=>(
              (obj.cantidad>1)?(
                <div className="tarjeta" key={obj.ficha.id+"r"}>
                    <b className='nombre_jugador_miFicha'>{obj.ficha.jugador}</b>
                    <img src={obj.ficha.imagen} class="img_tengo" alt='repetido'></img>
                    <p className='rol_jugador_miFicha'>{obj.ficha.rol}</p>
                    <p className='rol_jugador_miFicha'>{obj.ficha.equipo}</p>
                
                    <p className='rol_jugador_miFicha'>Repetidas: {obj.cantidad-1}</p>
                  </div>
              ):(<></>) 
                ))}
            </div>
            

        </div>
    );

}
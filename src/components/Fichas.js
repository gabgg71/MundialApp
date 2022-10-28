import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Fichas =({setFichas})=>{
    const [imagenes, setImagenes] = useState(["https://assets-es.imgfoot.com/media/cache/150x150/person/saad-abdullah-al-sheeb.jpg","https://assets-es.imgfoot.com/media/cache/60x60/person/pedro-miguel-correia.jpg", "", "","", "","", "","","","", "","", "",""]);
    let { misFichas, setMisFichas } = useContext(userContext);

  
    
    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setFichas(false)}}></button>
            <h1>Mis fichas</h1>
            <div className="jugadores">
            {misFichas.map((obj, ind)=>(
                    <div className="card">
                    <img src={obj.ficha.imagen} class="card-img-top"></img>
                    <p>{obj.ficha.jugador}</p>
                    <p>{obj.ficha.rol}</p>
                    <p>{obj.ficha.equipo}</p>
                  </div>
                ))}
            </div>
            <h1>Repetidas</h1>
            <div className="jugadores">
            {misFichas.map((obj, ind)=>(
              (obj.cantidad>1)?(
                <div className="card">
                    <img src={obj.ficha.imagen} class="card-img-top"></img>
                    <p>{obj.ficha.jugador}</p>
                    <p>{obj.ficha.rol}</p>
                    <p>{obj.ficha.equipo}</p>
                    <p>{obj.cantidad}</p>
                  </div>
              ):(<></>) 
                ))}
            </div>
            

        </div>
    );

}
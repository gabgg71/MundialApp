import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Paises =({setPaises, setIndice})=>{
    let { data } = useContext(userContext);

    const presionarPais=(indice)=>{
        setIndice(indice);
        setPaises(false);
    }


    return(
        <div className="paises">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setPaises(false)}}></button>
            <p className='selecciona'>Selecciona un pais</p>
            <div className='grid'>
            {data.map((obj, ind)=>(
                <div className="pais" onClick={()=>{presionarPais(ind)}} key={ind+"p"}>
                    <img src={obj.imagen} class="card-img-top"></img>
                    <p className='nombre-p'>{obj.pais}</p>
                </div>
            ))}
            </div>
        </div>
    )
}
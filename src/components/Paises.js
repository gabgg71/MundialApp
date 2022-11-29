import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Paises =({setPaises, setIndice})=>{
    let imagenes = [1,2,3,4,5,6,5,7,8,9,10,11];
    let { data, setData } = useContext(userContext);

    const presionarPais=(indice)=>{
        setIndice(indice);
        setPaises(false);
    }
    return(
        <div className="paises">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setPaises(false)}}></button>
            <p className='selecciona'>Selecciona el pais</p>
            <div className='grid'>
            {data.map((obj, ind)=>(
                <div className="pais" onClick={()=>{presionarPais(ind)}}>
                <img src={obj.imagen} className="card-img-top"></img>
                <p className='nombre-p'>{obj.pais}</p>
              </div>
            ))}
            </div>
        </div>
    )
}
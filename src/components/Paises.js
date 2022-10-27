import React, { useState } from 'react';
export const Paises =({setPaises})=>{
    let imagenes = [1,2,3,4,5,6,5,7,8,9,10,11];
    return(
        <div className="paises">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setPaises(false)}}></button>
            <p>Selecciona el pais</p>
            <div className='grid'>
            {imagenes.slice(0, 6).map((img, ind)=>(
                <div className="pais">
                <img src="https://i.pinimg.com/originals/f3/b5/e2/f3b5e28a3a2d141f36c287a8d67ecd3d.jpg" class="card-img-top"></img>
                <p className='nombre-p'>x pais</p>
              </div>
            ))}
            </div>
        </div>
    )
}
import React, { useState } from 'react';
export const Fichas =({setFichas})=>{
    const [imagenes, setImagenes] = useState(["https://assets-es.imgfoot.com/media/cache/150x150/person/saad-abdullah-al-sheeb.jpg","https://assets-es.imgfoot.com/media/cache/60x60/person/pedro-miguel-correia.jpg", "", "","", "","", "","","","", "","", "",""]);
    
    
    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setFichas(false)}}></button>
            <h1>Mis fichas</h1>
            <div className="jugadores">
            {imagenes.slice(0,5).map((img, ind)=>(
                    <div className="card">
                    <img src="https://assets-es.imgfoot.com/media/cache/150x150/person/saad-abdullah-al-sheeb.jpg" class="card-img-top"></img>
                    
                  </div>
                ))}
            </div>
            <h1>Repetidas</h1>
            <div className="jugadores">
            {imagenes.map((img, ind)=>(
                    <div className="card">
                    <img src="https://assets-es.imgfoot.com/media/cache/150x150/person/saad-abdullah-al-sheeb.jpg" class="card-img-top"></img>
                    
                  </div>
                ))}
            </div>
            

        </div>
    );

}
import React, { useState } from 'react';
export const Fichas =({setFichas})=>{
    const [imagenes, setImagenes] = useState(["https://assets-es.imgfoot.com/media/cache/150x150/person/saad-abdullah-al-sheeb.jpg","https://assets-es.imgfoot.com/media/cache/60x60/person/pedro-miguel-correia.jpg", "", "","", "","", "","","","", "","", "",""]);
    const [imagenes2, setImagenes2] = useState([
      {
        "id": "6358a03275d0fc0fd6a1e928",
        "jugador": " Diogo Costa",
        "rol": "Portero",
        "imagen": "https://s.hs-data.com/bilder/spieler/klein/329352.jpg?fallback=png",
        "equipo": "Portugal",
        "cantidad": 0
    },
    
    {
        "id": "6358a03275d0fc0fd6a1e929",
        "jugador": " José Sá",
        "rol": "Portero",
        "imagen": "https://s.hs-data.com/bilder/spieler/klein/229631.jpg?fallback=png",
        "equipo": "Portugal",
        "cantidad": 0
    }
  ])

  console.log(`${imagenes2[0].ficha}`)
    
    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setFichas(false)}}></button>
            <h1>Mis fichas</h1>
            <div className="jugadores">
            {imagenes2.map((ficha, ind)=>(
                    <div className="card">
                    <img src={ficha.imagen} class="card-img-top"></img>
                    <p>{ficha.jugador}</p>
                    <p>{ficha.rol}</p>
                    <p>{ficha.equipo}</p>

                    
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
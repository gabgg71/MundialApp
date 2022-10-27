import React, { useState } from 'react';
import { Paises } from "./Paises";

export const Album=({setAlbum})=>{
    let imagenes = [1,2,3,4,5,6,5,7,8,9,10,11];
    const [paises, setPaises] = useState(false)
    return(
        <div className="mis-fichas">
        <div className='fondo-album'>
        <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setAlbum(false)}}></button>
        <p>Pais</p>
        <img className="morado" src='https://static.vecteezy.com/system/resources/thumbnails/003/368/024/small/football-for-banner-soccer-championship-2022-in-qatar-vector.jpg'></img>
        
        <div className="jugadores-equipo">
        <div className="jugadores-1">
            {imagenes.slice(0, 5).map((img, ind)=>(
                <div className="card">
                <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                <p>{ind+1}</p>
              </div>
            ))}
        </div>
        <div className="jugadores-2">
        {imagenes.slice(5,-1).map((img, ind)=>(
                <div className="card">
                <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                <p>{ind+6}</p>
              </div>
            ))}
        </div>

        </div>
        {paises && <Paises setPaises={setPaises}/>}
        <button className="glow-on-hover fifa" onClick={()=>{setPaises(true)}}>Copa mundo FIFA</button>
        </div>
        
    </div>
    )
}
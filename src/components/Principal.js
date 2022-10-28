import React, { useState } from 'react';
import { Fichas } from './Fichas';
import { Album } from './Album';
import { Navbar } from './Navbar';
import { Reclama } from './Reclama';

export const Principal=()=>{
    const [fichas, setFichas] = useState(false)
    const [album, setAlbum] = useState(false)
    const [reclama, setReclama] = useState(false)

    
    

    return (
        <>
        <div className="App">
            <div className='fondo'>
            <img src='https://news-24.fr/wp-content/uploads/2022/09/gianni-infantino-qatar-2022-164885084016x9.jpg'></img>
            {fichas && <Fichas setFichas={setFichas}/>}
            {album && <Album setAlbum={setAlbum} index={0}/>}
            {reclama && <Reclama setReclama={setReclama}/>}
            <div className='opciones'>
            <button className='glow-on-hover' onClick={()=>{setFichas(true)}}>Ver mis fichas</button>
            <button className='glow-on-hover' onClick={()=>{setAlbum(true)}}>Album Panini</button>
            <button className='glow-on-hover' onClick={()=>{setReclama(true)}}>Reclamar fichas</button>

            </div>
            <Navbar/>
            </div>
                 
        </div>
        
        </>
      );


}
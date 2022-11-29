import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
import { useForm } from "../hooks/useForm";
export const Intercambio=({setIntercambio})=>{
    const [opcionSel, setOpcion] = useState(0)
    const [seleccionada, setSeleccionada] = useState()
    const [respuestas, setRespuesta] = useState()
    let { misFichas, setMisFichas, usuario, data } = useContext(userContext);
    const [envioData, handleLoginData] = useForm({
        "de": usuario.correo,
        "para":"",
        "ofrece": "",
        "tipo":"propuesta"
      });
    const { para, ofrece } = envioData;

    const selecciona=(id)=>{
        if (seleccionada === id){
            setSeleccionada("")
            console.log("DESELECCIONADA")
        }else{
            setSeleccionada(id)
            console.log("se selecciono")
        }
        

    }

    const enviarPropuesta =async()=>{
        envioData.ofrece = seleccionada;
        console.log(envioData)
        let respuesta = await fetch(
            `http://localhost:8080/api/usuario/hacer_propuesta`, 
          {method:"POST", 
          body: JSON.stringify(envioData),
          headers: {
            'Content-Type': 'application/json'
          }})
          
        let salida = await respuesta.json()
        setRespuesta(salida.respuesta)
        setTimeout(()=>{
            setRespuesta("")
        }, 3000)
        //setUsuario(salida);
    }

    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={() => { setIntercambio(false) }}></button>
            <div>
            <div className='pestana'>
            <p onClick={()=>{setOpcion(0); }}>Proponer intercambio</p>
            <p onClick={()=>{setOpcion(1); console.log(usuario.propuestas);  }}>Propuestas recibidas</p>
            <p onClick={()=>{setOpcion(2);  }}>Contrapropuestas recibidas</p>
            <p onClick={()=>{setOpcion(3);  }}>Contrapropuestas rechazadas</p>
            </div>
            {opcionSel === 0 && <div>
                <div className="fichas_tengo">
            {misFichas.map((obj, ind)=>(
              (obj.cantidad>1)?(
                <div className="tarjeta" onClick={()=>{selecciona(obj.ficha.id)}}>
                    <b>{obj.ficha.jugador}</b>
                    <div className='imagen-selec'>
                    <img src={obj.ficha.imagen} class="img_tengo"></img>
                    {seleccionada === obj.ficha.id && <img class="seleccionada" src="seleccionadaF.png" />}
                    
                    </div>
                    <p>Equipo:{obj.ficha.equipo}</p>
                    <p>Repetidas:{obj.cantidad}</p>
                  </div>
              ):(<></>) 
              
                )
                )}
                
            </div>
            <div className='invita'>
                <p>Escribe el correo de tu amigo</p>
                <input 
                name="para"
            value={para}
            onChange={handleLoginData}></input>
                <button className='enter' onClick={enviarPropuesta}>Envia el ofrecimiento</button>


            </div>
            <p>{respuestas}</p>
                
                </div>}
            {opcionSel === 1 && <div className='ofrecen'><p>Estas son las propuestas que has recibido</p>
            {usuario.propuestas.map((obj, ind)=>(
              (obj.tipo === "propuesta")?(
                <div className="tarjeta_prop">
                    
                    {misFichas.map((obj2, ind)=>(
              (obj2.ficha.id === obj.aCambio)?(
                <div className="tarjeta">
                    <div className='flexi'>
                    <b>{obj.para} te ofrece</b>
                    <div className='propuesta'>
                    <img src={obj2.ficha.imagen} class="img_tengo"></img>
                    </div>
                    </div>
                  </div>
              ):((obj2.ficha.id === obj.ofrece)?(
                  <>
              <div className='flexi'>
                <p>Tu ofreces</p>
                <div className='propuesta'>
                <img src={obj2.ficha.imagen} class="img_tengo"></img>   
                </div>             
              </div>
              </>
              ):(<></>) 
                )))}

                    <div className='flexi'>
                        <button className='enter'>Aceptar</button>
                        <button className='enter'>Rechazar</button>
                    </div>
                  </div>
              ):(<></>)
              
              
              
              
                )
                )
                }
            </div>}
            {opcionSel === 2 && <div className='ofrecen'><p>Sella intercambios</p>
            {usuario.propuestas.map((obj, ind)=>(
              (obj.tipo === "contra")?(
                <div className="tarjeta_prop">
                    
                    {misFichas.map((obj2, ind)=>(
              (obj2.ficha.id === obj.aCambio)?(
                <div className="tarjeta">
                    <div className='flexi'>
                    <b>{obj.para} te ofrece</b>
                    <div className='propuesta'>
                    <img src={obj2.ficha.imagen} class="img_tengo"></img>
                    </div>
                    </div>
                  </div>
              ):((obj2.ficha.id === obj.ofrece)?(
                  <>
              <div className='flexi'>
                <p>Tu ofreces</p>
                <div className='propuesta'>
                <img src={obj2.ficha.imagen} class="img_tengo"></img>   
                </div>             
              </div>
              </>
              ):(<></>) 
                )))}

                    <div className='flexi'>
                        <button className='enter'>Aceptar</button>
                        <button className='enter'>Rechazar</button>
                    </div>
                  </div>
              ):(<></>)
              
              
              
              
                )
                )
                }
                </div>}
            {opcionSel === 3 && <div className='ofrecen'><p>Estas contrapropuestas fueron rechazadas, Tienes algo mejor que ofrecer?</p></div>}
            </div>
        </div>
    )
}
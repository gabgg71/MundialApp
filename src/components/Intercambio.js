import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
import { useForm } from "../hooks/useForm";
export const Intercambio=({setIntercambio})=>{
    const [opcionSel, setOpcion] = useState(0)
    const [responde, setResponde] = useState(false)
    const [activo, setActivo] = useState()
    const [seleccionada, setSeleccionada] = useState({
      "id":-1
    })
    const [respuestas, setRespuesta] = useState()
    const [msg, setMsg] = useState(false);
    let { misFichas, setMisFichas,  usuario, setUsuario } = useContext(userContext);
    const [envioData, handleLoginData] = useForm({
        "de": usuario.correo,
        "para":"",
        "ofrece": "",
        "ofreceImg":"",
        "tipo":"propuesta"
      });
    const { para } = envioData;

    const selecciona=(sel)=>{
      (seleccionada.id === sel.id)?(setSeleccionada("")):(setSeleccionada(sel))
    }

    const enviarContra =(propuesta, ind)=>{
      let prop = {
        "de": propuesta.de,
        "para": propuesta.para,
        "ofrece": propuesta.ofrece,
        "ofreceImg": propuesta.ofreceImg,
        "aCambio": seleccionada.id,
        "ofreceCambio": seleccionada.imagen,
        "tipo": "contra"
      }
      enviarPeticionPro(prop,ind, "POST", "hacer_propuesta");
    }



   const enviarPeticion=async(data, metodo, endpoint)=>{
    let respuesta = await fetch(
      `${process.env.REACT_APP_BACKEND}/usuario/${endpoint}`, 
    {method:metodo, 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }})
  let salida = await respuesta.json()
  setRespuesta(salida.respuesta)
  setTimeout(()=>{
      setRespuesta("")
  }, 3500);
  setSeleccionada("");

   }

   const enviarPeticionPro=async(data,ind,  metodo, endpoint)=>{
    let respuesta = await fetch(
      `${process.env.REACT_APP_BACKEND}/usuario/${endpoint}`, 
    {method:metodo, 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }})
  let salida = await respuesta.json()

  setRespuesta(salida.respuesta)
  setTimeout(()=>{
      setRespuesta("")
  }, 2500);
  setSeleccionada("");
  if(salida.respuesta ==="La propuesta fue enviada satisfactoriamente."){
    let nuevasP = usuario.propuestas.map((pro, i) => {
      if(i === ind){
        pro.tipo = "gestionada"
        pro.aCambio = seleccionada.id
        pro.ofreceCambio = seleccionada.imagen
      }
      return pro
    })
    setUsuario({...usuario,  propuestas: nuevasP})
  }

   }

   

   const pruebe=(ind)=>{
    let salida = usuario.propuestas.filter((pro, i) => i !== ind)
    setUsuario({...usuario,  propuestas: salida})
   }


    const enviarPropuesta =()=>{
        envioData.ofrece = seleccionada.id;
        envioData.ofreceImg = seleccionada.imagen;
        enviarPeticion(envioData, "POST","hacer_propuesta");
    }

    const intercambio=async(propuesta)=>{
      await enviarPeticion(propuesta, "PUT","intercambio");
      let salida = usuario.propuestas.filter((pro, i) => pro !== propuesta)
      setUsuario({...usuario,  propuestas: salida})
      let fichas = await fetch(`${process.env.REACT_APP_BACKEND}/usuario/obtener_fichas/${usuario.id}`, {method:"GET", 
      headers: {
        'Content-Type': 'application/json'
      }})
      let fichasU = await fichas.json()
      let fichasC = await fetch(`${process.env.REACT_APP_BACKEND}/fichas/fichas_user`, 
      {method:"PUT", 
      body: JSON.stringify(fichasU),
      headers: {
        'Content-Type': 'application/json'
      }})
      fichasU = await fichasC.json()
      setMisFichas(fichasU);

    }

    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={() => { setIntercambio(false) }}></button>
           
            <div className='pestana'>
            <p onClick={()=>{setOpcion(0); }}>Proponer intercambio</p>
            <p onClick={()=>{setOpcion(1);  }}>Propuestas recibidas</p>
            <p onClick={()=>{setOpcion(2);  }}>Contrapropuestas recibidas</p>
            <p onClick={()=>{setOpcion(3);  
            setSeleccionada("");}}>Contrapropuestas rechazadas</p>
            </div>
            {opcionSel === 0 && <div>
                <div className="fichas_tengo">
            {misFichas.map((obj, ind)=>(
              (obj.cantidad>1)?(
                <div className="tarjeta" onClick={()=>{selecciona(obj.ficha)}} key={obj.ficha.id}>
                    <b>{obj.ficha.jugador}</b>
                    <div className='imagen-selec'>
                    <img src={obj.ficha.imagen} class="img_tengo"></img>
                    {seleccionada.id === obj.ficha.id && <img class="seleccionada" src="seleccionadaF.png" />}
                    
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
            <p className='invita'>{respuestas}</p>
                
                </div>}


            {(opcionSel === 1 || opcionSel === 5) && 
            <div className='ofrecen'>
            <div className='pestana'>
            <p onClick={()=>{setOpcion(1); }}>Propuestas por atender</p>
            <p onClick={()=>{setOpcion(5);  }}>Propuestas gestionadas</p>
            </div>
            {usuario.propuestas && usuario.propuestas.map((obj, ind)=>(
              (obj.tipo === "propuesta" && opcionSel === 1)?(
                <div className="tarjeta_prop" key={obj.de+obj.ofreceImg}>
                    <div className='flexi'>
                    <p>{obj.de} te ofrece</p>
                    <div className='propuesta'>
                    <img src={obj.ofreceImg} class="img_tengo"></img>
                    </div>
                    </div>
                    {seleccionada.imagen && activo === ind &&
                    <div className='flexi'>
                    <p>Tu ofreces</p>
                    <div className='propuesta'>
                    <img src={seleccionada.imagen} class="img_tengo"></img>
                    </div>
                    </div>}
                    <div className='flexi'>
                      {msg && activo === ind && 
                      <button className='enter' onClick={()=>{
                        enviarContra(obj, ind);  
                        setTimeout(()=>{
                        
                    }, 2200);}}>Enviar</button>}
                        <button className='enter' onClick={()=>{setResponde(true); setActivo(ind);}}>Seleccionar ficha de cambio</button>
                        <button className='enter' onClick={()=>{enviarPeticion(obj, "DELETE", "elimina_propuesta");
                      pruebe(ind)}}>Rechazar</button>
                      {activo === ind && <p className='separado'>{respuestas}</p>}
                    </div>
                    
                    
                  </div>
              ):((obj.tipo === "gestionada" && opcionSel === 5)?(
                <div className="tarjeta_prop">
                <div className='flexi'>
                <p>{obj.de} te ofrecio</p>
                <div className='propuesta'>
                <img src={obj.ofreceImg} class="img_tengo"></img>
                </div>
                </div>
                <div className='flexi'>
                <p>Tu ofreciste</p>
                <div className='propuesta'>
                <img src={obj.ofreceCambio} class="img_tengo"></img>
                </div>
                </div>
              </div>
              ):(<></>))
              
              
              
              
                )
                )
                }
            </div>}
            {opcionSel === 2 && <div className='ofrecen'>
            {usuario.propuestas && usuario.propuestas.map((obj, ind)=>(
              (obj.tipo === "contra")?(
                <div className="tarjeta_prop" key={ind}>
                    <div className='flexi'>
                    <p>{obj.para} te ofrece</p>
                    <div className='propuesta'>
                    <img src={obj.ofreceCambio} class="img_tengo"></img>
                    </div>
                    </div>
                    
                    <div className='flexi'>
                    <p>Tu ofreces</p>
                    <div className='propuesta'>
                    <img src={obj.ofreceImg} class="img_tengo"></img>
                    </div>
                    </div>
                    
              

                    <div className='flexi'>
                        <button className='enter' onClick={()=>{intercambio(obj)}}>Aceptar</button>
                        <button className='enter' onClick={()=>{
                          enviarPeticion(obj,"PUT", "rechazar");
                          pruebe(ind);
                          }}>Rechazar</button>
                    </div>
                    {activo === ind && <p>{respuestas}</p>}
                  </div>
              ):(<></>)
              
              
              
              
                )
                )
                }
                </div>}
            {opcionSel === 3 && <div className='ofrecen'>
              
              {usuario.propuestas && usuario.propuestas.map((obj, ind)=>(
              (obj.tipo === "rechazo")?(
                <div className="tarjeta_prop" key={obj.de+obj.ofreceImg}>
                    <div className='flexi'>
                    <p>{obj.de} te ofrecio</p>
                    <div className='propuesta'>
                    <img src={obj.ofreceImg} class="img_tengo"></img>
                    </div>
                    </div>
                    <div className='flexi'>
                    <p>{(seleccionada.imagen && "Lo que ofreces ahora") || "Lo que habias ofrecido"}</p>
                    <div className='propuesta'>
                    <img src={(seleccionada.imagen)?(seleccionada.imagen):(obj.ofreceCambio)} class="img_tengo"></img>
                    </div>
                    </div>
                    
              

                    <div className='flexi'>
                      {msg && activo === ind && 
                      <button className='enter' onClick={()=>{enviarContra(obj, ind)}}>Enviar</button>}
                        <button className='enter' onClick={()=>{setResponde(true); setActivo(ind);}}>Tengo algo mejor</button>
                        <button className='enter' onClick={()=>{enviarPeticion(obj, "DELETE", "elimina_propuesta"); pruebe(ind);}}>Descartar</button>
                        {activo === ind && <p className='separado'>{respuestas}</p>}
                    </div>
                    
                  </div>
              ):(<></>)
              
              
              
              
                )
                )
                }
              </div>}
            {responde && <div className="paises gris">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setResponde(false); setSeleccionada("")}}></button>
            <p className='selecciona invita'>Escoge tu ofrecimiento</p>
            <div className="propuesta-g">
            {misFichas.map((obj, ind)=>(
              (obj.cantidad>1)?(
                <div className="tarjeta" onClick={()=>{selecciona(obj.ficha)}} key={obj.ficha.id}>
                    <b>{obj.ficha.jugador}</b>
                    <div className='imagen-selec'>
                    <img src={obj.ficha.imagen} class="img_tengo"></img>
                    {seleccionada.id === obj.ficha.id && <img class="seleccionada" src="seleccionadaF.png" />}
                    
                    </div>
                    <p>{obj.ficha.equipo}</p>
                    
                  </div>
              ):(<></>) 
              
                )
                )}
                
            </div>
            <button className='enter centro' onClick={()=>{setResponde(false); setMsg(true)}}>Aceptar</button>
            
            </div>}
            </div>
    )
}
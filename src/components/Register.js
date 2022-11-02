/*form input{
  width: 98%;
  padding:5% 1%;
}*/ 
import React, { useEffect, useState } from 'react';
import { useForm } from "../hooks/useForm";



export const Register = () => {

  let [user, setUser] = useState({
    "email": "",
    "password": "",
  });
  const [error, setError] = useState("")
    

  const [loginData, handleLoginData] = useForm({
    email: "",
    password: "",
  });

  const { lEmail, lPassword } = loginData;
  
  const registro =async()=>{
      console.log(lEmail)
    if(lEmail ===undefined || lEmail ==="" || lPassword === undefined || lPassword === ""){
        setError("Error, datos incompletos");
        setTimeout(()=>{
          setError("");
        }, 4000)
      }else{
          let data = {
            "correo":lEmail,
            "password": lPassword,
            "fichas":[]
        }
        let fichasC = await fetch(
          `http://localhost:8080/api/usuario/guardar`, 
        {method:"POST", 
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }})
        console.log(`FICHAS C ${fichasC.status}`)
        if(fichasC.status >400 || fichasC.status ==="500"){
            setError("Error, este correo ya existe");
            setTimeout(()=>{
              setError("");
            }, 4000)
        }else{
            let fichasU = await fichasC.json()
            if(fichasU.id >-1){
            localStorage.setItem("usuario", fichasU.id);
            window.location.href = 'http://localhost:3000/principal';
            }
        }
  }

  /*
  if(fichasU.existe){
    localStorage.setItem("usuario", fichasU.us.id);
    setUsuario(fichasU.us.id);
    let fichasA = await fetch(`http://localhost:8080/api/fichas/fichas_user`, 
    {method:"PUT", 
    body: JSON.stringify(fichasU.us.fichas),
    headers: {
      'Content-Type': 'application/json'
    }})
    fichasU = await fichasA.json()
    console.log(fichasU);
    setMisFichas(fichasU);
    console.log(misFichas)
    window.location.href = 'http://localhost:3000/principal';
  }else{
    setError(true);
    setTimeout(()=>{
      setError(false);
    }, 3000)
  }*/
  }

  
  
  
  
  

  return (
    <div className="App">
      <div className="fondo_login">
      <h1 className='tituloLog'>Registro</h1>
            <div className='flex_log'>
          <input
            type="text"
            placeholder="Correo"
            className="email"
            name="lEmail"
            value={lEmail}
            onChange={handleLoginData}
          ></input>
          <input
            type="text"
            placeholder="Password"
            className="password"
            name="lPassword"
            value={lPassword}
            onChange={handleLoginData}
          ></input>
          <button className="enter" onClick={registro}>Registro</button>
        {error!=="" && <p>{error}</p>}
        <p className="grey">
          tienes una cuenta? <a href="/">Logueate</a>
        </p>
          </div>
      </div>
      
    </div>
  );
};

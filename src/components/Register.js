/*form input{
  width: 98%;
  padding:5% 1%;
}*/ 
import React, {  useState } from 'react';
import { useForm } from "../hooks/useForm";



export const Register = () => {

  const [error, setError] = useState("")
    

  const [loginData, handleLoginData] = useForm({
    email: "",
    password: "",
  });

  const { lEmail, lPassword } = loginData;
  
  const registro =async()=>{
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
          `${process.env.REACT_APP_BACKEND}/usuario/guardar`, 
        {method:"POST", 
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }})
        if(fichasC.status >400 || fichasC.status ==="500"){
            setError("Error, este correo ya existe");
            setTimeout(()=>{
              setError("");
            }, 4000)
        }else{
            let fichasU = await fichasC.json()
            if(fichasU.id >-1){
            localStorage.setItem("usuario", fichasU.id);
            window.location.href = `${window.location.href}principal`;
            }
        }
  }
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

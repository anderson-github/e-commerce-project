import React from 'react';
import './App.css';
import { useState } from 'react';
import Axios from 'axios';


function CreateProducts() {

    const [nombre,setNombre] = useState("");
    const [codigo,setCodigo] = useState("");
    const [inventario,setInventario] = useState(0);
    const [marca,setMarca] = useState("");
    const [valor,setValor] = useState(0);

    const add = () =>{
        Axios.post("http://localhost:3001/create", {
            nombre: nombre,
            codigo: codigo,
            inventario: inventario,
            marca: marca,
            valor: valor
        }).then(()=>{
            alert("prodcuto Creado")
        });
    }

  return (
    <div className='datos'>
        <label>Nombre: <input 
        onChange={(event) =>{
            setNombre(event.target.value);
        }}
        type='text'></input></label>
        <label>Codigo: <input 
         onChange={(event) =>{
            setCodigo(event.target.value);
        }}
        type='text'></input></label>
        <label>Inventario: <input 
         onChange={(event) =>{
            setInventario(event.target.value);
        }}
        type='number'></input></label>
        <label>Marca: <input 
         onChange={(event) =>{
            setMarca(event.target.value);
        }}
        type='text'></input></label>
        <label>Valor: <input 
         onChange={(event) =>{
            setValor(event.target.value);
        }}
        type='number'></input></label>
        <button onClick={add}>Crear</button>
    </div>
  );
}

export default CreateProducts;

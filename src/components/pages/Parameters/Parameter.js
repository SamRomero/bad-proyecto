import React, {useState, useEffect} from 'react';
import '../../../App.css';
import '../Usuarios/Users.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Parameter() {

  function getData(){
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Parametros"
    const params = {
      method: 'GET',
      headers:{
        'accept': '*/*',
        'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN
      }, 
    }
    fetch(url, params).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {

      const dataParameters =[]
      
      for (let index = 0; index < response.length; index++) {
        dataParameters[index] = {
          id : response[index].id, 
          nombre : response[index].nombreParametro, 
        }
      }
      console.log(dataParameters)
      setData(dataParameters)
    });
  }

  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [parameterSeleccionado, setParameterSeleccionado] = useState({
    id: '',
    nombre: '',
  });

  useEffect(()=>{
    getData()
  }, []);

  const seleccionarParameter=(elemento, caso)=>{
setParameterSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setParameterSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Parametros/"+parameterSeleccionado.id //no tocar nada, mas que url y el id
    const params = {
      method: 'PUT',
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //esto es pa editar.
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //depende de los campos.
        id : parameterSeleccionado.id,
        nombreParametro : parameterSeleccionado.nombre, //api -> front
      })
    }
    fetch(url, params).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      //console.log(response)
      getData()
      setModalEditar(false)
    });
  }

  const eliminar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Parametros/"+parameterSeleccionado.id //cambiar url, concatenar id
    const params = {
      method: 'DELETE', //metodo delete
      headers:{
        'accept': '*/*',
        'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN //cambiar token, si tira 401, significa que el token se venció.
      } 
    }
    fetch(url, params).then(res => {
      if(!res.ok){
        const error = (data && data.message) || res.status;
        return Promise.reject(error)
      }
      alert("Parámetro eliminada con exito")
      getData()
      setModalEliminar(false)
    })
    .catch(error =>{ 
      alert("El parámetro no es candidato a eliminacion")
      setModalEliminar(false)
    });
  }

  const abrirModalInsertar=()=>{
    setParameterSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Parametros"
    const params = {
      method: 'POST',
      headers:{
        'accept': '*/*',
        'content-type':'application/json',
        'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN
      }, 
      body:JSON.stringify({
        id : parameterSeleccionado.id,
        nombreParametro : parameterSeleccionado.nombre,
      })
    }
    fetch(url, params).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response)
      getData()
      setModalInsertar(false)
    });
  }

  return (
    <div className="User">
      <h2>Lista de Parametros</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
      <table className="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarParameter(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger"onClick={()=>seleccionarParameter(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={parameterSeleccionado ? parameterSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el parámetro {parameterSeleccionado && parameterSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={parameterSeleccionado ? parameterSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

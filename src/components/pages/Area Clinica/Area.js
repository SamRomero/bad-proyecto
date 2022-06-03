import React, {useState, useEffect} from 'react';
import '../../../App.css';
import './Area.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';


export default function Area() {
  function getData(){
    let baseurl = process.env.REACT_APP_URL_BASE //url base, var de entrada en .env debe apuntar a localhosto 7008
    const url = baseurl+"/api/AreaClinicas" //url de donde se consume, dependiendo de los cruds
    const params = { //
      method: 'GET', //se usa tal cual, solo se modifica el token, la cadena, dependiendo del usuario logueado.
      headers:{
        'accept': '*/*',
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN
      }, 
    }
    fetch(url, params).then(res => res.json()) //copiar y pegar, mapeo 
    .catch(error => console.error('Error:', error))
    .then(response => {
      const dataArea =[]
      for (let index = 0; index < response.length; index++) {
        dataArea[index] = { //arreglo de data clinics. todos los datos que devuelve clinica
          id : response[index].id,  // react -> api
          nombre : response[index].nombreAreaClinica
        }
      }
      console.log(response) //quitar
      setData(dataArea)
    });
  }
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [areaSeleccionada, setareaSeleccionada] = useState({
    id: '',
    nombre: ''
  });

  useEffect(()=>{ //copy and page
    getData()
  }, []);

  const seleccionarArea=(elemento, caso)=>{
setareaSeleccionada(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setareaSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  //eliminar
  const eliminar=()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/AreaClinicas/"+areaSeleccionada.id //cambiar url, concatenar id
    const params = {
      method: 'DELETE', //metodo delete
      headers:{
        'accept': '*/*',
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //cambiar token, si tira 401, significa que el token se venció.
      } 
    }
    fetch(url, params).then(res => {
      if(!res.ok){
        const error = (data && data.message) || res.status;
        return Promise.reject(error)
      }
      alert("Área Clínica eliminada con éxito")
      getData()
      setModalEliminar(false)
    })
    .catch(error =>{ 
      alert("La Área no es candidata a eliminación")
      setModalEliminar(false)
    });
  }

  //EDITAR
  const editar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/AreaClinicas/"+areaSeleccionada.id //no tocar nada, mas que url y el id
    const params = {
      method: 'PUT',
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //esto es pa editar.
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //depende de los campos.
        id : areaSeleccionada.id,
        nombreAreaClinica : areaSeleccionada.nombre //api -> front
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

  const abrirModalInsertar=()=>{
    setareaSeleccionada(null);
    setModalInsertar(true);
  }

  //insertar
  const insertar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/AreaClinicas" //modificar url
    const params = {
      method: 'POST', //metodo post
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //json
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //api -> front
        nombreAreaClinica : areaSeleccionada.nombre
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
        <div class="Area">
          <h2>Listado de Áreas</h2>
          <br />
        <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
        <br /><br />
        <table className="table table-bordered table-hover">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Área</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(elemento=>(
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.nombre}</td>
                  <td><button className="btn btn-primary" onClick={()=>seleccionarArea(elemento, 'Editar')}>Editar</button> {"   "} 
                  <button className="btn btn-danger" onClick={()=>seleccionarArea(elemento, 'Eliminar')}>Eliminar</button></td>
                </tr>
              ))
              }
            </tbody>
          </table>
    
          <Modal isOpen={modalEditar}>
            <ModalHeader>
              <div>
                <h3>Editar Registro</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>ID</label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  name="id"
                  value={areaSeleccionada && areaSeleccionada.id}
                />
                <br />
    
                <label>Área</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  value={areaSeleccionada && areaSeleccionada.nombre}
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
              Estás Seguro que deseas eliminar el registro {areaSeleccionada && areaSeleccionada.nombre}
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
                <h3>Ingrese Registro</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Área</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  value={areaSeleccionada ? areaSeleccionada.nombre: ''}
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
import React, {useState, useEffect} from 'react'; //useEffect paa la tablas
import '../../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Clinics.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import { Alert } from 'bootstrap';

export default function Clinics() {
  function getData(){
    let baseurl = process.env.REACT_APP_URL_BASE //url base, var de entrada en .env debe apuntar a localhosto 7008
    const url = baseurl+"/api/Clinicas" //url de donde se consume, dependiendo de los cruds
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
      const dataClinics =[]
      for (let index = 0; index < response.length; index++) {
        dataClinics[index] = { //arreglo de data clinics. todos los datos que devuelve clinica
          id : response[index].id,  // react -> api
          nombre : response[index].clinicaNombre, 
          telefono : response[index].clinicaTelefono, 
          direccion : response[index].clinicaDireccion, 
          municipio : response[index].municipioId 
        }
      }
      console.log(dataClinics) //quitar
      setData(dataClinics)
    });
  }
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [clinicSeleccionado, setClinicSeleccionado] = useState({
    id: '',
    nombre: '',
    telefono: '',
    direccion: '',
    municipio: '',
    departamento: ''
  });

  useEffect(()=>{ //copy and page
    getData()
  }, []);

  const seleccionarClinic=(elemento, caso)=>{
setClinicSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setClinicSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  //
  const eliminar=()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Clinicas/"+clinicSeleccionado.id //cambiar url, concatenar id
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
      alert("clinica eliminada con exito")
      getData()
      setModalEliminar(false)
    })
    .catch(error =>{ 
      alert("la clinica no es candidata a eliminacion")
      setModalEliminar(false)
    });
  }

  //EDITAR
  const editar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Clinicas/"+clinicSeleccionado.id //no tocar nada, mas que url y el id
    const params = {
      method: 'PUT',
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //esto es pa editar.
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //depende de los campos.
        id : clinicSeleccionado.id,
        clinicaNombre : clinicSeleccionado.nombre, //api -> front
        clinicaTelefono : clinicSeleccionado.telefono,
        clinicaDireccion :clinicSeleccionado.direccion,
        municipioId : parseInt(clinicSeleccionado.municipio) //todos los id hay que parsearlos a enteros.
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
    setClinicSeleccionado(null);
    setModalInsertar(true);
  }

  //insertar
  const insertar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Clinicas" //modificar url
    const params = {
      method: 'POST', //metodo post
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //json
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //api -> front
        clinicaNombre : clinicSeleccionado.nombre,
        clinicaTelefono : clinicSeleccionado.telefono,
        clinicaDireccion :clinicSeleccionado.direccion,
        municipioId : parseInt(clinicSeleccionado.municipio) //enteros parsearlos
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
    <div class="Clinics">
      <h2>Listado de Clínicas Habilitadas</h2>
      <br />

    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />

      <table className="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Direccion</th>
            <th scope="col">Municipio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td >{elemento.id}</td>
              <td >{elemento.nombre}</td>
              <td >{elemento.telefono}</td>
              <td >{elemento.direccion}</td>
              <td >{elemento.municipio}</td>
              <td ><button className="btn btn-primary" onClick={()=>seleccionarClinic(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarClinic(elemento, 'Eliminar')}>Eliminar</button></td>
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
              value={clinicSeleccionado && clinicSeleccionado.id}
            />
            <br />

            <label>Nombre Clínica</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={clinicSeleccionado && clinicSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={clinicSeleccionado && clinicSeleccionado.telefono}
              onChange={handleChange}
            />

            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={clinicSeleccionado && clinicSeleccionado.direccion}
              onChange={handleChange}
            />

            <label>Municipio</label>
            <input
              className="form-control"
              type="text"
              name="municipio"
              value={clinicSeleccionado && clinicSeleccionado.municipio}
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
          Estás Seguro que deseas eliminar el registro {clinicSeleccionado && clinicSeleccionado.nombre}
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
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">

            <label>Nombre de Clínica</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={clinicSeleccionado ? clinicSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={clinicSeleccionado ? clinicSeleccionado.telefono: ''}
              onChange={handleChange}
            />

            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={clinicSeleccionado ? clinicSeleccionado.direccion: ''}
              onChange={handleChange}
            />

            <label>Municipio</label>
            <input
              className="form-control"
              type="text"
              name="municipio"
              value={clinicSeleccionado ? clinicSeleccionado.municipio: ''}
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

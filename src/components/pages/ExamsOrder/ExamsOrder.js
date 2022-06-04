import React, {useState, useEffect} from 'react';
import '../../../App.css';
import './ExamsOrder.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function ExamsOrder() {

  function getData(){
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/OrdenExamen/"
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

      const dataExamsOrder =[]
      
      for (let index = 0; index < response.length; index++) {
        dataExamsOrder[index] = {
          id : response[index].id, 
          usuario : response[index].usuarioId, 
          clinica : response[index].clinicaId,
          paciente : response[index].pacienteId,
          examenes : response[index].examenes,
        }
      }
      console.log(dataExamsOrder)
      setData(dataExamsOrder)
    });
  }

  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [examsOrderSeleccionado, setExamsOrderSeleccionado] = useState({
    id: '',
    usuario: '',
    clinica: '',
    paciente: '',
    examenes: '',
  });

    useEffect(()=>{
    getData()
  }, []);
  
  const seleccionarExamsOrder=(elemento, caso)=>{
setExamsOrderSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setExamsOrderSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const eliminar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/OrdenExamen/"+examsOrderSeleccionado.id
    const params = {
      method: 'DELETE',
      headers:{
        'accept': '*/*',
        'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN
      } 
    }
    fetch(url, params).then(res => {
      if(!res.ok){
        const error = (data && data.message) || res.status;
        return Promise.reject(error)
      }
      alert("Orden de Exámen eliminado con exito")
      getData()
      setModalEliminar(false)
    })
    .catch(error =>{ 
      alert("La Orden de Exámen no es candidato a eliminacion")
      setModalEliminar(false)
    });
  }

  const abrirModalInsertar=()=>{
    setExamsOrderSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/OrdenExamen"
    const params = {
      method: 'POST',
      headers:{
        'accept': '*/*',
        'content-type':'application/json',
        'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN
      }, 
      body:JSON.stringify({
        id : examsOrderSeleccionado.id,
        usuarioId : examsOrderSeleccionado.usuario,
        clinicaId :parseInt(examsOrderSeleccionado.clinica),
        pacienteId : parseInt(examsOrderSeleccionado.paciente),
        examenes : [{ id: parseInt(examsOrderSeleccionado.examenes)}],
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
    <div class="table-responsive" className='User'>
      <h2>Listado de Ordenes de Exámenes Disponibles</h2>
      <br />
      {"   "}<button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    {"   "}
    <a class="btn btn-secondary" href="/exams" role="button">Exámenes</a>
    {"   "}
    <a class="btn btn-secondary" href="/muestra" role="button">Muestras</a>
    <br /><br />
    <table className="table table-hover table-bordered">
        <thead class="table table-dark">
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Clinica</th>
            <th>Paciente</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.usuario}</td>
              <td>{elemento.clinica}</td>
              <td>{elemento.paciente}</td>
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
            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="usuario"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.usuario: ''}
              onChange={handleChange}
            />
            <br />

            <label>Clinica</label>
            <input
              className="form-control"
              type="text"
              name="clinica"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.clinica: ''}
              onChange={handleChange}
            />
            <br />

            <label>Paciente</label>
            <input
              className="form-control"
              type="text"
              name="paciente"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.paciente: ''}
              onChange={handleChange}
            />
            <br />

            <label>Exámenes</label>
            <input
              className="form-control"
              type="text"
              name="examenes"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.usu_usuario: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>

    
        <ModalFooter>
          <button className="btn btn-primary">
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
          Estás Seguro que deseas eliminar el registro {examsOrderSeleccionado && examsOrderSeleccionado.nombre}
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
            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="usuario"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.usuario: ''}
              onChange={handleChange}
            />
            <br />

            <label>Clinica</label>
            <input
              className="form-control"
              type="text"
              name="clinica"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.clinica: ''}
              onChange={handleChange}
            />
            <br />

            <label>Paciente</label>
            <input
              className="form-control"
              type="text"
              name="paciente"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.paciente: ''}
              onChange={handleChange}
            />
            <br />

            <label>Exámenes</label>
            <input
              className="form-control"
              type="text"
              name="examenes"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.examenes: ''}
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
import React, {useState, useEffect} from 'react';
import '../../../App.css';
import './Exams.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Exams() {
  function getData(){
    let baseurl = process.env.REACT_APP_URL_BASE //url base, var de entrada en .env debe apuntar a localhosto 7008
    const url = baseurl+"/api/TipoExamen" //url de donde se consume, dependiendo de los cruds
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
      const dataExams =[]
      for (let index = 0; index < response.length; index++) {
        dataExams[index] = { //arreglo de data clinics. todos los datos que devuelve clinica
          id : response[index].id,  // react -> api
          nombre : response[index].nombreTipoExamen,
          area : response[index].areaClinicaId,
          paramametros : response[index].parametros
        }
      }
      console.log(response) //quitar
      setData(dataExams)
    });
  }
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [examSeleccionado, setExamSeleccionado] = useState({
    id: '',
    nombre: ''
  });

  useEffect(()=>{ //copy and page
    getData()
  }, []);

  const seleccionarExam=(elemento, caso)=>{
setExamSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setExamSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }


  //EDITAR
  const editar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/TipoExamen/"+examSeleccionado.id //no tocar nada, mas que url y el id
    const params = {
      method: 'PUT',
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //esto es pa editar.
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //depende de los campos.
        id : examSeleccionado.id,
        nombreTipoExamen : examSeleccionado.nombre,
        areaClinicaId : parseInt(examSeleccionado.area) ,
        paramametros : examSeleccionado.parametros
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
    setExamSeleccionado(null);
    setModalInsertar(true);
  }

  //insertar
  const insertar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/TipoExamen" //modificar url
    const params = {
      method: 'POST', //metodo post
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //json
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //api -> front
        nombreTipoExamen : examSeleccionado.nombre,
        areaClinicaId : parseInt(examSeleccionado.area) ,
        paramametros : examSeleccionado.parametros
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
    <div class="Exams">
      <h2>Listado de Exámenes Disponibles</h2>
      <br />
      {"   "}<button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    {"   "}
    <a class="btn btn-secondary" href="/area" role="button">Areas</a>
    <br /><br />
    <table className="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Área</th>
            <th>Parametros</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.area}</td>
              <td>{elemento.paramametros}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarExam(elemento, 'Editar')}>Editar</button></td>
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
              value={examSeleccionado && examSeleccionado.id}
            />
            <br />

            <label>Nombre del Examen</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={examSeleccionado && examSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Área</label>
            <input
              className="form-control"
              type="text"
              name="area"
              value={examSeleccionado && examSeleccionado.area}
              onChange={handleChange}
            />
            <br />
            

            <label>Parametros</label>
            <input
              className="form-control"
              type="text"
              name="parametros"
              value={examSeleccionado && examSeleccionado.paramametros}
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


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Ingrese Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">

            <label>Nombre del Examen</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={examSeleccionado ? examSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Área</label>
            <input
              className="form-control"
              type="text"
              name="area"
              value={examSeleccionado ? examSeleccionado.area: ''}
              onChange={handleChange}
            />
            <br />

            <label>Parametros</label>
            <input
              className="form-control"
              type="text"
              name="parametros"
              value={examSeleccionado && examSeleccionado.paramametros}
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

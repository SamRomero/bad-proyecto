import React, {useState, useEffect} from 'react'; //useEffect paa la tablas
import '../../../App.css';
import './Patients.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Patients() {
  function getData(){
    let baseurl = process.env.REACT_APP_URL_BASE //url base, var de entrada en .env debe apuntar a localhosto 7008
    const url = baseurl+"/api/Pacientes" //url de donde se consume, dependiendo de los cruds
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
      const dataPacientes =[]
      for (let index = 0; index < response.length; index++) {
        dataPacientes[index] = { //arreglo de data clinics. todos los datos que devuelve clinica
          id : response[index].id,  // react -> api
          nombre : response[index].pacienteNombre, 
          apellido : response[index].pacienteApellido, 
          dui : response[index].paciente_DUI, 
          direccion : response[index].pacienteDireccion,
          correo : response[index].pacienteCorreo, 
          telefono : response[index].pacienteTelefono, 
          pacienteSexo : response[index].pacienteSexo,  
          fechaNaci : response[index].fechaDeNacimiento, 
          altura : response[index].pacienteAltura, 
          peso : response[index].pacientePeso,  
          tEmergencia : response[index].contactoEmergencia, 
          municipio : response[index].municipioId,  
        }
      }
      console.log(dataPacientes) //quitar
      setData(dataPacientes)
    });
  }
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState({
    id: '',
    nombre : '',
    apellido : '',
    dui : '',
    direccion : '',
    correo : '',
    telefono : '',
    pacienteSexo : '',
    fechaNaci : '',
    altura : '',
    peso : '', 
    tEmergencia : '',
    municipio : '',
  });

  useEffect(()=>{ //copy and page
    getData()
  }, []);

  const seleccionarPaciente=(elemento, caso)=>{
setPacienteSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setPacienteSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  //
  const eliminar=()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Pacientes/"+pacienteSeleccionado.id //cambiar url, concatenar id
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
      alert("Paciente eliminado con exito")
      getData()
      setModalEliminar(false)
    })
    .catch(error =>{ 
      alert("El Paciente no es candidato a eliminacion")
      setModalEliminar(false)
    });
  }

  //EDITAR
  const editar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Pacientes/"+pacienteSeleccionado.id //no tocar nada, mas que url y el id
    const params = {
      method: 'PUT',
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //esto es pa editar.
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //depende de los campos.
        id : pacienteSeleccionado.id,
        pacienteNombre : pacienteSeleccionado.nombre, //api -> front
        pacienteApellido : pacienteSeleccionado.apellido,
        paciente_DUI :pacienteSeleccionado.dui,
        pacienteDireccion :pacienteSeleccionado.direccion,
        pacienteCorreo :pacienteSeleccionado.correo,
        pacienteTelefono :pacienteSeleccionado.telefono,
        pacienteSexo :pacienteSeleccionado.pacienteSexo,
        fechaDeNacimiento :pacienteSeleccionado.fechaNaci,
        pacienteAltura :pacienteSeleccionado.altura,
        pacientePeso :pacienteSeleccionado.peso,
        contactoEmergencia :pacienteSeleccionado.tEmergencia,
        municipioId : parseInt(pacienteSeleccionado.municipio) //todos los id hay que parsearlos a enteros.
        
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
    setPacienteSeleccionado(null);
    setModalInsertar(true);
  }

  //insertar
  const insertar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Pacientes" //modificar url
    const params = {
      method: 'POST', //metodo post
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //json
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //api -> front
        pacienteNombre : pacienteSeleccionado.nombre, //api -> front
        pacienteApellido : pacienteSeleccionado.apellido,
        paciente_DUI :pacienteSeleccionado.dui,
        pacienteDireccion :pacienteSeleccionado.direccion,
        pacienteCorreo :pacienteSeleccionado.correo,
        pacienteTelefono :pacienteSeleccionado.telefono,
        pacienteSexo :pacienteSeleccionado.pacienteSexo,
        fechaDeNacimiento :pacienteSeleccionado.fechaNaci,
        pacienteAltura :pacienteSeleccionado.altura,
        pacientePeso :pacienteSeleccionado.peso,
        contactoEmergencia :pacienteSeleccionado.tEmergencia,
        municipioId : parseInt(pacienteSeleccionado.municipio) //enteros parsearlos
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
    <div class="Patients">
      <h2>Listado de Pacientes</h2>
      <br />

    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />

      <table className="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Telefono</th>
            <th scope="col">DUI</th>
            <th scope="col">Direccion</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td >{elemento.nombre}</td>
              <td >{elemento.apellido}</td>
              <td >{elemento.telefono}</td>
              <td >{elemento.dui}</td>
              <td >{elemento.direccion}</td>
              <td ><button className="btn btn-primary" onClick={()=>seleccionarPaciente(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarPaciente(elemento, 'Eliminar')}>Eliminar</button></td>
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
              value={pacienteSeleccionado && pacienteSeleccionado.id}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={pacienteSeleccionado && pacienteSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={pacienteSeleccionado && pacienteSeleccionado.apellido}
              onChange={handleChange}
            />
            <br />

            <label>DUI</label>
            <input
              className="form-control"
              type="text"
              name="dui"
              value={pacienteSeleccionado && pacienteSeleccionado.dui}
              onChange={handleChange}
            />
            <br />

            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={pacienteSeleccionado && pacienteSeleccionado.direccion}
              onChange={handleChange}
            />
            <br />

            <label>Correo Electronico</label>
            <input
              className="form-control"
              type="text"
              name="correo"
              value={pacienteSeleccionado && pacienteSeleccionado.correo}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={pacienteSeleccionado && pacienteSeleccionado.telefono}
              onChange={handleChange}
            />
            <br />

            <label>Sexo</label>
            <input
              className="form-control"
              type="text"
              name="pacienteSexo"
              value={pacienteSeleccionado && pacienteSeleccionado.pacienteSexo}
              onChange={handleChange}
            />
            <br />

            <label>Fecha de nacimiento</label>
            <input
              className="form-control"
              type="text"
              name="fechaNaci"
              value={pacienteSeleccionado && pacienteSeleccionado.fechaNaci}
              onChange={handleChange}
            />
            <br />

            <label>Altura</label>
            <input
              className="form-control"
              type="text"
              name="altura"
              value={pacienteSeleccionado && pacienteSeleccionado.altura}
              onChange={handleChange}
            />
            <br />

            <label>Peso</label>
            <input
              className="form-control"
              type="text"
              name="peso"
              value={pacienteSeleccionado && pacienteSeleccionado.peso}
              onChange={handleChange}
            />
            <br />

            <label>Contacto de Emergencia</label>
            <input
              className="form-control"
              type="text"
              name="tEmergencia"
              value={pacienteSeleccionado && pacienteSeleccionado.tEmergencia}
              onChange={handleChange}
            />
            <br />

            <label>Municipio</label>
            <input
              className="form-control"
              type="text"
              name="municipio"
              value={pacienteSeleccionado && pacienteSeleccionado.municipio}
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
          Estás Seguro que deseas eliminar el registro {pacienteSeleccionado && pacienteSeleccionado.nombre}
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

          <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={pacienteSeleccionado && pacienteSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={pacienteSeleccionado && pacienteSeleccionado.apellido}
              onChange={handleChange}
            />
            <br />

            <label>DUI</label>
            <input
              className="form-control"
              type="text"
              name="dui"
              value={pacienteSeleccionado && pacienteSeleccionado.dui}
              onChange={handleChange}
            />
            <br />

            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={pacienteSeleccionado && pacienteSeleccionado.direccion}
              onChange={handleChange}
            />
            <br />

            <label>Correo Electronico</label>
            <input
              className="form-control"
              type="text"
              name="correo"
              value={pacienteSeleccionado && pacienteSeleccionado.correo}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={pacienteSeleccionado && pacienteSeleccionado.telefono}
              onChange={handleChange}
            />
            <br />

            <label>Sexo</label>
            <input
              className="form-control"
              type="text"
              name="pacienteSexo"
              value={pacienteSeleccionado && pacienteSeleccionado.pacienteSexo}
              onChange={handleChange}
            />
            <br />

            <label>Fecha de nacimiento</label>
            <input
              className="form-control"
              type="text"
              name="fechaNaci"
              value={pacienteSeleccionado && pacienteSeleccionado.fechaNaci}
              onChange={handleChange}
            />
            <br />

            <label>Altura</label>
            <input
              className="form-control"
              type="text"
              name="altura"
              value={pacienteSeleccionado && pacienteSeleccionado.altura}
              onChange={handleChange}
            />
            <br />

            <label>Peso</label>
            <input
              className="form-control"
              type="text"
              name="peso"
              value={pacienteSeleccionado && pacienteSeleccionado.peso}
              onChange={handleChange}
            />
            <br />

            <label>Contacto de Emergencia</label>
            <input
              className="form-control"
              type="text"
              name="tEmergencia"
              value={pacienteSeleccionado && pacienteSeleccionado.tEmergencia}
              onChange={handleChange}
            />
            <br />

            <label>Municipio</label>
            <input
              className="form-control"
              type="text"
              name="municipio"
              value={pacienteSeleccionado && pacienteSeleccionado.municipio}
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

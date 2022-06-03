import React, {useState} from 'react';
import '../../../App.css';
import './Patients.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Patients() {
  const dataPatients = [
    { id: 1,  },
    { id: 2,  },
    { id: 3, },
  ];

  const [data, setData] = useState(dataPatients);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [patientSeleccionado, setPatientSeleccionado] = useState({
    id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    dui: '',
    direccion: ''
  });

  const seleccionarPatient=(elemento, caso)=>{
setPatientSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setPatientSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(patient=>{
      if(patient.id===patientSeleccionado.id){
        patient.nombre=patientSeleccionado.nombre;
        patient.apellido=patientSeleccionado.apellido;
        patient.telefono=patientSeleccionado.telefono;
        patient.dui=patientSeleccionado.dui;
        patient.direccion=patientSeleccionado.direccion;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(patient=>patient.id!==patientSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setPatientSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=patientSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
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
              <td ><button className="btn btn-primary" onClick={()=>seleccionarPatient(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarPatient(elemento, 'Eliminar')}>Eliminar</button></td>
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
              value={patientSeleccionado && patientSeleccionado.id}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={patientSeleccionado && patientSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={patientSeleccionado && patientSeleccionado.apellido}
              onChange={handleChange}
            />
            <br />

            <label>DUI</label>
            <input
              className="form-control"
              type="text"
              name="dui"
              value={patientSeleccionado && patientSeleccionado.dui}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={patientSeleccionado && patientSeleccionado.telefono}
              onChange={handleChange}
            />
            <br />

            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={patientSeleccionado && patientSeleccionado.direccion}
              onChange={handleChange}
            />
            <br />

            <label>Municipio</label>
            <input
              className="form-control"
              type="text"
              name="municipio"
              value={patientSeleccionado && patientSeleccionado.municipio}
              onChange={handleChange}
            />
            <br />

            <label>Departamento</label>
            <input
              className="form-control"
              type="text"
              name="departamento"
              value={patientSeleccionado && patientSeleccionado.departamento}
              onChange={handleChange}
            />
            <br />

            <label>Correo Electronico</label>
            <input
              className="form-control"
              type="text"
              name="correo"
              value={patientSeleccionado && patientSeleccionado.correo}
              onChange={handleChange}
            />
            <br />

            <label>Fecha de nacimiento</label>
            <input
              className="form-control"
              type="text"
              name="fechaNaci"
              value={patientSeleccionado && patientSeleccionado.fechaNaci}
              onChange={handleChange}
            />
            <br />

            <label>Altura</label>
            <input
              className="form-control"
              type="text"
              name="altura"
              value={patientSeleccionado && patientSeleccionado.altura}
              onChange={handleChange}
            />
            <br />

            <label>Peso</label>
            <input
              className="form-control"
              type="text"
              name="peso"
              value={patientSeleccionado && patientSeleccionado.peso}
              onChange={handleChange}
            />
            <br />

            <label>Contacto de Emergencia</label>
            <input
              className="form-control"
              type="text"
              name="tEmergencia"
              value={patientSeleccionado && patientSeleccionado.tEmergencia}
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
          Estás Seguro que deseas eliminar el registro {patientSeleccionado && patientSeleccionado.nombre}
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
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={patientSeleccionado ? patientSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={patientSeleccionado ? patientSeleccionado.apellido: ''}
              onChange={handleChange}
            />
            <br />

            <label>DUI</label>
            <input
              className="form-control"
              type="text"
              name="dui"
              value={patientSeleccionado ? patientSeleccionado.dui: ''}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={patientSeleccionado ? patientSeleccionado.telefono: ''}
              onChange={handleChange}
            />
            <br />

            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={patientSeleccionado ? patientSeleccionado.direccion: ''}
              onChange={handleChange}
            />
            <br />

            <label>Municipio</label>
            <input
              className="form-control"
              type="text"
              name="municipio"
              value={patientSeleccionado ? patientSeleccionado.municipio: ''}
              onChange={handleChange}
            />
            <br />

            <label>Departamento</label>
            <input
              className="form-control"
              type="text"
              name="departamento"
              value={patientSeleccionado ? patientSeleccionado.departamento: ''}
              onChange={handleChange}
            />
            <br />

            <label>Correo Electronico</label>
            <input
              className="form-control"
              type="text"
              name="correo"
              value={patientSeleccionado ? patientSeleccionado.correo: ''}
              onChange={handleChange}
            />
            <br />

            <label>Fecha de nacimiento</label>
            <input
              className="form-control"
              type="text"
              name="fechaNaci"
              value={patientSeleccionado ? patientSeleccionado.fechaNaci: ''}
              onChange={handleChange}
            />
            <br />

            <label>Altura</label>
            <input
              className="form-control"
              type="text"
              name="altura"
              value={patientSeleccionado ? patientSeleccionado.altura: ''}
              onChange={handleChange}
            />
            <br />

            <label>Peso</label>
            <input
              className="form-control"
              type="text"
              name="peso"
              value={patientSeleccionado ? patientSeleccionado.peso: ''}
              onChange={handleChange}
            />
            <br />

            <label>Contacto de Emergencia</label>
            <input
              className="form-control"
              type="text"
              name="tEmergencia"
              value={patientSeleccionado ? patientSeleccionado.tEmergencia: ''}
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

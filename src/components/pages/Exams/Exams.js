import React, {useState} from 'react';
import '../../../App.css';
import './Exams.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Exams() {
  const dataExams = [
    { id: 1, },
    { id: 2,  },
    { id: 3,  },
    { id: 4, },
  ];

  const [data, setData] = useState(dataExams);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [examSeleccionado, setExamSeleccionado] = useState({
    id: '',
    nombre: '',
    area: ''
  });

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

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(exam=>{
      if(exam.id===examSeleccionado.id){
        exam.area=examSeleccionado.area;
        exam.nombre=examSeleccionado.nombre;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(exam=>exam.id!==examSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setExamSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=examSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div class="Exams">
      <h2>Listado de Exámenes Disponibles</h2>
      <br />
      {"   "}<button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    {"   "}
    <a class="btn btn-secondary" href="/area" role="button">Areas</a>
    <br /><br />
    <table className="table table-hover">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Área</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.area}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarExam(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarExam(elemento, 'Eliminar')}>Eliminar</button></td>
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
          Estás Seguro que deseas eliminar el registro {examSeleccionado && examSeleccionado.nombre}
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
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

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

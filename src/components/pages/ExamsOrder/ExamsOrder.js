import React, {useState} from 'react';
import '../../../App.css';
import './ExamsOrder.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function ExamsOrder() {
  const dataExamsOrder = [
    { id: 1, },
    { id: 2,  },
    { id: 3,  },
    { id: 4, },
  ];

  const [data, setData] = useState(dataExamsOrder);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [examsOrderSeleccionado, setExamsOrderSeleccionado] = useState({
    id: '',
    usuario: '',
    clinica: '',
    paciente: '',
    usu_usuario: '',
    fecha_de_solicitud: '',
    entrega: '',
    muestra: '',
    estado: '',
  });

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

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(examsOrder=>{
      if(examsOrder.id===examsOrderSeleccionado.id){
        examsOrder.usuario=examsOrderSeleccionado.usuario;
        examsOrder.clinica=examsOrderSeleccionado.clinica;
        examsOrder.paciente=examsOrderSeleccionado.paciente;
        examsOrder.usu_usuario=examsOrderSeleccionado.usuario;
        examsOrder.fecha_de_solicitud=examsOrderSeleccionado.fecha_de_solicitud;
        examsOrder.entrega=examsOrderSeleccionado.entrega;
        examsOrder.muestra=examsOrderSeleccionado.muestra;
        examsOrder.estado=examsOrderSeleccionado.estado;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(examsOrder=>examsOrder.id!==examsOrderSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setExamsOrderSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=examsOrderSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
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
            <th>Usu Usuario</th>
            <th>Fecha de Solicitud</th>
            <th>Entrega</th>
            <th>Muestra</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.usuario}</td>
              <td>{elemento.clinica}</td>
              <td>{elemento.paciente}</td>
              <td>{elemento.usu_usuario}</td>
              <td>{elemento.fecha_de_solicitud}</td>
              <td>{elemento.entrega}</td>
              <td>{elemento.muestra}</td>
              <td>{elemento.estado}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarExamsOrder(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarExamsOrder(elemento, 'Eliminar')}>Eliminar</button></td>
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
              value={examsOrderSeleccionado && examsOrderSeleccionado.id}
            />
            <br />

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

            <label>Usu Usuario</label>
            <input
              className="form-control"
              type="text"
              name="usu_usuario"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.usu_usuario: ''}
              onChange={handleChange}
            />
            <br />

            <label>Fecha de Solicitud</label>
            <input
              className="form-control"
              type="text"
              name="fecha_de_solicitud"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.fecha_de_solicitud: ''}
              onChange={handleChange}
            />
            <br />

            <label>Entrega</label>
            <input
              className="form-control"
              type="text"
              name="entrega"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.entrega: ''}
              onChange={handleChange}
            />
            <br />

            <label>Muestra</label>
            <input
              className="form-control"
              type="text"
              name="muestra"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.muestra: ''}
              onChange={handleChange}
            />
            <br />

            <label>Estado</label>
            <input
              className="form-control"
              type="text"
              name="estado"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.estado: ''}
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
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

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

            <label>Usu Usuario</label>
            <input
              className="form-control"
              type="text"
              name="usu_usuario"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.usu_usuario: ''}
              onChange={handleChange}
            />
            <br />

            <label>Fecha de Solicitud</label>
            <input
              className="form-control"
              type="text"
              name="fecha_de_solicitud"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.fecha_de_solicitud: ''}
              onChange={handleChange}
            />
            <br />

            <label>Entrega</label>
            <input
              className="form-control"
              type="text"
              name="entrega"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.entrega: ''}
              onChange={handleChange}
            />
            <br />

            <label>Muestra</label>
            <input
              className="form-control"
              type="text"
              name="muestra"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.muestra: ''}
              onChange={handleChange}
            />
            <br />

            <label>Estado</label>
            <input
              className="form-control"
              type="text"
              name="estado"
              value={examsOrderSeleccionado ? examsOrderSeleccionado.estado: ''}
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
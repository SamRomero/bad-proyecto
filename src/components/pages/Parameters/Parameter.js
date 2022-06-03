import React, {useState} from 'react';
import '../../../App.css';
import '../Usuarios/Users.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Parameter() {
    const dataParameters = [
    { id: 1,},
    { id: 2,},
    { id: 3,},
    { id: 4,},
    { id: 5,}
  ];

  const [data, setData] = useState(dataParameters);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [parameterSeleccionado, setParameterSeleccionado] = useState({
    id: '',
    nombre: '',
    valor_inicial: '',
    valor_final: '',
  });

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
    var dataNueva=data;
    dataNueva.map(parameter=>{
      if(parameter.id===parameterSeleccionado.id){
        parameter.nombre=parameterSeleccionado.nombre;
        parameter.valor_inicial=parameterSeleccionado.valor_inicial;
        parameter.valor_final=parameterSeleccionado.valor_final;
;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(parameter=>parameter.id!==parameterSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setParameterSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=parameterSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
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
            <th>Valor Inicial</th>
            <th>Valor Final</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.valor_inicial}</td>
              <td>{elemento.valor_final}</td>
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
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={parameterSeleccionado && parameterSeleccionado.id}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={parameterSeleccionado ? parameterSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Valor Inicial</label>
            <input
              className="form-control"
              type="text"
              name="valor_inicial"
              value={parameterSeleccionado ? parameterSeleccionado.valor_inicial: ''}
              onChange={handleChange}
            />
            <br />

            <label>Valor Final</label>
            <input
              className="form-control"
              type="text"
              name="valor_final"
              value={parameterSeleccionado ? parameterSeleccionado.valor_final: ''}
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
              value={parameterSeleccionado ? parameterSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Valor Inicial</label>
            <input
              className="form-control"
              type="text"
              name="valor_inicial"
              value={parameterSeleccionado ? parameterSeleccionado.valor_inicial: ''}
              onChange={handleChange}
            />
            <br />

            <label>Valor Final</label>
            <input
              className="form-control"
              type="text"
              name="valor_final"
              value={parameterSeleccionado ? parameterSeleccionado.valor_final: ''}
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

import React, {useState} from 'react';
import '../../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';


export default function Resultados() {
    const dataResultados = [
        { id: 1, },
        { id: 2,  },
        { id: 3,  },
        { id: 4, },
      ];
    
      const [data, setData] = useState(dataResultados);
      const [modalEditar, setModalEditar] = useState(false);
      const [modalEliminar, setModalEliminar] = useState(false);
      const [modalInsertar, setModalInsertar] = useState(false);
    
      const [resultadoSeleccionado, setresultadoSeleccionado] = useState({
        id: '',
        nombre: '',
        area: ''
      });
    
      const seleccionarResultado=(elemento, caso)=>{
    setresultadoSeleccionado(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
      }
    
      const handleChange=e=>{
        const {name, value}=e.target;
        setresultadoSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }));
      }
    
      const editar=()=>{
        var dataNueva=data;
        dataNueva.map(resultado=>{
          if(resultado.id===resultadoSeleccionado.id){
            resultado.orden=resultadoSeleccionado.orden;
            resultado.parametro=resultadoSeleccionado.parametro;
            resultado.valor=resultadoSeleccionado.valor;
          }
        });
        setData(dataNueva);
        setModalEditar(false);
      }
    
      const eliminar =()=>{
        setData(data.filter(resultado=>resultado.id!==resultadoSeleccionado.id));
        setModalEliminar(false);
      }
    
      const abrirModalInsertar=()=>{
        setresultadoSeleccionado(null);
        setModalInsertar(true);
      }
    
      const insertar =()=>{
        var valorInsertar=resultadoSeleccionado;
        valorInsertar.id=data[data.length-1].id+1;
        var dataNueva = data;
        dataNueva.push(valorInsertar);
        setData(dataNueva);
        setModalInsertar(false);
      }
    
      return (
        <div class="table-responsive">
          <h2>Resultados de Examenes</h2>
          <br />
        <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
        <br /><br />
        <table className="table table-hover">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Orden</th>
                <th>Parametro</th>
                <th>Orden</th>
                <th>Valor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(elemento=>(
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.parametro}</td>
                  <td>{elemento.orden}</td>
                  <td>{elemento.valor}</td>
                  <td><button className="btn btn-primary" onClick={()=>seleccionarResultado(elemento, 'Editar')}>Editar</button> {"   "} 
                  <button className="btn btn-danger" onClick={()=>seleccionarResultado(elemento, 'Eliminar')}>Eliminar</button></td>
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
                  value={resultadoSeleccionado && resultadoSeleccionado.id}
                />
                <br />
    
                <label>Orden</label>
                <input
                  className="form-control"
                  type="text"
                  name="orden"
                  value={resultadoSeleccionado && resultadoSeleccionado.nombre}
                  onChange={handleChange}
                />
                <br />
    
                <label>Parametro</label>
                <input
                  className="form-control"
                  type="text"
                  name="parametro"
                  value={resultadoSeleccionado && resultadoSeleccionado.area}
                  onChange={handleChange}
                />
                <br />
    
                <label>Valor</label>
                <input
                  className="form-control"
                  type="text"
                  name="valor"
                  value={resultadoSeleccionado && resultadoSeleccionado.area}
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
              Estás Seguro que deseas eliminar el registro {resultadoSeleccionado && resultadoSeleccionado.nombre}
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
    
                <label>Orden</label>
                <input
                  className="form-control"
                  type="text"
                  name="orden"
                  value={resultadoSeleccionado ? resultadoSeleccionado.nombre: ''}
                  onChange={handleChange}
                />
                <br />
    
                <label>Parametro</label>
                <input
                  className="form-control"
                  type="text"
                  name="parametro"
                  value={resultadoSeleccionado ? resultadoSeleccionado.area: ''}
                  onChange={handleChange}
                />
                <br />
    
                <label>Valor</label>
                <input
                className="form-control"
                type="text"
                name="valor"
                value={resultadoSeleccionado ? resultadoSeleccionado.area: ''}
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
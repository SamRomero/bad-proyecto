import React, {useState} from 'react';
import '../../../App.css';
import './Area.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';


export default function Area() {
    const dataAreas = [
        { id: 1, },
        { id: 2,  },
        { id: 3,  },
        { id: 4, },
      ];
    
      const [data, setData] = useState(dataAreas);
      const [modalEditar, setModalEditar] = useState(false);
      const [modalEliminar, setModalEliminar] = useState(false);
      const [modalInsertar, setModalInsertar] = useState(false);
    
      const [areaSeleccionado, setAreaeleccionado] = useState({
        id: '',
        nombre: ''
      });
    
      const seleccionarArea=(elemento, caso)=>{
    setAreaeleccionado(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
      }
    
      const handleChange=e=>{
        const {name, value}=e.target;
        setAreaeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }));
      }
    
      const editar=()=>{
        var dataNueva=data;
        dataNueva.map(area=>{
          if(area.id===areaSeleccionado.id){
            area.nombre=areaSeleccionado.nombre;
          }
        });
        setData(dataNueva);
        setModalEditar(false);
      }
    
      const eliminar =()=>{
        setData(data.filter(area=>area.id!==areaSeleccionado.id));
        setModalEliminar(false);
      }
    
      const abrirModalInsertar=()=>{
        setAreaeleccionado(null);
        setModalInsertar(true);
      }
    
      const insertar =()=>{
        var valorInsertar=areaSeleccionado;
        valorInsertar.id=data[data.length-1].id+1;
        var dataNueva = data;
        dataNueva.push(valorInsertar);
        setData(dataNueva);
        setModalInsertar(false);
      }
    
      return (
        <div class="Area">
          <h2>Listado de Áreas</h2>
          <br />
        <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
        <br /><br />
        <table className="table table-hover">
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
                  value={areaSeleccionado && areaSeleccionado.id}
                />
                <br />
    
                <label>Área</label>
                <input
                  className="form-control"
                  type="text"
                  name="area"
                  value={areaSeleccionado && areaSeleccionado.area}
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
              Estás Seguro que deseas eliminar el registro {areaSeleccionado && areaSeleccionado.nombre}
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
    
                <label>Área</label>
                <input
                  className="form-control"
                  type="text"
                  name="area"
                  value={areaSeleccionado ? areaSeleccionado.area: ''}
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
import React, {useState, useEffect} from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
import Select from 'react-select';
import API from '../api/api';

export const CreateHabitacion = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacion, setHabitacion] = useState(0);
  const [acomodaciones, setAcomodaciones] = useState([]);
  const [acomodacion, setAcomodacion] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [errores, setErrores] = useState([]);

  const {hotel_id} = useParams();

  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    const resp = await API.post(`habitaciones/save/${hotel_id}`, {
      hotel_id: hotel_id, 
      tipo_habitacion_id: habitacion, 
      tipo_acomodacion_id:acomodacion, 
      cantidad: cantidad, 
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data.errors);
        setErrores(error.response.data.errors);
      }
    });
    console.log(resp);
    if(typeof resp !== 'undefined' && resp.data.status == 200){
      navigate(`/habitacion/${hotel_id}`);
    }
  }

  useEffect(() => {
    const getTipos = async () => {
      const response = await API.get('/selects/selectTipoHabitaciones');
      setHabitaciones(response.data);
    }
    getTipos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAcomodaciones = async (id) => {
    setHabitacion(id);
    const response = await API.get(`/selects/selectAcomodaciones/${id}`);    
    setAcomodaciones(response.data);
  }
  return (
    <div className='container'>
      <div className="row" style={{"margin-top":15}}>
      <div className="col-md-12 mb-4">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Crear Habitación</h5>
          </div>

          <div className="card-body">
            <form onSubmit={store}>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label">*Tipo Habitacion:</label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Seleccione un tipo de habitación"
                      isClearable={false}
                      isSearchable={true}
                      onChange={(e) => { getAcomodaciones(e.value)}}
                      options={habitaciones}
                    />
                    <span className='text-danger'>{errores.tipo_acomodacion_id}</span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label">*Acomodacion:</label>
                    <Select 
                      className="basic-single"
                      classNamePrefix="select"
                      options={acomodaciones}
                      placeholder="Seleccione un tipo de acomodacion"
                      isClearable={false}
                      isSearchable={true}
                      onChange={(e) => { setAcomodacion(e.value)}}
                    />
                    <span className='text-danger'>{errores.tipo_habitacion_id}</span>
                  </div>
                </div>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">* Cantidad:</label>
                <input 
                  onChange={(e) => setCantidad(e.target.value) }
                  type='number' 
                  className='form-control'
                  placeholder='Ingrese la cantidad'
                />
                <span className='text-danger'>{errores.cantidad}</span>
              </div>

              <div className="form-check d-flex justify-content-center mb-2">
                <button type='submit' className='btn btn-primary btn-lg btn-block' style={{ marginRight: 10 }}>Guardar</button>
                <Link to={`/habitacion/${hotel_id}`} className="btn btn-secondary btn-lg btn-block">Cancelar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import API from '../api/api';

export const ShowHabitaciones = () => {
    const [hotel, setHotel] = useState('');
    const [habitaciones, setHabitaciones] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const getHotelById = async () => {
            const response = await API.get(`/hoteles/show/${id}`);
            setHotel(response.data.nombre)
        }
        getHotelById();
        getAllHabitaciones();
    }, []);

    const getAllHabitaciones = async() => {
        const response = await API.get(`/habitaciones/${id}`);
        setHabitaciones(response.data);
    };

    const deleteHotel = async (id) => {
        const resp = Swal.fire({
            title: 'Advertencia',
            text: '¿Esta seguro que desea eliminar la habitacion?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar",
            confirmButtonColor: "red",
            cancelButtonColor: "#000",
        });
        if( (await resp).isConfirmed){
            await API.delete(`/habitaciones/delete/${id}`);
            getAllHabitaciones(); 
        }  
    };

    return (
        <div>
            <div className='container'>
                <h3>Habitaciones para el hotel {hotel}</h3>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">
                            <Link to={`/habitacion/create/${id}`} className="btn btn-success btn-lg mt-2 mb-2 text-white">Crear Habitacion</Link>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead className='table-dark'>
                                        <tr>
                                            <th><span>Cantidad</span></th>
                                            <th><span>Tipo Habitacion</span></th>
                                            <th><span>Tipo Acomodacion</span></th>
                                            <th><span>Acciones</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { habitaciones.map( (habitacion) => (
                                            <tr key={habitacion.id}>
                                                <td>{habitacion.cantidad}</td>
                                                <td>{habitacion.nombre_habitacion}</td>
                                                <td>{habitacion.nombre_acomodacion}</td>
                                                <td>
                                                    <Link to={`/habitacion/edit/${habitacion.id}`} className='btn btn-warning'>Editar</Link>
                                                    <button onClick={ () => deleteHotel(habitacion.id)} className="btn btn-danger">Eliminar</button>
                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                
                <table className='table table-striped'>
                    <thead className='bg-primary text-white'>
                        
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

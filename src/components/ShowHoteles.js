import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import API from '../api/api';

export const ShowHoteles = () => {

    const [hoteles, setHoteles] = useState([]);
    
    useEffect(() => {
        getAllHoteles();
    }, []);

    const getAllHoteles = async() => {
        const response = await API.get(`/hoteles`);
        setHoteles(response.data);
    };

    const deleteHotel = async (id) => {
        const resp = Swal.fire({
            title: 'Advertencia',
            text: '¿Esta seguro que desea eliminar el hotel?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar",
            confirmButtonColor: "red",
            cancelButtonColor: "#000",
        });
        if( (await resp).isConfirmed){
            await API.delete(`/hoteles/delete/${id}`);
            getAllHoteles(); 
        }  
    };

    return (
        <div>
            <div className='container'>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">
                            <Link to="/create" className="btn btn-success btn-lg mt-2 mb-2 text-white">Crear</Link>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead className='table-dark'>
                                    <tr>
                                        <th><span>NIT</span></th>
                                        <th><span>Nombre</span></th>
                                        <th><span>Ciudad</span></th>
                                        <th><span>Habitaciones</span></th>
                                        <th><span>Acciones</span></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        { hoteles.map( (hotel) => (
                                            <tr key={hotel.id}>
                                                <td>{hotel.nit}</td>
                                                <td>{hotel.nombre}</td>
                                                <td>{hotel.nombre_ciudad}</td>
                                                <td>{hotel.num_habitaciones}</td>
                                                <td>
                                                    <div className="d-grid gap-2 d-md-block">
                                                        <Link to={`/view/${hotel.id}`} className='btn btn-success text-white'><i className="bi bi-zoom-in"></i> Ver</Link>
                                                        <Link to={`/edit/${hotel.id}`} className='btn btn-warning text-white'><i className="bi-alarm"></i> Editar</Link>
                                                        <Link to={`/habitacion/${hotel.id}`} className='btn btn-info text-white'><i className="bi-alarm"></i> Habitaciones</Link>
                                                        <button onClick={ () => deleteHotel(hotel.id)} className="btn btn-danger"><i className="bi-alarm"></i> Eliminar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

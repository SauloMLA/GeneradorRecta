import React, {Fragment, useState} from 'react'
import { v4 as uuidv4, v4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita, eliminarCita}) => {
    //Crear State de Citas
    const [resultado, actualizarResultado] = useState({
        puntoX1: '',
        puntoY1: '',
        puntoX2: '',
        puntoY2: ''

    });
    const [error, actualizarError] = useState(false)
    //Funcion que se ejecuta cada vez que el usuario escribe
    const actualizarState = e => {
        actualizarResultado({
            ...resultado,
            [e.target.name] : e.target.value
        })
    }
    //Extraer los valores

    const { puntoX1, puntoX2, puntoY1, puntoY2} = resultado;

    //Cuando se envia el form
    const submitCita = e =>{
        e.preventDefault();

        //Validar
        if (puntoX1.trim() === '' || puntoY1.trim() === '' || puntoX2.trim() === '' || puntoY2.trim() === ''  ) {
            console.log('Hay un error')
            actualizarError(true);
            return;
        }
    
        //Eliminar el mensaje previo
        actualizarError(false);
        
        //Asignar un ID
        resultado.id = v4();

        //Crear la Cita
        
        crearCita(resultado);

        //Reiniciar el form
        actualizarResultado({
            puntoX1: '',
            puntoY1: '',
            puntoX2: '',
            puntoY2: ''
        })
    }
    return (  
        <Fragment>
            <h2>Datos</h2>
            {error ? <p className="alerta-error">Todos los cambios son Obligatorios</p> : null}
            <form onSubmit={submitCita}>
                <label htmlFor="" className="s1rem">Calcular</label>
                <label>Ecuacion (Y = mx + b)</label>
                <div className="row">
                    <input 
                    type="text"
                    name="puntoX1"
                    className="one-half column"
                    placeholder="m="
                    onChange={actualizarState}
                    value={puntoX1}
                    />
                    <input 
                    type="text"
                    name="puntoY1"
                    className="one-half column"
                    placeholder="b="
                    onChange={actualizarState}
                    value={puntoY1}
                    />
                </div> 
                <label htmlFor="" className="s1rem">Punto por el que pasa
                </label>
                <label>Punto 1</label>
                <div className="row">
                    <input 
                    type="text"
                    name="puntoX2"
                    class="one-half column"
                    placeholder="X="
                    onChange={actualizarState}
                    value={puntoX2}
                    />
                    <input 
                    type="text"
                    name="puntoY2"
                    class="one-half column"
                    placeholder="Y="
                    onChange={actualizarState}
                    value={puntoY2}
                    />
                 </div>
                <button type="submit" className="u-full-width button-primary">Calcular</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
export default Formulario;
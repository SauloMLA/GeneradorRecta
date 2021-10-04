import React from 'react'
import PropTypes from 'prop-types';

const Resultado = ({resultado}) => {
    const {puntoX1, puntoX2, puntoY1, puntoY2} = resultado

    function mirarSiesFraccion(value){
        if (value.includes('/')) {
            var str = value;
            var operandos = str.split('/'); // esto te devuelve un array ['3', '4']
            return parseInt(operandos[0]) / parseInt(operandos[1]);
        }
        else{
            return value;
        }
    }
    

    let rpuntoX1 = mirarSiesFraccion(puntoX1);
    let rpuntoX2 = mirarSiesFraccion(puntoX2);
    let rpuntoY2 = mirarSiesFraccion(puntoY2);

    
    let formatrpuntoY2 =`${rpuntoY2*rpuntoX1}/${rpuntoX1}`;
    let multiply = rpuntoX1*rpuntoX2;
    let resta = rpuntoY2-multiply;

    function formateaAbsoluto(value){
        if (value > 0) {
            return `+${value}`;
        }else{
            return value;
        }
    }
    let restaMostrar = formateaAbsoluto(resta);

    let pendiente = (rpuntoX1/(rpuntoX1*rpuntoX1))*-1;
    let paso2 = pendiente*rpuntoX2;
    let paso3 = rpuntoY2-paso2;

    function decimalToFraction(value, donly = true) {
        var tolerance = 1.0E-6; // a partir de cuantas decimales se hace el redondeo
        var h1 = 1;
        var h2 = 0;
        var k1 = 0;
        var k2 = 1;
        var negative = false;
        var i;
      
        if (parseInt(value) == value) { // si el valor es un número entero, detener el código
          return value;
        } else if (value < 0) {
          negative = true;
          value = -value;
        }
      
        if (donly) {
          i = parseInt(value);
          value -= i;
        }
      
        var b = value;
      
        do {
          var a = Math.floor(b);
          var aux = h1;
          h1 = a * h1 + h2;
          h2 = aux;
          aux = k1;
          k1 = a * k1 + k2;
          k2 = aux;
          b = 1 / (b - a);
        } while (Math.abs(value - h1 / k1) > value * tolerance);
        let frac = i*k1+h1;
        if (i === 0) {
            
            
        }
        return (negative ? "-" : '')  + (h1 === 0 ? '' : frac + "/" + k1);
      }
      if (Number.isInteger(paso2)) {
          formatrpuntoY2 = `${Math.ceil(rpuntoY2*rpuntoX1/rpuntoX1)}`
      }
      let paso2Format = decimalToFraction(paso2);
      let pendienteFraccion = decimalToFraction(pendiente);
      let b = decimalToFraction(paso3);
      let bFormat = startWith(b);

     function startWith(value){
       let tipo = typeof value;
        if (tipo === "string") {
            if (value.startsWith('-')) {
                return value
            }else{
                return `+${value}`
           }
        }else{
            return formateaAbsoluto(value);
        }
                  
     }

    // let formatrpuntoY2 =`${(rpuntoY2*rpuntoX1/rpuntoX1)}`;
    let multiplyFormat = decimalToFraction(multiply);
    let restaFormat = decimalToFraction(resta);
    // if (Number.isInteger(multiply)) {
    //     console.log("hola")
    //     var formatrpuntoY2 =`${Math.ceil(rpuntoY2*rpuntoX1/rpuntoX1)}`;
    // }
    let restafinal = startWith(restaFormat);
    return(
    <div className="cita">
        <p>Ecuacion de recta paralela:</p>
        <ul>
            <li>y = {puntoX1}x + b</li>
            <li>{rpuntoY2} = {puntoX1}({rpuntoX2}) + b</li>
            <li>{rpuntoY2} = {multiplyFormat} + b</li>
            <li>b = {restaFormat}</li>
            <p>Resultado: </p>
            <li>y = {puntoX1}x{restafinal}</li>
        </ul>
        <p>Ecuacion de recta perpendicular:</p>
        <ul>
            <li>y = {pendienteFraccion}x + b</li>
            <li>{rpuntoY2} = {pendienteFraccion}({rpuntoX2}) + b</li>
            <li>{rpuntoY2} = {paso2Format} + b</li>
            <li>{formatrpuntoY2} = {paso2Format} + b </li>
            <li>b = {b}</li>
            <p>Resultado: </p>
            <li>y = {pendienteFraccion}x {bFormat}</li>    
        </ul>
        
        {/* <p>rpuntoX1: <span>{resultado.rpuntoX1}</span></p>
        <p>puntoY1: <span>{resultado.puntoY1}</span></p>
        <p>rpuntoX2: <span>{resultado.rpuntoX2}</span></p>
        <p>puntoY1: <span>{resultado.rpuntoY2}</span></p>
        */}


        
        {/* <button className="button eliminar u-full-width" onClick={ () => eliminarCita(cita.id)}>
            Eliminar &times;
        </button> */}
    </div>
    )
}

Resultado.propTypes = {
    resultado: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
}
export default Resultado;
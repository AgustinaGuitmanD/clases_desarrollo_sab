function aumentarPrecioDiario(alojamientos, aumento) {
    alojamientos.forEach((a) => {
        a.precioPorNoche = a.precioPorNoche + aumento;
    })
}

function alojamientoMasCaro(alojamientos) {
    const listaDePrecios = alojamientos.map(a => {
        return a.precioPorNoche;
    })
    // este operador agarra una lista (x ej: [1,2,3]) y pasa cada elemento 
    // como un parámetro único.
    const precioMaximo = Math.max(...listaDePrecios);
    // find retorna el primer que cumpla con una condición
    const alojamiento = alojamientos.find(a => {
        return a.precioPorNoche == precioMaximo}
    );
    return alojamiento;
}

// con el == no verificamos tipos, si hay un precio escrito como string y otro como 
// num va a dar verdadero. si usamos === también verifica el tipo.

function filtrarPorPrecio(alojamientos, precioMaximo) {
    return alojamientos.filter((a) => {
        return a.precioPorNoche <= precioMaximo;
    });
}

function obtenerTotalReservas(reservas) {
    return reservas.reduce((total, reserva) => {
        return total + reserva.precioFinal();
    }, 0);
}
module.exports = {
    aumentarPrecioDiario,
    alojamientoMasCaro,
    filtrarPorPrecio,
    obtenerTotalReservas
}
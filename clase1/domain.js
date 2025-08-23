// Una forma de escribir un falso enum, los enums en js no existen
const Categoria = Object.freeze(
    {
        Hotel: "Hotel",
        Departamento: "Departamento",
        Cabana: "Cabana",
        Apart: "Apart"
    }
);

//sintaxis de clases
class Alojamiento {
    constructor(nombre, precioPorNoche, categoria, caracteristicas) {
        this.nombre = nombre
        this.precioPorNoche = precioPorNoche
        this.categoria = categoria
        this.diasReservados = [];
        this.caracteristicas = [caracteristicas]
    }

    getDescripcion() {
        return `${this.nombre} (${this.categoria}) - ${this.precioPorNoche} por noche`;
    }
    // for(const desc of this.descuentos) {
      //      totalDescontado += desc.valorDescontado(base, this.cantidadNoches());
        
    //
    reservar(diaInicio, diaFin) {

        for (let dia = diaInicio; i >= diaInicio && i <= diaFin; i++) {
            this.diasReservados.push(dia);
        }
    }
    

    existsBetween(fechaInicio, fechaFin) {
        return this.diasReservados.some(f => f >= fechaInicio && f <= fechaFin);
    }
    
    // quiero saber si existe una reserva que este en el 
     // período de tiempo que se quiere reservar. Es decir que
     // debería existir un elemento que sea >= a diaInicio
     // y <= a diaFin  
     
    consultarDisponibilidad(diaInicio, diaFin) {
         return this.existsBetween(diaInicio, diaFin);
    }

    cumpleConCaracteristicas(caracteristicasDeseadas) {
        caracteristicasDeseadas.every(caracteristica =>
            this.caracteristicas.includes(caracteristica)
        );
    }

   
}

class Reserva {
    constructor(alojamiento, diaInicio, diaFin ) {
        if (!(diaInicio instanceof Date) || !(diaFin instanceof Date)) {
            throw new Error(
                "Dia de inicio y el de fin deben ser una instancia de date"
            );
        }

        if(diaInicio >= diaFin) {
            throw new Error(
                "La fecha de inicio debe ser previa a la de fin"
            );
        }
        if(!alojamiento.consultarDisponibilidad(diaInicio, diaFin)) {
            throw new Error(
                "El alojamiento está reservado en esa fecha"
            );
        }
        this.alojamiento = alojamiento;
        this.diaInicio = diaInicio;
        this.diaFin = diaFin;
        this.descuentos = [];
        alojamiento.reservar(diaInicio, diaFin);
    }

    cantidadNoches() {
        const msPorDia = 1000 * 60 * 60 * 24
        return Math.ceil((this.diaFin - this.diaInicio) / msPorDia);
    }

    precioBase() {
        return this.cantidadNoches() * this.alojamiento.precioPorNoche
    }

    precioFinal() {
        let base = this.precioBase();
        let totalDescontado = 0;
        for(const desc of this.descuentos) {
            totalDescontado += desc.valorDescontado(base, this.cantidadNoches());
        }
        return Math.max(0, base - totalDescontado)
    }
    agregarDescuento(descuento) {
        this.descuentos.push(descuento)
    }
}


// en js no definimos de forma explícita interfaces.

class DescuentoFijo {
    constructor(valor) {
        this.valor = valor;
    }

    valorDescontado(precioBase, cantidad) {
       return this.valor;
    }
}

class DescuentoPorcentaje {
    constructor(porcentaje) {
        this.porcentaje = porcentaje;
    }
    valorDescontado(precioBase, cantidad) {
        return precioBase * (this.porcentaje / 100);
    }
}

class DescuentoPorNoches {
    constructor(cantidadMinima, porcentaje) {
        this.cantidadMinima = cantidadMinima;
        this.porcentaje = porcentaje;
    }

    valorDescontado(precioBase, cantidad) {
        const vecesRepetido = Math.floor(cantidad / this.cantidadMinima);
        let valorDescontado = 0;
        if(vecesRepetido >= 1) {
            valorDescontado = precioBase * (this.porcentaje / 100) * vecesRepetido;
        }
        return valorDescontado;
    }

}
module.exports = {
    Reserva,
    Alojamiento,
    Categoria,
    DescuentoFijo,
    DescuentoPorcentaje,
    DescuentoPorNoches,
}
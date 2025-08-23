
const { 
    Alojamiento,
    Reserva,
    Categoria,
    DescuentoFijo,
    DescuentoPorcentaje,
    DescuentoPorNoches
} = require("./domain.js")

const { aumentarPrecioDiario,
        alojamientoMasCaro,
        filtrarPorPrecio,
        obtenerTotalReservas
} = require("./funciones.js")

const alojamiento1 = new Alojamiento(
    "Hotel en Bs As", 
    100, 
    Categoria.Hotel,
    [wifi, pileta]);

//console.log(alojamiento1.getDescripcion());

const reserva1 = new Reserva(alojamiento1, 
                            new Date("2025-05-10"),
                            new Date("2025-05-20")
                        );

const reserva2 = new Reserva(alojamiento1,
    new Date("2025-05-21"),
    new Date("2025-05-30"),
    );
const reserva3 = new Reserva(alojamiento1,
    new Date("2025-05-15"),
    new Date("2025-05-18")
    );

reserva1.agregarDescuento(new DescuentoFijo(100));
reserva1.agregarDescuento(new DescuentoPorcentaje(10));
reserva1.agregarDescuento(new DescuentoPorNoches(2,5));
// 10 noches y el descuento se aplica cada 2 noches -> 5 * 5 = 25% de descuento
console.log(`El precio base es ${reserva1.precioBase()}`)
console.log(`El precio final es ${reserva1.precioFinal()}`)

const catalogo = [
    new Alojamiento("Apart1", 10, Categoria.Apart),
    new Alojamiento("Apart2", 2000, Categoria.Apart),
    new Alojamiento("Apart3", 100, Categoria.Hotel),
]
console.log("-------- Prueba función aumento --------");
console.log("Alojamientos antes del aumento");
console.log(catalogo);
aumentarPrecioDiario(catalogo, 1000);
console.log("Alojamientos despues del aumento");
console.log(catalogo);

console.log("-------- Prueba función alojamiento más caro --------");
const masCaro = alojamientoMasCaro(catalogo);
console.log("El alojamiento más caro del catálogo es: ", masCaro);

console.log("-------- Prueba función precio max --------");
console.log("Alojamientos filtrados por precio max 2000");
const filtrados = filtrarPorPrecio(catalogo, 2000);
console.log(filtrados);

console.log("-------- Prueba función total reservas --------");
const reservas = [
    new Reserva(alojamiento1, new Date("2025-05-01"), new Date("2025-05-10"))
]
const total= obtenerTotalReservas(reservas);
console.log("El total de reservas es de:", total)
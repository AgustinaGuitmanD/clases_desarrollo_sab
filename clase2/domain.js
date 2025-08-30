/* FORMA CON COMMONJS
const {
    Categoria
} = require("./categotia.js")*/

/* EL IMPORT Y EL REQUIERE NO PUEDEN
    CONVIVIR/
import {
    Categoria
} from"./categotia.js"

import figlet  from "figlet";

figlet("Hello World!!", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
});


import chalk from 'chalk';

console.log(chalk.blue.bgRed.bold(Categoria.Hotel));
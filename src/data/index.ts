//importamos esto por que necesitamos la instancia de Sequelize
import db from "../config/db"

//usamos async ya que no sabemos cuanto va tardar en limpiar la db
const clearDB = async () => {
    try {
//Eliminando los datos de la base de datos: Si quieres que cada test esté aislado: 👉 más limpio, pero más lento
      await db.sync({force: true})
//Este borra datos igualmente, no recrea tablas y es mas rapido
        //await db.truncate({cascade: true})
        console.log('Datos eliminados correctamente');

    } catch (error) {
        console.log(error);
    }
}
//Esto se evaluara a la hora de ejecutar el script: "dbClear": "ts-node ./src/data --clear" y si la ruta es correcta es decir que process.argv[2] en su posicion 2 tiene '--clear'
// significa que se esta mandando a llamar "clearDB"

if (process.argv[2] === '--clear') {
    clearDB()
}

//console.log(process.argv);
//Ejemplo de (process.aargv):
/* [
  'C:\\Users\\ujdan\\Documents\\rest-api-node-ts\\node_modules\\ts-node\\dist\\bin.js',
  'C:\\Users\\ujdan\\Documents\\rest-api-node-ts\\src\\data',
  '--clear'
]*/


//Cambiamos el script a ("pretest": "ts-node ./src/data --clear") ya que "pretest" se ejecuta primero que test, haciendo asi que se limpie primero la base de datos y luego haga el test, en este caso de creacion de productos, y vaya eliminando automaticamente los productos en cada test y no se llene de info de prueba, obviamente ya no es necesario ejecutar "pretest" solo "test" ya que este lo llama

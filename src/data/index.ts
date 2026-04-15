import db from "../config/db"

const clearDB = async () => {
    try {
      await db.sync({force: true})
        console.log('Datos eliminados correctamente');

    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === '--clear') {
    clearDB()
}


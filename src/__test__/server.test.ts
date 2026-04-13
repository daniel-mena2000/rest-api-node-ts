//1. describe Agrupa tests Es solo organización
//2. it o test Es una prueba individual Describe qué debería pasar
//3. expect Es la validación
//4.toBe- valor a comparar - Entonces espera que 1 + 1 sea 2
/*describe('nuestro primer test', () => {
  it('debería pasar correctamente', () => {
    expect(1 + 1).toBe(2)
  })
})*/

//import request from 'supertest'
//Importamos todo nuestro archivo "server" para hacer el test
//import server from '../server'

//Importante deshabilitar consoles.log para evitar ciertos errores con jest
//Como no sabes cuando se conectara, usamos async
//le indicamos que va a testear un get hacia /api
/*describe('GET hacia /api', () => {
    it('debería devolver una respuesta JSON', async () => {
        const res = await request(server).get('/api')
//Le indicamos que el estatus respuesta, esperamos que sea un 200
        expect(res.status).toBe(200)
//Otra por ejemplo acceder al body y que espere en "msg" cierto contenido, ejemplo si no se cumple nos manda:  Expected: "desde ap" Received: "desde api" en este caso le falto la i, y nos indica lo que esperaba
        expect(res.body.msg).toBe('desde api')
//Tambien podemos indicar que no debemos esperar en nuestro test, no solo lo que esperamos.
        expect(res.status).not.toBe(404)
    })
})*/

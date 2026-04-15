import request from "supertest"
import server from "../../server"
import db from "../../config/db"


 beforeAll(async () => {
    await db.sync({ force: true }) // limpiar DB
  })

  afterAll(async () => {
    await db.close() // cerrar conexión
  })




describe('POST hacia /api/products', () => {
    it('debería mostrar un error de validación', async () => {
        const response = await request(server).post('/api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)

        })

//Send se usa para POST - PUT - PATCH, En GET, el servidor ignora ese body
  it('debería mostrar un error si el precio no es mayor a 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Teclado - testing',
            price: 0,
            availability: true
        })
            expect(response.status).toBe(400)
//Solo esperamos 1 mensaje de error: el del precio
            expect(response.body.errors).toHaveLength(1)
            expect(response.status).not.toBe(404)
        })

    it("Que devuelva que se creo un nuevo producto", async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Teclado - testing',
            price: 230,
            availability: true
        })
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('data')
            expect(response.status).not.toBe(404)
            expect(response.status).not.toBe(200)
            expect(response.body).not.toHaveProperty('errors')

    })
})

//---------------------------------------GET----------------------------------------

describe('GET hacia /api/products', () => {
      it('Verificar si /api/products URL exista ', async () => {
        const response = await request(server).get('/api/products')
                    expect(response.status).not.toBe(404)
        })


    it('Obtener una respuesta JSON con los productos', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)

    })
})


describe('GET hacia /api/products/:id', () => {
    it('Debe de retornar un 404 si un ID producto no existe en la DB', async () => {
        const productId = 999999
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('Debe validar que el ID no sea un elemento invalido como un texto', async () => {
        const response = await request(server).get('/api/products/not-valid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })

        it('Espera un JSON con los productos obtenido por el ID', async () => {
        const response = await request(server).get('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

//--------------------------------------PUT------------------------------------------

describe('PUT hacia /api/products/:id', () => {
    it('Validacion de la actualizacion de producto que este reciba algo', async () => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
//Esperamos 5 mensajes de error
        expect(response.body.errors).toHaveLength(5)
    })

    it('Validacion del precio y que sea maoyr a 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Mause Gamer",
            price: -300,
            availability: true
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('Precio no valido')
    })

      it('Debe validar que el ID sea valido y no sea texto', async () => {
        const response = await request(server).put('/api/products/not-valid-url').send({
            name: "Mause Gamer",
            price: 300,
            availability: true
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })

       it('Debe de retornar un 404 si un ID producto no existe', async () => {
        const productId = 999999
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: 'Teclado - testing',
            price: 230,
            availability: true
        })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

        it('Debe de actualizar el elemento', async () => {
        const productId = 1
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: 'Teclado - testing - actualizado',
            price: 230,
            availability: true
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe('PATCH hacia /api/products/:id', () => {
    it('Validar error 404 si ID no se encuentra en la BD', async() => {
            const productId = 999999

            const response = await request(server).patch(`/api/products/${productId}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toHaveProperty('error')
                    expect(response.body.error).toBe('Producto no encontrado')

    })
    it('Validar que se actualiza el availability de nuestra DB', async() => {
            const response = await request(server).patch('/api/products/1')
                    expect(response.status).toBe(200)
                    expect(response.body).toHaveProperty('data')
                    expect(typeof response.body.data.availability).toBe('boolean')
    })
})


 describe('DELETE hacia /api/products/:id', () => {
    it('Validar el ID', async () => {
        const response = await request(server).delete('/api/products/not-valid-url')

        expect(response.status).toBe(400)
         expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })

       it('Validar el ID exista en la base de datos', async () => {
       const productId = 9999
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(404)
         expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

      it('Validar que pasando el un ID existente se elimuna de la DB', async () => {
       const productId = 1
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(200)
         expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Producto ELIMINADO')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)


    })
 })

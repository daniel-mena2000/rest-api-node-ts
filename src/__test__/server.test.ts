//1. describe Agrupa tests Es solo organización
//2. it o test Es una prueba individual Describe qué debería pasar
//3. expect Es la validación
//4.toBe- valor a comparar - Entonces espera que 1 + 1 sea 2
describe('nuestro primer test', () => {
  it('debería pasar correctamente', () => {
    expect(1 + 1).toBe(2)
  })
})

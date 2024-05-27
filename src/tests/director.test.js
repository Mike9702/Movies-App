const request = require('supertest');
const app = require('../app');

let id ;

test('GET /directors debe traer todos los directores', async () => {
const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /debe crear un director', async () => {
    const newDirector = {
        firstName: "Director",
        lastName: "Test",
        nationality: "USA",
        image: "http://image.com",
        birthday: "12-12-1978"
        
    };

    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toBe(newDirector.name)
    
});

test('PUT /directors/:id debe de actualizar un director', async () => {

    const updatedDirector = {
        firstName: "Director actualizado",
    }
    const res = await request(app).put(`/directors/${id}`).send(updatedDirector);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedDirector.name); 
})

test('DELETE /directors/:id debe eliminar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});

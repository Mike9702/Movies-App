const request = require('supertest');
const app = require('../app');

let id ;

test('GET /actors debe traer todos los actores', async () => {
const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /debe crear un actor', async () => {
    const newActor = {
        firstName: "Mike",
        lastName: "Martinez",
        nationality: "México",
        image: "http://image.com",
        birthday: "12-12-2020"
    };

    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toBe(newActor.name)
    
});

test('PUT /actors/:id debe de actualizar un actor', async () => {

    const updatedActor = {
        firstName: "Mike actualizado",
    }
    const res = await request(app).put(`/actors/${id}`).send(updatedActor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedActor.name); 
})

test('DELETE /actors/:id debe eliminar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});


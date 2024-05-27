const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');
const Director = require('../models/Director');

let id ;

test('GET /movies debe traer todas las movies', async () => {
const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /debe crear una movie', async () => {
    const newMovie = {
        name: "Movie Test",
        image: "http://image.com",
        synopsis: "Post debe crear un movie",
        releaseYear: 2002
    };

    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toBe(newMovie.name)
    
});

test('PUT /movies/:id debe de actualizar una movie', async () => {

    const updatedMovie = {
        name: "Movie test actualizada",
    }
    const res = await request(app).put(`/movies/${id}`).send(updatedMovie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedMovie.name); 
});

test('POST /movies/:id/genres debe insertar los generos de una movie ', async() => {
    const genre = await Genre.create({
        name: "Aventura"
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    
});



test('DELETE /movies/:id debe eliminar una movie', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});



import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let token: string;

describe('User API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DB_URI as string);

        // Log in to get a valid token
        const loginRes = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'test@gmail.com',
                password: 'test@123'
            });

        token = loginRes.body.token;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/v1/user')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: 'test@example.com',
                name: 'John Doe',
                age: 25,
                city: 'CityX',
                zipCode: '12345'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should return all users', async () => {
        const res = await request(app)
            .get('/api/v1/user')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should soft delete a user', async () => {
        const createRes = await request(app)
            .post('/api/v1/user')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: 'delete@example.com',
                name: 'Delete User',
                age: 30,
                city: 'CityY',
                zipCode: '54321'
            });
        expect(createRes.statusCode).toEqual(201);
        const userId = createRes.body._id;

        const deleteRes = await request(app)
            .delete(`/api/v1/user/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(deleteRes.statusCode).toEqual(200);
        expect(deleteRes.body.deleted).toBe(true);

        const getRes = await request(app)
            .get(`/api/v1/user/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(getRes.statusCode).toEqual(404);
    });
});

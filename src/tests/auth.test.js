const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Authentication API', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123'
        });
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'New User',
                email: 'newuser@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should return 401 for invalid login', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should return 400 for missing fields during registration', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: '',
                email: 'newuser@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Name is required');
    });
});
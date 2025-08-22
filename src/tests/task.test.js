const request = require('supertest');
const app = require('../app'); // Adjust the path if necessary
const mongoose = require('mongoose');
const Task = require('../models/task');
const User = require('../models/user');

describe('Task API', () => {
    let user;
    let token;
    let taskId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        user = await User.create({ name: 'Test User', email: 'test@example.com', password: 'password' });
        token = user.generateAuthToken(); // Assuming you have a method to generate token
    });

    afterAll(async () => {
        await Task.deleteMany({});
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'New Task', description: 'Task description' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('task');
        taskId = res.body.task._id; // Save the task ID for later tests
    });

    it('should get all tasks', async () => {
        const res = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('tasks');
        expect(res.body.tasks.length).toBeGreaterThan(0);
    });

    it('should update a task', async () => {
        const res = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Task', description: 'Updated description' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('task');
        expect(res.body.task.title).toEqual('Updated Task');
    });

    it('should delete a task', async () => {
        const res = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(204);
    });
});
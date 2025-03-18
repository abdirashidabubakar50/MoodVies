const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const User = require('../src/models/User');


let mongoServer;

jest.setTimeout(30000);

beforeAll(async () => {
    // Disconnect from any previous connection before connecting to the in-memory server
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, { useNewUrlParser: true, UseUnifiedTopology: true });

});

afterEach(async () => {
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('User Registration', () => {
    it("should successfully register a new user", async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                Username: "Ahmad Abubakar Hussein",
                email: 'Samadina@gmail.com',
                password: '12345678'
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User created successfully');
    });

    it("should not register a user with an existing email", async () => {
        await new User({
            Username: "Abdirashid",
            email: "abdirashidabubakar7@gmail.com",
            password: 'hashed_password'
        }).save();

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                Username: "AnotherUser",
                email: "abdirashidabubakar7@gmail.com",
                password: '12345678'
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Email already exists');
    });

    it("should not register a user with invalid data", async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                Username: "",
                email: "invalid email",
                password: '1234'
            });
        expect(response.status).toBe(400);
        expect(response.body.errors.length).toBeGreaterThan(0);
    });
});

describe('User login', () => {
    it("should successfully login a user", async () => {
        // First, register the user
        await request(app)
            .post('/api/auth/register')
            .send({
                Username: "Abdirashid",
                email: "abdirashidabubakar7@gmail.com",
                password: '12345678'
            });

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: "abdirashidabubakar7@gmail.com",
                password: '12345678'
            })
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Login Successful');
    });

    it("should not login a user who does not exist", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: "abdirashid899778098@gmail.com",
                password: ""
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', 'User does not exist Please sign up first')
    });

    it("should not login a user with invalid credentials", async () => {
        //first create a user
        await request(app)
            .post('/api/auth/register')
            .send({
                Username: "Abdirashid",
                email: "abdirashidabubakar7@gmail.com",
                password: '12345678'
            });
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: "abdirashidabubakar7@gmail.com",
                password: 'wrong_password'
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", 'Invalid Credentials')
    });
});
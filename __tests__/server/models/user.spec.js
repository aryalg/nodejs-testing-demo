/**
 * @jest-environment node
 */

import User from '@models/User';

import mongoose from 'mongoose';

import Bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import config from '@config';



describe('The User Model', () => {
    const user = {
        name: 'Test User',
        email: 'test@user.com',
        password: 'kathmandu'
    }

    let createdUser;
    beforeAll(async () => {

        await mongoose.connect('mongodb+srv://bikramaryal:bhadrakali@321@tigercafe-fdk21.mongodb.net/nodetest?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        createdUser = await User.create(user);
    })
    it('should hash the user password before saving to database', async () => {

        expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true);

    }, 10000);


    it('should set the email confirm code for the user before saving to the database', async () => {
        expect(createdUser.emailConfirmCode).toEqual(expect.any(String));
    })


    describe('The generateToken Method', () => {
        it('should generate valid jwt for user', async () => {
            const token = createdUser.generateToken();

            const { id } = jwt.verify(token, config.jwtSecret)



            expect(id).toEqual(JSON.parse(JSON.stringify(createdUser._id)));
        })
    })


    afterAll(async () => {
        await mongoose.connection.close();

    })
});
/**
 * @jest-environment node
 */

import User from '@models/User';

import mongoose from 'mongoose';

import Bcrypt from 'bcryptjs';



describe('The User Model', () => {
    beforeAll(async () => {

        await mongoose.connect('mongodb+srv://bikramaryal:bhadrakali@321@tigercafe-fdk21.mongodb.net/nodetest?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    })
    it('should hash the user password before saving to database', async () => {

        const user = {
            name: 'Test User',
            email: 'test@user.com',
            password: 'kathmandu'
        }

        const createdUser = await User.create(user);

        expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true);

    }, 10000);


    it('should set the email confirm code for the user before saving to the database', async () => {
        const user = {
            name: 'Test User',
            email: 'test@user.com',
            password: 'kathmandu'
        }

        const createdUser = await User.create(user);

        expect(createdUser.emailConfirmCode).toEqual(expect.any(String));
    })


    afterAll(async () => {
        await mongoose.connection.close();

    })
});
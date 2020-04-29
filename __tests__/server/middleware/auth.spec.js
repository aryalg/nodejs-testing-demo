/**
 * @jest-environment node
 */

import User from '@models/User';

import { connect, disconnect } from '@tests/utils/mongoose'

import jwt from 'jsonwebtoken';

import config from '@config';

import authMiddleware from '@middleware/auth'

import Response from '@tests/utils/response'



describe('The Auth Middleware', () => {
    const user = {
        name: 'Test User',
        email: 'test@user.com',
        password: 'kathmandu'
    }

    let createdUser;


    beforeAll(async () => {

        await connect()
        createdUser = await User.create(user);
    })


    it('should called the next function if authentication is successful', async () => {
        const access_token = createdUser.generateToken()

        const req = {
            body: {
                access_token
            }
        }

        const res = new Response()

        const next = jest.fn()

        await authMiddleware(req, res, next)

        // Validly authenticated users can have access to the application.
        expect(next).toHaveBeenCalled()


    })


    it('should return a 401 if authentication fails', async () => {
        const req = {
            body: {}
        }


        const res = new Response()

        const statusSpy = jest.spyOn(res, 'status');
        const jsonSpy = jest.spyOn(res, 'json');

        const next = jest.fn()

        await authMiddleware(req, res, next)

        // So that user does not have acccess
        expect(next).toHaveBeenCalledTimes(0)

        expect(statusSpy).toHaveBeenCalledWith(401)

        expect(jsonSpy).toHaveBeenCalledWith({
            message: 'Unauthenticated.'
        })



    })




    afterAll(async () => {
        await disconnect()

    })
});
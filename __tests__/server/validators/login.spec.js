/**
 * @jest-environment node
 */

import loginValidators from '@validators/login'


describe('The login Validators', () => {
    it('Should call the next function when validation succeds', async () => {
        const req = {
            body: {
                email: 'bikram@gmail.com',
                password: 'kathmandu'
            }
        }


        const res = {}

        const next = jest.fn();
        // This is going to create a completely mocked function using jest and with this
        // function we are able to monitor if this function was called, number of times
        // it was called, what it called with and so on.

        await loginValidators(req, res, next)


        expect(next).toHaveBeenCalled();
    })
})
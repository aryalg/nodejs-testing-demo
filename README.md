# Auth App - Node JS Testing with JEST

## Mocking packages with Jest

    In the last lesson a test took over eight seconds to run because it was sending an email.
    Let's look at how e-mails are being send in this application. If you checkout the user
    model you will find out the method called sendEmailVerificationEmail which return new Mail like this:

```js
UserSchema.methods.sendEmailVerificationEmail = function() {
  return new Mail("confirm-email")
    .to(this.email)
    .subject("Please confirm your email address.")
    .data({
      name: this.name,
      url: `${config.url}/auth/emails/confirm/${this.emailConfirmCode}`,
    })
    .send();
};
```

Mail is imported from `@fullstackjs/mail`
We don't this package to continue sending e-mails in the middle of our tests. So what we can do is mock how this package and in gest, to mock out a package is really easy.

A mock is basically giving the package a replacement. And in jest we're going use mocked package instaed of real package.

### Step: 1 Create a folder **mocks**

- Package is namespaced like this: `@fullstackjs/mail`
- We need to create @fullstackjs folder inside **mocks**
- We are also going to have mail.js
- It looks like this package exports a class, so we're also going to export a class. Now we need to make sure that the Mock works exactly as the real package but it doesn't do the e-mail sending so that it's really fast.
- We know that mock should also have two methods, .to .subject .data . send, And it looks like all of the methods should be chainable.

```js
module.exports = class Mail {
  to() {
    return this;
  }

  subject() {
    return this;
  }

  data() {
    return this;
  }

  send() {
    return this;
  }
};
```

Now lets run our test again and see how much time it will take. (Only too about 2.4 second)

We stil have timeout error, because jest is not able to close database connection.

Finally we have successful test! Great Job.

## Setup and Teardown

If we checkout our `user.spec.js`, inside out test we're establishing database connection and then we're performing our test And finally we are closing our database connection.

This not ideal because if we go ahead and have another test, we would required all steps that we setup in this one. This is lots of duplication. With jest, we can use testhooks

`beforeEach()` - Before every tests
`beforeAll()` - function going to be run before all tests
Postition of these hooks are also important.

```js
beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://bikramaryal:<password>@tigercafe-fdk21.mongodb.net/nodetest?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});
```

```js
expect(createdUser.emailConfirmCode).toEqual(expect.any(String));
```

## Testing Instance Methods

We can refactor our existing code with creating user code inside beforeEach hook.

## Integration Test

Integration test basically test out API exactly as any human would manually test it for example, making an API request to an endpoint and expecting a specific result or response.

We need to add new package

`npm i --save-dev supertest`

The package.json starts the app in dev mode from server/index.js
And index.js listens to a specific port for the application

But we are testing, we do not want to listen because there's no point one in the application
We can simply call the Express application and communicate with the endpoints.

This is very important if you want to test your applications make sure you separate the app from the listener so that you can test the app seperately

## End to End Testing with Cypress

=> Unlike unit testing and integration testing the end to end tests are literally the test that verify the behaviour of the application as the user uses it. It's going to launch a real browser perform actions on one assertions. First we need to install cyprus.
`npm i --save-dev cypress`

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

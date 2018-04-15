middy-secrets
=============

Middy middleware that loads secret data from AWS Secrets Manager.

## Getting Started

Installing `middy-secrets`

```bash
npm install --save middy # You need middy and redis installed
npm install --save middy-secrets
```

## Usage

Create new secrets in your _AWS Secrets Manager_ service i.e. with `dev/mySecrets` name.

Add secret data:

![image](https://user-images.githubusercontent.com/108333/38781507-b7ea96ce-40e6-11e8-8613-d1fc0b0ff9e1.png)


```javascript
const secrets = require('middy-secrets');
const middy = require('middy');

const someHandler = (event, context, callback) => {
  console.log(process.env.foo); // available if `setToContext` is set to `false`
  
  console.log(context.foo); // available if `setToContext` is set to `true`
};

const handler = middy(someHandler)
  .use(secrets({
    region: 'eu-west-1',         // AWS region
    secretName: 'dev/mySecrets', // your secret name
    setToContext: true,          // false by default
  }));

module.exports = { handler };
```


## Contributing

Feel free to open a Pull Request or Issue w/ a bug report or feature request.

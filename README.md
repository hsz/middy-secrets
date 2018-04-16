middy-secrets
=============

[![npm version](https://badge.fury.io/js/middy-secrets.svg)](https://badge.fury.io/js/middy-secrets)

Middy middleware that loads secret data from AWS Secrets Manager.

## Getting Started

Installing `middy-secrets`

```bash
npm install --save middy # You need middy installed
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
  // if `setToContext` option is set to `true`, secrets are available in `context` object:
  console.log(context.foo);

  // otherwise, secrets are stored in `process.env`
  console.log(process.env.foo);
};

const handler = middy(someHandler)
  .use(secrets({
    secretName: 'dev/mySecrets', // your secret name - required
    setToContext: true,          // false by default
    awsSdkOptions: {
      // optional AWS configuration
    },
  }));

module.exports = { handler };
```

## Options

| Parameter | Type | Description |
| --- | --- | --- |
| secretName | <code>string</code> | *Required.* Secret name of your secrets |
| setToContext | <code>boolean</code> | If set to <code>true</code>, all secrets will be stored in `context` object, otherwise - in `process.env`. Default _false_. |
| awsSdkOptions | <code>object</code> | Object that overwrites default [AWS Secrets Manager][aws-sm-docs]) options |

_Note:_

AWS environment variables (like `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`) should
be provided or passed with `awsSdkOptions` parameter.

## Contributing

Feel free to open a Pull Request or Issue w/ a bug report or feature request.

[aws-sm-docs]: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SecretsManager.html#constructor-property

const AWS = require('aws-sdk');
const createError = require('http-errors');

export default (opts = {}) => {
  const defaults = {
    awsSdkOptions: {},
    setToContext: false,
  };

  const options = Object.assign({}, defaults, opts);
  const client = new AWS.SecretsManager(options.awsSdkOptions);
  const getSecretValue = () => new Promise((resolve, reject) =>
    client.getSecretValue({ SecretId: options.secretName }, function (err, data) {
      if (err) {
        return reject(err);
      }

      try {
        const response = JSON.parse(data.SecretString || '{}');
        resolve(response);
      } catch (e) {
        reject(err);
      }
    })
  );

  return {
    before: handler => getSecretValue()
      .then((secrets) => {
        const target = options.setToContext ? handler.context : process.env;
        Object.assign(target, options.contextKey ? {[options.contextKey] : secrets} : secrets);
      })
      .catch(({ statusCode, message }) => {
        throw createError(statusCode, message);
      }),
  };
};

require('@babel/register')({
    extensions: ['.js', '.ts'],
});

module.exports = require('./app');
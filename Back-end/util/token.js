var jwt = require("jsonwebtoken");

exports.gen = async (data) => {
    let tokenStr;

    await new Promise(async resolve => {
        await jwt.sign(data, "secret", (err, token) => {
            tokenStr = token;
            resolve();
        });
    });

    return tokenStr;
};

exports.verify = (req, res, next) => {
    next();
};
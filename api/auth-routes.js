const hashing = require('../hashing');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

module.exports = {
    register: (req,res) => {
        let login = req.body.login;
        let password = req.body.password;
        console.log("Log:"+login);
        console.log("Pass:"+password);

        if (login !== undefined && password !== undefined) {
            let hashedPassword = hashing.encrypt(password);

            let query = "INSERT INTO user (login, password) VALUES ('" + login + "', '" + hashedPassword + "')";
            db.query(query, (err, result) => {
                if (err) {
                    res.status(500).send("Can not create such user.");
                }
                console.log("User created succesfully!");
                res.status(201);
            });
        } else {
            res.status(400);
        }
    },
    login: (req, res) => {
        let login = req.body.login;
        let password = req.body.password;

        if (login !== undefined && password !== undefined) {
            let query = "SELECT * FROM user WHERE login = '" + login + "'";
            db.query(query, (err, result) => {
                if (err) {
                    res.status(500).send("Can not create such user.");
                }

                if (result[0] === undefined) {
                    res.status(401).json({
                        sucess: false,
                        token: null,
                        err: 'Invalid Credentials'
                    });
                }

                let user = result[0];

                console.log('> user.isAdmin', user, user.isAdmin);

                if (hashing.decrypt(user.password) == password) {
                    let token = jwt.sign(
                        {
                            login: user.login,
                            isAdmin: user.isAdmin
                        },
                        'super secret',
                        { expiresIn: 129600 });

                    console.log("login succesfully!")

                    res.json({
                        sucess: true,
                        err: null,
                        token
                    });
                } else {
                    res.status(401).json({
                        sucess: false,
                        token: null,
                        err: 'Entered Password and Hash do not match!'
                    });
                }
            });
        } else {
            res.status(400).send();
        }
    }
}
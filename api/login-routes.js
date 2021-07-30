const hashing = require('../hashing');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const {generateToken, varifyToken} = require('../cookie');

module.exports = {
    register_pat: (req,res) => {
        let name = req.body.name;
        let surname = req.body.surname;
        let patronymic = req.body.patronymic;
        let card_code = req.body.card_code;
                
        let e_mail = req.body.e_mail;
        let pass_hash = req.body.pass_hash;
        console.log("register:"+name +" "+surname);

        if (e_mail !== undefined && pass_hash !== undefined) {
            let hashedPassword = hashing.encrypt(pass_hash);

            let query = "INSERT INTO patient (name, surname, patronymic, card_code, e_mail, pass_hash) VALUES ('" +
                name + "', '"+surname+"', '"+patronymic + "', '"+ card_code +  "', '"+ e_mail +  "', '"+ hashedPassword + "')";
            db.query(query, (err, result) => {
                if (err) {
                    res.status(400).render('error', {text : 'Данные введены неверно'});
                }
                db.query("SELECT * FROM patient where e_mail='"+e_mail+"'",(err, result) => {                
                    generateToken(res, result[0].id)
                    res.redirect('/');
                });

            });
        } else {
            res.status(400).send();
        }
    },
    login_pat: (req, res) => {
        let e_mail = req.body.e_mail;
        let pass_hash = req.body.pass_hash;
        if (e_mail !== undefined && pass_hash !== undefined) {
            let query = "SELECT * FROM patient WHERE e_mail = '" + e_mail + "'";
            db.query(query, (err, result) => {
                if (err) {
                    res.status(500).send("Can not create such user.");
                }
                
                if (result[0] === undefined) {
                    //res.render('Электронный адрес или пароль введены неверно');
                    res.status(400).render('error', {text : 'Электронный адрес или пароль введены неверно'});
                    return
                }

                let user = result[0];
                if (hashing.decrypt(user.pass_hash) == pass_hash) {
                    generateToken(res, user.id);
                    res.redirect('/');
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
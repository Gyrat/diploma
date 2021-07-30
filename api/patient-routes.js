const mysql = require('mysql');

module.exports = {    
    createpatient: (req, res) => {
        let name = req.body.name;
        let surname = req.body.surname;
        let patronymic = req.body.patronymic;
        let card_code = req.body.card_code;
        let e_mail = req.body.e_mail;
        let pass_hash = req.body.pass_hash;
        
        let teamQuery = "SELECT * FROM `patient` WHERE name = '" + name + "' and surname = '" + surname + "'";
        db.query(teamQuery, (err, result) => {
            if (err) {
                console.log(2)
                return res.status(500).send("Can not get team information. Please, try later.");
            }
                let query = "INSERT INTO `patient` (name, surname, patronymic, card_code, e_mail, pass_hash) VALUES ('" +
                    name  + "', '" + surname +  "', '" +patronymic +  "', '" + card_code + "', '" + e_mail + "', '" + pass_hash + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not add new news. Please, try later.");
                    }
                    res.status(201).redirect('/patients');
                });
            
        });
    },
    getpatients: (req, res) => {
        let query = "SELECT * FROM patient";
        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get news list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    getpatient: (req, res) => {
        let Id = req.params.id;
        let query = "Select * From patient where id = " + Id +"";
        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }
            res.status(200).json({
                data: result || []
            })
        });
    },
    editpatient: (req, res) => {
        console.log(req.params.id +" edit");
        let id = req.params.id;
        let name = req.body.name;
        let surname = req.body.surname;
        let patronymic = req.body.patronymic;
        let card_code = req.body.card_code;
        let e_mail = req.body.e_mail;
        let pass_hash = req.body.pass_hash;

        let leagueQuery = 'SELECT id from `patient` where name = ' + mysql.escape(name) + "' and surname = '" + mysql.escape(surname);
        db.query(leagueQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not update news information properly. Please, try later.");
            } else {
                let query = "UPDATE `patient` SET `name` = '"+name + "', `surname` = '"+surname +"', `patronymic` = '"+patronymic +"', `card_code` = '"+card_code +"', `e_mail` = '" +e_mail+"', `pass_hash` = '" +pass_hash+"' WHERE `patient`.`id` = '" + id + "'";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not update news information properly. Please, try later.");
                    }
                    res.status(204).json({
                        data:result
                    });
                    console.log("alright!")
                });
            }
        });
    },        
    deletepatient: (req, res) => {
        let Id = req.params.id;
        console.log("delete docID:"+ Id);
        let deleteQuery = 'DELETE FROM patient WHERE id = "' + Id + '"';
        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete doc. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
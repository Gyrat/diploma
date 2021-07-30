const mysql = require('mysql');

module.exports = {    
    createdoctor: (req, res) => {
        let name = req.body.name;
        let surname = req.body.surname;
        let patronymic = req.body.patronymic;
        let birth_date = req.body.birth_date;
        let specialization_id = req.body.specialization_id;
        
        let teamQuery = "SELECT * FROM `doctor` WHERE name = '" + name + "'";
        db.query(teamQuery, (err, result) => {
            if (err) {
                console.log(2)
                return res.status(500).send("Can not get team information. Please, try later.");
            }
            if (result.length > 0) {
                let query = "select name from doctor";
                db.query(query, (err, result) => {
                    res.status(400).json({
                        data: result
                    })
                });
            } else {
                let query = "INSERT INTO `doctor` (name, surname, patronymic, birth_date, specialization_id) VALUES ('" +
                    name  + "', '" + surname +  "', '" +patronymic +  "', '" + birth_date + "', '" + specialization_id+ "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not add new news. Please, try later.");
                    }
                    res.status(201).redirect('/doctors');
                });
            }
        });
    },
    getdoctors: (req, res) => {
        let query = "SELECT * FROM doctor";
        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get news list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    getdoctor: (req, res) => {
        let Id = req.params.id;
        let query = "Select * From doctor where id = " + Id +"";
        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }
            res.status(200).json({
                data: result || []
            })
        });
    },
    editdoctor: (req, res) => {
        console.log(req.params.id +" edit");
        let id = req.params.id;
        let name = req.body.name;
        let surname = req.body.surname;
        let patronymic = req.body.patronymic;
        let birth_date = req.body.birth_date;
        let specialization_id = req.body.specialization_id;

        let leagueQuery = 'SELECT id from `doctor` where name = ' + mysql.escape(name);
        db.query(leagueQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not update news information properly. Please, try later.");
            } else {
                let query = "UPDATE `doctor` SET `name` = '"+name + "', `surname` = '"+surname +"', `patronymic` = '"+patronymic +"', `birth_date` = '"+birth_date +"', `specialization_id` = '" +specialization_id+"' WHERE `doctor`.`id` = '" + id + "'";
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
    deletedoctor: (req, res) => {
        let Id = req.params.id;
        console.log("delete docID:"+ Id);
        let deleteQuery = 'DELETE FROM doctor WHERE id = "' + Id + '"';
        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete doc. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
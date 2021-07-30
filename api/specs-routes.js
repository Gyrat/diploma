const mysql = require('mysql');

module.exports = {    
    createspecs: (req, res) => {
        let name = req.body.name;
        console.log('get specs');
        let teamQuery = "SELECT * FROM `specialization` WHERE name = '" + name + "'";
        db.query(teamQuery, (err, result) => {
            if (err) {
                console.log(2)
                return res.status(500).send("Can not get team information. Please, try later.");
            }
            if (result.length > 0) {
                let query = "select name from specialization";
                db.query(query, (err, result) => {
                    res.status(400).json({
                        data: result
                    })
                });
            } else {
                let query = "INSERT INTO `specialization` (name) VALUES ('" +
                    name  + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not add new news. Please, try later.");
                    }
                    res.status(201).redirect('/specs');
                });
            }
        });
    },
    getspecs: (req, res) => {
        let query = "SELECT * FROM specialization";
        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get news list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    getspec: (req, res) => {
        let Id = req.params.id;
        let query = "Select * From specialization where id = " + Id +"";
        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }
            res.status(200).json({
                data: result || []
            })
        });
    },
    editspecs: (req, res) => {
        console.log(req.params.id +" edit");
        let id = req.params.id;
        let name = req.body.name;
        let leagueQuery = 'SELECT id from `specialization` where name = ' + mysql.escape(name);
        db.query(leagueQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not update news information properly. Please, try later.");
            } else {
                let query = "UPDATE `specialization` SET `name` = '" + name + "' WHERE `specialization`.`id` = '" + id + "'";
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
    deletespecs: (req, res) => {
        let Id = req.params.id;
        console.log("delete adID:"+ Id);
        let deleteQuery = 'DELETE FROM specialization WHERE id = "' + Id + '"';
        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete specialization. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
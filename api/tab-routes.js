const mysql = require('mysql');

module.exports = {    
    createtabs: (req, res) => {
        let name = req.body.name;
        
        let teamQuery = "SELECT * FROM `tab` WHERE name = '" + name + "'";
        db.query(teamQuery, (err, result) => {
            if (err) {
                console.log(2)
                return res.status(500).send("Can not get team information. Please, try later.");
            }
            if (result.length > 0) {
                let query = "select name from tab";
                db.query(query, (err, result) => {

                    res.status(400).json({
                        data: result
                    })
                });
            } else {
                let query = "INSERT INTO `tab` (name) VALUES ('" + name + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not add new news. Please, try later.");
                    }
                    res.status(201).redirect('/tabs');
                });
            }
        });
    },
    gettabs: (req, res) => {
        let query = "SELECT * FROM tab";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get news list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    gettab: (req, res) => {
        let Id = req.params.id;
        let query = "Select * From tab where id = " + Id +"";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }

            res.status(200).json({
                data: result || []
            })
        });
    },

    edittabs: (req, res) => {
        console.log(req.params.id +" edit");
        let id = req.params.id;
        let name = req.body.name;

        let leagueQuery = 'SELECT id from `tab` where name = ' + mysql.escape(name);
        db.query(leagueQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not update information properly. Please, try later.");
            } else {


                let query = "UPDATE `tab` SET `name` = '" + name + "' WHERE `tab`.`id` = '" + id + "'";
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
    deletetabs: (req, res) => {
        let Id = req.params.id;
        console.log("delete adID:"+ Id);
        let deleteQuery = 'DELETE FROM tab WHERE id = "' + Id + '"';

        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete news. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
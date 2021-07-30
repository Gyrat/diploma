const mysql = require('mysql');

module.exports = {    
    createshift: (req, res) => {
        let name = req.body.name;
        let start_time = req.body.start_time;
        let end_time = req.body.end_time;

        let teamQuery = "SELECT * FROM `shift` WHERE name = '" + name + "'";
        db.query(teamQuery, (err, result) => {
            if (err) {
                console.log(2)
                return res.status(500).send("Can not get team information. Please, try later.");
            }
            if (result.length > 0) {
                let query = "select name from shift";
                db.query(query, (err, result) => {

                    res.status(400).json({
                        data: result
                    })
                });
            } else {
                let query = "INSERT INTO `shift` (name, start_time, end_time) VALUES ('" +
                    name + "', '" + start_time +  "', '" + end_time + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not add new team. Please, try later.");
                    }
                    res.status(201).redirect('/shifts');
                });
            }
        });
    },
    getshifts: (req, res) => {
        let query = "SELECT * FROM shift";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get ads list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    getshift: (req, res) => {
        let adId = req.params.id;
        let query = "Select * From shift where id = " + adId +"";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }

            res.status(200).json({
                data: result || []
            })
        });
    },

    editshift: (req, res) => {
        console.log(req.params.id +"sorry but");
        let id = req.params.id;

        let name = req.body.name;
        let start_time = req.body.start_time;
        let end_time = req.body.end_time;

        let leagueQuery = 'SELECT id from `shift` where name = ' + mysql.escape(name);
        db.query(leagueQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not update team information properly. Please, try later.");
            } else {


                let query = "UPDATE `shift` SET `name` = '" + name + "', `start_time` = '" + start_time + "', `end_time` = '" + end_time + "' WHERE `shift`.`id` = '" + id + "'";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not update player information properly. Please, try later.");
                    }
                    res.status(204).json({
                        data:result
                    });
                    console.log("alright!")
                });
            }
        });
    },        
    deleteshift: (req, res) => {
        let adId = req.params.id;
        console.log("delete adID:"+ adId);
        let deleteTeamQuery = 'DELETE FROM shift WHERE id = "' + adId + '"';

        db.query(deleteTeamQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete team. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
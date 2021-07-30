const mysql = require('mysql');

module.exports = {    
    createCabinet: (req, res) => {
        let number = req.body.number;
        let equipment = req.body.equipment;

        let teamQuery = "SELECT * FROM `cabinet` WHERE number = '" + number + "'";
        db.query(teamQuery, (err, result) => {
            if (err) {
                console.log(2)
                return res.status(500).send("Can not get team information. Please, try later.");
            }
            if (result.length > 0) {
                let query = "select number from cabinet";
                db.query(query, (err, result) => {

                    res.status(400).json({
                        data: result
                    })
                });
            } else {
                let query = "INSERT INTO `cabinet` (number, equipment) VALUES ('" +
                    number + "', '" + equipment + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not add new team. Please, try later.");
                    }
                    res.status(201).redirect('/cabinet');
                });
            }
        });
    },
    getCabinets: (req, res) => {
        let query = "SELECT * FROM cabinet";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get ads list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    getCabinet: (req, res) => {
        let adId = req.params.id;
        let query = "Select * From cabinet where id = " + adId +"";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }

            res.status(200).json({
                data: result || []
            })
        });
    },

    editCabinet: (req, res) => {
        console.log(req.params.id +"sorry but");
        let id = req.params.id;

        let number = req.body.number;
        let equipment = req.body.equipment;

        let leagueQuery = 'SELECT id from `cabinet` where number = ' + mysql.escape(number);
        db.query(leagueQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not update team information properly. Please, try later.");
            } else {


                let query = "UPDATE `cabinet` SET `number` = '" + number + "', `equipment` = '" + equipment + "' WHERE `cabinet`.`id` = '" + id + "'";
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
    deleteCabinet: (req, res) => {
        let adId = req.params.id;
        console.log("delete adID:"+ adId);
        let deleteTeamQuery = 'DELETE FROM cabinet WHERE id = "' + adId + '"';

        db.query(deleteTeamQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete team. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
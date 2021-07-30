const mysql = require('mysql');

module.exports = {    
    createAd: (req, res) => {
        let short = req.body.short;
        let full = req.body.full;

        let teamQuery = "SELECT * FROM `ad` WHERE short = '" + short + "'";
        db.query(teamQuery, (err, result) => {
            if (err) {
                console.log(2)
                return res.status(500).send("Can not get team information. Please, try later.");
            }
            if (result.length > 0) {
                let query = "select short from ad";
                db.query(query, (err, result) => {

                    res.status(400).json({
                        data: result
                    })
                });
            } else {
                let query = "INSERT INTO `ad` (short, full) VALUES ('" +
                    short + "', '" + full + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not add new team. Please, try later.");
                    }
                    res.status(201).redirect('/ad');
                });
            }
        });
    },
    getAds: (req, res) => {
        let query = "SELECT * FROM ad";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get ads list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    getAd: (req, res) => {
        let adId = req.params.id;
        let query = "Select * From ad where id = " + adId +"";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }

            res.status(200).json({
                data: result || []
            })
        });
    },

    editAd: (req, res) => {
        console.log(req.params.id +"sorry but");
        let id = req.params.id;

        let short = req.body.short;
        let full = req.body.full;

        let leagueQuery = 'SELECT id from `ad` where short = ' + mysql.escape(short);
        db.query(leagueQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not update team information properly. Please, try later.");
            } else {


                let query = "UPDATE `ad` SET `short` = '" + short + "', `full` = '" + full + "' WHERE `ad`.`id` = '" + id + "'";
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
    deleteAd: (req, res) => {
        let adId = req.params.id;
        console.log("delete adID:"+ adId);
        let deleteTeamQuery = 'DELETE FROM ad WHERE id = "' + adId + '"';

        db.query(deleteTeamQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete team. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
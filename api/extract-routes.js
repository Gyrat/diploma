const mysql = require('mysql');

module.exports = {    
    createextract: (req, res) => {
        let patient_id = req.body.patient_id;
        let type = req.body.type;
        let is_done = req.body.is_done;

        
        let teamQuery = "SELECT * FROM `card_extract` WHERE patient_id = '" + patient_id +"'";
        db.query(teamQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not get team information. Please, try later.");
            }
            if (result.length > 0) {
                let query = "select * from card_extract";
                db.query(query, (err, result) => {

                    res.status(400).json({
                        data: result
                    })
                });
            } else {
                let query = "INSERT INTO `card_extract` (patient_id, type, is_done) VALUES ('" +
                    patient_id + "', '" + type + "', '" + is_done + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not add new news. Please, try later.");
                    }
                    res.status(201).redirect('/extracts');
                });
            }
        });
    },
    getextracts: (req, res) => {
        let query = "SELECT * FROM card_extract";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get news list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    getextract: (req, res) => {
        let Id = req.params.id;
        let query = "Select * From card_extract where id = " + Id +"";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }

            res.status(200).json({
                data: result || []
            })
        });
    },

    editeextract: (req, res) => {
        console.log(req.params.id +" edit");
        let id = req.params.id;
        let patient_id = req.body.patient_id;
        let type = req.body.type;
        let is_done = req.body.is_done;

        let leagueQuery = 'SELECT id from `card_extract` where patient_id = ' + mysql.escape(patient_id);
        db.query(leagueQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not update news information properly. Please, try later.");
            } else {


                let query = "UPDATE `card_extract` SET `patient_id` = '" +patient_id + "', `type` = '" + type + "', `is_done` = '" + is_done + "' WHERE `card_extract`.`id` = '" + id + "'";
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
    deleteextract: (req, res) => {
        let Id = req.params.id;
        console.log("delete adID:"+ Id);
        let deleteQuery = 'DELETE FROM card_extract WHERE id = "' + Id + '"';

        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete news. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
const mysql = require('mysql');

module.exports = {    
    createpage: (req, res) => {
        let tab_id = req.body.tab_id;
        let name = req.body.name;
        let text = req.body.text;

        
        let teamQuery = "SELECT * FROM `page` WHERE name = '" + name + "'";
        db.query(teamQuery, (err, result) => {
            if (err) {
                console.log(2)
                return res.status(500).send("Can not get team information. Please, try later.");
            }
            if (result.length > 0) {
                let query = "select name from page";
                db.query(query, (err, result) => {

                    res.status(400).json({
                        data: result
                    })
                });
            } else {
                let query = "INSERT INTO `page` (tab_id, name, text) VALUES ('" +
                    tab_id + "', '" + name + "', '" + text + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not add new news. Please, try later.");
                    }
                    res.status(201).redirect('/pages');
                });
            }
        });
    },
    getpages: (req, res) => {
        let query = "SELECT * FROM page";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get news list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    getpage: (req, res) => {
        let Id = req.params.id;
        let query = "Select * From page where id = " + Id +"";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }

            res.status(200).json({
                data: result || []
            })
        });
    },

    editpage: (req, res) => {
        console.log(req.params.id +" edit");
        let id = req.params.id;
        let name = req.body.name;
        let text = req.body.text;
        let tab_id = req.body.tab_id;

        let leagueQuery = 'SELECT id from `page` where name = ' + mysql.escape(name);
        db.query(leagueQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not update news information properly. Please, try later.");
            } else {


                let query = "UPDATE `page` SET `tab_id` = '" +tab_id + "', `name` = '" + name + "', `text` = '" + text + "' WHERE `page`.`id` = '" + id + "'";
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
    deletepage: (req, res) => {
        let Id = req.params.id;
        console.log("delete adID:"+ Id);
        let deleteQuery = 'DELETE FROM page WHERE id = "' + Id + '"';

        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete news. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
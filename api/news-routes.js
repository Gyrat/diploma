const mysql = require('mysql');

module.exports = {    
    createnews: (req, res) => {
        let name = req.body.name;
        let text = req.body.text;
        let data = req.body.data;
        
        let teamQuery = "SELECT * FROM `news` WHERE name = '" + name + "'";
        db.query(teamQuery, (err, result) => {
            if (err) {
                console.log(2)
                return res.status(500).send("Can not get team information. Please, try later.");
            }
            if (result.length > 0) {
                let query = "select name from news";
                db.query(query, (err, result) => {

                    res.status(400).json({
                        data: result
                    })
                });
            } else {
                let query = "INSERT INTO `news` (name, text, data) VALUES ('" +
                    name + "', '" + text + "', '" + data + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Can not add new news. Please, try later.");
                    }
                    res.status(201).redirect('/news');
                });
            }
        });
    },
    getnews: (req, res) => {
        let query = "SELECT * FROM news";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get news list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    getnew: (req, res) => {
        let Id = req.params.id;
        let query = "Select * From news where id = " + Id +"";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }

            res.status(200).json({
                data: result || []
            })
        });
    },

    editnews: (req, res) => {
        console.log(req.params.id +" edit");
        let id = req.params.id;
        let name = req.body.name;
        let text = req.body.text;
        let data = req.body.data;

        let leagueQuery = 'SELECT id from `news` where name = ' + mysql.escape(name);
        db.query(leagueQuery, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not update news information properly. Please, try later.");
            } else {


                let query = "UPDATE `news` SET `name` = '" + name + "', `text` = '" + text + "', `data` = '" + data + "' WHERE `news`.`id` = '" + id + "'";
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
    deletenews: (req, res) => {
        let Id = req.params.id;
        console.log("delete adID:"+ Id);
        let deleteQuery = 'DELETE FROM news WHERE id = "' + Id + '"';

        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete news. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
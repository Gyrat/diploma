const mysql = require('mysql');

module.exports = {    
    createtimetable: (req, res) => {
        let doctor_id = req.body.doctor_id;
        let shift_id = req.body.shift_id;
        let cabinet_id = req.body.cabinet_id;
        let date = req.body.date;

        let query = "INSERT INTO `timetable` (doctor_id, shift_id, cabinet_id, date) VALUES ('" +
            doctor_id + "', '" + shift_id + "', '" + cabinet_id + "', '" + date + "')";
        db.query(query, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not add new news. Please, try later.");
            }
            res.status(201).redirect('/timetables');
        });
    },
    gettimetables: (req, res) => {
        let query = "SELECT * FROM timetable";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get news list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    gettimetable: (req, res) => {
        let Id = req.params.id;
        let query = "Select * From timetable where id = " + Id +"";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }

            res.status(200).json({
                data: result || []
            })
        });
    },

    edittimetable: (req, res) => {
        console.log(req.params.id +" edit");
        let id = req.params.id;
        let name = req.body.name;
        let text = req.body.text;
        let tab_id = req.body.tab_id;

        let query = "UPDATE `timetable` SET `doctor_id` = '" +doctor_id + "', `shift_id` = '" + shift_id + "', `cabinet_id` = '" + cabinet_id + "', `date` = '" + date + "' WHERE `page`.`id` = '" + id + "'";
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
    },        
    deletetimetable: (req, res) => {
        let Id = req.params.id;
        console.log("delete adID:"+ Id);
        let deleteQuery = 'DELETE FROM timetable WHERE id = "' + Id + '"';

        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete news. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
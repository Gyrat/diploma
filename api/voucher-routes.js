const mysql = require('mysql');

module.exports = {    
    createvoucher: (req, res) => {
        let time = req.body.time;
        let timetable_id = req.body.timetable_id;
        let patient_id = req.body.patient_id;

        let query = "INSERT INTO `voucher` (time, timetable_id, patient_id, number) VALUES ('" +
            time + "', '" + timetable_id + "', '" + patient_id + "', '" + req.body.number + "')";
        db.query(query, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Can not add new news. Please, try later.");
            }
            res.status(201).redirect('/vouchers');
        });
    },
    getvouchers: (req, res) => {
        let query = "SELECT * FROM voucher";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get news list. Please, try later.");
            }
            res.status(200).json({
                data: result
            })
        });
    },
    getvoucher: (req, res) => {
        let Id = req.params.id;
        let query = "Select * From voucher where id = " + Id +"";

        db.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Can not get team. Please, try later.");
            }

            res.status(200).json({
                data: result || []
            })
        });
    },

    editvoucher: (req, res) => {
        console.log(req.params.id +" edit");
        let id = req.params.id;
        let time = req.body.time;
        let timetable_id = req.body.timetable_id;
        let patient_id = req.body.patient_id;

        let query = "UPDATE `voucher` SET `time` = '" +time + "', `timetable_id` = '" + timetable_id + "', `patient_id` = '" + patient_id + "', `number` = '" + req.body.number + "' WHERE `voucher`.`id` = '" + id + "'";
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
    deletevoucher: (req, res) => {
        let Id = req.params.id;
        console.log("delete adID:"+ Id);
        let deleteQuery = 'DELETE FROM voucher WHERE id = "' + Id + '"';

        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send("Can not delete news. Please, try later.");
            }
            res.status(204).send();
        });
    }
};
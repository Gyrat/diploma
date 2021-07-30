const mysql = require('mysql');

module.exports = {
    render_main_page:(req, res) =>{
        let querytab = "SELECT * FROM tab";
        let result;

        db.query(querytab, (err, resulttab) => {

            let queryList = "SELECT tab_id, name FROM page";
            db.query(queryList, (err, resultpage) => {

                let queryad = "SELECT * FROM ad";
                db.query(queryList, (err, resultad) => {

                    let querynews = "SELECT * FROM news";
                    db.query(queryList, (err, resultnews) => {
                        res.render('./views/main_page', {tab : resulttab, names : resultpage, ads :resultad,  news: resultnews});
                    });
                });
            });
        });
    }
};

// res.render('manga', {
//     data: manga
//  });
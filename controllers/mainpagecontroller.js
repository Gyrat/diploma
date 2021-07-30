    render_main_page = (req, res) =>{
        if (req.hasOwnProperty('user')){
            db.query('SELECT * FROM patient where patient.id='+req.user.id,(err, resultuser)=>{
                let querytab = "SELECT * FROM tab";
                db.query(querytab, (err, resulttab) => {
        
                    let queryList = "SELECT id, tab_id, name FROM page";
                    db.query(queryList, (err, resultpage) => {
        
                        let queryad = "SELECT * FROM ad";
                        db.query(queryad, (err, resultad) => {
                            
                            let querynews = "SELECT * FROM news";
                            db.query(querynews, (err, resultnews) => {
                                res.render('main_page', {tab : resulttab, names : resultpage, ads :resultad,  news: resultnews, usr:resultuser});
                            });
                        });
                    });
                });
            });

        } else {
            let querytab = "SELECT * FROM tab";
            db.query(querytab, (err, resulttab) => {
    
                let queryList = "SELECT id, tab_id, name FROM page";
                db.query(queryList, (err, resultpage) => {
    
                    let queryad = "SELECT * FROM ad";
                    db.query(queryad, (err, resultad) => {
                        
                        let querynews = "SELECT * FROM news";
                        db.query(querynews, (err, resultnews) => {
                            res.render('main_page', {tab : resulttab, names : resultpage, ads :resultad,  news: resultnews, usr:null});
                        });
                    });
                });
            });
        }

    };

    renderpage = (req, res) => {
        const { id } = req.params;
        let querytab = "SELECT * FROM page WHERE id = " + [id] ;
        console.log(querytab);
        db.query(querytab, (err, result) => {
            console.log(result);
            res.render('page', {data : result});
        });
      }

const router = require('express').Router();
router.get('/', render_main_page);
router.get('/page/:id', renderpage);
module.exports = router;
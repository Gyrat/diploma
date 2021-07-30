const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const { login, register } = require('./api/auth-routes');
const {generateToken, verifyToken, getToken} = require('./cookie');

const { getAd, editAd, getAds, createAd, deleteAd}  = require('./api/ad-routes');
const { getextract, editeextract, getextracts, createextract, deleteextract}  = require('./api/extract-routes');
const { getCabinet, editCabinet, getCabinets, createCabinet, deleteCabinet}  = require('./api/cabinet-routes');
const { getnews, getnew, editnews, createnews, deletenews}  = require('./api/news-routes');
const { gettabs, gettab, edittabs, createtabs, deletetabs}  = require('./api/tab-routes');
const { getspecs, getspec, editspecs, createspecs, deletespecs}  = require('./api/specs-routes');
const { getdoctors, getdoctor, editdoctor, createdoctor, deletedoctor}  = require('./api/doctor-routes');
const { getshifts, getshift, editshift, createshift, deleteshift}  = require('./api/shift-routes');
const { getpages, getpage, editpage, createpage, deletepage}  = require('./api/page-routes');
const { getpatients, getpatient, editpatient, createpatient, deletepatient}  = require('./api/patient-routes');
const { gettimetables, gettimetable, edittimetable, createtimetable, deletetimetable}  = require('./api/timetable-routes');
const { getvouchers, getvoucher, editvoucher, createvoucher, deletevoucher}  = require('./api/voucher-routes');

const {render_main_page} = require('./controllers/main_page');

const jwtMW = exjwt({
    secret: 'super secret'
});

const db = mysql.createConnection ({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'mydb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('Connected to database');
});
global.db = db;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/ad', getAds);
app.get('/ad/:id', getAd);
app.post('/ad/create', createAd);
app.post('/ad/delete/:id', deleteAd);
app.post('/ad/edit/:id', editAd);

app.get('/cabinets', getCabinets);
app.get('/cabinets/:id', getCabinet);
app.post('/cabinets/create', createCabinet);
app.post('/cabinets/delete/:id', deleteCabinet);
app.post('/cabinets/edit/:id', editCabinet);

app.get('/news', getnews);
app.get('/news/:id', getnew);
app.post('/news/create', createnews);
app.post('/news/delete/:id', deletenews);
app.post('/news/edit/:id', editnews);

app.get('/tabs', gettabs);
app.get('/tabs/:id', gettab);
app.post('/tabs/create', createtabs);
app.post('/tabs/delete/:id', deletetabs);
app.post('/tabs/edit/:id', edittabs);

app.get('/specs', getspecs);
app.get('/specs/:id', getspec);
app.post('/specs/create', createspecs);
app.post('/specs/delete/:id', deletespecs);
app.post('/specs/edit/:id', editspecs);

app.get('/doctors', getdoctors);
app.get('/doctors/:id', getdoctor);
app.post('/doctors/create', createdoctor);
app.post('/doctors/delete/:id', deletedoctor);
app.post('/doctors/edit/:id', editdoctor);

app.get('/shifts', getshifts);
app.get('/shifts/:id', getshift);
app.post('/shifts/create', createshift);
app.post('/shifts/delete/:id', deleteshift);
app.post('/shifts/edit/:id', editshift);

app.get('/pages', getpages);
app.get('/pages/:id', getpage);
app.post('/pages/create', createpage);
app.post('/pages/delete/:id', deletepage);
app.post('/pages/edit/:id', editpage);

app.get('/patients', getpatients);
app.get('/patients/:id', getpatient);
app.post('/patients/create', createpatient);
app.post('/patients/delete/:id', deletepatient);
app.post('/patients/edit/:id', editpatient);

app.get('/timetables', gettimetables);
app.get('/timetables/:id', gettimetable);
app.post('/timetables/create', createtimetable);
app.post('/timetables/delete/:id', deletetimetable);
app.post('/timetables/edit/:id', edittimetable);

app.get('/vouchers', getvouchers);
app.get('/vouchers/:id', getvoucher);
app.post('/vouchers/create', createvoucher);
app.post('/vouchers/delete/:id', deletevoucher);
app.post('/vouchers/edit/:id', editvoucher);

app.get('/extracts', getextracts);
app.get('/extracts/:id', getextract);
app.post('/extracts/create', createextract);
app.post('/extracts/delete/:id', deleteextract);
app.post('/extracts/edit/:id', editeextract);

app.post('/login', login);
app.post('/register', register);



const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const maincontrol = require('./controllers/mainpagecontroller');
// static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', getToken, maincontrol);
renderpage = (req, res) => {
if (req.hasOwnProperty('user')){
    db.query('SELECT * FROM patient where patient.id='+req.user.id,(err, resultuser)=>{
        const { id } = req.params;
        let querytab = "SELECT * FROM tab";
        db.query(querytab, (err, resulttab) => {
            let queryList = "SELECT id, tab_id, name FROM page";
            db.query(queryList, (err, resultpage) => {
                let querytab = "SELECT * FROM page WHERE id = " + [id] ;
                db.query(querytab, (err, result) => {
                    res.render('page', {tab : resulttab, names : resultpage, data : result, usr:resultuser});
                });         
            });
        });
    });

} else {
    const { id } = req.params;
    let querytab = "SELECT * FROM tab";
    db.query(querytab, (err, resulttab) => {
        let queryList = "SELECT id, tab_id, name FROM page";
        db.query(queryList, (err, resultpage) => {
            let querytab = "SELECT * FROM page WHERE id = " + [id] ;
            db.query(querytab, (err, result) => {
                res.render('page', {tab : resulttab, names : resultpage, data : result, usr:null});
            });         
        });
    });
}
}
app.get('/page/:id', getToken, renderpage);
renderlogin = (req, res) => {
    
    let querytab = "SELECT * FROM tab";
    db.query(querytab, (err, resulttab) => {
        let queryList = "SELECT id, tab_id, name FROM page";
        db.query(queryList, (err, resultpage) => {
            res.render('login', {tab : resulttab, names : resultpage, usr:null});
        });
    });
}
app.get('/signin',renderlogin);

renderregistr = (req, res) => {    
    let querytab = "SELECT * FROM tab";
    db.query(querytab, (err, resulttab) => {
        let queryList = "SELECT id, tab_id, name FROM page";
        db.query(queryList, (err, resultpage) => {
            res.render('registr', {tab : resulttab, names : resultpage, usr:null});
        });
    });
}

app.get('/signup', renderregistr);

rendervoucher = (req, res) => {    
    db.query('SELECT * FROM patient where patient.id='+req.user.id,(err, resultuser)=>{
    let querytab = "SELECT * FROM tab";
    db.query(querytab, (err, resulttab) => {
        let queryList = "SELECT id, tab_id, name FROM page";
        db.query(queryList, (err, resultpage) => {
            let querySpec = "SELECT * FROM specialization";
            db.query(querySpec, (err, resultspec) => {
                let querydoctor = "SELECT * FROM doctor";
                db.query(querydoctor, (err, resultdoc) => {
                    let querytimemtable = "SELECT timetable.id as table_id, timetable.*,cabinet.* FROM timetable INNER JOIN  cabinet ON timetable.cabinet_id = cabinet.id";
                    db.query(querytimemtable, (err, resulttimetable) => {
                        let queryvoucher = "SELECT * FROM mydb.voucher";
                        db.query(queryvoucher, (err, resultvoucher) => {
                            res.render('voucher', {tab : resulttab, names : resultpage, spec: resultspec, doctor:resultdoc, timetable : resulttimetable, voucher:resultvoucher, usr:resultuser});
                        });
                    }); 
                });
            });
        });
    });
    });
}
app.get('/voucher', verifyToken, rendervoucher);

addvoucher = (req, res) => {
    const timetable_id = req.body.timetable_id;
    const time = req.body.time;
    console.log(time + ' ' + timetable_id);
    db.query("SELECT * FROM voucher where voucher.patient_id='"+req.user.id+"' AND voucher.timetable_id='"+timetable_id+"'" , (err, result)=>{
        if (result[0]){
            res.status(400).render('error', {text : 'У Вас уже заказан талон к данному врачу в данный день'});
            //res.status(400).send('У Вас уже заказан талон к данному врачу в данный день');
            return;
        }
    let querytab = "SELECT * FROM tab";
    db.query(querytab, (err, resulttab) => {
        let queryList = "SELECT id, tab_id, name FROM page";
        db.query(queryList, (err, resultpage) => {
            let querytab = "INSERT INTO `voucher` (time, timetable_id, patient_id, number) VALUES ('" + time + "', '" + timetable_id + "', '" + req.user.id + "','"+ req.body.number+"')";
            db.query(querytab, (err, result) => {
                //console.log(result);
                res.redirect('../acc');
            });         
        });
    });    
    });

}
app.post('/voucher/add', verifyToken, addvoucher);

app.get('/sertificate', verifyToken, (req, res) => {    
    db.query('SELECT * FROM patient where patient.id='+req.user.id,(err, resultuser)=>{    
    let querytab = "SELECT * FROM tab";
    db.query(querytab, (err, resulttab) => {
        let queryList = "SELECT id, tab_id, name FROM page";
        db.query(queryList, (err, resultpage) => {
            res.render('sertificate', {tab : resulttab, names : resultpage, usr:resultuser});
        });
    });
    });
});
app.post('/sertificate', verifyToken, (req, res) => {
        let querytab = "INSERT INTO `card_extract` (patient_id, type, is_done, target) VALUES ('" + req.user.id + "', '" + req.body.type + "', 'не готова','" + req.body.for + "')";
        db.query(querytab, (err, result) => {
            res.redirect('../acc');
        });   
    }
);

app.get('/acc', verifyToken, (req, res) =>{
    db.query('SELECT * FROM patient where patient.id='+req.user.id,(err, resultusr)=>{     
    let querytab = "SELECT * FROM tab";
    db.query(querytab, (err, resulttab) => {
        let queryList = "SELECT id, tab_id, name FROM page";
        db.query(queryList, (err, resultpage) => {
            let queryvoucher ="SELECT voucher.id as delete_id, voucher.*, timetable.*, doctor.* from voucher INNER JOIN timetable on voucher.timetable_id=timetable.id inner join doctor on timetable.doctor_id=doctor.id where voucher.patient_id="+req.user.id;
            db.query(queryvoucher, (err, resultvoucher) => {
                // console.log(resultvoucher);
                let queryextract ="SELECT * FROM card_extract where card_extract.patient_id="+req.user.id;
                db.query(queryextract, (err, resultextract) => {
                    let queryuser ="SELECT * FROM patient where patient.id="+req.user.id;
                    db.query(queryuser, (err, resultuser) => {
                        res.render('account_page', {tab:resulttab, names:resultpage, vouch:resultvoucher, extract:resultextract, resuser:resultuser, usr:resultusr} );
                    });
                });
            });
        });
    });   
    }); 
});
app.post('/acc',verifyToken,(req,res)=>{
    console.log(req.body.ass);
    if (req.body.ass == '2'){
        var querydel = "DELETE FROM card_extract WHERE id = "+req.body.id;
    } else{
        var querydel = "DELETE FROM voucher WHERE id = "+req.body.id;
    }
    console.log(querydel);
    db.query('SELECT * FROM patient where patient.id='+req.user.id,(err, resultusr)=>{ 
    db.query(querydel, (err, resultdel) => {
    console.log(resultdel);
    let querytab = "SELECT * FROM tab";
    db.query(querytab, (err, resulttab) => {
        let queryList = "SELECT id, tab_id, name FROM page";
        db.query(queryList, (err, resultpage) => {
            let queryvoucher ="SELECT voucher.id as delete_id, voucher.*, timetable.*, doctor.* from voucher INNER JOIN timetable on voucher.timetable_id=timetable.id inner join doctor on timetable.doctor_id=doctor.id where voucher.patient_id="+req.user.id;
            db.query(queryvoucher, (err, resultvoucher) => {
                let queryextract ="SELECT * FROM card_extract where card_extract.patient_id="+req.user.id;
                db.query(queryextract, (err, resultextract) => {                    
                    let queryuser ="SELECT * FROM patient where patient.id="+req.user.id;
                    db.query(queryuser, (err, resultuser) => {
                        res.render('account_page', {tab:resulttab, names:resultpage, vouch:resultvoucher, extract:resultextract, resuser:resultuser, usr:resultusr} );
                    });
                });
            });
        });
    });   
    });
    }); 
});
const { register_pat, login_pat } = require('./api/login-routes');
const cookie = require('./cookie');
app.post('/signin', login_pat);
app.post('/signup', register_pat);

app.get('/logout', (req, res) => {
    return res.cookie('token', '', {
        expires: new Date(),
        secure: false, // set to true if your using https
        httpOnly: true,
      }).redirect('/');
});
app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});

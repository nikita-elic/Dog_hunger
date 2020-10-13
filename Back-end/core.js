var express = require("express");
var app = express();

var db = require("./util/dbconn.js");
var token = require("./util/token.js");

var port = process.env.PORT || 8080;

var lang = require("./config.js").lang;

var user = require("./modules/user.js");
var company = require("./modules/company.js");
var admin = require("./modules/admin.js");

db.getConnectionDb();

app.listen(port, () => {
    console.log("ON : " + port);

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Token");
        next();
    });

    app.use(express.json());

    app.post("/interface/lang", (req, res, next) => {
        console.log("Connect");
        res.json({
            event: "interface.lang",
            lang: lang
        });
    });

    app.post("/user/registration", (req, res, next) => {
        console.log("User.Registration");
        user.registration(req, res, next, db);
    });

    app.post("/user/authorization", (req, res, next) => {
        console.log("User.Authorization");
        user.authorization(req, res, next, db);
    });

    app.post("/user/remove", token.verify, (req, res, next) => {
        console.log("User.Remove");
        user.remove(req, res, next, db);
    });

    app.post("/user/edit", token.verify, (req, res, next) => {
        console.log("User.Edit");
        user.edit(req, res, next, db);
    });

    app.post("/user/profile", token.verify, (req, res, next) => {
        console.log("User.Profile");
        user.profile(req, res, next, db);
    });

    app.post("/user/dog/add", token.verify, (req, res, next) => {
        console.log("User.Dog.Add");
        user.dog.add(req, res, next, db);
    });

    app.post("/user/dog/list", token.verify, (req, res, next) => {
        console.log("User.Dog.List");
        user.dog.list(req, res, next, db);
    });

    app.post("/user/dog/delete", token.verify, (req, res, next) => {
        console.log("User.Dog.Delete");
        user.dog.delete(req, res, next, db);
    });

    app.post("/user/dog/update", token.verify, (req, res, next) => {
        console.log("User.Dog.Update");
        user.dog.update(req, res, next, db);
    });

    app.post("/user/dog/one", token.verify, (req, res, next) => {
        console.log("User.Dog.One");
        user.dog.one(req, res, next, db);
    });

    app.post("/user/dog/statistic", token.verify, (req, res, next) => {
        console.log("User.Dog.Statistic");
        user.dog.statistic(req, res, next, db);
    });

    app.post("/user/dog/nutrition", token.verify, (req, res, next) => {
        console.log("User.Dog.Nutrition");
        user.dog.nutrition(req, res, next, db);
    });

    app.post("/user/invitations/list", token.verify, (req, res, next) => {
        console.log("User.Invitations.List");
        user.invitations_list(req, res, next, db);
    });

    app.post("/user/invitations/reply", token.verify, (req, res, next) => {
        console.log("User.Invitations.Reply");
        user.invitations_reply(req, res, next, db);
    });

    app.post("/company/create", token.verify, (req, res, next) => {
        console.log("Company.Create");
        company.create(req, res, next, db);
    });

    app.post("/company/edit", token.verify, (req, res, next) => {
        console.log("Company.Edit");
        company.edit(req, res, next, db);
    });

    app.post("/company/remove", token.verify, (req, res, next) => {
        console.log("Company.Remove");
        company.remove(req, res, next, db);
    });

    app.post("/company/list", token.verify, (req, res, next) => {
        console.log("Company.List");
        company.list(req, res, next, db);
    });

    app.post("/company/view", token.verify, (req, res, next) => {
        console.log("Company.View");
        company.view(req, res, next, db);
    });

    app.post("/company/workers/list", token.verify, (req, res, next) => {
        console.log("Company.Workers.List");
        company.workers.list(req, res, next, db);
    });

    app.post("/company/workers/reassign", token.verify, (req, res, next) => {
        console.log("Company.Workers.Reassign");
        company.workers.reassign(req, res, next, db);
    });

    app.post("/company/workers/fire", token.verify, (req, res, next) => {
        console.log("Company.Workers.Fire");
        company.workers.fire(req, res, next, db);
    });

    app.post("/company/workers/invite", token.verify, (req, res, next) => {
        console.log("Company.Workers.Invite");
        company.workers.invite(req, res, next, db);
    });

    app.post("/admin/user/list", token.verify, (req, res, next) => {
        console.log("Admin.User.List");
        admin.user.list(req, res, next, db);
    });

    app.post("/admin/user/remove", token.verify, (req, res, next) => {
        console.log("Admin.User.Remove");
        admin.user.remove(req, res, next, db);
    });

    app.post("/admin/user/view", token.verify, (req, res, next) => {
        console.log("Admin.User.View");
        admin.user.view(req, res, next, db);
    });

    app.post("/admin/company/list", token.verify, (req, res, next) => {
        console.log("Admin.Company.List");
        admin.company.list(req, res, next, db);
    });

    app.post("/admin/company/remove", token.verify, (req, res, next) => {
        console.log("Admin.Company.Remove");
        admin.company.remove(req, res, next, db);
    });

    app.post("/admin/company/view", token.verify, (req, res, next) => {
        console.log("Admin.Company.View");
        admin.company.view(req, res, next, db);
    });

    app.post("/garden/list", (req, res, next) => {
        console.log("Gardens");
        db.query("SELECT id,info FROM garden WHERE company_id = " + req.body.data.company + ";", (data) => {
            res.json({
                event: "garden.list",
                result: "success",
                data: data
            });
        });
    });

    app.post("/garden/create", (req, res, next) => {
        console.log("Garden");
        db.query("INSERT INTO garden(company_id,info) VALUES(" + req.body.data.company + ",\"" +
            req.body.data.info + "\");", () => {
                res.json({
                    event: "garden.create",
                    result: "success"
                });
            });
    });

    app.post("/program/create", (req, res, next) => {
        console.log("Program");
        db.query("INSERT INTO program(name,user_id,info) VALUES(\"" + req.body.data.name + "\", (SELECT id FROM user " +
            "WHERE login = \"" + req.body.data.login + "\"), \"" + req.body.data.info + "\");", () => {
                res.json({
                    event: "program.create",
                    result: "success"
                });
            });
    });

    app.post('/grape/List', (req, res, next) => {
        console.log('Grape');
        db.query('SELECT * FROM grape', data => {
            if (data.length > 0) {
                res.json({
                    event: 'grape.List',
                    result: 'grape already exists',
                    grape: data
                });
            }
        });
    });

    app.post('/grape/Remove', (req, res, next) => {
        console.log('Grape');
        db.query('DELETE FROM grape where id = ' + req.body.data.id, data => {
            res.json({
                event: 'grape.List',
                result: 'grape already exists',
                grape: data
            });
        });
    });

    app.post('/grape/create', (req, res, next) => {
        console.log('Grape');
        db.query(
            'SELECT id FROM grape WHERE name = "' + req.body.data.name + '";',
            data => {
                if (data.length > 0) {
                    res.json({
                        event: 'grape.create',
                        result: 'grape already exists'
                    });
                } else {
                    db.query(
                        'INSERT INTO grape(kind,name,description) VALUES("' +
                        req.body.data.kind +
                        '","' +
                        req.body.data.name +
                        '", "' +
                        req.body.data.info +
                        '");',
                        () => {
                            res.json({
                                event: 'grape.create',
                                result: 'success'
                            });
                        }
                    );
                }
            }
        );
    });

    app.post("/sensor/create", (req, res, next) => {
        console.log("Sensor");
        db.query("SELECT id FROM sensor WHERE name = \"" + req.body.data.name + "\" AND garden_id = " +
            req.body.data.garden + ";", (data) => {
                if (data.length > 0) {
                    res.json({
                        event: "sensor.create",
                        result: "sensor already exists"
                    });
                }
                else {
                    db.query("INSERT INTO sensor(name,garden_id) VALUES(\"" + req.body.data.name + "\", " +
                        req.body.data.garden + ")", () => {
                            res.json({
                                event: "sensor.create",
                                result: "success"
                            });
                        });
                }
            });
    });

    app.post("/sensor/statistics", (req, res, next) => {
        console.log("Statistics");
        db.query("SELECT time,temp,humidity,wind_speed FROM statistics WHERE garden_id = " +
            req.body.data.garden + " AND sensor_id = (SELECT id FROM sensor WHERE name = \"" +
            req.body.data.name + "\" AND garden_id = \"" + req.body.data.garden + "\");", (data) => {
                res.json({
                    event: "sensor.statistics",
                    result: "success",
                    data: data
                });
            });
    });

    app.post("/sensor/list", (req, res, next) => {
        console.log("Sensors");
        db.query("SELECT id,name FROM sensor WHERE garden_id = " + req.body.data.garden + ";", (data) => {
            res.json({
                event: "sensor.list",
                result: "success",
                data: data
            });
        });
    });

    app.post("/garden/info", (req, res, next) => {
        console.log("Garden");
        db.query("SELECT id,info FROM garden WHERE id = " + req.body.data.garden + ";", (data) => {
            res.json({
                event: "garden.info",
                result: "success",
                data: data
            });
        });
    });

    app.post("/sensor/report", (req, res, next) => {
        if (req.body.report.temp) {
            console.log("Sensor " + req.body.sensor + " reports: temp warning(" + req.body.report.temp.warning_level + ")" +
                ": " + req.body.report.temp.reason + " (" + req.body.report.values.temp + " °C), need " + req.body.report.temp.offer);
        }
        if (req.body.report.humidity) {
            console.log("Sensor " + req.body.sensor + " reports: humidity warning(" + req.body.report.humidity.warning_level + ")" +
                ": " + req.body.report.humidity.reason + " (" + req.body.report.values.humidity + " %), need " + req.body.report.humidity.offer);
        }
        if (req.body.report.wind_speed) {
            console.log("Sensor " + req.body.sensor + " reports: wind speed warning(" + req.body.report.wind_speed.warning_level + ")" +
                ": " + req.body.report.wind_speed.reason + " (" + req.body.report.values.wind_speed + " %), need " + req.body.report.wind_speed.offer);
        }
        db.query("INSERT INTO statistics(time,garden_id,program_id,sensor_id,temp,humidity,wind_speed) VALUES(NOW(), " +
            "(SELECT garden_id FROM sensor WHERE name = \"" + req.body.sensor + "\"), " +
            "(SELECT program_id FROM garden WHERE id = " + "(SELECT garden_id FROM sensor WHERE name = \"" + req.body.sensor + "\")), " +
            "(SELECT id FROM sensor WHERE name = \"" + req.body.sensor + "\"), " + req.body.report.values.temp + ", " +
            req.body.report.values.humidity + ", " + req.body.report.values.wind_speed + ")");
    });

    app.post("/program/list", (req, res, next) => {
        console.log("Programs");
        db.query("SELECT id,name FROM program WHERE user_id = (SELECT id FROM user WHERE login = \"" + req.body.data.login + "\")",
            (data) => {
                res.json({
                    event: "program.list",
                    result: "success",
                    data: data
                });
            });
    });

    app.post("/program/create", (req, res, next) => {
        console.log("Create program");
        db.query("INSERT INTO program(name,info,user_id) VALUES(\"" + req.body.data.name + "\", \"" + req.body.data.info + "\", " +
            "(SELECT id FROM user WHERE login = \"" + req.body.data.login + "\"))", () => {
                res.json({
                    event: "program.create",
                    result: "success"
                });
            });
    });

    app.post("/program/info", (req, res, next) => {
        console.log("Program");
        db.query("SELECT name,info FROM program WHERE id = " + req.body.data.program, (data) => {
            res.json({
                event: "program.info",
                result: "success",
                data: data
            });
        });
    });

    app.post("/program/remove", (req, res, next) => {
        console.log("Remove program");
        db.query("DELETE FROM program WHERE id = " + req.body.data.program, () => {
            res.json({
                event: "program.remove",
                result: "success"
            });
        });
    });

    app.post("/stage/list", (req, res, next) => {
        console.log("Stages");
        db.query("SELECT id,`from`,`to` FROM stage WHERE program_id = " + req.body.data.program, (data) => {
            res.json({
                event: "stage.list",
                result: "success",
                data: data
            });
        });
    });

    app.post("/stage/create", (req, res, next) => {
        console.log("Create stage");
        db.query("INSERT INTO stage(program_id,`from`,`to`,temp,temp_dispersion,temp_info,humidity,humidity_dispersion,humidity_info," +
            "wind_speed,wind_speed_dispersion,wind_speed_info) VALUES(" + req.body.data.program + ",\"" + req.body.data.from + "\", \"" +
            req.body.data.to + "\"," + req.body.data.temp + ", " + req.body.data.temp - dispersion + ", \"" + req.body.data.temp - info + "\", " +
            req.body.data.humidity + ", " + req.body.data.humidity - dispersion + ", \"" + req.body.data.humidity - info + "\", " +
            req.body.data.wind - speed + ", " + req.body.data.wind - speed - dispersion + ", \"" + req.body.data.wind - speed - info + "\")", () => {
                res.json({
                    event: "stage.create",
                    result: "success"
                });
            });
    });

    app.post("/stage/info", (req, res, next) => {
        console.log("Stage");
        db.query("SELECT * FROM stage WHERE id = " + req.body.data.stage, (data) => {
            res.json({
                event: "stage.info",
                result: "success",
                data: data
            });
        });
    });
});
/*
let heartbeat;
let systolicPressure;
let diastolicPressure;
let temp;
let bloodPreasure = "";
let info = "Some info";
let data = {};
let strDate;
let date = new Date(Date.UTC(2020, 4, 1));
var timerId = setInterval(async function () {
    if (date.getUTCMonth() != 4) {
        console.log('stop');
    }
    else {
        //let date = new Date();
        //date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":00";
        let connection = await db.getDb();
        let dataQuery = "";
        dataQuery = await connection.request().query(`SELECT * FROM [dbo].[Dog]`);
        Object.assign(data, dataQuery.recordset);
        for (let i = 0; i < 16; i++) {
            if (data[i].dogSize == "Small")
                heartbeat = await randomInteger(75, 125);
            else if (data[i].dogSize == "Average")
                heartbeat = await randomInteger(55, 125);
            else if (data[i].dogSize == "Large")
                heartbeat = await randomInteger(55, 115);
            systolicPressure = await randomInteger(120, 150);
            diastolicPressure = await randomInteger(60, 90);
            temp = await randomFloat(36, 40)
            bloodPreasure = systolicPressure + "x" + diastolicPressure;
            strDate = date.getUTCFullYear() + '-' + date.getUTCMonth() + '-' + date.getUTCDate() + ' ' + date.getUTCHours() + ':00:00';
            console.log(`INSERT INTO [dbo].[Statistic] ([statTemp],[statBloodPre],[statHeartbeat],[statInfo],[statDateTime],[dogId]) VALUES ('${temp}','${bloodPreasure}','${heartbeat}','${info}','${strDate}','${data[i].dogId}'`)
            dataQuery = await connection.request().query(`INSERT INTO [dbo].[Statistic] ([statTemp],[statBloodPre],[statHeartbeat],[statInfo],[statDateTime],[dogId]) VALUES ('${temp}','${bloodPreasure}','${heartbeat}','${info}','${strDate}','${data[i].dogId}')`);
        }
        date.setUTCHours(date.getUTCHours() + 1);
    }
}, 4000);

async function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

async function randomFloat(min, max) {
    var rand = Math.random() * (max - min) + min;
    return +rand.toFixed(1);
}*/
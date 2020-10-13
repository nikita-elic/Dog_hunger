var token = require("../util/token.js");


exports.registration = async (req, res, next, db) => {
    let connection = await db.getDb();
    let result = await connection.request().query(`INSERT INTO [dbo].[User] ([userName],[userSurname],[userPassword],[userEmail]) VALUES ('${req.body.data.name}', '${req.body.data.surname}', '${req.body.data.email}', '${req.body.data.password}')`);
    res.send(result);
};

exports.authorization = async (req, res, next, db) => {
    let connection = await db.getDb();
    let data = await connection.request().query(`SELECT * FROM [dbo].[User] WHERE [userEmail] = '${req.body.data.email}'`);
    console.log(data.recordset[0]);
    if (data.recordset[0] != undefined) {
        if (req.body.data.password == data.recordset[0].userPassword) {
            let tokenStr = await token.gen(req.body.data);
            res.json({
                event: "user.authorization",
                result: "success",
                token: tokenStr,
                id: data.recordset[0].userId,
                name: data.recordset[0].userName,
                surname: data.recordset[0].userSurname
            });
        }
        else {
            res.sendStatus(404);
        }
    }
    else {
        res.sendStatus(404);
    };
};

exports.edit = (req, res, next, db) => {

};

exports.profile = (req, res, next, db) => {
    db.query(
        "SELECT name, surname, phone, image, language FROM user "
        + "WHERE email = \"" + req.body.data.email + "\"",
        (data) => {
            res.json({
                event: "user.profile",
                result: "success",
                profile: data
            });
        });
};

exports.dog = {
    add: async (req, res, next, db) => {
        let connection = await db.getDb();
        let data = await connection.request().query(`INSERT INTO [dbo].[Dog] ([dogName],[dogInfo],[dogImg],[dogSize],[dogWeight],[userId]) VALUES ('${req.body.data.name}', '${req.body.data.info}', '${req.body.data.img}', '${req.body.data.size}', '${req.body.data.weight}', '${req.body.data.userId}')`);
        res.send(data);
    },
    list: async (req, res, next, db) => {
        let connection = await db.getDb();
        let data = await connection.request().query(`SELECT * FROM [dbo].[Dog] WHERE [userId] = '${req.body.data.userId}'`);
        console.log(data.recordset);
        res.send(data.recordset);
    },
    delete: async (req, res, next, db) => {
        let connection = await db.getDb();
        let data = await connection.request().query(`DELETE FROM [dbo].[Dog] WHERE [dogId] = '${req.body.data.dogId}'`);
        res.send(data);
    },
    update: async (req, res, next, db) => {
        let data;
        let connection = await db.getDb();
        data = await connection.request().query(`UPDATE [dbo].[Dog] SET [dogName] = '${req.body.data.dogName}', [dogInfo] = '${req.body.data.dogInfo}', [dogImg] = '${req.body.data.dogImg}', [dogSize] = '${req.body.data.dogSize}', [dogWeight] = '${req.body.data.dogWeight}' WHERE [dogId] = '${req.body.data.dogId}'`);
        res.send(data);
    },
    one: async (req, res, next, db) => {
        let connection = await db.getDb();
        let data = await connection.request().query(`SELECT * FROM [dbo].[Dog] WHERE [dogId] = '${req.body.data.dogId}'`);
        res.send(data.recordset[0]);
    },
    statistic: async (req, res, next, db) => {
        let connection = await db.getDb();
        let data = await connection.request().query(`SELECT * FROM Statistic WHERE [dogId] = '${req.body.data.dogId}' ORDER BY statDateTime`);
        res.send(data.recordset);
    },
    nutrition: async (req, res, next, db) => {
        let connection = await db.getDb();
        let data = await connection.request().query(`SELECT MIN(statTemp) AS SmallestTemp, MAX(statTemp) AS LargestTemp, min(statHeartbeat) AS SmallestHeartbeat, Max(statHeartbeat) AS LargestHeartbeat FROM Statistic where [dogId] = '${req.body.data.dogId}'`);
        res.send(data.recordset);
    }
}
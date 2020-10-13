exports.user = {
    list : (req, res, next, db) => {
        db.query(
            "SELECT id, name, surname, email FROM user", 
        (data) => {
            res.json({
                event : "admin.user.list",
                result : "success",
                users : data
            });
        });
    },
    remove : (req, res, next, db) => {
        db.query(
            "DELETE FROM user WHERE id = " + req.body.data.user, 
        () => {
            res.json({
                event : "admin.user.remove",
                result : "success"
            });
        });
    },
    view : (req, res, next, db) => {
        db.query(
            "SELECT name, surname, email, language, image, phone FROM user " 
            + "WHERE id = " + req.body.data.user,
        (data) => {
            res.json({
                event : "admin.user.view",
                result : "success",
                user : data
            });
        });
    }
};

exports.company = {
    list : (req, res, next, db) => {
        db.query(
            "SELECT id, name FROM company",
            //, user" 
           // + "WHERE company.user_id = user.id", 
        (data) => {
            res.json({
                event : "admin.company.list",
                result : "success",
                companies : data
            });
        });
    },
    remove : (req, res, next, db) => {
        db.query(
            "DELETE FROM company " 
            + "WHERE id = " + req.body.data.company, 
        () => {
            res.json({
                event : "admin.company.remove",
                result : "success"
            });
        });
    },
    view : (req, res, next, db) => {
        db.query(
            "SELECT company.name AS name, info, email, company.image AS image FROM company, user " 
            + "WHERE id = " + req.body.data.company + " " +
            + "AND company.user_id = user.id",
        (data) => {
            res.json({
                event : "admin.company.view",
                result : "success",
                company : data
            });
        });
    }
};
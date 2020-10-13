exports.create = (req, res, next, db) => {
    db.query(
        "INSERT INTO company(name, info, user_id, image) " 
        + "VALUES(\"" + req.body.data.name + "\"," 
        + "\"" + req.body.data.info + "\"," 
        + "\"" + req.body.data.user_id + "\"," 
        + "\"" + null + "\")", 
    () => {
        res.json({
            event : "company.create",
            result : "success"
        });
    });
};

exports.edit = (req, res, next, db) => {
    db.query(
        "UPDATE company SET name = \"" + req.body.data.name + "\", " 
        + "info = \"" + req.body.data.info + "\", " 
        + "image = \"" + null + "\" " 
        + "WHERE id = " + req.body.data.id,
    () => {
        res.json({
            event : "company.edit",
            result : "success"
        });
    });
};

exports.remove = (req, res, next, db) => {
    db.query(
        "DELETE FROM company " 
        + "WHERE id = " + req.body.data.id,
    () => {
        res.json({
            event : "company.remove",
            result : "success"
        });
    });
};

exports.list = (req, res, next, db) => {
    db.query(
        "SELECT id, name, image FROM company " 
        + "WHERE id IN " 
        + "(SELECT company.id FROM company, user " 
            + "WHERE company.user_id = user.id " 
            + "AND user.email = \"" + req.body.data.email + "\") " 
        + "OR id IN " 
        + "(SELECT company.id FROM company, post, user " 
            + "WHERE post.user_id = user.id "
            + "AND post.company_id = company.id "
            + "AND user.email = \"" + req.body.data.email + "\")", 
    (data) => {
        res.json({
            event : "company.list",
            result : "success",
            companies : data
        });
    });
};

exports.view  = (req, res, next, db) => {
    db.query(
        "SELECT id, name, info, image FROM company WHERE user_id = " + req.body.data.user_id, 
    (data) => {
        res.json({
            event : "company.view",
            result : "success",
            company : data
        });
    }); 
}

exports.workers = {
    list : (req, res, next, db) => {
        db.query(
            "SELECT email, name, surname, post FROM user, post, company " 
            + "WHERE " + req.body.data.user_id + " = user.id " 
            + "AND post.company_id = company.id " 
            + "AND " + req.body.data.user_id + " =company.user_id ", 
        (data) => {
            res.json({
                event : "company.workers.list",
                result : "success",
                workers : data
            });
        });
    },
    reassign : (req, res, next, db) => {
        db.query(
            "UPDATE post SET post = \"" + req.body.data.post + "\" " 
            + "WHERE user_id = " 
            + "(SELECT id FROM user " 
            + "WHERE email = \"" + req.body.data.email + "\") " 
        + "AND company_id = " + req.body.data.company, 
        () => {
            res.json({
                event : "company.workers.reassign",
                result : "success"
            });
        });
    },
    fire : (req, res, next, db) => {
        db.query(
            "DELETE FROM post " 
            + "WHERE user_id = " 
            + "(SELECT id FROM user " 
                + "WHERE email = \"" + req.body.data.email + "\") " 
            + "AND company_id = " + req.body.data.company,
        () => {
            res.json({
                event : "company.workers.fire",
                result : "success"
            });
        });
    },
    invite : (req, res, next, db) => {
        db.query(
            "INSERT INTO post(user_id, company_id, post) " 
            + "VALUES(" + 
            "(SELECT id FROM user " 
                + "WHERE email = \"" + req.body.data.email + "\")," 
            + req.body.data.company + "," 
            + "\"" + req.body.data.post + "\")", 
        () => {
            res.json({
                event : "company.workers.invite",
                result : "success"
            });
        });
    }
};
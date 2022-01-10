const db = require('./../../database/connect_db');

class category_controller {
    get(req, res) {
        let sql = 'SELECT * FROM categories';

        db.query(sql, (errors, response) => {
            if(errors){
                return res.json({
                    message: "Get failed",
                    data: [],
                    status: false,
                })
            }
    
            return res.json({
                message: "Get successfully",
                data: response,
                status: true,
            })
        })
    }

    get_detail(req, res) {
        const { id } = req.params;
        let sql = `SELECT * FROM categories WHERE id = ${id}`;

        db.query(sql, (err, response) => {
            if(err) {
                return res.json({
                    message: "Get category by id = " + id + " failed",
                    data: [],
                    status: false,
                })
            }

            return res.json({
                message: "Get category by id = " + id + " successfully",
                data: response,
                status: true,
            })
        })
    }

    create(req, res) {
        const data_post = req.body;
        if(!data_post.name){
            return res.json({
                message: "Name is require. Please input name.",
                data: [],
                status: false
            })
        }

        let sql = 'INSERT INTO categories SET ?';
        db.query(sql, [data_post], (err, response) => {
            if(err || !response){
                return res.json({
                    message: "Create category failed.",
                    data: [],
                    status: false,
                    errors: err,
                })
            }

            return res.json({
                message: "Create category successfully.",
                data: [{
                    id: response.insertId,
                    name: data_post.name
                }],
                status: true,
            })
        })
    }

    delete(req, res){
        const sql = `DELETE FROM categories WHERE id = ${req.params.id}`;

        db.query(sql, (err, response) => {
            if(err) res.json({
                message: "Delete category failed.",
                data: [],
                status: false,
            })

            return res.json({
                message: "Delete category successfully.",
                data: [],
                status: true,
            })
        })
    }

    update(req, res){
        const data_patch = req.body;
        if(!data_patch.name){
            return res.json({
                message: "Name is require. Please input name.",
                data: [],
                status: false
            })
        }

        let sql = 'UPDATE caategories SET ? WHERE id = ?';
        db.query(sql, [data_patch, req.params.id], (err, response) => {
            if(err || !response){
                return res.json({
                    message: "Update category failed.",
                    data: [],
                    status: false,
                    errors: err,
                })
            }

            return res.json({
                message: "Update category successfully.",
                data: [{
                    id: response.insertId,
                    name: data_patch.name
                }],
                status: true,
            })
        })
    }
}

module.exports = new category_controller;
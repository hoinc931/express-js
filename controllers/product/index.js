const db = require('./../../database/connect_db');
const formidable = require('formidable');
const path = require('path');

class product_controller{
    get(req, res){
        const sql = "SELECT * FROM products";

        db.query(sql, (err, response) => {
            if(err || !response){
                return res.json({
                    message: "Get products failed.",
                    data: [],
                    status: false,
                })
            }

            return res.json({
                message: "Get products successfully",
                data: response,
                status: true,
            })
        })
    }

    get_detail(req, res){
        const { id } = req.params;
        const sql = `SELECT * FROM products WHERE id = ${id}`;

        db.query(sql, (err, response) => {
            if(err || !response){
                return res.json({
                    message: "Get product by id=" + id + " false.",
                    data: [],
                    status: false,
                })
            }

            return res.json({
                message: "Get product by id=" + id + " successfully.",
                data: response,
                status: true,
            })
        })
    }

    create(req, res) {
        let form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, "../../uploads/products");
        form.keepExtensions = true;
        form.maxFieldsSize = 1 * 1024 * 1024;
        form.multiples = true;

        form.parse(req, (err, fields, files) => {
            if(err) return res.json({
                message: "Create failed. Has an error.",
                data: [],
                status: false,
                err: err
            })

            const { name, description, price, category_id } = fields;

            if(!name || !description || !price || !category_id) return res.json({
                message: "Please input all fields.",
                data: [],
                status: false,
            })
            console.log('this is file: ', files)
            // if(files['image'])
            // const upload_file =  files['image'];
            // const find_index = upload_file.path.indexOf('uploads');
            // const cut_path = upload_file.path.slice(find_index);

            // console.log(files.image.path)

            return res.json({
                fields: fields,
                files: files
                // find_index: find_index,
                // cut_path: cut_path,
            })
        })
    }

    delete(req, res){
        const { id } = req.body;
        const sql = "DELETE FROM products WHERE id = " + id;

        db.query(sql, (err, response) => {
            if(err || !response) return res.json({
                message: "Delete product faild.",
                data:[],
                status: false,
            })

            return res.json({
                message: "delete product successfully.",
                data: [],
                status: true,
            })
        })
    }

    update( req, res ) {
        return "abc"
    }
}

module.exports = new product_controller;
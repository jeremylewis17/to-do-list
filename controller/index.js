const formidable = require('formidable');
const { create, get, remove } = require('../model/todo');

exports.create = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
        const { description } = fields;
        if (!fields.description) {
            return res.status(400).json({
                error: 'Description is required'
            });
        }
        try {
            const newTask = await create(description);
            return res.status(201).send({ data: newTask.rows[0] });

        } catch (error) {

            return res.status(400).json({
                error,
            });
        }
    });
};

exports.read = async (req, res) => {
    try {
        const response = await get();
        return res.status(200).json({ data: task.rows });

    } catch (err) {
        return res.status(400).json({ error: err });

    }
};

exports.removeTodo = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'id not provided'});
    }

    try {
        await remove(id);
        res.status(200).json({ data: id });

    } catch (err) {
        res.status(400).json({ err });
    }
};
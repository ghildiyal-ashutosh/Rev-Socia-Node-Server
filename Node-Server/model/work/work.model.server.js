const mongoose = require('mongoose');

const workSchema = require('./work.schema.server')
const workModel = mongoose.model('WorkModel', workSchema );

findAllWorks = () =>
    workModel.find();

findWorkById = (workId) =>
    workModel.find({_id:workId})

deleteWork = (workId) =>
    workModel.remove({_id:workId});

createWork = (work) =>
    workModel.create(work);

module.exports = {
    findAllWorks, findWorkById, deleteWork,createWork
};


const mongoose = require('mongoose');

const userSchema = require('./user.schema.server');

const userModel = mongoose.model('UserModel', userSchema);


findAllUsers = () =>
    userModel.find()

findUserById = (userId) =>
    userModel.findOne({_id:userId});

findUserByCredentials = (username,password) =>
    userModel.findOne({username : username, password : password})

findByUsername = (username) =>
    userModel.findOne({username: username});

createUser = (user) =>
    userModel.create(user)


deleteUser = (userId) =>
    userModel.remove({_id:userId});


updateUser = (user,userId) =>
    userModel.update({
    _id:userId
},{firstName: user.firstName,
    lastName:  user.lastName,
    email:     user.email,
    contact:   user.contact,
        role: user.role,
    })

addWork = (workId,userId) =>

    userModel.update({
        _id : userId
    },{
     $push: {works: workId}}
    )

deleteWork = (workId,userId) =>
    userModel.update({
            _id: userId
        },{
            $pull: {works: workId}}
    )

findWorkForUser = (userId) =>
    userModel.findOne

    ({_id: userId})
              .populate('works')
              .exec()

addReviewer = (userId,reviewerId) =>
    userModel.update({_id:userId}, {
        reviewer:reviewerId
    })






module.exports = {
  findAllUsers, findUserByCredentials,findUserById,findByUsername,
      createUser,deleteUser, updateUser,addWork,deleteWork,findWorkForUser,addReviewer
};
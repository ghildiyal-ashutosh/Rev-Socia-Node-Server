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
},{
    username:  user.username,
    firstName: user.firstName,
    lastName:  user.lastName,
    email: user.email,
    contact: user.contact,
    interest: user.interest,
    role: user.role
})

module.exports = {
  findAllUsers, findUserByCredentials,findUserById,findByUsername,
      createUser,deleteUser, updateUser
};
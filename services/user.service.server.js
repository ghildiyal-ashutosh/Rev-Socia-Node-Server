module.exports = app => {

    const userModel = require('../model/user/user.model.server');

   function findAllUsers(req,res)
    {
        userModel.findAllUsers()
            .then(function (response) {

                if (response !== null)
                {
                    res.send(response);
                }
                else
                    res.send({username: '-1'})

            })
    }

    function findUserById (req,res)
    {
        var userId = req.params.userId;

        userModel.findUserById(userId)
            .then (function (response) {

                if (response !== null)
                {
                    res.send(response);
                }
                else
                    res.send({username: '-1'})

            })
    }

   function logIn (req,res)
    {
        var credentials = req.body;

        userModel.findUserByCredentials(credentials.username, credentials.password)
            .then(function (response) {

                if (response !== null)
                {
                    req.session['currentUser'] = response;
                    req.session['noUser']      = {status : false};
                    res.send(response);
                }
                else
                    res.send({username: '-1'})

            })
    }

   function currentUser(req,res)
    {
        if (req.session.noUser.status)
        {
            res.send({username: '-1'});

        }
        else
            res.send(req.session.currentUser);

    }

   function logout(req,res)
    {


        req.session['noUser'] = {status:true};

        res.send({status:200});
    }

   function deleteUser (req,res)
    {
        var userId = req.params.userId;
        userModel.deleteUser(userId)
            .then(res.send({status:200}));
    }

   function createUser(req,res)
    {
        var user = req.body;

        userModel.createUser(user)
            .then((response) => {
                req.session['currentUser'] = response;
                req.session['noUser'] = {status:false};
                res.send(response);
            })

            }

            function updateUser(req,res) {
       const user = req.body;
       req.session.currentUser.firstName = user.firstName;
                req.session.currentUser.lastName = user.lastName;
                req.session.currentUser.email = user.email;
                req.session.currentUser.contact = user.contact;

                userModel.updateUser(user, req.session.currentUser.id)
                    .then(function (user) {
                        if (user !== null) {
                            res.send(req.session.currentUser);
                        }
                        else
                            res.send({_id: -1})

                    });
            }

            function updateByAdmin(req,res){
           const user = req.body;
           userModel.updateUser(user,user._id).then((function (response) {
               res.send((response));
           }))
            }


  function  findByUsername(req,res)
    {
        var username = req.params.username;
        userModel.findByUsername(username)
            .then((function (response) {
                if (response === null)
                    res.send({username: '-1'})
                else
                    res.send(response);

            }))
    }

    app.get('/api/user', findAllUsers);
   app.get('/api/user/userId/:userId', findUserById);
    app.post('/api/user/login', logIn);
    app.get('/api/user/profile', currentUser);
    app.post('/api/user/logout', logout);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/user', createUser );
    app.put('/api/user', updateUser);
    app.get('/api/user/username/:username', findByUsername);
    app.put('/api/user/updateByAdmin', updateByAdmin);

}
module.exports = app => {

    const workModel = require('../model/work/work.model.server')
    const userModel = require('../model/user/user.model.server')


    function createWork(req,res){
        const work = req.body;
        work.timeStamp = Date();


        const userId = req.session.currentUser._id;

        workModel.createWork(work)
            .then((work) => {
                if(work !== null){
                    userModel.addWork(work._id, userId)
                        .then((response) => {

                            res.send(work);
                        });
                    }
                else
                {
                    res.send({title: '-1'})
                }
            });
    }

    function findWorkById(req,res)
    {
        const workId = req.params.workId;
        workModel.findWorkById(workId)
            .then((work) => {
                if(work !== null)
                {
                    res.send(work);
                }
                else{
                    res.send({title: "-1"})
                }
            });
    }

    function deleteWork(req,res)
    {
        const workId = req.params.workId;
        const userId = req.session.currentUser._id;

        workModel.deleteWork(workId)
            .then(() => {
                userModel.deleteWork(workId,userId).then(
                res.send(({title: "200"})));
            });

    }

    function findAllWork(req,res)
    {
        workModel.findAllWorks()
            .then((works) => res.send(works));
    }

    function findWorkForUser(req,res)
    {
        var userId = req.session.currentUser._id;
        userModel.findWorkForUser(userId)
            .then((function (response) {
                if (response !== null)
                {
                    console.log(response);
                    res.send(response);
                }
                else
                    res.send({username: "-1"});
            }))
    }





    app.post('/api/work', createWork);
    app.get('/api/work', findAllWork);
    app.delete('/api/work/:workId', deleteWork);
    app.get('/api/work/:workId', findWorkById);
    app.get('/api/userWork' , findWorkForUser)
}
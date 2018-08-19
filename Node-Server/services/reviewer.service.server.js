module.exports = app => {
    const mongoose = require('mongoose');
    const reviewerModel = require('../model/reviewer/reviewer.model.server');
    const userModel = require('../model/user/user.model.server')

    function createReviewer(req,res) {
        const reviewer = req.body;
        const userId = req.session.currentUser._id;

        reviewerModel.createReviewer(reviewer)
            .then((reviewer) => {
                if (reviewer !== null) {
                    console.log(reviewer);
                    userModel.addReviewer(userId, reviewer._id)
                        .then((response) => {
                            res.send(reviewer);

                        });
                }
                else
                    res.send({title: "-1"});
            })

    }

    function findReviewerByCategory(req,res)
    {
        const fields = req.body;
        reviewerModel.findReviewerByCategory(fields)
            .then((reviewer) => res.send(reviewer));
    }

    function updateReviewerFields (req,res)
    {
        const fields = req.body;
        const reviewerId = req.params.reviewerId;
        reviewerModel.updateReviewerFields(fields,reviewerId)
            .then((response) => res.send(response));
    }

    function deleteReviewerField(req,res) {
        const field = req.params.field;
        const reviewerId = req.params.reviewerId;
        reviewerModel.deleteReviewerField(field,reviewerId)
            .then((response) => res.send(response));
    }


    function addReviewed(req, res) {
        const submissionId = req.params.submissionId;
        const reviewerId = req.params.reviewerId;
        reviewerModel.addReviewed(submissionId,reviewerId)
            .then((response) => res.send(response));

        }

        function increaseRating(req,res) {
        reviewerModel.increaseRating(req.params.reviewerId)
            .then((response) => res.send(response));

        }

    function decreaseRating(req,res) {
        reviewerModel.increaseRating(req.params.reviewerId)
            .then((response) => res.send(response))

    }

    function findReviewerById(req,res)
    {
        reviewerModel.findReviewerById(req.params.reviewerId)
            .then((response) => res.send(response));
    }

    function findReviewersByRating(req,res) {
        reviewerModel.findReviewerByRating(req.params.rating)
            .then((response) => res.send(response));

    }

    function findAllReviewers (req,res)
    {
        reviewerModel.findAllReviewers()
            .then((response) => res.send(response));
    }



    app.post('/api/reviewer', createReviewer);
    app.get('/api/reviewer/category' , findReviewerByCategory);
    app.get('/api/reviewer/:reviewerId', findReviewerById);
    app.put('/api/reviewer/:reviewerId', updateReviewerFields);
    app.post('/api/reviewer/:reviewerId/submission/:submissionId', addReviewed);
    app.put('/api/reviewer/increaseRating/:reviewerId', increaseRating);
    app.put('/api/reviewer/decreaseRating/:reviewerId', decreaseRating);
    app.get('/api/reviewer/rating/:rating', findReviewersByRating)
    app.get('/api/reviewer', findAllReviewers);
    app.delete('/api/reviewer/:reviewerId/field/:field' , deleteReviewerField)

}
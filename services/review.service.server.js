module.exports = app => {

    const reviewModel = require('../model/review/review.model.server');

    function createReview(req,res) {
        const review = req.body;

        review.timeStamp = Date().substring(0,25);

        console.log(review);
        reviewModel.createReview(review)
            .then((response) => res.send(response));
    }

      function  findReviewForWork(req,res)
    {

            const reviewId = req.params.reviewId;
            const  workId = req.params.workId;

            reviewModel.findReviewForWork(workId, reviewId)
                .then((response) => res.send (response))

    }


   function findReviewForReviewer(req,res)
    {

        const reviewId = req.params.reviewId;
        const  reviewerId = req.params.reviewerId;

        reviewModel.findReviewForReviewer(reviewId,reviewerId)
            .then((response) => res.send (response))

}

   function findAlldReviewsForWork(req,res)
    {


        const workId = req.params.workId;

        reviewModel.findAllReviewsForWork(workId)
            .then((response) => res.send(response))

    }


  function  findAlldReviewsForReviewer(req,res)
    {
        const  reviewerId = req.params.reviewerId;

        reviewModel.findAllReviewsForReviewer(reviewerId)
            .then((response) => res.send (response))

    }

    function findReviewById(req,res) {
        const reviewId = req.params.reviewId;

        reviewModel.findReviewById(reviewId)
            .then((response) => res.send(response));

    }

    function findAllReviews(req,res) {

        reviewModel.findAllReviews()
            .then((response) => res.send(response));

    }


    app.post("/api/review", createReview);
    app.get("/api/review" , findAllReviews);
    app.get("/api/review/:reviewId", findReviewById);
    app.get("/api/review/:reviewId/work/:workId", findReviewForWork);
    app.get("/api/review/:reviewId/reviewer/:reviewerId", findReviewForReviewer);
    app.get("/api/review/work/:workId", findAlldReviewsForWork);
    app.get("/api/review/reviewer/:reviewerId", findAlldReviewsForReviewer);


    }



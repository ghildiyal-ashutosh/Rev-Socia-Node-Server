const mongoose = require('mongoose')

const reviewSchema = require('./review.schema.server');

const reviewModel = mongoose.model('ReviewModel', reviewSchema);


createReview = (review) =>
reviewModel.create(review);

findReviewForWork = (workId,reviewId) =>
    reviewModel.find({work: workId, _id: reviewId})
        .populate('work')
        .populate('reviewer')
        .exec()

findReviewForReviewer = (review, reviewerId) =>
    reviewModel.find({work:workId, _id: reviewerId})
        .populate('work')
        .populate('reviewer')
        .exec()

findAllReviewsForWork = (workId) =>
    reviewModel.find({work:workId})
        .populate('work')
        .populate('reviewer')
        .exec()

findAllReviewsForReviewer = (reviewerId) =>
    reviewModel.find({reviewer:reviewerId})
        .populate('work')
        .populate('reviewer')
        .exec()

findReviewById = (reviewId) =>
    reviewModel.find({_id: reviewId})
        .populate('work')
        .populate('reviewer')
        .exec()

findAllReviews = () =>
    reviewModel.find()
        .populate('work')
        .populate('reviewer')
        .exec()


module.exports = {
    createReview, findReviewForWork,findReviewForReviewer,findAllReviewsForWork,
    findAllReviewsForReviewer,findReviewById,findAllReviews
};


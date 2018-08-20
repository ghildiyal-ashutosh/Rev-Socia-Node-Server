const mongoose = require('mongoose');
const reviewerSchema =  require('./reviewer.schema.server');
const reviewerModel = mongoose.model('ReviewerModel', reviewerSchema);

createReviewer = (reviewer) =>
    reviewerModel.create(reviewer)

findAllReviewers = () =>
    reviewerModel.find()

findReviewerByCategory = (field) =>
    reviewerModel.find({ fields: { $all: field } } )

updateReviewerFields = (fields,reviewerId) =>
    reviewerModel.update(
        {_id: reviewerId},
        {$addToSet: {fields: {$each: fields}}})

deleteReviewerField = (field,reviewerId) =>
    reviewerModel.update(
        {_id: reviewerId},
        {$pull : {fields:field}}
    )



addReviewed = (workId,reviewerId) =>
    reviewerModel.update(
        {_id: reviewerId},
        {$push :{reviewed: workId}})

findReviewerById = (reviewerId) =>
    reviewerModel.findOne({_id: reviewerId});



    increaseRating = (reviewerId) =>
    reviewerModel.update(
    {_id: reviewerId},
    {
        $inc : {rating: +1}
    })

    decreaseRating = (reviewerId) =>
    reviewerModel.update(
        {_id: reviewerId},
        {
            $inc : {rating: -1}
        })

findReviewerByRating = (rating) =>
    reviewerModel.find( { rating: { $gt: rating } } )

module.exports = {
    createReviewer, findReviewerByCategory, updateReviewerFields,
    addReviewed, increaseRating, decreaseRating, findReviewerById,
    findAllReviewers,findReviewerByRating, deleteReviewerField
};


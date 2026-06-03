const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview= async(req,res)=>{
  
  let listing= await Listing.findById(req.params.id);
  let newReview= new Review(req.body.review);

  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);

};

module.exports.destroyReview=async (req, res, next) => {
    try {
        let { id, reviewId } = req.params;
        
        let review = await Review.findById(reviewId).populate("author");
        
        if (!review) {
            req.flash("error", "Review not found!");
            return res.redirect(`/listings/${id}`);
        }

        if (!review.author.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not the author of this review!");
            return res.redirect(`/listings/${id}`);
        }
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        
        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`);

    } catch (err) {
        next(err); 
    }
};
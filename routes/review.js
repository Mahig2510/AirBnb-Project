const express=require("express");
const router= express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const Review= require("../models/review.js");
const {isLoggedIn,isReviewAuthor}= require("../middleware.js");

const reviewController=require("../controllers/reviews.js");
router.post("/", isLoggedIn, reviewController.createReview);

router.delete("/:reviewId", isLoggedIn, reviewController.destroyReview);

module.exports=router;
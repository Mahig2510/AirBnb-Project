const express=require("express");
const router= express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
ExpressError= require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const{isLoggedIn , isOwner}=require("../middleware.js");

const listingController=require("../controllers/listing.js");
const { showListing } = require("../controllers/listing.js");
const multer  = require('multer')
const {storage}= require("../cloudConfig.js"); 
const upload = multer({ storage });

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('image'), wrapAsync(listingController.createListing));


router.route("/:id")
.get( wrapAsync(listingController.showListing)
)
.put( isLoggedIn,isOwner,upload.single('image'), wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing )
);

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm)
);

module.exports= router;
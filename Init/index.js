const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
    initDB(); 
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => {
    let imageUrl = "https://images.unsplash.com/photo-1471922694854-ff1b63b20054";

    if (obj.image) {
      if (typeof obj.image === "object" && obj.image.url) {
        imageUrl = obj.image.url;
      } else if (typeof obj.image === "string") {
        imageUrl = obj.image;
      }
    }

    return {
      ...obj,
      image: {
        url: imageUrl,
        filename: "listingimage"
      },
      owner: "651a2b3c4d5e6f7a8b9c0d1e" 
    };
  });

  await Listing.insertMany(initData.data);
  console.log("Data was initialized with owners successfully!");
};

initDB();
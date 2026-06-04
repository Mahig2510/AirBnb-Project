# Wanderlust

**Wanderlust** is a full-stack travel accommodation platform inspired by Airbnb that enables users to discover, create, review, and manage unique stays across different destinations. The application incorporates secure authentication and authorization, cloud-based image storage, category filtering, search functionality, review management, and ownership-based access control to provide a seamless user experience.

---

## Live Demo

**Deployed Application:**  
[Visit Wanderlust](https://wanderlust-airbnb-a87r.onrender.com/)

🎥 **Project Demo Video:**  
[Watch the Demo](https://drive.google.com/file/d/1586Diij3bVsVGeQYSXgktZSHaKbrMe6I/view?usp=sharing)

---

# Features

## Listings Management

- View all available travel listings.
- Create new listings with image uploads.
- Edit existing listings.
- Delete owned listings.
- Cloudinary integration for image hosting and management.

---

## Authentication & Authorization

- Secure user registration and login using Passport.js.
- Session-based authentication.
- Protected routes for sensitive operations.
- Only authenticated users can:
  - Create listings
  - Add reviews
  - Modify their own content.

---

## Reviews & Ratings

- Add reviews with star ratings.
- View reviews for each listing.
- Delete only reviews authored by the logged-in user.
- Ownership verification ensures secure review management.

---

## Ownership-Based Access Control

- Listing owners can edit or delete only their own listings.
- Review authors can delete only their own reviews.
- Unauthorized actions are restricted through middleware validation.

---

## Category Filtering

Browse listings by categories such as:

- Amazing Pools
- Castles
- Rooms
- Farms
- Arctic
- Mountains
- Camping
- Trending Destinations

---

## Search Functionality

- Search listings by country name.
- Quickly discover accommodations across different destinations.

---

## Tax Inclusive Pricing

- Toggle tax-inclusive pricing.
- Automatically calculates and displays prices including **18% GST**.

---

## User Experience

- Flash messages for successful and failed operations.
- Responsive and intuitive interface.
- Clean and user-friendly listing management workflow.

---

# Tech Stack

## Backend

- Node.js
- Express.js (v5.2.1)

## Database

- MongoDB Atlas
- Mongoose

## Authentication & Session Management

- Passport.js
- Passport Local Strategy
- express-session
- connect-mongo

## Frontend

- EJS
- EJS-Mate
- HTML5
- CSS3
- Bootstrap

## File Upload & Media Management

- Cloudinary
- Multer

## Utilities

- dotenv
- method-override
- connect-flash

---

# Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Mahig2510/AirBnb-Project.git
cd AirBnb-Project
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create a `.env` File

Create a `.env` file in the root directory and add:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

## 4. Start the Application

```bash
node app.js
```

Or using nodemon:

```bash
nodemon app.js
```

## 5. Access the Application

For local development:

```text
http://localhost:8000
```

For the deployed version:

```text
https://wanderlust-airbnb-a87r.onrender.com/
```

---

# Security Features

- Secure authentication using Passport.js.
- Session persistence using MongoDB Store.
- Authorization middleware for ownership verification.
- Protected routes for listings and reviews.
- Environment variable management using dotenv.
- Prevention of unauthorized listing and review modifications.

---

# Deployment

The application is deployed on **Render** and connected to **MongoDB Atlas** for cloud database management.

Live URL:

```text
https://wanderlust-airbnb-a87r.onrender.com/
```

---

# License

This project is intended for educational and portfolio purposes.
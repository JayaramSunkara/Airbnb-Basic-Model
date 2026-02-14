# 🏠 Airbnb Basic Model

[![GitHub last commit](https://img.shields.io/github/last-commit/JayaramSunkara/Airbnb-Basic-Model)](https://github.com/JayaramSunkara/Airbnb-Basic-Model/commits/main)
![GitHub repo size](https://img.shields.io/github/repo-size/JayaramSunkara/Airbnb-Basic-Model)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/JayaramSunkara/Airbnb-Basic-Model)

A simplified full-stack Airbnb-style accommodation booking platform built with Node.js, Express, and EJS templating.

Browse listings, view property details, create new listings, and manage basic CRUD operations.

## Highlights
- **Tech Stack**: Node.js + Express.js + EJS + MongoDB + CSS (tailwind)
- **MVC Architecture**: Clean separation with models, views, controllers, and routes
- **CRUD Operations**: Create, read, update, and delete property listings
- **Dynamic Templating**: Server-side rendered views using EJS
- **File Structure**: Well-organized folders (`configs`, `controllers`, `models`, `public`, `routes`, `views`)
- **Easy to Extend**: Great foundation for adding search filters, booking system, images, maps, etc.

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (MongoDB Atlas cloud)
- [Git](https://git-scm.com/) to clone the repository

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/JayaramSunkara/Airbnb-Basic-Model.git
   cd Airbnb-Basic-Model
2. **Install Dependencies**
   ```bash
   npm install
3. **Setup Environment Variables**
   Create a `.env` file in the `root` directory and add the following:
   ```env
   
   MONGODB_URI=your_mongodb_connection_string
   
   PORT=your_PORT
   
   SESSION_SECRET=your_session_secret
   ```
4. **Create uploads folder in the `root` to store the images that users upload**
5. **Start the app**
   ```bash
   npm start
   ```
6. **Access the app** Open your browser and navigate to http://localhost:3001 (or the port specified in your .env file).

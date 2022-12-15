# REST API for Student Information System

This project is a REST API for a Student Information System developed with Node.js, Express.js, MariaDB (SQL) + Sequelize running on Docker via Linux Ubuntu server on Google Cloud Platform Virtual Machine, Sucrase, Middlewares and more (check the complete tech stack below).

The API has a login system that uses JSON Web Tokens (JWT) to grant access to database-changing features, such as registering a new student, editing data and uploading photos. Only authenticated users with a JWT can add data to and retrieve data from the API.

The Model-View-Controller Architecture was used, except for the the views as this is a backend project.

Insomnia API Client was used to test the HTTP request/response flow.

## Project Demonstration Video

https://drive.google.com/file/d/1g_bnXaKaQPdmv7LAbCg9B3dBRIW3tVv2/view?usp=share_link

## Important Details

The password used to authenticate users in the video has not been kept on the database as a permanent password, it was created for demonstration purposes only.

All photos used in the video to test the file upload feature are under a copyright-free license.

All student data and user data is fictional (full names, email addresses, weight and height). This data was created for testing purposes with [generatedata.com](https://generatedata.com/)

## Implemented Features

+ User registration
+ JSON Web Tokens (JWT) generation for any registered user
+ JSON Web Tokens security: database-changing features only accessible  to users with a login JWT
+ View all registered users
+ View data from a specific user (by ID)
+ User data updating
+ User registry deletion
+ Student registration
+ Student data updating
+ Student registry deletion
+ View all registered students
+ View data from a specific student  (by ID)
+ Student photo upload (one or more)
+ Error handling through error message response

## Technology Stack

+ JavaScript
+ Node.js
+ Express.js
+ Express.js Middlewares
+ Docker
+ MariaDB
+ Google Cloud Platform (GCP)
+ Linux Ubuntu server virtual running on GCP (hosting Docker that contains MariaDB)
+ SSH connecting local machine and GCP Ubuntu server
+ Insomnia API Client to test all API HTTP Resquests/Responses and database behavior accordingly
+ MySQL via MariaDB
+ MySQL Workbench (compatible with MariaDB)
+ Sequelize (javascript-based Object Relational Mapper for MariaDB)
+ Sequelize Migrations
+ Validator via Sequelize
+ Sucrase to allow using ECMAScript Modules within Node.js instead of CommonJS Modules
+ Model-View-Controller Architecture (MVC Framework except Views as it's all backend)
+ bcrypt.js
+ JSON Web Tokens Authentication (JWT)
+ Nodemon
+ Dotenv 
+ EditorConfig
+ ESLint
+ Multer for file upload
+ [generatedata.com](https://generatedata.com/)

# Collabo  

Collabo is a social web application that simplifies the collaboration process. Our goal is to allow users to pitch project ideas and work with like-minded indivudals within their community.

**website** https://collabo-app.herokuapp.com

**Quick Sign In**
* Username: guest
* Password: guest

## Technical Specifications

Collabo follows RESTful routing conventions and implements CRUD to allow users to manage Posts, Updates, and Comments.

**Public Folder** CSS files  

**Views Folder** .ejs files that render all web pages  

**Models Folder** 
* Mongo Schemas
* Embedded data
* Project Schema references Comments Schema and Update Schema
* User Schema references their own Projects and is referenced by Update, Project, and Comment Schemas

**Routes Folder** 
* Handles and renders all user requests
* Middleware used to check if current User is logged in to determine whether or not they can make POST requests
* Middleware to check author of current Project before they make a DELETE request

**NPM Packages used**
* EJS, express, mongoose, body-parser, moment.js
* passport.js (for authentication and security)

## Authors

* **James Chen** - [jimbot](https://github.com/jimbot)
* **Zafir Damani** - [zafird](https://github.com/zafird)
* **Kevin Chung** - [kchung90](https://github.com/kchung90)
* **Tanush Verma** - [TanushParkashVerma](https://github.com/TanushParkashVerma)


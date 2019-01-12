# Collabo  

Collabo is a social web application that simplifies the collaboration process. Our goal is to allow users to pitch project ideas and work with like-minded indivudals within their community.

Collabo follow RESTful routing conventions and implements CRUD to allow users to manage their posts.

website: https://collabo-app.herokuapp.com
github repo: https://github.com/jimbot/collabo

**Sign in with**
* Username: guest
* Password: guest

## Authors

* **James Chen** - [jimbot](https://github.com/jimbot)
* **Zafir Damani** - [zafird](https://github.com/zafird)
* **Kevin Chung** - [kchung90](https://github.com/kchung90)

## Technicals

**Public Folder** CSS files  

**Views Folder** .ejs files that render all web pages  

**Models Folder** 
* Mongo Schemas
* Embedded data
* Project Schema references Comments Schema and Update Schema
* User Schema references their own Projects and is referenced by Update, Project, and Comment Schemas

**Routes Folder** 
* Handles GET, POST and DELETE requests  
* Use of Middleware to check if current User is logged in to determine whether or not they can POST
* Middleware to check author of current Project before they can DELETE

**NPM Packages used**
* EJS, express, mongoose, body-parser, moment.js
* passport.js (for authentication and security)

app.js starting point for server

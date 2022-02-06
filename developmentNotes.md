# A write as you go technical documentation that will be updated frequently

## DataTypes Required

* A user datatype
    * fields for username, email, password and admin specification will be needed
* A post datatype
    * fields for text, thumbs up, thumbs down, comments, site (link), posted by, post date
    * can be further expanded to include things like the pay, contract times or other bells and whistles

## Routes Required

* A login route
* A signup route
* A default homepage 
* A specific page for a posting
* A post job page (can be created as a modal)
* An admin page for managing things

***
## Development To-dos
* create all the necessary routes with the necessary http methods
    * create route for registering a new user
        * password hashing has been incorporated, now we need to know how we are going to index our data so that we can select a unique attribute of users to check that it doesn't exist before saving. We can most likely implement that under the already created pre-save middleware
        * previous issue has been solved, email has been made unique
    * create route for creating a new post
        * some confusion here as to whether get the data from the body or from the form data and how react will send it later.  `will work with body for now`.
        * will have to add a middleware that checks the username of the posted by Id and attaches it to the user object, which also means I will have to update the post schema to hold the necessary data -  DONE
    * create route for deleting a post
* Implement user/browser state management


***
## Timeline
* Implementing the basics of the react app so I can better understand how to structure the back-end
* Working on the getting posts and displaying them logic
* investigating how referencing will affect modeling choice (no relevant information found at the moment)
* Adding a middle-ware pre-save to post to fetch username and making some changes to post schema as well
* working on delete post route
* need to reconsider how router are programmed and which ones can be compiled into one
* removing unnecessay modules and compiling them into general header urls
* unnecessary main routes have been deleted will implement the specific delete routes now
* will use body for authentication now but will be implemented later
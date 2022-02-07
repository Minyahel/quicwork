# A write as you go technical documentation that will be updated frequently

## DataTypes Required

* A user datatype
    * fields for username, email, password and admin specification will be needed
* A post datatype
    * fields for text, thumbs up, thumbs down, comments, site (link), posted by, post date
    * can be further expanded to include things like the pay, contract times or other bells and whistles
* A comment datatype that knows who made the comment and the date the comment was made, can later implement nested likes (likes for comments and subcomments but will need an efficient way to do this) and replies
* A like schema that knows who made the like, we don't need a time of the liking for this

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
* Implement user/browser state management and authentication
* Can serve our own mongodb on remote, will have to look into that tho
* Need to make post liking a toggle logic
* Better implement the authentication logic before the app grows too much that it becomes a hassle to change it later
* Should also check where to use arrow functions and not
* Actual function of next() needs to be checked as well 
***
## Timeline
* Implementing the basics of the react app so I can better understand how to structure the back-end
* Working on the getting posts and displaying them logic
* investigating how referencing will affect modeling choice (no relevant information found at the moment)
* Adding a middle-ware pre-save to post to fetch username and making some changes to post schema as well
* working on delete post route
* need to reconsider how router are programmed and which ones can be compiled into one
* removing unnecessay modules and compiling them into general header urls
* working on the specific post route - DONE
* working on posting comments and likes
* new issue has arisen regarding comments and how they should be saved
* It seems the best way to save the sub-documents is to create new schemas for them. Will do this for likes as well.
* Toggling post like has implemented
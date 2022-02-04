# A write as you go technical documentation that will be updated frequently

## DataTypes Required

* A user datatype
    * fields for username, email, password and admin specification will be needed
* A post datatype
    * fields for text, thumbs up, thumbs down, comments, site (link)
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
    * create route for creating a new post
    * create route for deleting a post
* 
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
* Time to implement the authentication method (cookie and whatnot), so would be best to read about the possible methods to use to do that
* need to make a decision whether to use JWT or sessions for user authentication 
* It appears that JWT's create a huge security issue and keeping a record of them would be neccessary to create a secure system. However, it is still not clear whether the system needs what JWT lacks
* I think the easiest thing to do at the moment would be to implemement it using a session as it seems like it is more secure, will explore jwt technique in another project
* We want to use a production ready session store so will choose one with that regard
* Have decided to use mongodb for the session as well to make things simpler, will checkout redis next time
* Managed to setup the session store on mongodb, will work next to implement the session authentication on all the routes and how to do that
* Figuring out we can attach user information to a session
* Need to know how to secure user identification when storing it in a session cookie
* General Idea of user authentication is working, just need to protect the remaining routes now
* I have created the necessary protection, but it seems like writing a custom middleware would be the best option here, will check
* Have made middleware for authentication, moving onto post routes to perform authentication
* Need to figure out how to make asynchronous code synchronous 
* Need to create a way for either an admin or the respective user to complete some actions
* Need to create middleware that will make sure that comments that are in a post actually exist
* Specifically check out validate method for schemas as that might solve your issue
* Will also start working on branches as I work on features today - this will allow for some preplanning of what feature is being added
* Thinking of working on adding comments next
* I just realized that I did most of my backend work implementing callback functions, which is not bad but interesting to know
* My responses are cryptic as well and I need to work on those as well, as such I should look at the required things that are appropriate to add into responses
* Starting work on the front end
* Currently desinging the front end using figma
* Working to connect client and backend
* Successfuly connected, now fetching posts and displaying them
* Creating necessary routes and related components
* Implemented the login functionality, and the create post functionality 
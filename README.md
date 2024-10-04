# Tudou
Tudou means potatoe in Chinese. 
## Description

Tudou is a full-stack web application designed for German and Chinese students participating in exchange or digital exchange programs. It allows students to continue interacting online, share ideas, post recommendations, and chat in a safe and sustainable way. The application facilitates collaboration on various topics like journalism, coding, and economics, providing a space where students can communicate and engage in discussions.

## User Stories

- **404**: The user will see a 404 page if they attempt to access a page that does not exist, informing them that the page is unavailable.
- **Signup**: The user can sign up on the platform by providing a username, email, and password to create an account.
- **Login**: The user can log in to the platform using their email and password, allowing access to their profile and the ability to interact with the content.
- **Logout**: The user can log out from their session to ensure account security.
- **Create Post**: The user can create new posts in one of three categories: Gallery, Search and Find, and Recommendations. Posts can include optional images uploaded via Cloudinary.
- **List Posts by Category**: The user can view a list of posts filtered by category, providing an organized way to explore posts.
- **Edit/Delete Posts**: The user can edit or delete their own posts. This ensures that they have control over their content.
- **Like Posts**: The user can like a post to show agreement or appreciation for the content.
- **Comment on Posts**: The user can comment on posts to contribute to ongoing discussions.
- **Delete Comments**: The user can delete their own comments from a post.
- **View/Edit/Delete Profile**: The user can view their profile, edit their information (including uploading a profile picture), and delete their account if they choose.
- **View Other Profiles**: The user can view other users' profiles and their posts.
- **Chat**: The user can engage in real-time, private chat conversations with other users.
- **"Fireplace" Live Chat (Planned)**: The platform will support a live chat feature called "Fireplace," allowing users to interact during live events or streams.

---

## Backlog

- **Fireplace (Live Event Chat)**: A planned feature that will enable users to participate in live chats during video streams or live events, allowing real-time engagement.
- **Expanded Chat Features**: Further development of the chat system will include group chats, image/file sharing, and real-time notifications.
- **Selecting Favorites**: Users can be able to select favorites and other users can view them, in a way to encourage conversation by checking if other users have similar interests.

## Client

### Routes

- **/** - Homepage
- **/signup** - Signup form (anon only)
- **/login** - Login form (anon only)
- **/gallery** - Gallery page (private)
- **/searchandfind** - Search and Find page (private)
- **/recommendations** - Recommendation page (private)
- **/createpost** - Create a new post (private)
- **/createpost/:category** - Create a new post under a specific category (private)
- **/posts/:postId** - Post details page (private)
- **/posts/:postId/edit** - Edit a post (private)
- **/posts/author/:authorId** - View all posts by a specific author (private)
- **/profile/:userId** - View a user profile (private)
- **/profile/:userId/edit** - Edit user profile (private)
- **/chat/:chatId** - Real-time chat with another user (private)
- **/*** - Error page (public)

### Pages

- **Home Page**: The main landing page, introducing the platform (public).
- **Signup Page**: The page where users can create an account (anon only).
- **Login Page**: The page where users can log into the platform (anon only).
- **Gallery Page**: Displays posts in the "Gallery" category (private).
- **Search and Find Page**: Displays posts in the "Search and Find" category (private).
- **Recommendation Page**: Displays posts in the "Recommendation" category (private).
- **Create Post Page**: The page for creating a new post (private).
- **Post Details Page**: Displays detailed information about a specific post (private).
- **Post Edit Page**: Allows users to edit their post (private).
- **User Posts Page**: Displays all posts created by a specific author (private).
- **Profile Page**: Displays the user’s profile and their posts (private).
- **Edit Profile Page**: Allows users to edit their profile information (private).
- **Chat Page**: A real-time chat interface with another user (private).
- **Error Page**: Displays a 404 error for unknown routes (public).


## Components

- **PostList Component**: Renders a list of posts filtered by category. It handles fetching and displaying posts based on user selection.
- **PostDetail Component**: Displays the full details of a selected post, including comments, likes, and other interactive features.
- **ChatPage Component**: Provides the user interface for private, real-time chat between users.
- **Navbar Component**: A navigation bar for routing between different sections of the site, such as the homepage, posts, and profiles.
- **ProfilePage Component**: Displays user profile details and includes functionality for editing, deleting, or viewing posts.
- **CreatePost Component**: A form that enables users to submit new posts. Users can attach images using Cloudinary.
- **Spinner Component**: A loading spinner displayed while data is being fetched from the server.
- **UserInfoCard Component**: Displays essential information about a user, including their username and profile picture, typically used in profile and post views.

---
## Technologies
- **Real-Time Communication**: Socket.IO for live chat
- **Multi-Language Support**: i18n (react-i18next) for multiple language options


## Services
- **Auth Service**
  - **auth.signup(user)** - Registers a new user.
  - **auth.login(user)** - Logs in an existing user and returns a JWT token.
  - **auth.logout()** - Logs out the user by clearing the session.
  - **auth.me()** - Retrieves the current authenticated user's profile.

- **Post Service**
  - **post.list(category)** - Fetches posts filtered by the selected category.
  - **post.create(data)** - Creates a new post.
  - **post.detail(id)** - Fetches detailed information about a specific post.
  - **post.update(id, data)** - Updates an existing post.
  - **post.delete(id)** - Deletes a post (author only).

- **Comment Service**
  - **comment.create(postId, data)** - Adds a comment to a post.
  - **comment.delete(commentId)** - Deletes a comment from a post.


## API Endpoints/Backend Routes

### **Authentication**

- **POST /auth/signup**  
  Creates a new user account and optionally uploads a profile picture.

- **POST /auth/login**  
  Logs in a user and returns a JWT token.

- **GET /auth/verify**  
  Verifies and returns the authenticated user’s details.

- **POST /auth/logout**  
  Logs out the user.

### **User**

- **GET /users/:userId**  
  Retrieves the profile of a user by their ID.

- **PUT /users/:userId/edit**  
  Updates the authenticated user’s profile (supports profile picture upload).

- **DELETE /users/:userId/delete**  
  Deletes the authenticated user's profile.

### **Post**

- **POST /posts/create**  
  Creates a new post (with optional image upload).

- **GET /posts**  
  Retrieves posts filtered by category.

- **GET /posts/author/:authorId**  
  Retrieves all posts by a specific author.

- **GET /posts/:id**  
  Retrieves the details of a post by its ID, including comments.

- **PUT /posts/:id/edit**  
  Updates a post (author only).

- **DELETE /posts/:id/delete**  
  Deletes a post (author only).

### **Comments**

- **POST /posts/:id/createComments**  
  Adds a comment to a post.

- **GET /posts/:id/comments**  
  Retrieves comments for a post.

- **DELETE /posts/comments/:commentId**  
  Deletes a comment (author only).

### **Chat**

- **POST /chat**  
  Creates or retrieves a conversation between users.

- **GET /messages/:chatId**  
  Retrieves messages for a conversation.

---

## Models

### **Comment Model**

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    content: {
      type: String,
      required: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    }
  },
  { timestamps: true } 
);

### **User Model**
const userSchema = new Schema(
  {
    first_Name: {
      type: String,
      trim: true,
      required: true,
      unique: false
    },
    last_Name: {
      type: String,
      trim: true,
      required: true,
      unique: false
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      required: false,
      default: 'https://res.cloudinary.com/dfrhg0iqs/image/upload/v1727612051/defaultImage_qicau9.jpg'
      //default: '../public/images/default.jpg'
    }
  },
  { 
    timestamps: true
  }
);


### **Message Model**

let MessageSchema = new Schema({
  sender: {
    ref: 'user',
    type: Schema.Types.ObjectId
  },
  message: String,
  conversationId : {
    ref: 'conversation',
    type: Schema.Types.ObjectId
  } 
}, {
  timestamps: true
})



### **Conversation Model**

let ConversationSchema = new Schema({
  participants: [{
      ref: 'user',
      type: Schema.Types.ObjectId
    },
  ] 
})

### **Post Model**
const postSchema = new Schema({
    category: {
      type: String,
      trim: true,
      required: true,
      enum: ['gallery', 'searchandfind', 'recommendation'], // 'searchandfind' should be a single string
    },
  
    title: {
      type: String,
      required: true,
    },
  
    content: {
      type: String,
      required: true,
    },
  
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // Corrected the ref to 'Comment' and cleaned the syntax
      },
    ],
  
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  
    tags: [
      {
        type: String,
      },
    ],
  
    status: {
      type: String,
      default: 'active', // This is for Search & Find
    },
  
    imageUrl: {
      type: String,

    },
    
  }, { timestamps: true }); // Enabled timestamps for createdAt and updatedAt

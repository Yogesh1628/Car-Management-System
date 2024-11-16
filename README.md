# Car Management Website

Live website deploy link on render : [https://car-management-system-rnl7.onrender.com/](https://car-management-system-rnl7.onrender.com/)

## Description:

This is the API documentation for the Car Management Application. This application allows users to manage their car listings. Users can create, view, edit, and delete their car listings, including uploading images. The application also allows users to sign in and sign up for an account. Authentication is required for all operations involving the user's listings, except for the home page, sign-in, sign-up, and about page.

_**Frontend UI :**_

1\. Add Car - user can create their car collections.  
2\. Get Car List - user can watch their car lists , and delete and update their car lists as well.  
3\. Search - By name , description , tags .  
4\. Profile - User can delete his profile , update his profile data and sign out option .  
5\. Home - Dashboard of our UI .  
6\. About - Where complete details about our project mentioned.

**Backend :**

1. **Node.js**: The backend is built using Node.js, a JavaScript runtime that allows you to execute JavaScript code on the server side. It is event-driven, non-blocking, and asynchronous, which makes it suitable for building scalable applications.
    
2. **Express.js**: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies routing, middleware integration, and request handling, making it the backbone of your API.
    
3. **JWT (JSON Web Tokens)**: JWT is used for user authentication and authorization. It allows for secure transmission of user information between the client and the server in a compact, URL-safe format. Upon login, the server issues a JWT that the client stores and sends with each subsequent request to access protected resources. This ensures stateless authentication, meaning the server doesn't need to keep track of session states.
    
4. **MongoDB Atlas**: MongoDB Atlas is a fully managed cloud database that provides a NoSQL solution to store user and application data. It is highly scalable, flexible, and supports high availability and backups. It integrates seamlessly with Node.js through Mongoose (ORM) to model and interact with the database.
    
5. **Router for Routes**: Express's Router is used to define multiple routes in the backend application. It helps in organizing the routes based on functionality and grouping them logically. You can separate the routes into different files or modules based on the resources, such as authentication, user management, and data handling.
    
6. **Controller for Business Logic**: Controllers are responsible for containing the business logic of the application. They handle the incoming requests, interact with the models (database), and send back the responses. Each controller method corresponds to a specific route and performs actions like creating, reading, updating, or deleting data. This separation of concerns makes the code more modular and maintainable.
    
7. **Middleware**: Express middleware can be used to handle tasks like validating requests, authenticating users with JWT, logging, handling errors, and parsing incoming request bodies (like JSON or form data). For example, a middleware can check if a request contains a valid JWT and only allow access to certain routes if the token is verified.
    
8. **Security**: In addition to JWT, security features like rate limiting, input validation/sanitization, password hashing (using libraries like bcrypt.js), and HTTPS are incorporated to safeguard the application and user data.
    
9. **CORS (Cross-Origin Resource Sharing)**: If the frontend and backend are hosted on different domains, enabling CORS allows the server to define which origins can access the backend, ensuring security when handling cross-origin requests from the frontend.
    
10. **Environment Variables**: Sensitive data, such as the JWT secret, MongoDB URI, and API keys, are stored in environment variables, typically in a `.env` file, to keep them secure and not hardcoded in the application.
    
11. **Error Handling**: A centralized error-handling mechanism is implemented to ensure consistency in the way errors are managed across the application. It catches errors from routes and controllers and sends appropriate error messages to the client.
    
12. **Logging**: Logging is enabled to track requests, errors, and significant application events. Libraries like `winston` or `morgan` can be used to log the HTTP request details or errors, aiding in debugging and monitoring.
    

### Authentication:

- Routes marked as "private" require user authentication, usually handled via session tokens or cookies.
    
- Unauthorized users will be redirected to the sign-in page or receive an error message when trying to access private routes.
    

---

## Public Routes (No Authentication Required)

1. **Home Page**
    
    - **URL:** `http://localhost:5173/`
        
    - **Method:** `GET`
        
    - **Description:** Displays the home page of the application.
        
    - **Usage:** No authentication required.
        
    - **Request Parameters:** None.
        
2. **Sign-In Page**
    
    - **URL:** `http://localhost:5173/sign-in`
        
    - **Method:** `GET`
        
    - **Description:** Displays the sign-in form where users can log in.
        
    - **Usage:** Users must provide valid credentials (email and password).
        
    - **Request Parameters:** None.
        
    - { "email": "[user@example.com](https://mailto:user@example.com)", "password": "userpassword"}
        
3. **Sign-Up Page**
    
    - **URL:** `http://localhost:5173/sign-up`
        
    - **Method:** `GET`
        
    - **Description:** Displays the sign-up form where users can register by entering their name, email, and password.
        
    - **Usage:** Users need to provide their details to create a new account.
        
    - **Request Parameters:** None.
        
    - { "name": "User Name", "email": "[user@example.com](https://mailto:user@example.com)", "password": "userpassword"}
        
4. **About Page**
    
    - **URL:** `http://localhost:5173/about`
        
    - **Method:** `GET`
        
    - **Description:** Displays information about the application.
        
    - **Usage:** Accessible to all users.
        
    - **Request Parameters:** None.
        

---

## Private Routes (Authentication Required)

1. **Search Listings**
    
    - **URL:** `http://localhost:5173/search`
        
    - **Method:** `GET`
        
    - **Description:** Displays the search page where users can search for car listings by keywords or filters.
        
    - **Usage:** Requires user authentication. Query parameters like `keyword` or `filter` can be passed.
        
    - **Request Parameters:**
        
        - `keyword`: The search term to search listings by car name, title, or company name.
            
    - GET [http://localhost:5173/search?searchTerm=BMW](http://localhost:5173/search?searchTerm=BMW)
        
2. **Listing Details**
    
    - **URL:** `http://localhost:5173/listing/:listingId`
        
    - **Method:** `GET`
        
    - **Description:** Displays the details of a specific car listing based on `listingId`.
        
    - **Usage:** Requires user authentication. Replace `:listingId` with the actual ID of the listing.
        
    - **Request Parameters:**
        
        - `listingId`: The ID of the specific car listing to retrieve.
            
    - GET [http://localhost:5173/listing/12345](http://localhost:5173/listing/12345)
        
3. **User Profile**
    
    - **URL:** `http://localhost:5173/profile`
        
    - **Method:** `GET`
        
    - **Description:** Displays the profile page of the logged-in user, including their details and list of car listings.
        
    - **Usage:** Requires user authentication.
        
    - **Request Parameters:** None.
        
    - { "userId": "12345", "name": "John Doe", "email": "[johndoe@example.com](https://mailto:johndoe@example.com)", "listings": \[ { "listingId": "123", "carName": "Toyota Camry", "description": "A well-maintained car", "tags": \["Sedan", "Toyota"\], "images": \["image1.jpg", "image2.jpg"\] } \]}
        
4. **Create Listing**
    
    - **URL:** `http://localhost:5173/create-listing`
        
    - **Method:** `GET`
        
    - **Description:** Displays the form where the logged-in user can create a new car listing.
        
    - **Usage:** Requires user authentication.
        
    - **Request Parameters:**
        
        - `carName`: The name of the car.
            
        - `description`: A brief description of the car.
            
        - `tags`: An array of tags (e.g., car type, brand).
            
        - `images`: An array of image files (max 10 images, max size 2MB each).
            
    - { "carName": "Honda Civic", "description": "A reliable car for city driving.", "tags": \["Sedan", "Honda"\], "images": \["image1.jpg", "image2.jpg"\]}
        
5. **Show User Listings**
    
    - **URL:** `http://localhost:5173/show-listing`
        
    - **Method:** `GET`
        
    - **Description:** Displays all car listings created by the logged-in user.
        
    - **Usage:** Requires user authentication.
        
    - **Request Parameters:** None.
        
    - \[ { "listingId": "123", "carName": "Toyota Corolla", "description": "Well-maintained car with low mileage.", "tags": \["Sedan", "Toyota"\], "images": \["image1.jpg", "image2.jpg"\] }, { "listingId": "124", "carName": "Honda Accord", "description": "Spacious car with great fuel efficiency.", "tags": \["Sedan", "Honda"\], "images": \["image3.jpg", "image4.jpg"\] }\]
        
6. **Update Listing**
    
    - **URL:** `http://localhost:5173/update-listing/:listingId`
        
    - **Method:** `PUT`
        
    - **Description:** Allows the logged-in user to update an existing car listing based on `listingId`.
        
    - **Usage:** Requires user authentication. Replace `:listingId` with the actual ID of the listing.
        
    - **Request Parameters:**
        
        - `listingId`: The ID of the car listing to update.
            
        - `carName`: The updated name of the car.
            
        - `description`: The updated description of the car.
            
        - `tags`: The updated tags for the car.
            
        - `images`: The updated image files for the car (max 10 images, max size 2MB each).
            
    - { "carName": "Updated Toyota Camry", "description": "New description for the car.", "tags": \["Sedan", "Toyota", "Updated"\], "images": \["updatedImage1.jpg", "updatedImage2.jpg"\]}
        

---

## Notes:

- **Private Routes:** These routes require user authentication. Make sure that the user is logged in (using session tokens or cookies) before accessing these endpoints.
    
- **File Uploads:** For the `/create-listing` and `/update-listing/:listingId` routes, users can upload up to 10 images (max size 2MB each). Only valid image formats like `.jpg`, `.png` are allowed.
    
- **Authentication:** If the user is not logged in and tries to access a private route, they will be redirected to the sign-in page or receive an error message.
    

---

---

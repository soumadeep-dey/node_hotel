# Node Hotel Application

![Node.js](https://img.shields.io/badge/JS_Env-Node.js-5FA04E) ![Express.js](https://img.shields.io/badge/Framework-Express.js-blue) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-237a3b) ![Mongoose](https://img.shields.io/badge/ODM-Mongoose-darkred) ![Passport](https://img.shields.io/badge/Local_Authentication-Passport.js-F0D017) ![JWT](https://img.shields.io/badge/Token_Authorization-JWT-red) ![Bcrypt](https://img.shields.io/badge/Password_Hashing-Bcrypt-orange)

#### 🔗 _[Hotel Application API](https://node-hotel-tgrs.onrender.com/)_

The **Hotel** application is a Node.js-based system designed using the Express.js framework, leveraging MongoDB as the primary database and Mongoose as the ODM (Object Data Modeling) tool. It serves as a comprehensive solution for managing personnel (staff) details and menu items within a hotel setting. The application is equipped with robust APIs that facilitate seamless CRUD (Create, Read, Update, Delete) operations for both personnel and menu items, ensuring efficient data management and retrieval.

### Technologies Used:

- **Node.js**: Runtime environment for server-side JavaScript execution.
- **Express.js**: Web application framework for Node.js, facilitating the building of APIs and web applications.
- **MongoDB**: NoSQL database used for storing application data.
- **Mongoose**: ODM library for MongoDB and Node.js, providing schema validation and modeling.
- **Local Authentication**: Implemented using Passport.js for managing authentication via username and password.
- **Token-Based Authentication**: JWT (JSON Web Token) used for authentication and authorization purposes, providing secure access to APIs.
- **Password Hashing**: Utilized bcrypt for securely hashing and storing user passwords.

This project demonstrates best practices in Node.js development, emphasizing scalability, security, and efficient data handling through modern web technologies.

## Endpoints

### Persons

- **Add a Person:**

  - Endpoint: `POST /person`
  - Description: Adds a person to the system with details such as name, role, etc.

- **Get All Persons:**

  - Endpoint: `GET /person`
  - Description: Retrieves a list of all persons in the system.

- **Get Persons by Work Type:**

  - Endpoint: `GET /person/:workType`
  - Description: Retrieves a list of persons based on their work type (e.g., chef, waiter, manager).

- **Update a Person:**

  - Endpoint: `PUT /person/:id`
  - Description: Updates the details of a specific person identified by their ID.

- **Delete a Person:**

  - Endpoint: `DELETE /person/:id`
  - Description: Deletes a person from the system based on their ID.

### Menu Items

- **Add a Menu Item:**

  - Endpoint: `POST /menu`
  - Description: Adds a menu item to the system with details such as name, price, taste, etc.

- **Get All Menu Items:**

  - Endpoint: `GET /menu`
  - Description: Retrieves a list of all menu items in the system.

- **Get Menu Items by Taste:**

  - Endpoint: `GET /menu/:taste`
  - Description: Retrieves a list of menu items based on their taste (e.g., sweet, spicy, sour).

- **Update a Menu Item:**

  - Endpoint: `PUT /menu/:id`
  - Description: Updates the details of a specific menu item identified by its ID.

- **Delete a Menu Item:**

  - Endpoint: `DELETE /menu/:id`
  - Description: Deletes a menu item from the system based on its ID.

## Data Models

### Person

The `Person` data model represents information about staff members in the hotel.

- **Fields:**

  - `name`: String (Person's name)
  - `age`: Number (Person's age)
  - `work`: Enum (Role in the hotel, such as chef, waiter, manager)
  - `mobile`: String (Person's mobile number)
  - `email`: String (Person's email address, unique)
  - `address`: String (Person's address)
  - `salary`: Number (Person's salary)

- **Example:**

  ```json
  {
    "name": "John Doe",
    "age": 30,
    "work": "waiter",
    "mobile": "123-456-7890",
    "email": "john@example.com",
    "address": "123 Main Street",
    "salary": 30000
  }
  ```

### Menu Item

The `MenuItem` data model represents information about menu items available in the hotel.

- **Fields:**

  - `name`: String (Item's name)
  - `price`: Number (Item's price)
  - `taste`: Enum (Item's taste, such as sweet, spicy, sour)
  - `is_drink`: Boolean (Indicates if the item is a drink, default is `false`)
  - `ingredients`: Array of Strings (List of ingredients, default is an empty array)
  - `num_sales`: Number (Number of sales for the item, default is `0`)

- **Example:**

  ```json
  {
    "name": "Spicy Chicken Curry",
    "price": 12.99,
    "taste": "spicy",
    "is_drink": false,
    "ingredients": ["chicken", "spices", "vegetables"],
    "num_sales": 50
  }
  ```

# Expense Tracker 

## Description
The Expense Tracker Application is a user-friendly web application designed to help individuals manage and track their daily, weekly, and monthly expenses with ease.
It provides users with the ability to add, edit, view, and delete their expenses, helping them stay organized and maintain better control over their finances.

## Features

1. User
   - SignUp
   - SignIn
   - Edit

2. Expense
   - Add Expense
   - View Expense
   - Update Expense
   - Delete Expense

3. Expense Prediction 
   - Get expense predictions
   - Get income growth recommendations
   - Get expense category trends

## Technologies Used
   - Node.js
   - Express.js
   - JavaScript
   - REST
   - MongoDB 
   - Authentication: JWT (JSON Web Tokens) 

## Prerequisites
  - Node.js
    ```
    brew install node
    ```
  - MongoDB
    ```
    brew tap mongodb/brew
    brew update
    brew install mongodb-community@8.0
    ```
  - Docker
    ```
    brew install docker
    ```

## **Running Application using Docker**   

### 1. Build Docker Images
   ```
     docker-compose up --build
   ```   
    
## **Local Setup without Docker**

### 1. Check if your mongo is running and if not running use below command 

```
   brew services list
```
```
   brew services start mongodb-community
``` 
      
### 2. Clone the repository: 
   ```
     git clone https://github.com/gaurav637/Expense-Tracker-App
   ```
### 3. Navigate to the project directory:
   ```
       cd Expense-Tracker-App
   ```
### 4. Create a .env file in the your current directory:
   ```
     .env
   ```
### 5. Add below lines in your .env file:
   ```
    PORT=8080
    MONGO_URI=mongodb://localhost:27017/you_db_name
    JWT_SECRET=your-jwt-secret-key
   ```
### 6. Install dependencies:
   ```
    npm install
  ```
### 7. Start the server:
   ```
    npm run dev
   ```

    
## **Git/Github**

### 1. Check the modified files
   ```
    git status
   ```
### 2. Add all changes
   ```
    git add .
   ```
### 3. Commit your changes
   ```
    npm run commit
   ```
- you show different options
    ````
  Select the type of change that you're committing: (Use arrow keys)
    
  feat:     A new feature 
  fix:      A bug fix 
  docs:     Documentation only changes 
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  refactor: A code change that neither fixes a bug nor adds a feature 
  perf:     A code change that improves performance 

### 4. Push code
```
 git push origin -u branch_name 
 ```  

## Tools & Practices Used

Feature	
- **Logger:-**	Integrated a logger (like Winston or custom middleware) for tracking server activities, requests, and errors.
- **Jest:-**	Unit and integration testing framework to ensure code quality and reliability.
- **Husky:-**	Git hooks to automatically run tests, linters, and enforce commit standards before push or commit.
- **ESLint:-** 	Enforces consistent code style and helps catch bugs early with linting rules.
- **CI/CD:-**	Continuous Integration and Deployment pipeline setup for automatic testing and deployments.
- **GitHub Actions:-**	Workflow automation for building, testing, and deploying code on every pull request or push.
- **Branch Management:-**	Standard GitFlow strategy — development, feature branches, hotfix, and release management.



## **Flow of my Code**

<img width="726" alt="Screenshot 2025-04-09 at 8 38 48 PM" src="https://github.com/user-attachments/assets/e630760b-ca34-4320-a392-3f5db5d7a142" />


## Merge Staging to Main Branch 

<img width="1416" alt="Screenshot 2025-04-27 at 6 40 31 PM" src="https://github.com/user-attachments/assets/305dd44b-9c74-42ec-af6d-dbdce79f896b" />



## **API Documents**

### User:- 

### Create a New User

- **Endpoint:** `POST http://localhost:8080/api/user/signup` 
- **Description:** Registers a new user
- **Request Body:**    
  ```json
    {
        "name": "Ankit Sharma",
        "email": "ankit.sharma@example.com",
        "password": "ankit1234",
        "isAvatarImageSet": true,
        "avatarImage": "https://i.pravatar.cc/150?img=3",
        "isEmailVerified": true
    }
  ```
- Response:
- 201 Created 

    ```json
    {
        "message": "User created successfully",
        "user": {
            "user": {
                "name": "Ankit Sharma",
                "email": "ankit.sharma@example.com",
                "password": "$2b$10$nGbYXm9Ff0Wyi3Rxmy3eP.LmmH9OFdyzBdPWQdzCFDiCuG1FlXH9e",
                "isAvatarImageSet": false,
                "avatarImage": "",
                "isEmailVerified": false,
                "_id": "680bb04dfca970ad8ff476a1",
                "createdAt": "2025-04-25T15:54:53.456Z",
                "updatedAt": "2025-04-25T15:54:53.456Z",
                "__v": 0
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGJiMDRkZmNhOTcwYWQ4ZmY0NzZhMSIsImlhdCI6MTc0NTU5NjQ5MywiZXhwIjoxNzQ1NjAwMDkzfQ.wwXMVKFvRz6BpM2lAD25I888liqJ3_P8Tcz78HMx9f0"
        }
    }
   ```

### Login User   

- **Endpoint:** `POST http://localhost:8080/api/user/login` 
- **Description:** Login user
- **Request Body:**    
  ```json
    {
        "email": "ankit.sharma@example.com",
        "password": "ankit1234",
    }
  ```
- Response:
- 200 Login 

    ```json
    {
        "message": "Login successful",
        "statusCode": 200,
        "token": {
            "user": {
                "_id": "680bb04dfca970ad8ff476a1",
                "name": "Ankit Sharma Ji",
                "email": "ankit.sharma@example.com",
                "password": "$2b$10$nGbYXm9Ff0Wyi3Rxmy3eP.LmmH9OFdyzBdPWQdzCFDiCuG1FlXH9e",
                "isAvatarImageSet": false,
                "avatarImage": "",
                "isEmailVerified": false,
                "createdAt": "2025-04-25T15:54:53.456Z",
                "updatedAt": "2025-04-26T05:47:39.859Z",
                "__v": 0
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGJiMDRkZmNhOTcwYWQ4ZmY0NzZhMSIsImlhdCI6MTc0NTY1MjkxNSwiZXhwIjoxNzQ1NjU2NTE1fQ.MXzsX1fkgfny9Ph1UQD7WtmY5DDGPQbpyYeK6w1tVW0"
        }
    }  
   ```

### Update User

- **Endpoint:** `PUT http://localhost:8080/api/user/edit/680bb04dfca970ad8ff476a1` 
- **Description:** Update user by userId
- **Header:**  JWT Token
- **Request Body:**    
  ```json
    {
        "name": "Ankit Sharma Ji"
    }
  ```
- Response:
- 200 Updated 

    ```json
    {
        "message": "User updated successfully",
        "statusCode": 200,
        "updatedUser": {
            "_id": "680bb04dfca970ad8ff476a1",
            "name": "Ankit Sharma Ji",
            "email": "ankit.sharma@example.com",
            "password": "$2b$10$nGbYXm9Ff0Wyi3Rxmy3eP.LmmH9OFdyzBdPWQdzCFDiCuG1FlXH9e",
            "isAvatarImageSet": false,
            "avatarImage": "",
            "isEmailVerified": false,
            "createdAt": "2025-04-25T15:54:53.456Z",
            "updatedAt": "2025-04-26T05:47:39.859Z",
            "__v": 0
        }
    } 
   ```

## Expense

### Add New Expense

- **Endpoint:** `POST http://localhost:8080/api/expense/new` 
- **Description:** Add New Expense
- **Request Body:**    
  ```json
    {
        "description": "Grocery shopping",
        "amount": 2500,
        "type": "expense",
        "category": "Food",
        "date": "2024-04-15T18:30:00.000Z"
    }
  ```
- Response:
- 201 Added 

    ```json
    {
        "message": "Expense added successfully",
        "statusCode": 201,
        "expense": {
            "description": "Grocery shopping",
            "amount": 2500,
            "type": "expense",
            "category": "Food",
            "date": "2024-04-15T18:30:00.000Z",
            "_id": "680c76cc6b36deb8526ec97b",
            "createdAt": "2025-04-26T06:01:48.962Z",
            "updatedAt": "2025-04-26T06:01:48.962Z",
            "__v": 0
        }
    } 
   ```

### Get All Expense

- **Endpoint:** `GET http://localhost:8080/api/expense/get-all` 
- **Description:** Get All Expense

- Response:
- 200 Get All Expense

    ```json
    {
        "message": "3 Exepsne Details Fetched..",
        "statusCode": 200,
        "Expense": [
            {
                "_id": "680c759bd8b1ca57683aeb6b",
                "description": "Monthly salary",
                "amount": 50000,
                "type": "income",
                "category": "Job",
                "date": "2024-04-01T00:00:00.000Z",
                "createdAt": "2025-04-26T05:56:43.080Z",
                "updatedAt": "2025-04-26T05:56:43.080Z",
                "__v": 0
            },
            {
                "_id": "680c75b6d8b1ca57683aeb6d",
                "description": "Grocery shopping 1",
                "amount": 2500,
                "type": "expense",
                "category": "Food",
                "date": "2024-04-15T18:30:00.000Z",
                "createdAt": "2025-04-26T05:57:10.780Z",
                "updatedAt": "2025-04-26T06:09:07.394Z",
                "__v": 0
            },
            {
                "_id": "680c76cc6b36deb8526ec97b",
                "description": "Grocery shopping",
                "amount": 2500,
                "type": "expense",
                "category": "Food",
                "date": "2024-04-15T18:30:00.000Z",
                "createdAt": "2025-04-26T06:01:48.962Z",
                "updatedAt": "2025-04-26T06:01:48.962Z",
                "__v": 0
            }
        ]
    }
   ```   

### Update Expense

- **Endpoint:** `PUT http://localhost:8080/api/expense/edit/680c75b6d8b1ca57683aeb6d` 
- **Description:** Update Expense by Id
- **Request Body:**    
  ```json
    {
        "description": "Grocery shopping 1"
    }
  ```
- Response:
- 200 Updated 

    ```json
    {
        "message": "Expense 680c75b6d8b1ca57683aeb6d updated successfully",
        "statusCode": 200,
        "expense": {
            "_id": "680c75b6d8b1ca57683aeb6d",
            "description": "Grocery shopping 1",
            "amount": 2500,
            "type": "expense",
            "category": "Food",
            "date": "2024-04-15T18:30:00.000Z",
            "createdAt": "2025-04-26T05:57:10.780Z",
            "updatedAt": "2025-04-26T06:09:07.394Z",
            "__v": 0
        }
    } 
   ```

### Delete Expense

- **Endpoint:** `Delete http://localhost:8080/api/expense/delete/680c76cc6b36deb8526ec97b` 
- **Description:** Delete Expense by Id
- Response:
- 200 Updated 

    ```json
    {
        "message": "Expense deleted successfully",
        "statusCode": 200,
        "expense": {
            "_id": "680c76cc6b36deb8526ec97b",
            "description": "Grocery shopping",
            "amount": 2500,
            "type": "expense",
            "category": "Food",
            "date": "2024-04-15T18:30:00.000Z",
            "createdAt": "2025-04-26T06:01:48.962Z",
            "updatedAt": "2025-04-26T06:01:48.962Z",
            "__v": 0
        }
    } 
   ```


### In this project, I have specifically focused on below points :- 

1. I have written clean and maintainable code.

2. I have thoroughly tested my code and have also written basic unit tests. (coverage attached in README file)

3. I have used Docker for containerisation for hassle free setup of this project in any environment.

4. For better commit management and GitHub workflow,  I have integrated Husky to maintain commit message

standards and ensure a better developer  experience. 

5. Additionally, I have implemented GitHub Actions to automate the CI process — so that whenever I push or merge code into the main branch, the quality check workflows automatically run to maintain code quality and consistency.

6. To help understand the project better and for local setup, I have created a detailed and well-structured README file.





## **Contributing**

Contributions are welcome! Please follow these guidelines:

- Fork the repository
- Create a new branch (`git checkout -b feature`)
- Make changes and commit them (`yarn commit`)
- Push to the branch (`git push origin feature`)
- Create a pull request

## **Contact**

For any questions or feedback, please reach out to : negigaurav637@gmail.com

GAURAV NEGI   




🔹 Project Overview

The Course Enrollment System Frontend is a React.js based web application that allows users to view available courses, create and edit courses, and enroll students in courses. This frontend application communicates with a Spring Boot backend using REST APIs.

The main goal of this project is to provide a clean and user-friendly interface for managing course enrollments in a full-stack environment.

🔹 Features

View list of available courses

Create new courses

Edit existing course details

Enroll a student in a course

Dynamic data loading from backend APIs

Proper loading and error handling

🔹 Technologies Used

React.js

JavaScript (ES6)

HTML & CSS

Fetch API

Environment Variables (REACT_APP_API_URL)

🔹 API Integration

The frontend consumes REST APIs provided by the Spring Boot backend.

Example endpoints:

GET /api/courses – Fetch all courses

POST /api/courses – Create a new course

PUT /api/courses/{id} – Update course details

POST /api/enrollments – Enroll a student in a course

The backend base URL is configured using environment variables for flexibility across environments.

🔹 Deployment

Frontend: Deployed on Vercel

Backend: Deployed on Render

The frontend automatically connects to the deployed backend using the configured API base URL.

🔹 Error Handling

Prevents application crashes by validating API responses

Displays meaningful error messages when API calls fail

Handles loading states during data fetch operations

🔹 Conclusion

This frontend project demonstrates:

React component design using hooks

API integration in a real-world application

Full-stack connectivity with a Spring Boot backend

Cloud deployment using Vercel

#Task Manager API
    -A simple RESTful API to manage tasks, allowing users to create, retrieve, update, and delete tasks.

#Overview
    -This project implements a basic task management system where users can:

    -Add new tasks
    -Retrieve a list of tasks or a single task by ID
    -Update the details of an existing task
    -Delete a task by its ID

    The API is built using Node.js and Express.

 #Setup Instructions
    -Prerequisites
         Node.js (v18.x or higher)
         npm (Node Package Manager)



#API Documentation
   -Base URL
   -All requests use the base URL:http://localhost:3000


#Endpoints
1. Create a Task
   -URL: /tasks
   -Method: POST
   -Description: Creates a new task.
   - Requst Body:
         {
            "title": "New Task",
             "description": "Task description",
             "completed": false,
             createdAt: new Date(), // Set creation date to now
             priority: low or high or medium
        }
    -Response:
        -201 Created: The task was successfully created.
        -400 Bad Request: Invalid input data.
2. Get All Tasks
   -URL http://localhost:3000/tasks
   Method:Get.
   -Description: Retrieves all tasks.
   -Response:
      -200 OK: Returns a list of tasks.
3. Get a Task by ID
   -URL: /tasks/:id
   -Method: GET
   -Description: Retrieves a task by its ID.
   -Response:
      -200 OK: Returns the task with the specified ID.
      -404 Not Found: Task not found.
   -Example
      -curl http://localhost:3000/tasks/<task-id>   
4. Update a Task
   -URL: /tasks/:id
   -Method: PATCH
   -Description: Updates a task’s details.
   -Request Body
        {
           "title": "Updated Task Title",
           "description": "Updated description",
            "completed": true,
            createdAt: new Date(), // Set creation date to now
             priority: low or high or medium
        }
  - Response:
      -200 OK: The task was successfully updated.
      -404 Not Found: Task not found.
5. Delete a Task
   -URL: /tasks/:id
   -Method: DELETE
   -Description: Deletes a task by its ID.
   -Response:
      -204 No Content: The task was successfully deleted.
      -404 Not Found: Task not found.
   -Example
      -curl -X DELETE http://localhost:3000/tasks/<task-id>



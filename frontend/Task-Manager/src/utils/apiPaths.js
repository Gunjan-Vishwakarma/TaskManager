export const BASE_URL = "http://localhost:8000";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", //Reegister a new user (admin or member)
    LOGIN: "/api/auth/login", //Authenticate user and return JWT token
    GET_PROFILE: "/api/auth/profile", //Get logged in user details
  },
  USERS: {
    GET_ALL_USERS: "/api/user", //get all users admin only
    GET_USER_BY_ID: (userId) => `/api/user/${userId}`, // get user by id
    CREATE_USER: "/api/user", //create a new user admin only
    UPDATE_USER: (userId) => `/api/user/${userId}`, //update user details
    DELETE_USER: (userId) => `/api/user/${userId}`, //delete user
  },
  TASKS: {
    GET_DASHBOARD_DATA: "/api/task/dashboard-data", //Get dashboard data
    GET_USER_DASHBOARD_DATA: "/api/task/user-dashboard-data", //get user dasboard data
    GET_ALL_TASKS: "/api/task/", //get all task (admin:all, user:Only Assigned task )
    GET_TASK_BY_ID: (taskId) => `/api/task/${taskId}`, //get task by id
    CREATE_TASK: "/api/task/", //create new task (Admin only)
    UPDATE_TASK: (taskId) => `/api/task/${taskId}`, //update task
    DELETE_TASK: (taskId) => `/api/task/${taskId}`, //delete task (admin only)

    UPDATE_TASK_STATUS: (taskId) => `/api/task/${taskId}/status`, ///update task status
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/task/${taskId}/todo`, // update task checkList
  },
  REPORTS: {
    EXPORT_TASKS: "/api/report/export/tasks", //download all task as an excel file
    EXPORT_USERS: "/api/report/export/users", //download user-task report
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};

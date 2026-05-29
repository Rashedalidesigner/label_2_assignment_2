# Issue Tracker REST API

A modern and secure Issue Tracker REST API built with TypeScript, Express.js, PostgreSQL, and JWT Authentication.

This backend project provides complete issue management functionality with authentication, authorization, raw SQL queries, modular architecture, and production-ready deployment support.

---

## Live Demo
https://label-2-assignment-2-pink.vercel.app/
---

## Base API URL
https://label-2-assignment-2-pink.vercel.app/

---

# Project Overview

The Issue Tracker API allows users to:

* Register and login securely
* Create and manage issues
* Update issue status and details
* Control access using role-based authorization
* Protect private routes using JWT authentication

This project was developed following scalable backend architecture principles and assignment requirements.

---

# Technologies Used

* Node.js
* TypeScript
* Express.js
* PostgreSQL
* pg
* JWT Authentication
* bcrypt
* Vercel

---

# Core Features

## Authentication & Security

* JWT-based authentication
* Password hashing with bcrypt
* Protected routes
* Role-based access control
* Secure environment variable management

---

## Issue Management

* Create issues
* Get all issues
* Get single issue by ID
* Update issue information
* Delete issue (maintainer only)

---

## Backend Architecture

* Modular folder structure
* Raw SQL queries using pg
* Reusable middleware system
* TypeScript support
* Production deployment ready

---

# Installation Guide

## Clone Repository

```bash
https://github.com/Rashedalidesigner/label_2_assignment_2/tree/main
```

## Navigate Into Project

```bash
cd LEVEL-02-Assignment-2
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory

# Run Project

## Development Mode

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Production Mode

```bash
npm start
```

---

# API Endpoints

## Authentication Routes

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/auth/signup | Register user |
| POST   | /api/auth/login  | Login user    |

---

## Issue Routes

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| POST   | /api/issues     | Create issue     |
| GET    | /api/issues     | Get all issues   |
| GET    | /api/issues/:id | Get single issue |
| PATCH  | /api/issues/:id | Update issue     |
| DELETE | /api/issues/:id | Delete issue     |

---

# Authorization Rules

| Role        | Permissions            |
| ----------- | ---------------------- |
| contributor | Create & update issues |
| maintainer  | Full issue management  |

---

# Example Request

## Create Issue

```json
{
  "title": "Login API Bug",
  "description": "Server crashes during login request",
  "type": "bug"
}
```

---

# Example Response

```json
{
  "success": true,
  "message": "Issue created successfully",
  "data": {
    "id": 1,
    "title": "Login API Bug",
    "type": "bug"
  }
}
```

---

# Request Headers

Protected routes require JWT token:

```http
Authorization: YOUR_JWT_TOKEN
```

---

# Database Tables

## users

| Column     | Type                |
| ---------- | ------------------- |
| id         | SERIAL PRIMARY KEY  |
| name       | VARCHAR(100)        |
| email      | VARCHAR(100) UNIQUE |
| password   | VARCHAR(255)        |
| role       | VARCHAR(20)         |
| created_at | TIMESTAMP           |

---

## issues

| Column      | Type               |
| ----------- | ------------------ |
| id          | SERIAL PRIMARY KEY |
| title       | VARCHAR(150)       |
| description | TEXT               |
| type        | VARCHAR(30)        |
| status      | VARCHAR(30)        |
| reporter_id | INTEGER            |
| created_at  | TIMESTAMP          |

---

# Folder Structure

```bash
src
│
├── app.ts
├── server.ts
│
├── config
├── db
├── middleware
├── utils
│
└── modules
    ├── auth
    └── issue
```

---

# Best Practices

* Clean code structure
* Centralized error handling
* Reusable middleware
* Environment-based configuration
* Scalable architecture
* Type-safe development

---

# Future Improvements

* Request validation with Zod
* Refresh token system
* API documentation with Swagger
* Pagination & filtering
* Unit & integration testing
* Docker support

---

# Deployment

The project is fully compatible with Vercel deployment.

Required environment variables in Vercel:

* DATABASE_URL
* JWT_SECRET
* JWT_REFRESH_SECRET

---

# Author

## Rashed ali

Backend Developer | MERN Stack Enthusiast

Backend Developer | MERN Stack Developer

# Philove API

Backend API for the **Philove Humanitarian Foundation** website.

The API provides the backend infrastructure for managing projects, posts, events, volunteers, contacts, authentication, and media uploads.

---

## 🚀 Tech Stack

* **Node.js** — JavaScript runtime
* **TypeScript** — Type-safe development
* **Fastify** — Web framework
* **Prisma ORM** — Database access and management
* **PostgreSQL** — Production database
* **Neon** — Hosted PostgreSQL database
* **JWT** — Authentication
* **bcrypt** — Password hashing
* **Cloudinary** — Image/media storage
* **Zod** — Request validation

---

## 📁 Project Structure

```text
philove-api/
│
├── src/
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── middleware/
│   │   └── authenticate.ts
│   │
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── projects.ts
│   │   ├── posts.ts
│   │   ├── events.ts
│   │   ├── volunteers.ts
│   │   ├── contacts.ts
│   │   └── upload.ts
│   │
│   ├── schemas/
│   │   └── ...
│   │
│   ├── app.ts
│   └── server.ts
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── dist/
│   └── ...
│
├── .env
├── .gitignore
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

---

# ⚙️ Getting Started

## Requirements

Before running the API locally, make sure you have:

* Node.js installed
* npm installed
* A PostgreSQL database
* Git installed

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL="your_postgresql_connection_string"

JWT_SECRET="your_jwt_secret"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

PORT=5000
```

### Security

Never commit `.env` to GitHub.

The `.env` file should be included in `.gitignore`.

Never expose:

* Database passwords
* JWT secrets
* Cloudinary API secrets
* Other private credentials

---

# 🗄️ Database

The project uses **Prisma ORM** with PostgreSQL.

The production database is hosted on Neon.

## Validate Prisma Schema

```bash
npx prisma validate
```

## Synchronize Database

```bash
npx prisma db push
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Prisma Studio

To inspect database records locally:

```bash
npx prisma studio
```

---

# 🧑‍💻 Development

Start the API in development mode:

```bash
npm run dev
```

The development server runs using:

```text
src/server.ts
```

The API is configured to run on:

```text
http://localhost:5000
```

---

# 🏗️ Production Build

Compile the TypeScript source:

```bash
npm run build
```

The compiled production files are generated inside:

```text
dist/
```

The production server entry point is:

```text
dist/server.js
```

Start the production build locally with:

```bash
npm start
```

The `package.json` production command is:

```json
"start": "node dist/server.js"
```

---

# 🔐 Authentication

The API uses JWT-based authentication for protected administrative operations.

Passwords are securely hashed using bcrypt before being stored.

Protected routes require a valid JWT token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📡 API Endpoints

The API uses the `/api` prefix for application routes.

---

## Authentication

### Register Admin

```http
POST /api/auth/register
```

Creates an administrator account.

Example request:

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

---

### Login

```http
POST /api/auth/login
```

Authenticates an administrator and returns a JWT token.

Example request:

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

The returned token should be supplied when accessing protected endpoints.

---

# 📂 Projects

Projects represent Philove Foundation initiatives and humanitarian activities.

### Get Projects

```http
GET /api/projects
```

Returns available projects.

---

### Create Project

```http
POST /api/projects
```

Requires authentication.

---

### Update Project

```http
PUT /api/projects/:id
```

Requires authentication.

---

### Delete Project

```http
DELETE /api/projects/:id
```

Requires authentication.

---

# 📝 Posts

Posts are used for news, updates, stories, and other published content.

### Create Post

```http
POST /api/posts
```

Requires authentication.

---

### Get Posts

```http
GET /api/posts
```

Returns published posts.

---

### Get Single Post

```http
GET /api/posts/:id
```

Returns a specific post.

---

### Update Post

```http
PUT /api/posts/:id
```

Requires authentication.

---

### Delete Post

```http
DELETE /api/posts/:id
```

Requires authentication.

---

## Post Data

Posts may contain:

* Title
* Content
* Category
* Image URL
* Cloudinary public ID
* Author

Example:

```json
{
  "title": "Building a Safe Future",
  "content": "Philove Humanitarian Foundation continues...",
  "category": "Community",
  "imageUrl": "https://example.com/image.jpg"
}
```

---

# 📅 Events

Events allow the foundation to manage upcoming and previous activities.

### Get Events

```http
GET /api/events
```

### Create Event

```http
POST /api/events
```

Requires authentication.

### Update Event

```http
PUT /api/events/:id
```

Requires authentication.

### Delete Event

```http
DELETE /api/events/:id
```

Requires authentication.

---

# 🙋 Volunteers

The volunteer system allows website visitors to submit their information to volunteer with the foundation.

### Submit Volunteer Application

```http
POST /api/volunteers
```

### Get Volunteers

```http
GET /api/volunteers
```

Requires authentication.

---

# 📩 Contacts

The contact system receives messages submitted through the website.

### Submit Contact Message

```http
POST /api/contacts
```

### Get Contact Messages

```http
GET /api/contacts
```

Requires authentication.

---

# ☁️ Media Uploads

Images are uploaded to Cloudinary.

### Upload Image

```http
POST /api/upload
```

Requires authentication.

The upload endpoint returns the Cloudinary URL and public ID required for storing media references in the database.

---

# 🛡️ Security

The API includes several security measures:

* Password hashing with bcrypt
* JWT authentication
* Protected administrative routes
* Environment variables for secrets
* PostgreSQL database
* Request validation
* CORS configuration
* Cloudinary-based media storage

Sensitive credentials must never be committed to source control.

---

# 🌍 Production Deployment

The API is designed to run as a Node.js application on a production server.

Current production build:

```bash
npm run build
```

Production startup:

```bash
npm start
```

Production entry point:

```text
dist/server.js
```

### Current hosting architecture

```text
Philove Website
       │
       ▼
   Node.js API
       │
       ▼
   Neon PostgreSQL
       │
       ├── Admins
       ├── Projects
       ├── Posts
       ├── Events
       ├── Volunteers
       └── Contacts
```

### Production hosting

The API will be deployed through the Namecheap/cPanel Node.js environment.

Detailed cPanel deployment instructions and the live API URL will be added after production deployment.

---

# 🧪 Local API Test

After starting the server:

```bash
npm start
```

The API can be tested at:

```text
http://localhost:5000
```

The root endpoint should return:

```json
{
  "message": "Philove API running"
}
```

---

# 🔄 Deployment Workflow

The intended development workflow is:

```text
Local Development
       ↓
GitHub
       ↓
Production Server
       ↓
Node.js API
       ↓
Neon PostgreSQL
```

Changes should be tested locally before being deployed to production.

---

# 📌 Current Status

### Completed

* [x] Fastify API setup
* [x] TypeScript configuration
* [x] Prisma ORM setup
* [x] PostgreSQL/Neon connection
* [x] Database schema synchronization
* [x] Admin authentication
* [x] JWT authentication
* [x] bcrypt password hashing
* [x] Projects API
* [x] Posts API
* [x] Events API
* [x] Volunteers API
* [x] Contacts API
* [x] Cloudinary upload integration
* [x] Production TypeScript build
* [x] Production server tested locally

### In Progress

* [ ] Namecheap/cPanel deployment
* [ ] Production environment variables
* [ ] Live API URL
* [ ] Frontend → production API connection
* [ ] End-to-end production testing
* [ ] Automated API deployment

---

# 🚀 Future Improvements

Potential future improvements include:

* API documentation with Swagger/OpenAPI
* Pagination for posts and projects
* Search and filtering
* Admin dashboard
* Role-based access control
* Improved error logging
* Rate limiting
* Automated testing
* Automated production deployment
* Image optimization
* Email notifications
* Analytics

---

## 👨‍💻 Maintainer

**GRITTECH by Mayor**

Philove Humanitarian Foundation — Backend API

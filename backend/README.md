# Skill Sharing Platform Backend

This backend provides REST APIs for a student skill-sharing platform. It uses Node.js, Express, and MongoDB with Mongoose.

## Setup Instructions

1. Open a terminal in `c:\Users\SAMA\Desktop\FSWD\backend`.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Create a `.env` file from the sample:
   ```powershell
   copy .env.example .env
   ```
4. Start MongoDB locally or update `MONGO_URI` in `.env`.
5. Start the server:
   ```powershell
   npm run dev
   ```
6. The API will be available at `http://localhost:5000`.

## API Endpoints

- `POST /skills` - Create a skill post
- `GET /skills` - Get all skill posts
- `GET /skills/:id` - Get a single post
- `PUT /skills/:id` - Update a post
- `DELETE /skills/:id` - Delete a post
- `POST /skills/:id/like` - Like a post
- `POST /skills/:id/comment` - Add a comment
- `GET /skills/trending` - Get trending posts
- `GET /notifications` - Get notifications

## Testing with Postman

1. Open Postman.
2. Import `postman_collection.json` from the `backend` folder.
3. Use the following sample requests:

### Create Skill
- Method: `POST`
- URL: `http://localhost:5000/skills`
- Body: JSON
  ```json
  {
    "title": "Draw with Color",
    "description": "A step-by-step drawing tutorial for students.",
    "category": "Drawing",
    "image": "https://example.com/drawing.png",
    "videoUrl": "https://example.com/drawing.mp4"
  }
  ```
- Expected response: `201 Created`

### Get All Skills
- Method: `GET`
- URL: `http://localhost:5000/skills`
- Expected response: `200 OK`

### Get Single Skill
- Method: `GET`
- URL: `http://localhost:5000/skills/{id}`
- Expected response: `200 OK`

### Update Skill
- Method: `PUT`
- URL: `http://localhost:5000/skills/{id}`
- Body: JSON
  ```json
  {
    "title": "Updated Drawing Skill",
    "description": "Updated tutorial description."
  }
  ```
- Expected response: `200 OK`

### Delete Skill
- Method: `DELETE`
- URL: `http://localhost:5000/skills/{id}`
- Expected response: `200 OK`

### Like Skill
- Method: `POST`
- URL: `http://localhost:5000/skills/{id}/like`
- Expected response: `200 OK`

### Comment Skill
- Method: `POST`
- URL: `http://localhost:5000/skills/{id}/comment`
- Body: JSON
  ```json
  {
    "user": "Student A",
    "text": "Great tutorial!"
  }
  ```
- Expected response: `201 Created`

### Get Trending Skills
- Method: `GET`
- URL: `http://localhost:5000/skills/trending`
- Expected response: `200 OK`

### Get Notifications
- Method: `GET`
- URL: `http://localhost:5000/notifications`
- Expected response: `200 OK`

## Notes

- The API uses JSON for request and response bodies.
- Error responses include a `message` field, for example when the request is invalid or a resource is not found.

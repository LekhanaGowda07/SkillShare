# Full Stack Setup Guide

This guide will help you set up and run both the backend and frontend of the Skill Sharing Platform.

## Project Structure

```
FSWD/
├── backend/                 # Express.js backend
│   ├── server.js
│   ├── package.json
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   └── .env
└── frontend/                # React frontend
    ├── package.json
    ├── public/
    └── src/
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (running locally or connection string in .env)
- Git

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/skill-sharing
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running:
```bash
# Windows
mongod

# macOS/Linux
sudo mongod
```

### 4. Start Backend Server

```bash
npm run dev
```

You should see:
```
Server is running on port 5001
MongoDB connected: 127.0.0.1
```

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm start
```

The app will automatically open at `http://localhost:3000`

## API Integration

The frontend is configured to communicate with the backend at `http://localhost:5001`.

### Available Endpoints

**Skills:**
- `GET /skills` - Get all skills
- `GET /skills/:id` - Get specific skill
- `POST /skills` - Create new skill
- `PUT /skills/:id` - Update skill
- `DELETE /skills/:id` - Delete skill
- `POST /skills/:id/like` - Like a skill
- `POST /skills/:id/comment` - Add comment

**Notifications:**
- `GET /notifications` - Get all notifications

## Testing the Application

### 1. Open Browser
Navigate to `http://localhost:3000`

### 2. Test Features

#### Browse Skills
- View all shared skills on the home page
- Filter by category
- Search for skills

#### Create Skill
- Click "+ Share Skill" button
- Fill in the form:
  - Title: Skill name
  - Category: Select from dropdown
  - Description: Detailed explanation
  - Image URL: Cover image (optional)
  - Video URL: Tutorial link (optional)
- Click "Publish Skill"

#### Interact with Skills
- ❤️ Like button: Add like to a skill
- 💬 Comment button: Add comments
- 🗑 Delete button: Remove skill (if owner)

### 3. Using Postman (Optional)

1. Open Postman
2. Import `backend/postman_collection.json`
3. Update port from 5000 to 5001 in all requests
4. Test endpoints directly

## Features

### Frontend Features
✨ Modern and responsive UI
🎨 Smooth animations and transitions
📱 Mobile-friendly design
🔍 Search and filter functionality
💬 Comments system
❤️ Like functionality
🎓 Category organization

### Backend Features
🔧 RESTful API
📊 MongoDB integration
🛡️ Error handling
✅ CRUD operations
🔐 Data validation

## Troubleshooting

### Backend won't start
- Check if port 5001 is in use: `netstat -ano | findstr :5001` (Windows)
- Ensure MongoDB is running
- Check .env file configuration

### Frontend won't connect to backend
- Verify backend is running on port 5001
- Check browser console for CORS errors
- Ensure `http://localhost:5001` is accessible

### MongoDB connection issues
- Ensure mongod service is running
- Check connection string in .env
- Try default local connection: `mongodb://127.0.0.1:27017/skill-sharing`

### Port already in use
Change PORT in:
- Backend: `.env` file
- Frontend: `npm start -- --port 3001`

## Performance Tips

1. **Frontend Optimization**
   - React optimization with lazy loading
   - CSS animations use `will-change` for smooth performance
   - Skeleton loading for better UX

2. **Backend Optimization**
   - Database indexing
   - Efficient queries
   - Error middleware for logging

3. **Network Optimization**
   - Compress images before uploading
   - Use CDN for external assets
   - Implement caching strategies

## Development Workflow

1. Backend development with nodemon (auto-reload)
2. Frontend development with React fast refresh
3. Test changes in browser immediately
4. Use browser DevTools for debugging
5. Check backend logs in terminal

## Building for Production

### Backend
```bash
npm start
```

### Frontend
```bash
npm run build
```

Output will be in the `build/` directory

## Security Considerations

1. Never commit `.env` files
2. Validate all user inputs
3. Use HTTPS in production
4. Implement authentication/authorization
5. Add rate limiting to API
6. Sanitize user-generated content

## Next Steps

1. Add user authentication
2. Implement user profiles
3. Add messaging system
4. Create admin dashboard
5. Add email notifications
6. Implement payment system (if needed)

## Support

For issues or questions:
1. Check browser console for errors
2. Check terminal logs
3. Review MongoDB connections
4. Verify API endpoints with Postman

## License

MIT

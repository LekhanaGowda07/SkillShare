# 🚀 Quick Start Guide

Follow these simple steps to run the Skill Sharing Platform:

## Step 1: Backend Setup (Already Running ✅)

Your backend server is already running on **http://localhost:5001**

Check that you see:
```
Server is running on port 5001
MongoDB connected: 127.0.0.1
```

## Step 2: Frontend Installation

The frontend dependencies are currently being installed. Once complete, run:

```bash
cd frontend
npm start
```

This will open the app at **http://localhost:3000**

## Step 3: Test the Application

### Browse Skills
1. Visit http://localhost:3000
2. See all available skills
3. Filter by category or search

### Create a Skill
1. Click **"+ Share Skill"** button
2. Fill in the form:
   - **Title**: Any skill name (e.g., "JavaScript Basics")
   - **Category**: Select from dropdown
   - **Description**: Detailed explanation
   - **Image URL**: (Optional) Any image URL
   - **Video URL**: (Optional) Any video URL
3. Click **"Publish Skill"**

### Interact
- ❤️ **Like**: Click heart to like a skill
- 💬 **Comment**: Click comment to add feedback
- 🗑️ **Delete**: Remove your own skills

## Useful Endpoints

### Test Backend with Postman/curl

**Get all skills:**
```bash
curl http://localhost:5001/skills
```

**Create skill:**
```bash
curl -X POST http://localhost:5001/skills \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Skill",
    "description": "A test skill",
    "category": "Programming"
  }'
```

## Features Included

✨ **Beautiful UI**
- Gradient backgrounds
- Smooth animations
- Responsive design
- Mobile-friendly

🎨 **Interactive Elements**
- Search functionality
- Category filtering
- Real-time updates
- Comment system
- Like counter

📱 **Responsive Layout**
- Works on desktop, tablet, phone
- Touch-friendly buttons
- Adaptive grid system

## File Structure

```
project/
├── backend/
│   ├── server.js          # Backend entry point
│   ├── controllers/       # Route logic
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   └── .env              # Configuration
│
└── frontend/
    ├── src/
    │   ├── App.jsx        # Main app
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   └── api.js         # API integration
    ├── public/            # Static files
    └── package.json       # Dependencies
```

## Troubleshooting

**Frontend won't start?**
```bash
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
npm start
```

**Port already in use?**
```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill

# Kill process on port 5001 (backend)
lsof -ti:5001 | xargs kill
```

**MongoDB not connected?**
```bash
# Make sure MongoDB is running
mongod
```

## Next Steps

1. ✅ Backend - Running
2. ⏳ Frontend - Installing dependencies
3. 🚀 Start frontend - Run `npm start` in frontend folder
4. 🎉 Enjoy the app!

## Support

Check the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed documentation.

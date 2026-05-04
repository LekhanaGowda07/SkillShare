# Skill Sharing Platform - Frontend

A modern, responsive, and animated React frontend for the Skill Sharing Platform.

## Features

✨ **Modern UI Design**
- Beautiful gradient backgrounds and animations
- Smooth transitions and interactive elements
- Responsive design that works on all devices

🎨 **Animations**
- Slide-in effects on page load
- Card hover animations
- Smooth form submissions
- Loading skeletons
- Button interactions

📱 **Responsive Design**
- Mobile-first approach
- Works perfectly on smartphones, tablets, and desktops
- Optimized touch interactions for mobile
- Adaptive grid layouts

🔍 **Key Features**
- Browse all shared skills
- Filter by category
- Search for skills
- Create and share new skills
- Like and comment on skills
- Real-time updates

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Header.css
│   ├── SkillCard.jsx       # Individual skill card
│   ├── SkillCard.css
│   ├── SkillForm.jsx       # Create skill form
│   └── SkillForm.css
├── pages/
│   ├── Home.jsx            # Skills list page
│   ├── Home.css
│   ├── Create.jsx          # Create skill page
├── api.js                  # API service layer
├── App.jsx                 # Main app component
├── index.js                # Entry point
├── index.css               # Global styles
public/
├── index.html              # HTML template
```

## Configuration

The frontend connects to the backend at `http://localhost:5001`. Make sure your backend is running before starting the frontend.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs tests
- `npm eject` - Ejects from create-react-app (irreversible)

## Technologies Used

- React 18.2
- React Router 6.15
- Axios 1.5
- CSS3 with animations
- Modern JavaScript (ES6+)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT

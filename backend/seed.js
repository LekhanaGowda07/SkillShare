const mongoose = require('mongoose');
const Skill = require('./models/Skill');
const dotenv = require('dotenv');

dotenv.config();

const skills = [
  {
    title: "Mastering Digital Illustration",
    description: "Learn how to use Procreate to create stunning digital portraits with vibrant colors and smooth shading techniques.",
    category: "Drawing",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000",
    videoUrl: "https://www.youtube.com/watch?v=7M7vIid-O-k",
    likes: 125,
  },
  {
    title: "React.js for Beginners",
    description: "A comprehensive guide to building your first web app with React. We cover hooks, components, and state management.",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000",
    videoUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
    likes: 340,
  },
  {
    title: "Acoustic Guitar Basics",
    description: "Start your musical journey today! Learn the basic chords (G, C, D, Em) and your first strumming pattern.",
    category: "Music",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=1000",
    videoUrl: "https://www.youtube.com/watch?v=WpT2zZ_8N_Y",
    likes: 89,
  },
  {
    title: "Cinematic Videography",
    description: "Discover how to shoot professional-looking videos using just your smartphone. Lighting and framing tips included.",
    category: "Design",
    image: "https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/412/posts/108771/image-upload/young_videographer_in_casualwear_shooting_commerci_2023_11_27_05_33_48_utc.jpg",
    videoUrl: "https://www.youtube.com/embed/vnd6y6qn27s",
    likes: 210,
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillsharing');
    console.log("Connected to MongoDB...");

    await Skill.deleteMany({});
    console.log("Cleared existing skills...");

    await Skill.insertMany(skills);
    console.log("Seed data inserted successfully!");

    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();

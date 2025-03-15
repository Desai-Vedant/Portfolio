import { Code, Sparkles, Palette } from 'lucide-react';

export const personalInfo = {
  name: 'VEDANT DESAI',
  title: 'A Software Developer with a passion for AI and Machine Learning. Explore my work below.',
  heroStats: [
    { icon: Code, label: 'Languages', value: 'Python, JS, Java' },
    { icon: Sparkles, label: 'Frontend', value: 'HTML, CSS, JS' },
    { icon: Palette, label: 'Focus', value: 'AIML, DL, GenAI' },
  ],
  socialLinks: {
    github: 'https://github.com/Desai-Vedant',
    linkedin: 'https://www.linkedin.com/in/desai-vedant/',
    twitter: 'https://twitter.com/Desai_vedant_10',
  }
};

export const skillsData = [
  {
    category: 'Frontend Development',
    items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material-UI'],
  },
  {
    category: 'Backend Development',
    items: ['Node.js', 'Express.js', 'Python', 'FastAPI', 'RESTful APIs'],
  },
  {
    category: 'Programming Languages',
    items: ['JavaScript', 'Python', 'TypeScript', 'Java', 'C++'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
  },
  {
    category: 'AI & Machine Learning',
    items: ['TensorFlow', 'Scikit-learn', 'NLP', 'Computer Vision'],
  },
  {
    category: 'Other Technologies',
    items: ['Git', 'Linux', 'Pandas', 'Numpy', 'EDA'],
  },
];

export const projectsData = [
  {
    title: 'DOPHelper',
    description: 'Created a Python based Desktop application that helps MPKBY agents (India Post) to automate their tasks of Creating Lists and formatting the reports and creation of declarations. this is made possible with use of PySide6 and Selenium along with openpyxl and pandas.',
    image: 'https://raw.githubusercontent.com/Desai-Vedant/DOPHelper/refs/heads/main/DOPHelperSS.png',
    tags: ['Python', 'Web Automation', 'Selenium', 'PySide6', 'Openpyxl', 'Pandas'],
    link: 'https://github.com/Desai-Vedant/DOPHelper'
  },
  {
    title: 'AIDesk',
    description: 'A powerful Python-based desktop assistant that streamlines computer tasks. Interact through voice or text, perform web searches, open websites, take screenshots, check weather, and get AI-powered responses.',
    image: 'https://raw.githubusercontent.com/Desai-Vedant/AIDesk/refs/heads/main/AIDesk.png',
    tags: ['Python', 'AI', 'Voice Recognition'],
    link: 'https://github.com/Desai-Vedant/AIDesk'
  },{
    title: 'Task Tracker',
    description: 'A simple task tracker app built with MERN tech stack. It allows users to add, delete, and toggle tasks. The tasks are stored in MongoDB Atlas.',
    image: 'https://raw.githubusercontent.com/Desai-Vedant/TaskTracker/0fcf379e180b7d6a61cde7c8be94e7374cc6e3c2/image/README/TaskTrackerPoster.png',
    tags: ['MERN', 'React', 'MongoDB Atlas', 'Express.js'],
    link: 'https://github.com/Desai-Vedant/TaskTracker'
  }
]; 
# Interactive Learning Platform

An interactive web application for learning web development fundamentals (HTML, CSS, and JavaScript) with hands-on practice and quizzes.

## Live Demo

Visit the live application: [Interactive Learning Platform](https://interactive-learning-platform-nu.vercel.app/)

## Screenshots

### Home Page
![Home Page](https://i.imgur.com/your-screenshot-1.png)
*Welcome page with topic selection and navigation*

### Interactive Code Editor
![Code Editor](https://i.imgur.com/your-screenshot-2.png)
*Live code editor with real-time preview*

### Quiz Interface
![Quiz Interface](https://i.imgur.com/your-screenshot-3.png)
*Interactive quiz system with immediate feedback*

### Progress Dashboard
![Progress Dashboard](https://i.imgur.com/your-screenshot-4.png)
*User progress tracking and achievements*

## Features

### Learning Experience
- 📚 **Comprehensive Lessons**: Structured learning paths for HTML, CSS, and JavaScript
- 💻 **Interactive Code Editor**: Real-time code execution with separate HTML, CSS, and JavaScript panels
- ✅ **Quiz System**: Topic-specific quizzes with immediate feedback and score tracking
- 🔐 **User Authentication**: Secure login/signup system with Firebase
- 📊 **Progress Tracking**: Visual progress indicators and achievement badges
- 🎯 **Daily Challenges**: New coding challenges every day
- 💪 **Motivational Quotes**: Inspirational quotes to keep learners motivated

### Technical Features
- ⚡ **Live Code Execution**: Instant feedback on code changes
- 🎨 **Syntax Highlighting**: Code editor with language-specific syntax highlighting
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔒 **Secure Authentication**: Firebase-powered user authentication
- 💾 **Progress Persistence**: Saves user progress and achievements
- 🔄 **Auto-save**: Automatically saves code changes

## Tech Stack

- React.js
- Vite
- Firebase (Authentication & Database)
- CSS3
- JavaScript (ES6+)

## Project Structure

```
interactive-learning-platform/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── SearchResults.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── SecondaryNavbar.jsx
│   │   └── topics/
│   │       ├── CodeEditor.jsx
│   │       ├── LessonContent.jsx
│   │       ├── Quiz.jsx
│   │       └── TopicContent.jsx
│   ├── data/
│   │   └── topics.js
│   ├── App.jsx
│   ├── main.jsx
│   └── firebase.js
├── public/
│   └── assets/
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/interactive-learning-platform.git
   cd interactive-learning-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Sign Up/Login**: Create an account or login to track your progress
2. **Choose a Topic**: Select from HTML, CSS, or JavaScript lessons
3. **Learn**: Read through the lessons and complete the interactive exercises
4. **Practice**: Use the code editor to try out what you've learned
5. **Quiz**: Test your knowledge with topic-specific quizzes
6. **Track Progress**: Monitor your learning journey through the progress dashboard

## Deployment

This project is deployed on Vercel. The deployment process is automated through GitHub integration:

1. Push your changes to the main branch
2. Vercel automatically builds and deploys the application
3. Preview deployments are created for pull requests

To deploy your own version:
1. Fork this repository
2. Create a Vercel account
3. Import your forked repository
4. Add your environment variables in the Vercel dashboard
5. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React.js community
- Firebase team
- All contributors and users of this platform

## Contact

Dhanvith Ventures LLP - [@dhanvithventures](https://twitter.com/dhanvithventures)
Project Link: [https://github.com/dhanvithventures/interactive-learning-platform](https://github.com/dhanvithventures/interactive-learning-platform)

# StudyConnect AI - Alumni Matchmaker

An AI-powered platform to match prospective students with alumni based on their profiles, helping students make informed decisions about their educational journey.

## 🚀 Features

- **Smart Matching Algorithm**: Uses AI to match students with relevant alumni
- **Profile Analysis**: Analyzes LinkedIn profiles and student preferences
- **Match Breakdown**: Detailed scoring based on skills, experience, location, and more
- **Email Generation**: AI-powered personalized outreach email generation
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui components
- Vite for build tooling
- React Query for data fetching
- Wouter for routing

### Backend
- Python 3.11
- Flask web framework
- SQLAlchemy ORM
- PostgreSQL database
- Gunicorn WSGI server

### Deployment
- Render (Web Service + PostgreSQL)
- Automatic deployments from GitHub

## 📦 Project Structure

```
StudyConnectAIA/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and config
│   │   └── hooks/         # Custom React hooks
│   └── index.html
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── package.json          # Node.js dependencies
├── render.yaml           # Render deployment config
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- PostgreSQL (for production) or SQLite (for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd StudyConnectAIA
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   export DATABASE_URL=postgresql://localhost/studyconnect
   export SECRET_KEY=your-secret-key
   export FLASK_ENV=development
   ```

5. Build the frontend:
   ```bash
   npm run build
   ```

6. Run the application:
   ```bash
   python app.py
   ```

7. Open your browser to `http://localhost:5000`

## 🚀 Deployment

This project is configured for deployment on Render. See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically deploy using `render.yaml`

## 📝 API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/username/:username` - Get user by username

## 🔧 Development

### Frontend Development

```bash
# Start Vite dev server
npm run dev
```

### Backend Development

```bash
# Run Flask in development mode
export FLASK_ENV=development
python app.py
```

### Build for Production

```bash
# Build frontend
npm run build

# Start production server
gunicorn app:app
```

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
pytest
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- shadcn/ui for the beautiful component library
- Render for the hosting platform
- The open-source community

---

Built with ❤️ for students worldwide


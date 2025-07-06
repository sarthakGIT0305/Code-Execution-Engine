# Code-Execution-Engine

A full-stack web application that enables users to write, compile, and execute Python and C++ code directly in the browser with real-time output and test case validation.

## 🚀 Features

- **Multi-language Support**: Execute Python and C++ code seamlessly
- **Real-time Code Execution**: Instant feedback with stdout and stderr capture
- **Test Case Validation**: Compare program output against expected results
- **Security**: Isolated code execution with timeout handling
- **Clean UI**: Responsive design with integrated Monaco code editor
- **Dockerized Deployment**: Easy deployment with Docker containers

## 🛠️ Tech Stack

### Backend
- **FastAPI**: High-performance REST API framework
- **Python**: Core backend language
- **Docker**: Containerization for consistent deployment
- **Subprocess**: Secure code execution in isolated processes

### Frontend
- **React.js**: Modern UI library for dynamic interfaces
- **Monaco Editor**: VS Code-powered code editor
- **Axios**: HTTP client for API communication
- **Vite**: Fast build tool and development server

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- Docker & Docker Compose
- Git

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/code-execution-engine.git
   cd code-execution-engine
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Local Development

#### Backend Setup
```bash
cd main_project_files/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Frontend Setup
```bash
cd main_project_files/frontend
npm install
npm run dev
```

## 🔧 API Documentation

### Execute Code
**POST** `/run`

**Request Body:**
```json
{
  "code": "print('Hello, World!')",
  "language": "python",
  "input": "",
  "expected_output": "Hello, World!"
}
```

**Response:**
```json
{
  "output": "Hello, World!",
  "errors": "",
  "passed": true
}
```

### Supported Languages
- `python` - Python 3.10+
- `cpp` - C++ (compiled with g++)

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   React.js      │◄───────────────►│   FastAPI       │
│   Frontend      │                 │   Backend       │
│                 │                 │                 │
│ • Monaco Editor │                 │ • Code Execution│
│ • Test Cases    │                 │ • Subprocess    │
│ • Real-time UI  │                 │ • Security      │
└─────────────────┘                 └─────────────────┘
```

## 🔒 Security Features

- **Isolated Execution**: Code runs in temporary files with subprocess isolation
- **Timeout Protection**: 5-second execution limit prevents infinite loops
- **Resource Management**: Automatic cleanup of temporary files
- **Error Handling**: Comprehensive error capture and sanitization

## 📊 Use Cases

- **Educational**: Learn programming with instant feedback
- **Interview Practice**: Solve coding problems with test validation
- **Quick Testing**: Test code snippets without local setup
- **Competitive Programming**: Practice with multiple test cases

## 🚀 Deployment

### Production Deployment
The application is containerized and ready for cloud deployment:

1. **Build production images**
   ```bash
   docker-compose build
   ```

2. **Deploy to cloud platforms**
   - AWS ECS/Fargate
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform

### Environment Configuration
- Frontend: Configurable API base URL
- Backend: Environment-specific settings for production

## 📈 Future Enhancements

- [ ] Additional language support (Java, JavaScript, Go)
- [ ] User authentication and code saving
- [ ] Real-time collaboration features
- [ ] Advanced test case management
- [ ] Performance metrics and analytics
- [ ] Code sharing and embedding

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sarthak Gupta**
- Email: sarthakgupta0305@gmail.com
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- Monaco Editor team for the excellent code editor
- FastAPI community for the robust framework
- React.js team for the powerful frontend library

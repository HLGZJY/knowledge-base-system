# Knowledge Base System

A modern knowledge base system built with React (TypeScript) frontend and Flask backend.

## Project Structure

```
knowledge-base-system/
├── knowledge-base/           # Frontend (React + TypeScript)
├── knowledge-base-backend/   # Backend (Flask)
├── database_design.md       # Database design documentation
└── requirements.txt         # Python dependencies
```

## Features

- View and search knowledge items
- Add new knowledge items
- Upload images
- Responsive design
- RESTful API
- SQLite database

## Tech Stack

### Frontend
- React
- TypeScript
- Ant Design
- React Router
- Axios

### Backend
- Flask
- SQLAlchemy
- Flask-CORS
- SQLite

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd knowledge-base-backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Initialize the database:
   ```bash
   python init_db.py
   ```

5. Start the Flask server:
   ```bash
   flask run --port=3001
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd knowledge-base
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Documentation

### Endpoints

- `GET /api/knowledge` - Get all knowledge items
- `GET /api/knowledge/<id>` - Get a specific knowledge item
- `POST /api/knowledge` - Create a new knowledge item
- `PUT /api/knowledge/<id>` - Update a knowledge item
- `DELETE /api/knowledge/<id>` - Delete a knowledge item
- `GET /api/knowledge/search` - Search knowledge items
- `POST /api/upload` - Upload images

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

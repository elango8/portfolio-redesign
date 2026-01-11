# Elango Portfolio Website

A professional portfolio website for Elango, a Product Designer with 10+ years of experience.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)


## Project Structure

```
portfolio-96/
├── frontend/
│   ├── index.html          # Main portfolio page
│   ├── admin.html          # Admin dashboard
│   ├── css/
│   │   ├── styles.css      # Main styles
│   │   └── admin.css       # Admin panel styles
│   ├── js/
│   │   ├── main.js         # Main JavaScript
│   │   └── admin.js        # Admin panel JavaScript
│   └── images/             # Images and icons
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Dependencies
│   ├── .env                # Environment variables
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── models/
│   │   ├── User.js         # Admin user model
│   │   ├── Project.js      # Project model
│   │   └── Certification.js # Certification model
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   ├── projects.js     # Projects CRUD
│   │   └── certifications.js # Certifications CRUD
│   ├── middleware/
│   │   └── auth.js         # JWT middleware
│   └── seeds/
│       └── seed.js         # Database seeder
```

## Quick Start

### Prerequisites

- Node.js v16 or higher
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone/Navigate to project**
   ```bash
   cd d:/portfolio-96
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment**
   
   Edit `backend/.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_secret_key_here
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running locally or use MongoDB Atlas connection string.

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```
   This creates:
   - Admin user: `admin@jenny.com` / `admin123`
   - Sample projects and certifications

6. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

7. **View the website**
   
   Open: http://localhost:5000

8. **Access admin panel**
   
   Open: http://localhost:5000/admin.html
   
   Login: `admin@jenny.com` / `admin123`

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Admin login | No |
| GET | `/api/auth/verify` | Verify token | Yes |

### Projects
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/projects` | Get all projects | No |
| GET | `/api/projects/:id` | Get single project | No |
| POST | `/api/projects` | Create project | Yes |
| PUT | `/api/projects/:id` | Update project | Yes |
| DELETE | `/api/projects/:id` | Delete project | Yes |

### Certifications
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/certifications` | Get all certifications | No |
| GET | `/api/certifications/:id` | Get single certification | No |
| POST | `/api/certifications` | Create certification | Yes |
| PUT | `/api/certifications/:id` | Update certification | Yes |
| DELETE | `/api/certifications/:id` | Delete certification | Yes |

## Database Schema

### Users
```javascript
{
  username: String,     // Admin username
  email: String,        // Unique email
  password: String,     // Bcrypt hashed
  createdAt: Date
}
```

### Projects
```javascript
{
  title: String,        // Project name
  description: String,  // Project description
  image: String,        // Image URL
  category: String,     // Category (optional)
  link: String,         // Project URL (optional)
  createdAt: Date
}
```

### Certifications
```javascript
{
  title: String,        // Certificate name
  issuer: String,       // Issuing organization
  date: Date,           // Issue date
  image: String,        // Certificate image
  credentialId: String, // Credential ID
  createdAt: Date
}
```

## Features

### Frontend
- ✅ Pixel-perfect design matching reference
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth hover animations
- ✅ Scroll animations
- ✅ Mobile navigation menu

### Backend
- ✅ JWT-based admin authentication
- ✅ Projects CRUD API
- ✅ Certifications CRUD API
- ✅ MongoDB database integration
- ✅ Admin dashboard

## Adding Custom Images

Replace placeholder images in `frontend/images/`:
- `jenny-hero.png` - Hero section photo
- `jenny-about.png` - Why Hire Me section photo
- `projects/` - Project screenshots
- `blog/` - Blog post images
- `testimonials/` - Client photos

## Production Deployment

1. Update `.env` with production values
2. Use MongoDB Atlas for database
3. Set a strong `JWT_SECRET`
4. Deploy to Vercel, Heroku, or your preferred platform

## License

MIT License

# Database Setup & Configuration

## PostgreSQL Database Integration

The application has been configured to use the Render PostgreSQL database:

**Connection String:**
```
postgresql://linkedin_scraped_data_user:q0GzF9RQ6MsmcyuoJ4V80OZRgbtHfH6E@dpg-d48p4t7diees73a3461g-a/linkedin_scraped_data
```

## Alumni Table Schema

A new `alumni` table has been created with the following fields:

- `id` (UUID/String) - Primary key
- `name` (String) - Alumni full name
- `email` (String) - Alumni email address
- `university` (String) - University name
- `degree` (String) - Degree type (BS, MS, MBA, etc.)
- `major` (String) - Field of study
- `graduation_year` (Integer) - Year of graduation
- `current_company` (String) - Current employer
- `current_position` (String) - Current job title
- `industry` (String) - Industry sector
- `location` (String) - Current location
- `linkedin_url` (String) - LinkedIn profile URL
- `bio` (Text) - Professional bio
- `interests` (Text) - Comma-separated interests
- `skills` (Text) - Comma-separated skills
- `profile_image` (String) - Profile image path

## Seed Data

The database is automatically seeded with **15 random alumni records** on application startup. The seed function:

- Checks if data already exists (won't duplicate if ≥15 records exist)
- Generates diverse alumni profiles with realistic data
- Includes various universities, companies, industries, and locations
- Uses the profile images from `/attached_assets/generated_images/`

## API Endpoints

### 1. Get All Alumni
```
GET /api/alumni
```
Returns all alumni records in the database.

### 2. Get Single Alumni
```
GET /api/alumni/<alumni_id>
```
Returns a specific alumni record by ID.

### 3. Match Alumni (Guaranteed 3 Results)
```
POST /api/alumni/match
```

**Request Body:**
```json
{
  "major": "Computer Science",
  "industry": "Technology",
  "interests": ["Machine Learning", "AI"],
  "limit": 3
}
```

**Features:**
- Filters by major (partial match)
- Filters by industry (partial match)
- Scores matches based on interest overlap
- **Always returns at least 3 alumni** (fills with random selections if needed)
- Sorts by relevance score when interests are provided

### 4. Reseed Alumni Data
```
POST /api/alumni/seed
```
Clears and reseeds the alumni data (useful for testing).

## How It Works

1. **Startup**: When the app starts, it:
   - Creates all database tables if they don't exist
   - Runs the seed function to populate alumni data
   - Ensures you have at least 15 alumni records

2. **Matching Logic**: The `/api/alumni/match` endpoint:
   - Filters alumni by major and industry if provided
   - Calculates a relevance score based on interest overlap
   - Returns the top matches (default 3)
   - **Guarantees 3 results** by filling with random alumni if filters are too restrictive

3. **Data Persistence**: All data is stored in the PostgreSQL database on Render, so:
   - Data persists across application restarts
   - Multiple instances can access the same data
   - Production-ready and scalable

## Testing the Integration

### 1. Start the application:
```bash
python app.py
```

### 2. Check health:
```bash
curl http://localhost:5000/api/health
```

### 3. Get all alumni:
```bash
curl http://localhost:5000/api/alumni
```

### 4. Match alumni:
```bash
curl -X POST http://localhost:5000/api/alumni/match \
  -H "Content-Type: application/json" \
  -d '{
    "major": "Computer Science",
    "industry": "Technology",
    "interests": ["Machine Learning", "AI"],
    "limit": 3
  }'
```

## Notes

- The seed function only runs if there are fewer than 15 alumni records
- All alumni have randomized but realistic data
- Profile images are mapped to existing generated images in the project
- The matching algorithm ensures you always get 3 results as requested
- Data includes diverse backgrounds (tech, business, engineering)

## Database Connection

The connection is established using SQLAlchemy with automatic table creation. The app handles both PostgreSQL (production) and SQLite (development) seamlessly.


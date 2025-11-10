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
- `country` (String) - Country where studied
- `university` (String) - University name
- `degree` (String) - Degree type (MS, MBA, PhD, MA, MEng, LLM, MFA, MPH)
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

The database is automatically seeded with **50 random alumni records** on application startup. The seed function:

- Checks if data already exists (won't duplicate if ≥50 records exist)
- Generates diverse alumni profiles with realistic data covering all possible combinations
- **10 Countries**: Germany, United States, United Kingdom, Canada, Australia, Netherlands, Singapore, Sweden, Switzerland, France
- **8 Degree Types**: MS, MBA, PhD, MA, MEng, LLM, MFA, MPH
- **30+ Majors**: Data Science, Computer Science, Business Analytics, Engineering disciplines, Law, Arts, Public Health, etc.
- **Universities by Country**: 5-10 top universities per country
- **Global Companies**: US Tech (Google, Microsoft, Apple), European (SAP, Siemens, Spotify), Asian (TCS, Infosys), Finance, Consulting
- **Diverse Locations**: Major cities in each country PLUS Indian cities (Mumbai, Bangalore, Delhi, Hyderabad, Pune, Chennai)
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
  "country": "United States",
  "degree": "MS (Master of Science)",
  "major": "Computer Science",
  "location": "Mumbai",
  "industry": "Technology",
  "interests": ["Machine Learning", "AI"],
  "limit": 3
}
```

**Features:**
- Filters by country (partial match)
- Filters by degree type (partial match)
- Filters by major (partial match)
- Filters by current location (partial match)
- Filters by industry (partial match)
- Scores matches based on interest overlap
- **Always returns at least 3 alumni** (fills with random selections if needed)
- Sorts by relevance score when interests are provided
- All filters are optional

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
    "country": "United States",
    "degree": "MS (Master of Science)",
    "major": "Data Science",
    "location": "Bangalore",
    "interests": ["Machine Learning", "AI"],
    "limit": 3
  }'
```

## Notes

- The seed function only runs if there are fewer than 50 alumni records
- All alumni have randomized but realistic data covering all combinations from the form
- Profile images are mapped to existing generated images in the project
- The matching algorithm ensures you always get 3 results as requested
- Data includes diverse backgrounds across:
  - **10 countries** with top universities in each
  - **8 degree types** (MS, MBA, PhD, MA, MEng, LLM, MFA, MPH)
  - **30+ majors** (tech, business, engineering, law, arts, healthcare)
  - **Global locations** including major cities and Indian metros
  - **Diverse companies** from tech, finance, consulting, and more

## Database Connection

The connection is established using SQLAlchemy with automatic table creation. The app handles both PostgreSQL (production) and SQLite (development) seamlessly.

## Example Combinations Available

Here are some example queries you can make:

1. **German MBA graduates working in Berlin**
   ```json
   {"country": "Germany", "degree": "MBA", "location": "Berlin"}
   ```

2. **Computer Science MS from US working in Indian cities**
   ```json
   {"country": "United States", "degree": "MS", "major": "Computer Science", "location": "Bangalore"}
   ```

3. **Law graduates (LLM) from UK**
   ```json
   {"country": "United Kingdom", "degree": "LLM"}
   ```

4. **Data Science alumni in Singapore**
   ```json
   {"major": "Data Science", "location": "Singapore"}
   ```

5. **PhD researchers in AI/ML**
   ```json
   {"degree": "PhD", "major": "Artificial Intelligence"}
   ```


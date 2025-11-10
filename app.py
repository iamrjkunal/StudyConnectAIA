from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import String, Text
from dotenv import load_dotenv
import os
import uuid
import random

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder="dist/public", static_url_path="")

# CORS configuration
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Database configuration
database_url = (
    os.environ.get("DATABASE_URL")
    or "postgresql://linkedin_scraped_data_user:q0GzF9RQ6MsmcyuoJ4V80OZRgbtHfH6E@dpg-d48p4t7diees73a3461g-a/linkedin_scraped_data"
)
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.environ.get(
    "SECRET_KEY", "dev-secret-key-change-in-production"
)

db = SQLAlchemy(app)

# Determine if we're using PostgreSQL or SQLite
is_postgres = database_url and "postgresql" in database_url


# Models
class User(db.Model):
    __tablename__ = "users"

    # Use UUID for PostgreSQL, String for SQLite
    id = db.Column(
        UUID(as_uuid=True) if is_postgres else String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()) if not is_postgres else uuid.uuid4(),
    )
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {"id": str(self.id), "username": self.username}


class Alumni(db.Model):
    __tablename__ = "alumni"

    id = db.Column(
        UUID(as_uuid=True) if is_postgres else String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()) if not is_postgres else uuid.uuid4(),
    )
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=True)  # Country where studied
    university = db.Column(db.String(255), nullable=False)
    degree = db.Column(db.String(255), nullable=False)
    major = db.Column(db.String(255), nullable=False)
    graduation_year = db.Column(db.Integer, nullable=False)
    current_company = db.Column(db.String(255), nullable=False)
    current_position = db.Column(db.String(255), nullable=False)
    industry = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    linkedin_url = db.Column(db.String(500), nullable=True)
    bio = db.Column(Text, nullable=True)
    interests = db.Column(Text, nullable=True)  # Comma-separated
    skills = db.Column(Text, nullable=True)  # Comma-separated
    profile_image = db.Column(db.String(500), nullable=True)

    def to_dict(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "email": self.email,
            "country": self.country,
            "university": self.university,
            "degree": self.degree,
            "major": self.major,
            "graduation_year": self.graduation_year,
            "current_company": self.current_company,
            "current_position": self.current_position,
            "industry": self.industry,
            "location": self.location,
            "linkedin_url": self.linkedin_url,
            "bio": self.bio,
            "interests": self.interests.split(",") if self.interests else [],
            "skills": self.skills.split(",") if self.skills else [],
            "profile_image": self.profile_image,
        }


# Create tables
with app.app_context():
    db.create_all()


# Seed data function
def seed_alumni_data():
    """Seed the database with random alumni data"""
    with app.app_context():
        # Check if data already exists
        if Alumni.query.count() >= 50:
            print("Alumni data already seeded")
            return

        # Clear existing alumni data
        Alumni.query.delete()

        # Sample data - Comprehensive list based on form inputs
        first_names = [
            "John", "Sarah", "Michael", "Emily", "David", "Jessica", "James", "Jennifer",
            "Robert", "Linda", "William", "Patricia", "Richard", "Elizabeth", "Joseph",
            "Maria", "Thomas", "Susan", "Charles", "Margaret", "Daniel", "Lisa",
            "Matthew", "Nancy", "Christopher", "Karen", "Anthony", "Betty", "Mark", "Helen",
            "Raj", "Priya", "Amit", "Anjali", "Vikram", "Neha", "Arjun", "Kavya",
            "Hans", "Emma", "Pierre", "Sophie", "Liam", "Olivia", "Noah", "Ava",
            "Lucas", "Mia", "Alexander", "Isabella"
        ]
        
        last_names = [
            "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
            "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
            "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White",
            "Harris", "Clark", "Lewis", "Robinson", "Walker", "Hall", "Allen",
            "Kumar", "Sharma", "Singh", "Patel", "Gupta", "Reddy", "Iyer", "Nair",
            "Müller", "Schmidt", "Meyer", "Weber", "Dubois", "Martin", "Bernard", "Petit",
            "Wong", "Chen", "Tan", "Lim"
        ]

        # Countries from the form
        countries = [
            "Germany", "United States", "United Kingdom", "Canada", "Australia",
            "Netherlands", "Singapore", "Sweden", "Switzerland", "France"
        ]
        
        # Universities by country
        universities_by_country = {
            "United States": ["Stanford University", "MIT", "Harvard University", "UC Berkeley", 
                            "Carnegie Mellon University", "University of Michigan", "Yale University", 
                            "Princeton University", "Columbia University", "Cornell University"],
            "United Kingdom": ["University of Oxford", "University of Cambridge", "Imperial College London",
                             "London School of Economics", "University College London", "University of Edinburgh"],
            "Canada": ["University of Toronto", "McGill University", "University of British Columbia",
                      "University of Waterloo", "University of Alberta"],
            "Germany": ["Technical University of Munich", "Ludwig Maximilian University", "Heidelberg University",
                       "Humboldt University of Berlin", "RWTH Aachen University"],
            "Australia": ["University of Melbourne", "Australian National University", "University of Sydney",
                         "University of Queensland", "Monash University"],
            "Netherlands": ["University of Amsterdam", "Delft University of Technology", "Utrecht University",
                          "Leiden University", "Erasmus University Rotterdam"],
            "Singapore": ["National University of Singapore", "Nanyang Technological University"],
            "Sweden": ["Lund University", "Uppsala University", "KTH Royal Institute of Technology",
                      "Stockholm University"],
            "Switzerland": ["ETH Zurich", "University of Zurich", "EPFL", "University of Geneva"],
            "France": ["Sorbonne University", "École Polytechnique", "Sciences Po", "HEC Paris"]
        }

        # All degree types from the form
        degrees = [
            "MS (Master of Science)",
            "MBA (Master of Business Administration)",
            "PhD (Doctor of Philosophy)",
            "MA (Master of Arts)",
            "MEng (Master of Engineering)",
            "LLM (Master of Laws)",
            "MFA (Master of Fine Arts)",
            "MPH (Master of Public Health)"
        ]

        # Expanded majors covering all fields from the form
        majors = [
            "Data Science", "Computer Science", "Business Analytics",
            "Electrical Engineering", "Mechanical Engineering", "Civil Engineering",
            "Business Administration", "Finance", "Marketing", "Management",
            "Software Engineering", "Information Systems", "Cybersecurity",
            "Industrial Engineering", "Artificial Intelligence", "Machine Learning",
            "Biomedical Engineering", "Chemical Engineering", "Aerospace Engineering",
            "Public Health", "Healthcare Management", "Epidemiology",
            "Law", "International Law", "Corporate Law",
            "Fine Arts", "Graphic Design", "Visual Arts",
            "Economics", "Political Science", "International Relations",
            "Environmental Science", "Sustainability", "Urban Planning"
        ]

        # Global companies
        companies = [
            # US Tech
            "Google", "Microsoft", "Apple", "Amazon", "Meta", "Tesla", "Netflix",
            "IBM", "Oracle", "Salesforce", "Adobe", "Intel", "NVIDIA", "Uber", "Airbnb",
            # European
            "SAP", "Siemens", "Spotify", "Booking.com", "Adidas", "BMW", "Volkswagen",
            # Asian
            "Tata Consultancy Services", "Infosys", "Wipro", "Grab", "Sea Group",
            # Finance
            "Goldman Sachs", "Morgan Stanley", "JPMorgan Chase", "Deutsche Bank",
            # Consulting
            "McKinsey & Company", "Boston Consulting Group", "Deloitte", "Accenture"
        ]

        positions = [
            "Software Engineer", "Senior Software Engineer", "Staff Software Engineer",
            "Data Scientist", "Senior Data Scientist", "ML Engineer",
            "Product Manager", "Senior Product Manager", "Group Product Manager",
            "Engineering Manager", "Director of Engineering", "VP of Engineering",
            "Technical Lead", "Principal Engineer", "Distinguished Engineer",
            "Business Analyst", "Strategy Consultant", "Management Consultant",
            "Data Analyst", "Business Intelligence Analyst", "Analytics Manager",
            "Research Scientist", "Applied Scientist", "AI Researcher",
            "UX Designer", "Product Designer", "Design Lead",
            "Project Manager", "Program Manager", "Technical Program Manager"
        ]

        industries = [
            "Technology", "Software Development", "Data Science", "Cloud Computing",
            "Artificial Intelligence", "Machine Learning", "Cybersecurity", "Fintech",
            "E-commerce", "Healthcare Technology", "EdTech", "Automotive",
            "Consulting", "Finance", "Investment Banking", "Venture Capital",
            "Biotechnology", "Pharmaceuticals", "Renewable Energy", "Sustainability"
        ]

        # Locations by country (including Indian cities from the form)
        locations_by_country = {
            "United States": ["San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX",
                            "Boston, MA", "Los Angeles, CA", "Chicago, IL", "Denver, CO"],
            "United Kingdom": ["London", "Manchester", "Edinburgh", "Cambridge", "Oxford"],
            "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
            "Germany": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Stuttgart"],
            "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
            "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"],
            "Singapore": ["Singapore"],
            "Sweden": ["Stockholm", "Gothenburg", "Malmö"],
            "Switzerland": ["Zurich", "Geneva", "Basel", "Lausanne"],
            "France": ["Paris", "Lyon", "Marseille", "Toulouse"]
        }
        
        # Also add Indian cities as some alumni might be working in India
        indian_cities = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Pune", "Chennai"]

        interests_list = [
            "Machine Learning,AI,Deep Learning",
            "Cloud Computing,DevOps,Kubernetes",
            "Full Stack Development,React,Node.js",
            "Data Science,Analytics,Visualization",
            "Mobile Development,iOS,Android",
            "Cybersecurity,Network Security,Encryption",
            "Product Management,Strategy,UX Design",
            "Entrepreneurship,Startups,Innovation",
            "Finance,Investment Banking,Trading",
            "Healthcare,Medical Research,Public Health",
            "Sustainability,Climate Change,Green Energy",
            "Legal Tech,Policy,Regulation",
            "Design Thinking,User Research,Prototyping",
            "Blockchain,Cryptocurrency,Web3",
            "Quantum Computing,Advanced Physics",
        ]

        skills_list = [
            "Python,Java,JavaScript,SQL",
            "React,Node.js,TypeScript,MongoDB",
            "AWS,Azure,Docker,Kubernetes",
            "Machine Learning,TensorFlow,PyTorch",
            "Data Analysis,Pandas,Scikit-learn",
            "C++,System Design,Algorithms",
            "Product Strategy,Agile,Scrum",
            "Leadership,Team Management,Communication",
            "Financial Modeling,Excel,Bloomberg",
            "R,Statistics,Tableau,Power BI",
            "Figma,Sketch,Adobe Creative Suite",
            "Contract Law,Negotiation,Compliance",
            "Clinical Research,Epidemiology,Biostatistics",
            "Go,Rust,Scala,Kotlin",
            "SAP,Oracle ERP,Salesforce",
        ]

        bios = [
            "Passionate about building scalable systems and mentoring junior engineers.",
            "Experienced in leading cross-functional teams to deliver innovative solutions.",
            "Dedicated to leveraging data science to solve real-world problems.",
            "Focused on creating user-centric products that make a difference.",
            "Enthusiastic about emerging technologies and continuous learning.",
            "Committed to driving technical excellence and fostering collaboration.",
            "Specializing in AI/ML applications for business transformation.",
            "Building the future of cloud computing and distributed systems.",
            "Passionate about sustainable development and environmental impact.",
            "Expert in financial markets with a focus on quantitative analysis.",
            "Dedicated to improving healthcare outcomes through technology.",
            "Focused on legal innovation and regulatory compliance.",
            "Creative problem solver with a passion for design and user experience.",
            "Driving digital transformation in traditional industries.",
            "Committed to advancing research in cutting-edge fields.",
        ]

        profile_images = [
            "/attached_assets/generated_images/Male_CS_engineer_headshot_ced6d163.png",
            "/attached_assets/generated_images/Female_software_engineer_headshot_16d4418f.png",
            "/attached_assets/generated_images/Male_data_scientist_headshot_86d343a4.png",
            "/attached_assets/generated_images/Male_electrical_engineer_headshot_4c534f51.png",
            "/attached_assets/generated_images/Female_MBA_graduate_headshot_89f6b5ba.png",
            "/attached_assets/generated_images/Female_mechanical_engineer_headshot_1e1b6368.png",
        ]

        # Generate 50 random alumni with diverse combinations
        for i in range(50):
            name = f"{random.choice(first_names)} {random.choice(last_names)}"
            
            # Randomly select a country
            country = random.choice(countries)
            
            # Pick university and location from that country
            university = random.choice(universities_by_country[country])
            
            # 70% chance alumni works in a major city, 30% chance in India
            if random.random() < 0.7:
                location = random.choice(locations_by_country[country])
            else:
                location = random.choice(indian_cities)
            
            alumni = Alumni(
                name=name,
                email=f"{name.lower().replace(' ', '.')}@email.com",
                country=country,
                university=university,
                degree=random.choice(degrees),
                major=random.choice(majors),
                graduation_year=random.randint(2010, 2023),
                current_company=random.choice(companies),
                current_position=random.choice(positions),
                industry=random.choice(industries),
                location=location,
                linkedin_url=f"https://linkedin.com/in/{name.lower().replace(' ', '-')}",
                bio=random.choice(bios),
                interests=random.choice(interests_list),
                skills=random.choice(skills_list),
                profile_image=random.choice(profile_images),
            )
            db.session.add(alumni)

        db.session.commit()
        print("Successfully seeded 50 alumni records with diverse combinations")


# Seed data on startup
seed_alumni_data()


# API Routes
@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "StudyConnect AI"}), 200


@app.route("/api/users", methods=["POST"])
def create_user():
    """Create a new user"""
    data = request.get_json()

    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Username and password are required"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(username=data["username"]).first()
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    # Create new user
    new_user = User(
        username=data["username"],
        password=data["password"],  # In production, hash this!
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201


@app.route("/api/users/<user_id>", methods=["GET"])
def get_user(user_id):
    """Get user by ID"""
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict()), 200


@app.route("/api/users/username/<username>", methods=["GET"])
def get_user_by_username(username):
    """Get user by username"""
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict()), 200


@app.route("/api/alumni", methods=["GET"])
def get_all_alumni():
    """Get all alumni"""
    alumni = Alumni.query.all()
    return jsonify([a.to_dict() for a in alumni]), 200


@app.route("/api/alumni/<alumni_id>", methods=["GET"])
def get_alumni(alumni_id):
    """Get alumni by ID"""
    alumni = Alumni.query.get(alumni_id)

    if not alumni:
        return jsonify({"error": "Alumni not found"}), 404

    return jsonify(alumni.to_dict()), 200


@app.route("/api/alumni/match", methods=["POST"])
def match_alumni():
    """Match alumni based on student preferences

    Expected JSON body:
    {
        "country": "United States",
        "degree": "MS (Master of Science)",
        "major": "Computer Science",
        "location": "Mumbai",
        "industry": "Technology",
        "interests": ["Machine Learning", "AI"],
        "limit": 3
    }
    """
    data = request.get_json()

    # Start with all alumni
    query = Alumni.query

    # Apply filters if provided
    if data and "country" in data and data["country"]:
        query = query.filter(Alumni.country.ilike(f"%{data['country']}%"))

    if data and "degree" in data and data["degree"]:
        query = query.filter(Alumni.degree.ilike(f"%{data['degree']}%"))

    if data and "major" in data and data["major"]:
        query = query.filter(Alumni.major.ilike(f"%{data['major']}%"))

    if data and "location" in data and data["location"]:
        query = query.filter(Alumni.location.ilike(f"%{data['location']}%"))

    if data and "industry" in data and data["industry"]:
        query = query.filter(Alumni.industry.ilike(f"%{data['industry']}%"))

    # Get all matching alumni
    all_matches = query.all()

    # If we have interests, score the matches
    if data and "interests" in data and data["interests"]:
        scored_matches = []
        student_interests = [i.lower() for i in data["interests"]]

        for alumni in all_matches:
            score = 0
            alumni_interests = [i.strip().lower() for i in alumni.interests.split(",")]

            # Calculate overlap score
            for si in student_interests:
                for ai in alumni_interests:
                    if si in ai or ai in si:
                        score += 1

            scored_matches.append((alumni, score))

        # Sort by score (highest first)
        scored_matches.sort(key=lambda x: x[1], reverse=True)
        all_matches = [match[0] for match in scored_matches]
    else:
        # Randomize if no specific interests
        random.shuffle(all_matches)

    # Limit results (default to 3)
    limit = data.get("limit", 3) if data else 3
    matches = all_matches[:limit]

    # Ensure we always return at least 3 matches if available
    if len(matches) < 3 and len(Alumni.query.all()) >= 3:
        # Get random alumni to fill up to 3
        all_alumni = Alumni.query.all()
        random.shuffle(all_alumni)
        for alumni in all_alumni:
            if alumni not in matches:
                matches.append(alumni)
            if len(matches) >= 3:
                break

    return jsonify([a.to_dict() for a in matches]), 200


@app.route("/api/alumni/seed", methods=["POST"])
def reseed_alumni():
    """Reseed alumni data (for testing purposes)"""
    with app.app_context():
        Alumni.query.delete()
        db.session.commit()

    seed_alumni_data()
    return jsonify({"message": "Alumni data reseeded successfully"}), 200


# Serve React App
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react_app(path):
    """Serve React frontend"""
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(
        host="0.0.0.0", port=port, debug=os.environ.get("FLASK_ENV") == "development"
    )

# StudyConnect AI - Alumni Database Coverage

## 📊 Data Statistics

- **Total Alumni Records**: 50
- **Countries Covered**: 10
- **Universities**: 60+ (5-10 per country)
- **Degree Types**: 8
- **Majors/Fields**: 30+
- **Companies**: 30+
- **Locations**: 50+ (including Indian cities)

## 🌍 Countries & Universities

### 1. **Germany**
- Technical University of Munich
- Ludwig Maximilian University
- Heidelberg University
- Humboldt University of Berlin
- RWTH Aachen University

### 2. **United States**
- Stanford University
- MIT
- Harvard University
- UC Berkeley
- Carnegie Mellon University
- University of Michigan
- Yale University
- Princeton University
- Columbia University
- Cornell University

### 3. **United Kingdom**
- University of Oxford
- University of Cambridge
- Imperial College London
- London School of Economics
- University College London
- University of Edinburgh

### 4. **Canada**
- University of Toronto
- McGill University
- University of British Columbia
- University of Waterloo
- University of Alberta

### 5. **Australia**
- University of Melbourne
- Australian National University
- University of Sydney
- University of Queensland
- Monash University

### 6. **Netherlands**
- University of Amsterdam
- Delft University of Technology
- Utrecht University
- Leiden University
- Erasmus University Rotterdam

### 7. **Singapore**
- National University of Singapore
- Nanyang Technological University

### 8. **Sweden**
- Lund University
- Uppsala University
- KTH Royal Institute of Technology
- Stockholm University

### 9. **Switzerland**
- ETH Zurich
- University of Zurich
- EPFL
- University of Geneva

### 10. **France**
- Sorbonne University
- École Polytechnique
- Sciences Po
- HEC Paris

## 🎓 Degree Types

1. **MS (Master of Science)**
2. **MBA (Master of Business Administration)**
3. **PhD (Doctor of Philosophy)**
4. **MA (Master of Arts)**
5. **MEng (Master of Engineering)**
6. **LLM (Master of Laws)**
7. **MFA (Master of Fine Arts)**
8. **MPH (Master of Public Health)**

## 📚 Majors/Fields of Study (30+)

### Technology & Engineering
- Data Science
- Computer Science
- Business Analytics
- Electrical Engineering
- Mechanical Engineering
- Civil Engineering
- Software Engineering
- Information Systems
- Cybersecurity
- Industrial Engineering
- Artificial Intelligence
- Machine Learning
- Biomedical Engineering
- Chemical Engineering
- Aerospace Engineering

### Business
- Business Administration
- Finance
- Marketing
- Management

### Healthcare
- Public Health
- Healthcare Management
- Epidemiology

### Legal
- Law
- International Law
- Corporate Law

### Arts & Design
- Fine Arts
- Graphic Design
- Visual Arts

### Social Sciences
- Economics
- Political Science
- International Relations

### Environmental
- Environmental Science
- Sustainability
- Urban Planning

## 🏢 Companies

### US Tech
- Google, Microsoft, Apple, Amazon, Meta
- Tesla, Netflix, IBM, Oracle, Salesforce
- Adobe, Intel, NVIDIA, Uber, Airbnb

### European
- SAP, Siemens, Spotify, Booking.com
- Adidas, BMW, Volkswagen

### Asian
- Tata Consultancy Services, Infosys, Wipro
- Grab, Sea Group

### Finance
- Goldman Sachs, Morgan Stanley
- JPMorgan Chase, Deutsche Bank

### Consulting
- McKinsey & Company
- Boston Consulting Group
- Deloitte, Accenture

## 📍 Locations

### By Country
- **US**: San Francisco, New York, Seattle, Austin, Boston, Los Angeles, Chicago, Denver
- **UK**: London, Manchester, Edinburgh, Cambridge, Oxford
- **Canada**: Toronto, Vancouver, Montreal, Calgary, Ottawa
- **Germany**: Berlin, Munich, Hamburg, Frankfurt, Stuttgart
- **Australia**: Sydney, Melbourne, Brisbane, Perth, Adelaide
- **Netherlands**: Amsterdam, Rotterdam, The Hague, Utrecht
- **Singapore**: Singapore
- **Sweden**: Stockholm, Gothenburg, Malmö
- **Switzerland**: Zurich, Geneva, Basel, Lausanne
- **France**: Paris, Lyon, Marseille, Toulouse

### Indian Cities (Where Alumni Currently Work)
- Mumbai
- Bangalore
- Delhi
- Hyderabad
- Pune
- Chennai

## 💼 Positions
- Software Engineer → VP of Engineering
- Data Scientist → ML Engineer
- Product Manager → Group Product Manager
- Business Analyst → Management Consultant
- Research Scientist → AI Researcher
- UX Designer → Design Lead
- Technical Program Manager

## 🎯 Industries
- Technology, Software Development
- Data Science, Cloud Computing
- AI/ML, Cybersecurity, Fintech
- E-commerce, Healthcare Technology
- EdTech, Automotive
- Consulting, Finance, Investment Banking
- Venture Capital, Biotechnology
- Pharmaceuticals, Renewable Energy, Sustainability

## 🔍 Search Examples

### By Country + Degree
```json
{"country": "Germany", "degree": "MBA"}
```
Returns: MBA graduates from German universities

### By Major + Location
```json
{"major": "Data Science", "location": "Bangalore"}
```
Returns: Data Science alumni currently working in Bangalore

### By Country + Major + Industry
```json
{"country": "United States", "major": "Computer Science", "industry": "Technology"}
```
Returns: CS graduates from US universities working in tech

### By Degree + Location
```json
{"degree": "PhD", "location": "Singapore"}
```
Returns: PhD holders currently in Singapore

### By Multiple Filters
```json
{
  "country": "United Kingdom",
  "degree": "MS (Master of Science)",
  "major": "Artificial Intelligence",
  "location": "Mumbai",
  "interests": ["Machine Learning", "Deep Learning"]
}
```
Returns: MS in AI from UK universities, now in Mumbai, interested in ML/DL

## 📈 Data Distribution

- Alumni are distributed across all 10 countries
- Each country has 5-10 alumni
- Degree types are randomly distributed
- 70% work in their study country's major cities
- 30% work in Indian cities (Mumbai, Bangalore, Delhi, etc.)
- Graduation years: 2010-2023
- Diverse name distribution representing different nationalities

## 🎯 Matching Algorithm

The matching endpoint:
1. Filters by: country, degree, major, location, industry (all optional)
2. Scores by interest overlap
3. Guarantees at least 3 results (fills with random if needed)
4. Returns most relevant matches first

## 🚀 How to Query

**Endpoint**: `POST /api/alumni/match`

**All filters are optional** - you can use any combination:
- `country` - Filter by study country
- `degree` - Filter by degree type
- `major` - Filter by field of study
- `location` - Filter by current work location
- `industry` - Filter by current industry
- `interests` - Array of interests for scoring
- `limit` - Number of results (default: 3)

**Example**:
```bash
curl -X POST http://localhost:5000/api/alumni/match \
  -H "Content-Type: application/json" \
  -d '{
    "country": "United States",
    "major": "Computer Science",
    "location": "San Francisco, CA",
    "limit": 3
  }'
```

## ✅ Guaranteed Results

The system ensures you **always get at least 3 alumni** in response, even if your filters are very specific. If fewer than 3 match your criteria, the system fills with random alumni to reach the minimum of 3.

---

*Last Updated: Comprehensive data covering all form inputs with 50 diverse alumni profiles*


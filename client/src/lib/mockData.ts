import type { Alumni } from "@shared/schema";

// Import alumni images
import alumni1 from "@assets/generated_images/Female_software_engineer_headshot_16d4418f.png";
import alumni2 from "@assets/generated_images/Male_data_scientist_headshot_86d343a4.png";
import alumni3 from "@assets/generated_images/Female_MBA_graduate_headshot_89f6b5ba.png";
import alumni4 from "@assets/generated_images/Male_CS_engineer_headshot_ced6d163.png";
import alumni5 from "@assets/generated_images/Female_mechanical_engineer_headshot_1e1b6368.png";
import alumni6 from "@assets/generated_images/Male_electrical_engineer_headshot_4c534f51.png";

// TODO: Remove mock functionality - this is temporary data for prototyping
export const mockAlumniDatabase: Alumni[] = [
  {
    id: "1",
    name: "Priya Sharma",
    photoUrl: alumni1,
    degree: "MS in Data Science",
    university: "Technical University of Munich",
    country: "Germany",
    currentRole: "Senior Data Scientist",
    currentCompany: "Google Munich",
    preStudyRole: "Data Analyst",
    preStudyCompany: "Flipkart",
    preStudyCity: "Bangalore",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics", "Deep Learning"],
    yearsOfExperience: 3,
    extracurriculars: ["Kaggle Competitions", "Tech Blogging"],
    linkedinUrl: "https://linkedin.com/in/priyasharma",
    twitterUrl: "https://twitter.com/priyasharma",
    websiteUrl: "https://priyasharma.dev",
    email: "priya.sharma@tum.de",
    emailVerified: true,
    matchScore: 92,
    skillsMatch: 95,
    experienceMatch: 88,
    cityMatch: 100,
    extracurricularsMatch: 85,
    educationMatch: 90,
  },
  {
    id: "2",
    name: "Arjun Patel",
    photoUrl: alumni2,
    degree: "MS in Data Science",
    university: "University of Stuttgart",
    country: "Germany",
    currentRole: "ML Engineer",
    currentCompany: "Bosch AI",
    preStudyRole: "Business Analyst",
    preStudyCompany: "Accenture",
    preStudyCity: "Mumbai",
    skills: ["Python", "R", "Machine Learning", "Data Visualization", "SQL", "AWS"],
    yearsOfExperience: 4,
    extracurriculars: ["Open Source Contributor", "Marathon Runner"],
    linkedinUrl: "https://linkedin.com/in/arjunpatel",
    twitterUrl: "https://twitter.com/arjunpatel",
    email: "arjun.patel@uni-stuttgart.de",
    emailVerified: true,
    matchScore: 88,
    skillsMatch: 90,
    experienceMatch: 82,
    cityMatch: 90,
    extracurricularsMatch: 80,
    educationMatch: 92,
  },
  {
    id: "3",
    name: "Ananya Reddy",
    photoUrl: alumni3,
    degree: "MS in Data Science",
    university: "RWTH Aachen University",
    country: "Germany",
    currentRole: "Data Science Lead",
    currentCompany: "SAP",
    preStudyRole: "Data Engineer",
    preStudyCompany: "Amazon India",
    preStudyCity: "Hyderabad",
    skills: ["Python", "Spark", "Machine Learning", "Big Data", "Cloud Computing", "NLP"],
    yearsOfExperience: 3,
    extracurriculars: ["Women in Tech Speaker", "Mentorship Programs"],
    linkedinUrl: "https://linkedin.com/in/ananyareddy",
    websiteUrl: "https://ananyareddy.com",
    email: "ananya.reddy@rwth-aachen.de",
    emailVerified: true,
    matchScore: 85,
    skillsMatch: 88,
    experienceMatch: 85,
    cityMatch: 75,
    extracurricularsMatch: 82,
    educationMatch: 90,
  },
  {
    id: "4",
    name: "Rohan Mehta",
    photoUrl: alumni4,
    degree: "MS in Computer Science",
    university: "University of Toronto",
    country: "Canada",
    currentRole: "Software Engineer",
    currentCompany: "Shopify",
    preStudyRole: "Backend Developer",
    preStudyCompany: "Paytm",
    preStudyCity: "Noida",
    skills: ["Java", "Python", "System Design", "Kubernetes", "AWS", "Microservices"],
    yearsOfExperience: 4,
    extracurriculars: ["Hackathon Winner", "Tech Meetup Organizer"],
    linkedinUrl: "https://linkedin.com/in/rohanmehta",
    twitterUrl: "https://twitter.com/rohanmehta",
    email: "rohan.mehta@mail.utoronto.ca",
    emailVerified: true,
    matchScore: 90,
    skillsMatch: 92,
    experienceMatch: 88,
    cityMatch: 85,
    extracurricularsMatch: 90,
    educationMatch: 88,
  },
  {
    id: "5",
    name: "Kavya Krishnan",
    photoUrl: alumni5,
    degree: "MBA",
    university: "INSEAD",
    country: "France",
    currentRole: "Product Manager",
    currentCompany: "McKinsey & Company",
    preStudyRole: "Associate Product Manager",
    preStudyCompany: "Zomato",
    preStudyCity: "Bangalore",
    skills: ["Product Strategy", "Market Analysis", "Stakeholder Management", "Agile", "Data Analytics"],
    yearsOfExperience: 5,
    extracurriculars: ["Startup Advisor", "Public Speaking"],
    linkedinUrl: "https://linkedin.com/in/kavyakrishnan",
    websiteUrl: "https://kavyakrishnan.com",
    email: "kavya.krishnan@insead.edu",
    emailVerified: true,
    matchScore: 87,
    skillsMatch: 82,
    experienceMatch: 90,
    cityMatch: 100,
    extracurricularsMatch: 75,
    educationMatch: 85,
  },
  {
    id: "6",
    name: "Vikram Singh",
    photoUrl: alumni6,
    degree: "MS in Electrical Engineering",
    university: "ETH Zurich",
    country: "Switzerland",
    currentRole: "Hardware Engineer",
    currentCompany: "Tesla",
    preStudyRole: "Electronics Engineer",
    preStudyCompany: "Bosch India",
    preStudyCity: "Pune",
    skills: ["Circuit Design", "FPGA", "Embedded Systems", "MATLAB", "Signal Processing"],
    yearsOfExperience: 4,
    extracurriculars: ["Robotics Enthusiast", "Chess Player"],
    linkedinUrl: "https://linkedin.com/in/vikramsingh",
    email: "vikram.singh@ethz.ch",
    emailVerified: true,
    matchScore: 84,
    skillsMatch: 80,
    experienceMatch: 85,
    cityMatch: 80,
    extracurricularsMatch: 78,
    educationMatch: 92,
  },
];

// TODO: Remove mock functionality
export function findMatchingAlumni(
  targetDegree: string,
  targetCountry: string,
  currentCity: string
): Alumni[] {
  // Simple mock matching logic - filter by degree and country
  const filtered = mockAlumniDatabase.filter((alumni) => {
    const degreeMatch = alumni.degree.toLowerCase().includes(targetDegree.toLowerCase()) ||
                       targetDegree.toLowerCase().includes(alumni.degree.toLowerCase().split(" ")[2] || "");
    const countryMatch = alumni.country.toLowerCase() === targetCountry.toLowerCase();
    return degreeMatch && countryMatch;
  });

  // Sort by match score and return top 3
  return filtered
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}

// TODO: Remove mock functionality - will be replaced with OpenAI API call
export function generateMockEmail(
  alumniName: string,
  studentCity: string,
  targetDegree: string,
  alumniData: Alumni
): { email: string; personalizations: string[] } {
  const personalizations: string[] = [];

  if (alumniData.preStudyCity.toLowerCase().includes(studentCity.toLowerCase())) {
    personalizations.push(`Shared city background (${alumniData.preStudyCity})`);
  }

  personalizations.push(`Similar target degree (${targetDegree})`);
  personalizations.push(`${alumniData.skills.slice(0, 3).join(", ")} skills overlap`);

  const email = `Subject: Seeking Mentorship for ${targetDegree} Journey to ${alumniData.country}

Dear ${alumniName.split(" ")[0]},

I hope this email finds you well. My name is [Your Name], and I'm currently working in ${studentCity}. I came across your profile and was genuinely inspired by your journey from ${alumniData.preStudyRole} at ${alumniData.preStudyCompany} to pursuing ${alumniData.degree} at ${alumniData.university} and now working as ${alumniData.currentRole} at ${alumniData.currentCompany}.

I'm planning to pursue ${targetDegree} in ${alumniData.country}, and I noticed we share several similarities in our backgrounds. I was particularly interested in learning more about:

1. How you prepared for the transition from industry to graduate school
2. Your experience with the ${alumniData.country} university application process
3. Tips for balancing technical depth with breadth in coursework

I would be incredibly grateful if you could spare 20-30 minutes for a brief mentorship call at your convenience. I'm happy to work around your schedule and would deeply value any insights you could share from your experience.

Thank you for considering my request. I look forward to hearing from you.

Best regards,
[Your Name]
[Your Current Role]
${studentCity}`;

  return { email, personalizations };
}

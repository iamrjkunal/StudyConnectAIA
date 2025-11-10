import AlumniCard from "../AlumniCard";
import type { Alumni } from "@shared/schema";

export default function AlumniCardExample() {
  const mockAlumni: Alumni = {
    id: "1",
    name: "Priya Sharma",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    degree: "MS in Data Science",
    university: "Technical University of Munich",
    country: "Germany",
    currentRole: "Senior Data Scientist",
    currentCompany: "Google",
    preStudyRole: "Data Analyst",
    preStudyCompany: "Flipkart",
    preStudyCity: "Bangalore",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics", "Data Visualization"],
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
  };

  return (
    <AlumniCard
      alumni={mockAlumni}
      rank={1}
      onGenerateEmail={(id) => console.log("Generate email for:", id)}
    />
  );
}

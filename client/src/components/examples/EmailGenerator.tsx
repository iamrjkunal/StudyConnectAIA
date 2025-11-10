import EmailGenerator from "../EmailGenerator";

export default function EmailGeneratorExample() {
  const mockEmail = `Subject: Seeking Mentorship for MS in Data Science Journey to Germany

Dear Priya,

I hope this email finds you well. My name is Rahul, and I'm currently working as a Data Analyst at Flipkart in Mumbai. I came across your profile and was genuinely inspired by your journey from a similar role at Flipkart to pursuing an MS in Data Science at TUM and now working as a Senior Data Scientist at Google.

I'm planning to pursue an MS in Data Science in Germany, and I noticed we share several similarities in our backgrounds - both of us worked in data analytics roles in Bangalore before making the leap to graduate studies. I was particularly interested in learning more about:

1. How you prepared for the transition from industry to graduate school
2. Your experience with the German university application process
3. Tips for balancing technical depth with breadth in data science coursework

I would be incredibly grateful if you could spare 20-30 minutes for a brief mentorship call at your convenience. I'm happy to work around your schedule and would deeply value any insights you could share from your experience.

Thank you for considering my request. I look forward to hearing from you.

Best regards,
Rahul Kumar
Data Analyst, Flipkart
Mumbai, India`;

  const mockPersonalizations = [
    "Similar pre-study role (Data Analyst)",
    "Shared city background (Bangalore)",
    "Common skills: Python, ML, SQL",
    "Same target degree & country",
  ];

  return (
    <EmailGenerator
      alumniName="Priya Sharma"
      generatedEmail={mockEmail}
      isGenerating={false}
      personalizations={mockPersonalizations}
      onCopy={() => console.log("Email copied")}
    />
  );
}

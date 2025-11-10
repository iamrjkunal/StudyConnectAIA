import { useState } from "react";
import WorkflowStepper from "@/components/WorkflowStepper";
import Step1Form from "@/components/Step1Form";
import Step2Form from "@/components/Step2Form";
import AlumniCard from "@/components/AlumniCard";
import EmailGenerator from "@/components/EmailGenerator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";
import { findMatchingAlumni, generateMockEmail } from "@/lib/mockData";
import type { Alumni } from "@shared/schema";

const steps = [
  { number: 1, title: "Your Profile", description: "LinkedIn & location" },
  { number: 2, title: "Target Program", description: "Degree & country" },
  { number: 3, title: "View Matches", description: "Top 3 alumni" },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<{ linkedinUrl: string; currentCity: string } | null>(null);
  const [step2Data, setStep2Data] = useState<{ targetDegree: string; targetCountry: string } | null>(null);
  const [matches, setMatches] = useState<Alumni[]>([]);
  const [selectedAlumniId, setSelectedAlumniId] = useState<string | null>(null);
  const [generatedEmails, setGeneratedEmails] = useState<Record<string, { email: string; personalizations: string[] }>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStep1Submit = (data: { linkedinUrl: string; currentCity: string }) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: { targetDegree: string; targetCountry: string }) => {
    setStep2Data(data);
    
    // TODO: Remove mock functionality - will call backend API
    if (step1Data) {
      const foundMatches = findMatchingAlumni(
        data.targetDegree,
        data.targetCountry,
        step1Data.currentCity
      );
      setMatches(foundMatches);
      setCurrentStep(3);
    }
  };

  const handleGenerateEmail = (alumniId: string) => {
    if (!step1Data || !step2Data) return;

    const alumni = matches.find(a => a.id === alumniId);
    if (!alumni) return;

    setSelectedAlumniId(alumniId);
    setIsGenerating(true);

    // TODO: Remove mock functionality - will call OpenAI API via backend
    setTimeout(() => {
      const { email, personalizations } = generateMockEmail(
        alumni.name,
        step1Data.currentCity,
        step2Data.targetDegree,
        alumni
      );
      setGeneratedEmails(prev => ({
        ...prev,
        [alumniId]: { email, personalizations }
      }));
      setIsGenerating(false);
    }, 1500);
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
      setMatches([]);
      setSelectedAlumniId(null);
      setGeneratedEmails({});
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setStep2Data(null);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setStep1Data(null);
    setStep2Data(null);
    setMatches([]);
    setSelectedAlumniId(null);
    setGeneratedEmails({});
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3" data-testid="text-app-title">
            StudyConnect
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find relevant alumni mentors in under 3 clicks. Get personalized guidance from those who walked your path.
          </p>
        </div>

        <div className="mb-12">
          <WorkflowStepper currentStep={currentStep} steps={steps} />
        </div>

        {currentStep === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Tell us about yourself</h2>
                <p className="text-muted-foreground">
                  We'll use your LinkedIn profile to understand your background and find the best matches.
                </p>
              </div>
              <Step1Form onSubmit={handleStep1Submit} defaultValues={step1Data || undefined} />
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Where do you want to study?</h2>
                <p className="text-muted-foreground">
                  Tell us your target program and country to find alumni who studied there.
                </p>
              </div>
              <Step2Form
                onSubmit={handleStep2Submit}
                onBack={handleBack}
                defaultValues={step2Data || undefined}
              />
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <Users className="w-8 h-8 text-primary" />
                  Your Top 3 Matches
                </h2>
                <p className="text-muted-foreground">
                  Alumni who studied {step2Data?.targetDegree} in {step2Data?.targetCountry} with backgrounds similar to yours
                </p>
              </div>
              <Button variant="outline" onClick={handleStartOver} data-testid="button-start-over">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>

            {matches.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground text-lg mb-4">
                    No matches found for your criteria.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Try broadening your search or check back later as we add more alumni to our database.
                  </p>
                  <Button onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Modify Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {matches.map((alumni, index) => (
                  <div key={alumni.id} className="space-y-4">
                    <AlumniCard
                      alumni={alumni}
                      rank={index + 1}
                      onGenerateEmail={handleGenerateEmail}
                    />
                    {selectedAlumniId === alumni.id && (
                      <EmailGenerator
                        alumniName={alumni.name}
                        generatedEmail={generatedEmails[alumni.id]?.email || null}
                        isGenerating={isGenerating}
                        personalizations={generatedEmails[alumni.id]?.personalizations || []}
                        onCopy={() => console.log("Email copied for", alumni.name)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {matches.length > 0 && (
              <Card className="bg-muted/50">
                <CardContent className="py-6">
                  <p className="text-sm text-muted-foreground text-center">
                    <strong className="text-foreground">Data Source:</strong> Matched from 50,000+ verified alumni profiles across 100+ universities
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

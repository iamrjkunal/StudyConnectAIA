import { useState } from "react";
import WorkflowStepper from "@/components/WorkflowStepper";
import Step1Form from "@/components/Step1Form";
import Step2Form from "@/components/Step2Form";
import AlumniCard from "@/components/AlumniCard";
import EmailGenerator from "@/components/EmailGenerator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Sparkles, Shield, Zap } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wide">AI-Powered Matching</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent" data-testid="text-app-title">Study Abroad Connect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with alumni mentors who walked your path. Get personalized guidance for your study abroad journey in under 3 clicks.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>Verified Alumni</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Instant Matches</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>50,000+ Profiles</span>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <WorkflowStepper currentStep={currentStep} steps={steps} />
        </div>

        {currentStep === 1 && (
          <Card className="max-w-2xl mx-auto shadow-lg border-card-border">
            <CardContent className="p-8 sm:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-3 tracking-tight">Tell us about yourself</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We'll analyze your LinkedIn profile to understand your background and find the best alumni matches.
                </p>
              </div>
              <Step1Form onSubmit={handleStep1Submit} defaultValues={step1Data || undefined} />
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="max-w-2xl mx-auto shadow-lg border-card-border">
            <CardContent className="p-8 sm:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-3 tracking-tight">Where do you want to study?</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
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
          <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight">
                    Your Top Matches
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg mt-2">
                  Alumni who studied <strong className="text-foreground font-semibold">{step2Data?.targetDegree}</strong> in <strong className="text-foreground font-semibold">{step2Data?.targetCountry}</strong>
                </p>
              </div>
              <Button variant="outline" size="lg" onClick={handleStartOver} data-testid="button-start-over" className="hover-elevate">
                <ArrowLeft className="w-4 h-4 mr-2" />
                New Search
              </Button>
            </div>

            {matches.length === 0 ? (
              <Card className="shadow-md">
                <CardContent className="py-16 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">No matches found</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      We couldn't find alumni matching your exact criteria. Try broadening your search or check back as we continuously add new profiles.
                    </p>
                    <Button size="lg" onClick={handleBack}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Modify Your Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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

                {/* Footer Info */}
                <Card className="bg-gradient-to-br from-accent/30 to-accent/10 border-accent/30 shadow-sm">
                  <CardContent className="py-6 px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-accent-foreground" />
                        <p className="text-sm font-medium text-accent-foreground">
                          All profiles verified • 50,000+ alumni across 100+ universities
                        </p>
                      </div>
                      <Badge variant="secondary" className="uppercase text-xs font-semibold tracking-wide">
                        Ethical Data Sourcing
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

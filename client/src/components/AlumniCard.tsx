import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin, Twitter, Globe, Mail, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import MatchBreakdown from "./MatchBreakdown";
import { useState } from "react";
import type { Alumni } from "@shared/schema";

interface AlumniCardProps {
  alumni: Alumni;
  rank: number;
  onGenerateEmail: (alumniId: string) => void;
}

export default function AlumniCard({ alumni, rank, onGenerateEmail }: AlumniCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <Card className="overflow-hidden" data-testid={`alumni-card-${alumni.id}`}>
      <CardHeader className="space-y-0 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={alumni.photoUrl} alt={alumni.name} />
              <AvatarFallback>{alumni.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold" data-testid={`text-alumni-name-${alumni.id}`}>
                  {alumni.name}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  #{rank}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {alumni.currentRole} at {alumni.currentCompany}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-2xl font-bold text-primary" data-testid={`text-match-score-${alumni.id}`}>
              {alumni.matchScore}%
            </div>
            <span className="text-xs text-muted-foreground">Match Score</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Education</h4>
          </div>
          <p className="text-sm text-foreground">
            {alumni.degree} • {alumni.university}
          </p>
          <p className="text-xs text-muted-foreground">{alumni.country}</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Pre-Study Background</h4>
          <div className="text-sm space-y-1">
            <p className="text-foreground">
              {alumni.preStudyRole} at {alumni.preStudyCompany}
            </p>
            <p className="text-xs text-muted-foreground">
              {alumni.preStudyCity} • {alumni.yearsOfExperience} years experience
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {alumni.skills.slice(0, 6).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {alumni.skills.length > 6 && (
              <Badge variant="outline" className="text-xs">
                +{alumni.skills.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full justify-between -mx-2"
            data-testid={`button-toggle-breakdown-${alumni.id}`}
          >
            <span className="text-sm font-medium">Match Breakdown</span>
            {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          {showBreakdown && (
            <div className="mt-3">
              <MatchBreakdown
                skillsMatch={alumni.skillsMatch}
                experienceMatch={alumni.experienceMatch}
                cityMatch={alumni.cityMatch}
                extracurricularsMatch={alumni.extracurricularsMatch}
                educationMatch={alumni.educationMatch}
              />
            </div>
          )}
        </div>

        <div className="pt-2 border-t space-y-3">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Contact Information</h4>
            <div className="flex items-center gap-2 text-sm bg-muted/50 rounded-md p-3">
              <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <code className="text-xs flex-1 truncate">{alumni.email}</code>
              {alumni.emailVerified && (
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              )}
            </div>
            {alumni.emailVerified && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified Academic Email
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              data-testid={`button-linkedin-${alumni.id}`}
            >
              <a href={alumni.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
            {alumni.twitterUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                data-testid={`button-twitter-${alumni.id}`}
              >
                <a href={alumni.twitterUrl} target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </a>
              </Button>
            )}
            {alumni.websiteUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                data-testid={`button-website-${alumni.id}`}
              >
                <a href={alumni.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </a>
              </Button>
            )}
          </div>

          <Button
            className="w-full"
            onClick={() => onGenerateEmail(alumni.id)}
            data-testid={`button-generate-email-${alumni.id}`}
          >
            Generate Personalized Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

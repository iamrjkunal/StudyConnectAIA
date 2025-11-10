import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin, Twitter, Globe, Mail, CheckCircle2, ChevronDown, ChevronUp, Award, Briefcase, MapPin } from "lucide-react";
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

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400";
    if (rank === 2) return "bg-slate-500/10 text-slate-700 border-slate-500/20 dark:text-slate-400";
    if (rank === 3) return "bg-amber-600/10 text-amber-700 border-amber-600/20 dark:text-amber-400";
    return "bg-muted text-muted-foreground";
  };

  return (
    <Card className="overflow-hidden shadow-md border-card-border hover:shadow-lg transition-all duration-300" data-testid={`alumni-card-${alumni.id}`}>
      <CardHeader className="p-6 pb-4 bg-gradient-to-br from-muted/30 to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 ring-2 ring-background shadow-md">
                <AvatarImage src={alumni.photoUrl} alt={alumni.name} />
                <AvatarFallback className="text-lg font-semibold">{alumni.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-background shadow-sm ${getRankBadgeColor(rank)}`}>
                {rank}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight" data-testid={`text-alumni-name-${alumni.id}`}>
                {alumni.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {alumni.currentRole}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                {alumni.currentCompany}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 bg-primary/5 px-3 py-2 rounded-lg border border-primary/10">
            <div className="text-2xl font-bold text-primary tracking-tight" data-testid={`text-match-score-${alumni.id}`}>
              {alumni.matchScore}%
            </div>
            <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Match</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Award className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1">Education</h4>
              <p className="text-sm font-medium text-foreground leading-snug">
                {alumni.degree}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {alumni.university} • {alumni.country}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1">Pre-Study Background</h4>
              <p className="text-sm font-medium text-foreground leading-snug">
                {alumni.preStudyRole}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {alumni.preStudyCompany}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground pl-6">
            <MapPin className="w-3.5 h-3.5" />
            <span>{alumni.preStudyCity}</span>
            <span>•</span>
            <span>{alumni.yearsOfExperience} years experience</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Top Skills</h4>
          <div className="flex flex-wrap gap-2">
            {alumni.skills.slice(0, 6).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs font-medium px-2.5 py-0.5">
                {skill}
              </Badge>
            ))}
            {alumni.skills.length > 6 && (
              <Badge variant="outline" className="text-xs font-medium px-2.5 py-0.5">
                +{alumni.skills.length - 6}
              </Badge>
            )}
          </div>
        </div>

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full justify-between -mx-2 hover-elevate"
            data-testid={`button-toggle-breakdown-${alumni.id}`}
          >
            <span className="text-sm font-semibold">View Match Details</span>
            {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          {showBreakdown && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
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

        <div className="pt-4 border-t space-y-4">
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Contact</h4>
            <div className="flex items-center gap-2 text-sm bg-muted/40 rounded-lg p-3 border border-border">
              <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <code className="text-xs flex-1 truncate font-mono">{alumni.email}</code>
              {alumni.emailVerified && (
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">Verified</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hover-elevate"
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
                className="hover-elevate"
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
                className="hover-elevate"
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
            className="w-full h-11 font-semibold shadow-sm hover:shadow-md transition-all"
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

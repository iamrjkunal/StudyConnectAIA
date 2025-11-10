import { cn } from "@/lib/utils";

interface MatchCriterion {
  label: string;
  value: number;
  weight: number;
  color: string;
}

interface MatchBreakdownProps {
  skillsMatch: number;
  experienceMatch: number;
  cityMatch: number;
  extracurricularsMatch: number;
  educationMatch: number;
}

export default function MatchBreakdown({
  skillsMatch,
  experienceMatch,
  cityMatch,
  extracurricularsMatch,
  educationMatch,
}: MatchBreakdownProps) {
  const criteria: MatchCriterion[] = [
    { label: "Skills Overlap", value: skillsMatch, weight: 40, color: "bg-chart-1" },
    { label: "Experience", value: experienceMatch, weight: 25, color: "bg-chart-2" },
    { label: "City Background", value: cityMatch, weight: 15, color: "bg-chart-3" },
    { label: "Extracurriculars", value: extracurricularsMatch, weight: 10, color: "bg-chart-4" },
    { label: "Education", value: educationMatch, weight: 10, color: "bg-chart-5" },
  ];

  return (
    <div className="space-y-4" data-testid="match-breakdown">
      {criteria.map((criterion) => (
        <div key={criterion.label} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-semibold">{criterion.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">{criterion.value}%</span>
              <span className="text-xs text-muted-foreground font-medium">
                (weight: {criterion.weight}%)
              </span>
            </div>
          </div>
          <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden border border-border/50 shadow-inner">
            <div
              className={cn("h-full rounded-full transition-all duration-700 ease-out shadow-sm", criterion.color)}
              style={{ width: `${criterion.value}%` }}
              data-testid={`match-bar-${criterion.label.toLowerCase().replace(/\s+/g, "-")}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

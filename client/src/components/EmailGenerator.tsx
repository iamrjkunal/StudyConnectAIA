import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Sparkles, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface EmailGeneratorProps {
  alumniName: string;
  generatedEmail: string | null;
  isGenerating: boolean;
  personalizations: string[];
  onCopy: () => void;
}

export default function EmailGenerator({
  alumniName,
  generatedEmail,
  isGenerating,
  personalizations,
  onCopy,
}: EmailGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (generatedEmail) {
      navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      onCopy();
      toast({
        title: "Email copied!",
        description: "The personalized email has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="shadow-md border-card-border bg-gradient-to-br from-card to-accent/5" data-testid="email-generator">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span>AI-Generated Outreach</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <Loader2 className="w-6 h-6 text-primary animate-spin absolute -top-1 -right-1" />
            </div>
            <p className="text-sm font-medium text-foreground">Crafting personalized email...</p>
            <p className="text-xs text-muted-foreground mt-1">Analyzing shared background and experiences</p>
          </div>
        )}

        {generatedEmail && !isGenerating && (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Personalization Elements</p>
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                  AI-Powered
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {personalizations.map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs font-medium px-3 py-1 bg-accent/30 border-accent/40">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-5 space-y-3 border border-border shadow-sm">
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email Preview</span>
              </div>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                  {generatedEmail}
                </pre>
              </div>
            </div>

            <Button
              onClick={handleCopy}
              size="lg"
              className="w-full h-11 font-semibold shadow-sm hover:shadow-md transition-all"
              variant={copied ? "secondary" : "default"}
              data-testid="button-copy-email"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Email to Clipboard
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

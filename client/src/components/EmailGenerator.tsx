import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Sparkles, Loader2 } from "lucide-react";
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
    <Card data-testid="email-generator">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          AI-Generated Outreach Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating && (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Crafting personalized email...</span>
          </div>
        )}

        {generatedEmail && !isGenerating && (
          <>
            <div className="space-y-2">
              <p className="text-sm font-medium">Personalization Highlights:</p>
              <div className="flex flex-wrap gap-2">
                {personalizations.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 rounded-md p-4 space-y-3">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                  {generatedEmail}
                </pre>
              </div>
            </div>

            <Button
              onClick={handleCopy}
              className="w-full"
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

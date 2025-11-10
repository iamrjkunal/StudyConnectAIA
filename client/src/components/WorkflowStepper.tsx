import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface WorkflowStepperProps {
  currentStep: number;
  steps: Step[];
}

export default function WorkflowStepper({ currentStep, steps }: WorkflowStepperProps) {
  return (
    <div className="w-full" data-testid="workflow-stepper">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-sm",
                  currentStep > step.number
                    ? "bg-primary border-primary text-primary-foreground shadow-primary/20"
                    : currentStep === step.number
                    ? "border-primary bg-primary/5 text-primary ring-4 ring-primary/10"
                    : "border-border bg-background text-muted-foreground"
                )}
                data-testid={`step-indicator-${step.number}`}
              >
                {currentStep > step.number ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span className="text-base font-bold">{step.number}</span>
                )}
              </div>
              <div className="mt-3 text-center">
                <p
                  className={cn(
                    "text-sm font-semibold tracking-tight",
                    currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="relative flex-1 mx-4">
                <div className="h-0.5 bg-border" />
                <div
                  className={cn(
                    "absolute inset-0 h-0.5 transition-all duration-500",
                    currentStep > step.number ? "bg-primary" : "bg-transparent"
                  )}
                  style={{
                    width: currentStep > step.number ? "100%" : "0%",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

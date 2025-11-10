import WorkflowStepper from "../WorkflowStepper";

export default function WorkflowStepperExample() {
  const steps = [
    { number: 1, title: "Your Profile", description: "LinkedIn & location" },
    { number: 2, title: "Target Program", description: "Degree & country" },
    { number: 3, title: "View Matches", description: "Top 3 alumni" },
  ];

  return <WorkflowStepper currentStep={2} steps={steps} />;
}

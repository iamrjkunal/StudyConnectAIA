import Step2Form from "../Step2Form";

export default function Step2FormExample() {
  return (
    <Step2Form
      onSubmit={(data) => console.log("Step 2 submitted:", data)}
      onBack={() => console.log("Back clicked")}
      defaultValues={{
        targetDegree: "MS in Data Science",
        targetCountry: "Germany",
      }}
    />
  );
}

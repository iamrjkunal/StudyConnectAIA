import Step1Form from "../Step1Form";

export default function Step1FormExample() {
  return (
    <Step1Form
      onSubmit={(data) => console.log("Step 1 submitted:", data)}
      defaultValues={{
        linkedinUrl: "https://linkedin.com/in/johndoe",
        currentCity: "Mumbai",
      }}
    />
  );
}

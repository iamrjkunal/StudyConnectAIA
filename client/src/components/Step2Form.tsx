import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ArrowLeft, GraduationCap, Globe } from "lucide-react";

const step2Schema = z.object({
  targetDegree: z.string().min(2, { message: "Please enter your target degree" }),
  targetCountry: z.string().min(1, { message: "Please select a country" }),
});

type Step2FormData = z.infer<typeof step2Schema>;

interface Step2FormProps {
  onSubmit: (data: Step2FormData) => void;
  onBack: () => void;
  defaultValues?: Partial<Step2FormData>;
}

const popularCountries = [
  "Germany",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Netherlands",
  "Singapore",
  "Sweden",
  "Switzerland",
  "France",
];

export default function Step2Form({ onSubmit, onBack, defaultValues }: Step2FormProps) {
  const form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      targetDegree: defaultValues?.targetDegree || "",
      targetCountry: defaultValues?.targetCountry || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="targetDegree"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Target Degree / Stream</FormLabel>
              <FormDescription className="text-base">
                Enter the program you're planning to pursue
              </FormDescription>
              <FormControl>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
                    <GraduationCap className="w-5 h-5 text-muted-foreground group-focus-within:text-primary" />
                  </div>
                  <Input
                    {...field}
                    placeholder="e.g., MS in Data Science, MBA, MS in Computer Science"
                    className="pl-12 h-12 text-base shadow-sm transition-all focus:shadow-md"
                    data-testid="input-target-degree"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Target Country</FormLabel>
              <FormDescription className="text-base">
                Where do you want to study?
              </FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 text-base shadow-sm" data-testid="select-target-country">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <SelectValue placeholder="Select a country" />
                    </div>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {popularCountries.map((country) => (
                    <SelectItem key={country} value={country} className="text-base">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onBack}
            className="w-full sm:w-auto h-12 text-base font-semibold hover-elevate"
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back
          </Button>
          <Button type="submit" size="lg" className="w-full sm:flex-1 h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all" data-testid="button-find-matches">
            Find My Matches
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

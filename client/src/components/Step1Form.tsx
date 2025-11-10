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
import { ArrowRight, Linkedin, MapPin } from "lucide-react";

const step1Schema = z.object({
  linkedinUrl: z.string().url({ message: "Please enter a valid LinkedIn URL" }),
  currentCity: z.string().min(2, { message: "Please enter your current city" }),
});

type Step1FormData = z.infer<typeof step1Schema>;

interface Step1FormProps {
  onSubmit: (data: Step1FormData) => void;
  defaultValues?: Partial<Step1FormData>;
}

export default function Step1Form({ onSubmit, defaultValues }: Step1FormProps) {
  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      linkedinUrl: defaultValues?.linkedinUrl || "",
      currentCity: defaultValues?.currentCity || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">LinkedIn Profile URL</FormLabel>
              <FormDescription className="text-base">
                We'll analyze your education, skills, and experience to find the best matches
              </FormDescription>
              <FormControl>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
                    <Linkedin className="w-5 h-5 text-muted-foreground group-focus-within:text-primary" />
                  </div>
                  <Input
                    {...field}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="pl-12 h-12 text-base shadow-sm transition-all focus:shadow-md"
                    data-testid="input-linkedin-url"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Current City</FormLabel>
              <FormDescription className="text-base">
                This helps us match you with alumni who had similar backgrounds
              </FormDescription>
              <FormControl>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
                    <MapPin className="w-5 h-5 text-muted-foreground group-focus-within:text-primary" />
                  </div>
                  <Input
                    {...field}
                    placeholder="e.g., Mumbai, Bangalore, Delhi"
                    className="pl-12 h-12 text-base shadow-sm transition-all focus:shadow-md"
                    data-testid="input-current-city"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all" data-testid="button-next-step">
          Continue to Target Program
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </form>
    </Form>
  );
}

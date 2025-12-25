import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { insertNewsletterSchema, type InsertNewsletter } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";

export function NewsletterForm() {
  const { toast } = useToast();
  
  const form = useForm<InsertNewsletter>({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertNewsletter) => {
      const res = await apiRequest("POST", "/api/newsletter", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: InsertNewsletter) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-sm space-x-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input 
                  placeholder="Enter your email" 
                  type="email" 
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          Subscribe
        </Button>
      </form>
    </Form>
  );
}

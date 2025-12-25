import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_70%,transparent_110%)] opacity-5" />
      </div>

      <Card className="relative z-10 w-full max-w-md mx-4 shadow-lg border-primary/20">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

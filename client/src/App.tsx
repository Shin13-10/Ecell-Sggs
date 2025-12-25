import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";
import Home from "@/pages/home";
import Events from "@/pages/events";
import Team from "@/pages/team";
import Contact from "@/pages/contact";
import Gallery from "@/pages/gallery";
import NotFound from "@/pages/not-found";
import Resources from "@/pages/resources";
import FutureOfStudentEntrepreneurship from "@/pages/resources/articles/future-of-student-entrepreneurship";
import StudentEntrepreneurHandbook from "@/pages/resources/articles/student-entrepreneur-handbook";
import { ThemeProvider } from "./lib/theme-provider";
import Footer from "@/components/footer";

import { ScrollProgress } from "@/components/ui/scroll-progress";


function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20 scroll-smooth">
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/events" component={Events} />
          <Route path="/team" component={Team} />
          {/* Removed Resources Route */}
          <Route path="/resources" component={Resources} />
          <Route path="/resources/articles/future-of-student-entrepreneurship" component={FutureOfStudentEntrepreneurship} />
          <Route path="/resources/articles/student-entrepreneur-handbook" component={StudentEntrepreneurHandbook} />
          <Route path="/contact" component={Contact} />
          <Route path="/gallery" component={Gallery} />

          {/* Member Dashboard - Accessible to all authenticated users */}


          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

import { Preloader } from "@/components/preloader";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Preloader />
        <Router />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
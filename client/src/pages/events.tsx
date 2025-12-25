import { useQuery } from "@tanstack/react-query";
import { type Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, ArrowRight, Clock, Mic, Terminal, School, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { cn } from "@/lib/utils";

import bgDesign from "@/assets/bgDesign.png";

// Dynamically import all assets for event images
const images: Record<string, string> = import.meta.glob('../assets/*', { eager: true, import: 'default' });

export default function Events() {
  const [activeTab, setActiveTab] = useState("All Events");
  const [visiblePastEvents, setVisiblePastEvents] = useState(2); // Initial visible count

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  // Helper to get image source
  const getEventImage = (imageName: string) => {
    if (imageName.startsWith('http')) return imageName;
    const assetPath = `../assets/${imageName}`;
    return images[assetPath] || imageName; // Fallback to name if not found (though should be found)
  };

  const upcomingEvents = events?.filter(e => e.status === 'upcoming') || [];
  const pastEvents = events?.filter(e => e.status === 'completed') || [];

  const handleLoadMore = () => {
    setVisiblePastEvents((prev) => Math.min(prev + 2, pastEvents.length));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-background text-foreground font-sans overflow-x-hidden p-10">
        <Skeleton className="w-full max-w-[1200px] h-[480px] rounded-xl mb-12" />
        <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Find the featured event (first upcoming or specifically marked)
  const featuredEvent = upcomingEvents.find(e => e.type === 'Featured Event') || upcomingEvents[0];

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

      {/* Hero Section */}
      <section className="w-full max-w-[1200px] px-4 md:px-10 py-8 md:py-12">
        <div className="@container">
          <div
            className="relative overflow-hidden rounded-xl bg-card min-h-[400px] md:min-h-[480px] flex flex-col justify-end p-6 md:p-12 gap-6 bg-cover bg-center bg-no-repeat group"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(16, 34, 34, 1) 0%, rgba(16, 34, 34, 0.6) 50%, rgba(16, 34, 34, 0.3) 100%), url(${bgDesign})`
            }}
          >
            <div className="flex flex-col gap-4 max-w-2xl relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 w-fit backdrop-blur-sm">
                <span className="text-primary text-sm font-bold">🔥</span>
                <span className="text-primary text-xs font-bold uppercase tracking-wide">Featured Event</span>
              </span>
              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter">
                {featuredEvent ? featuredEvent.title : "Coming Soon"} <br />
                <span className="text-3xl md:text-5xl lg:text-6xl text-primary font-bold">
                  Coming Soon
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="w-full max-w-[1200px] px-4 md:px-10 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">Upcoming</h2>
          <div className="flex gap-2">
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <article key={event.id} className="group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-[0_0_20px_rgba(17,212,212,0.15)] hover:border-primary/50 transition-all duration-300">
                <div
                  className="aspect-video w-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${getEventImage(event.imageUrl)})` }}
                >
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded text-center min-w-[60px]">
                    <p className="text-xs font-bold uppercase text-muted-foreground">
                      {new Date(event.date).toLocaleString('default', { month: 'short' })}
                    </p>
                    <p className="text-xl font-black text-primary leading-none">
                      {new Date(event.date).getDate()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-5 gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <School className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{event.type}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                  {event.registerLink && event.registerLink !== "#" ? (
                    <a href={event.registerLink} target="_blank" rel="noopener noreferrer">
                      <button className="w-full py-2.5 rounded bg-muted text-foreground hover:bg-primary hover:text-black font-bold text-sm transition-colors flex items-center justify-center gap-2">
                        <span>Register</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </a>
                  ) : (
                    <button disabled className="w-full py-2.5 rounded bg-muted/50 text-muted-foreground cursor-not-allowed font-bold text-sm transition-colors flex items-center justify-center gap-2">
                      <span>Coming Soon</span>
                    </button>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              No upcoming events at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Past Events / Timeline Style */}
      <section className="w-full max-w-[1200px] px-4 md:px-10 py-12 mb-12">
        <h2 className="text-foreground text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-8">Past Events</h2>
        <div className="relative pl-8 border-l-2 border-border space-y-12">

          {pastEvents.slice(0, visiblePastEvents).map((event) => (
            <div key={event.id} className="relative group">
              <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-muted-foreground group-hover:bg-primary transition-colors"></span>
              <div className="flex flex-col md:flex-row gap-6 bg-card p-6 rounded-xl border border-border shadow-sm">
                <div
                  className="md:w-1/3 aspect-[4/3] rounded-lg bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                  style={{ backgroundImage: `url(${getEventImage(event.imageUrl)})` }}
                />
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {event.type} • {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-muted-foreground">Completed</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {event.participants && (
                      <span className="px-3 py-1 rounded bg-muted text-xs font-medium text-muted-foreground">{event.participants}</span>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>

        {visiblePastEvents < pastEvents.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="flex items-center justify-center rounded-lg h-10 px-6 border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-all text-sm font-bold tracking-wide"
            >
              Load More Events
            </button>
          </div>
        )}
      </section>

      {/* Newsletter / CTA */}
      <section className="w-full px-4 md:px-10 py-12 bg-primary/5 border-t border-border">
        {/* ... (Keeping existing Newsletter section) ... */}
        <div className="max-w-[1200px] mx-auto rounded-2xl bg-gradient-to-br from-card to-background border border-border p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-2 max-w-lg text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Never Miss an Opportunity</h2>
              <p className="text-muted-foreground text-sm md:text-base">Subscribe to our newsletter to get the latest updates on workshops, hackathons, and speaker sessions delivered to your inbox.</p>
            </div>
            <div className="w-full max-w-md">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  className="flex-1 h-12 rounded-lg bg-background border border-border px-4 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Enter your college email"
                  type="email"
                />
                <button className="h-12 px-6 rounded-lg bg-primary text-black font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors whitespace-nowrap" type="button">
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-muted-foreground mt-2 text-center md:text-left">We respect your privacy. No spam, ever.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

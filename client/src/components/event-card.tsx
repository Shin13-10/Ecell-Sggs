import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Event } from "@shared/schema";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  event: Event;
}

// Dynamically import all assets
const images: Record<string, string> = import.meta.glob('../assets/*', { eager: true, import: 'default' });

export function EventCard({ event }: EventCardProps) {
  // Resolve image source: use absolute URL if present, otherwise look up in assets
  let displayImage = event.imageUrl;
  if (event.imageUrl && !event.imageUrl.startsWith('http')) {
    const assetPath = `../assets/${event.imageUrl}`;
    if (images[assetPath]) {
      displayImage = images[assetPath] as string;
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden bg-primary/5">
        {displayImage ? (
          <img
            src={displayImage}
            alt={event.title}
            className="h-full w-full object-cover transition-transform hover:scale-105 animate-float"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground bg-gray-200 dark:bg-gray-800">
            <span className="text-sm">Image Coming Soon</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{event.venue}</span>
        </div>
      </CardContent>
    </Card>
  );
}

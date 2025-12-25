import { Card, CardContent } from "@/components/ui/card";
import { type Team } from "@shared/schema";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin, Mail, ArrowRight, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

// Dynamically import all assets
const images: Record<string, string> = import.meta.glob('../assets/*', { eager: true, import: 'default' });

interface TeamMemberProps {
  member: Team & { name: string; email: string; linkedin?: string };
  className?: string;
}

// Helper to get image source
const getMemberImage = (member: Team & { name: string; email: string; linkedin?: string }) => {
  if (member.imageUrl) {
    if (member.imageUrl.startsWith('http')) return member.imageUrl;
    const assetPath = `../assets/${member.imageUrl}`;
    if (images[assetPath]) return images[assetPath];
  }
  return null;
};

// Helper for initials
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// --- 1. President / Core Feature Card ---
export function PresidentCard({ member, className }: TeamMemberProps) {
  const imageSrc = getMemberImage(member);

  return (
    <div className={cn("bg-white dark:bg-[#2a2a20] rounded-3xl p-5 md:p-6 shadow-sm border border-[#e6e6db] dark:border-[#3a3a2a] group hover:border-primary/50 transition-all duration-300 max-w-5xl mx-auto", className)}>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-center">
        <div className="relative shrink-0">
          <div className="w-48 h-48 md:w-72 md:h-72 rounded-full border-4 border-primary group-hover:scale-105 transition-transform duration-500 overflow-hidden bg-muted">
            {imageSrc ? (
              <img src={imageSrc} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <Avatar className="w-full h-full">
                <AvatarFallback className="w-full h-full text-4xl font-bold bg-primary/10 flex items-center justify-center text-primary">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="absolute bottom-4 right-4 bg-primary text-black p-2 rounded-full border-4 border-white dark:border-[#2a2a20]">
            <Star className="fill-black w-6 h-6" />
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-3 text-center md:text-left">
          <div>
            <div className="inline-block bg-primary/20 text-black dark:text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              {member.role}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#181811] dark:text-white">{member.name}</h3>
            {/* University/Year placeholder or could be part of description */}
          </div>

          <div className="flex items-start gap-3 justify-center md:justify-start">
            <Quote className="w-5 h-5 text-primary/60 shrink-0 mt-1.5" />
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-2xl text-left">
              {member.description}
            </p>
          </div>

          <div className="flex gap-3 justify-center md:justify-start mt-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                className="w-10 h-10 rounded-full bg-[#f0f0eb] dark:bg-[#3a3a2a] flex items-center justify-center text-[#181811] dark:text-white hover:bg-primary hover:text-black transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18} />
              </a>
            )}
            <a
              href={`mailto:${member.email}`}
              className="w-10 h-10 rounded-full bg-[#f0f0eb] dark:bg-[#3a3a2a] flex items-center justify-center text-[#181811] dark:text-white hover:bg-primary hover:text-black transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. Leadership Landscape Card (VP/Secretary) ---
export function LeadershipCard({ member, className }: TeamMemberProps) {
  const imageSrc = getMemberImage(member);

  return (
    <div className={cn("bg-white dark:bg-[#2a2a20] rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-[#e6e6db] dark:border-[#3a3a2a] hover:border-primary/50 transition-all", className)}>
      <div className="relative w-24 h-24 shrink-0">
        <div className="w-full h-full rounded-full border-2 border-primary overflow-hidden bg-muted">
          {imageSrc ? (
            <img src={imageSrc} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <Avatar className="w-full h-full">
              <AvatarFallback className="w-full h-full text-xl font-bold bg-primary/10 flex items-center justify-center text-primary">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        <div className="absolute bottom-0 right-0 bg-primary text-black p-1.5 rounded-full border-2 border-white dark:border-[#2a2a20]">
          <Star className="fill-black w-3 h-3" />
        </div>
      </div>

      <div className="text-center sm:text-left flex-1 min-w-0">
        <p className="text-primary text-sm font-bold uppercase tracking-wide mb-1">{member.role}</p>
        <h3 className="text-xl font-bold text-[#181811] dark:text-white truncate">{member.name}</h3>
        <div className="flex items-start gap-2 mt-2 text-gray-600 dark:text-gray-300 text-sm italic mb-3">
          <Quote className="w-3 h-3 text-primary/50 shrink-0 mt-1" />
          <p className="line-clamp-2">{member.description}</p>
        </div>

        {/* Socials */}
        <div className="flex gap-2 justify-center sm:justify-start">
          {member.linkedin && (
            <a
              href={member.linkedin}
              className="w-8 h-8 rounded-full bg-[#f0f0eb] dark:bg-[#3a3a2a] flex items-center justify-center text-[#181811] dark:text-white hover:bg-primary hover:text-black transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={14} />
            </a>
          )}
          <a
            href={`mailto:${member.email}`}
            className="w-8 h-8 rounded-full bg-[#f0f0eb] dark:bg-[#3a3a2a] flex items-center justify-center text-[#181811] dark:text-white hover:bg-primary hover:text-black transition-colors"
          >
            <Mail size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

// --- 3. Standard Member Card (Builders/Heads) ---
export function TeamCard({ member, className }: TeamMemberProps) {
  const imageSrc = getMemberImage(member);

  return (
    <div className={cn("group relative bg-white dark:bg-[#2a2a20] rounded-[2rem] p-5 border border-[#e6e6db] dark:border-[#3a3a2a] hover:bg-primary transition-colors duration-300 overflow-hidden", className)}>
      <div className="flex items-center gap-4 z-10 relative">
        <div className="w-16 h-16 rounded-full border-2 border-white dark:border-[#3a3a2a] group-hover:border-black transition-colors overflow-hidden bg-muted shrink-0">
          {imageSrc ? (
            <img src={imageSrc} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <Avatar className="w-full h-full">
              <AvatarFallback className="w-full h-full font-bold bg-primary/10 flex items-center justify-center text-primary">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="min-w-0">
          <h4 className="text-lg font-bold text-[#181811] dark:text-white group-hover:text-black transition-colors truncate pr-2">
            {member.name}
          </h4>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-black/70 transition-colors truncate">
            {member.role}
          </p>
        </div>

        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
          {member.linkedin ? (
            <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-black text-primary flex items-center justify-center">
              <ArrowRight size={16} />
            </a>
          ) : (
            <div className="w-8 h-8 rounded-full bg-black text-primary flex items-center justify-center">
              <ArrowRight size={16} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 group-hover:border-black/10 transition-colors z-10 relative">
        <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-black/80 line-clamp-2 transition-colors">
          {member.description || "Building the future of entrepreneurship."}
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Team } from "@shared/schema";
import { TeamCard, PresidentCard, LeadershipCard } from "@/components/team-card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Users, Rocket, Sparkles, Filter, Briefcase, Megaphone, Laptop, Calendar, Bolt } from "lucide-react";
import leadershipSideImg from '../assets/8270945_5439.jpg';

export default function TeamPage() {
  const [filter, setFilter] = useState("All");

  const { data: team, isLoading } = useQuery<(Team & { name: string; email: string; linkedin?: string })[]>({
    queryKey: ["/api/team"],
  });

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-[320px] w-full rounded-[2rem]" />
          ))}
        </div>
      </div>
    );
  }

  // --- Data Processing & Grouping ---
  const faculty = team?.filter(m => m.role.toLowerCase().includes('faculty') || m.role.toLowerCase().includes('guidance')) || [];

  // Find President specifically
  const president = team?.find(m => m.role.toLowerCase() === 'president');

  // Other Core Leadership (VP, Secretary, Treasurer) excluding President
  const coreLeadership = team?.filter(m => {
    const r = m.role.toLowerCase();
    return (r.includes('president') || r.includes('secretary') || r.includes('treasurer') || r.includes('vice')) && m.id !== president?.id;
  }) || [];

  // "Builders" - Heads, Co-Heads, Members
  // We'll filter this list based on the selected tab
  const builders = team?.filter(m => {
    const r = m.role.toLowerCase();
    return !r.includes('faculty') && !r.includes('guidance') && !r.includes('president') && !r.includes('secretary') && !r.includes('treasurer') && !r.includes('vice') && r !== 'member';
  }) || [];

  const getFilteredBuilders = () => {
    if (filter === "All") return builders;
    const lowerFilter = filter.toLowerCase();

    return builders.filter(m => {
      const r = m.role.toLowerCase();
      if (lowerFilter === 'core team') return r.includes('head') || r.includes('lead'); // Assuming "Core Team" here refers to Dept Heads
      if (filter === 'Marketing') return r.includes('marketing') || r.includes('pr') || r.includes('public relations') || r.includes('social');
      if (filter === 'Tech') return r.includes('tech') || r.includes('web') || r.includes('developer') || r.includes('ideation');
      if (filter === 'Events') return r.includes('event') || r.includes('management') || r.includes('finance') || r.includes('operation') || r.includes('planning');
      if (filter === 'Design') return r.includes('design') || r.includes('creative');
      return true;
    });
  };

  const filteredBuilders = getFilteredBuilders();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background text-foreground overflow-x-hidden transition-colors duration-200 font-sans">

      {/* --- HERO SECTION --- */}
      <div className="relative w-full flex flex-col items-center justify-center py-20 px-4 md:px-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 -z-10 pointer-events-none"></div>

        <div className="flex flex-col max-w-[1200px] w-full gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6 order-2 md:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card w-fit shadow-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Team 2025-26</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
                The Minds <br />
                <span className="relative inline-block z-10 text-primary">
                  Behind the
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
                  </svg>
                </span> <br />
                Mission
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
                A group of dreamers, builders, and disruptors shaping the future of entrepreneurship.
              </p>

              <div className="flex gap-4 pt-4">
                <a href="#team-grid" className="flex items-center justify-center gap-2 rounded-full h-12 px-8 bg-foreground text-background font-bold transition-transform hover:scale-105 active:scale-95">
                  <span>Explore Team</span>
                  <Users className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-1 md:order-2 flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-[4/3]">
                <div className="absolute inset-0 bg-primary rounded-[2rem] rotate-6 scale-95 opacity-20 animate-pulse"></div>
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover rounded-[2rem] border-4 border-background shadow-2xl relative z-10"
                  style={{ backgroundImage: `url(${leadershipSideImg})` }}
                ></div>

                {/* Floating badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 md:bottom-10 md:-left-8 bg-card p-4 rounded-xl shadow-lg flex items-center gap-3 z-20 border border-border"
                >
                  <div className="bg-primary/20 p-2 rounded-full text-primary">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase">Community</p>
                    <p className="text-lg font-bold">50+ Members</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- STICKY FILTER TABS --- */}
      <div className="sticky top-[64px] z-40 bg-background/80 backdrop-blur-md border-b border-border py-4">
        <div className="flex justify-center px-4 overflow-x-auto no-scrollbar">
          <div className="flex p-1 bg-muted rounded-full">
            {["All", "Core Team", "Marketing", "Tech", "Events", "Design"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === tab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex flex-1 justify-center py-12 px-4 md:px-10" id="team-grid">
        <div className="flex flex-col max-w-[1200px] w-full gap-16">

          {/* CORE LEADERSHIP SECTION (Merged Faculty & Student Leaders) */}
          {(faculty.length > 0 || president || coreLeadership.length > 0) && (
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Core Leadership</h2>
                <div className="h-px bg-border flex-1"></div>
              </div>

              {/* 1. Feature Block: Faculty/Mentor (Milind Sir) */}
              {faculty.length > 0 && (
                <div className="flex flex-col gap-6 mb-4">
                  {faculty.map((member) => (
                    <PresidentCard key={member.id} member={member} />
                  ))}
                </div>
              )}

              {/* 2. Grid Block: President & VPs (Under the Feature Block) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* President */}
                {president && (
                  <LeadershipCard member={president} />
                )}

                {/* VPs/Secretaries */}
                {coreLeadership.map((member) => (
                  <LeadershipCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          )}

          {/* BUILDERS / DEPARTMENT SECTIONS */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">The Builders</h2>
              <div className="h-px bg-border flex-1"></div>
              <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">{filteredBuilders.length} Members</div>
            </div>

            {filteredBuilders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuilders.map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <TeamCard member={member} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                <p className="text-muted-foreground text-lg">No team members found in this category.</p>
                <button onClick={() => setFilter("All")} className="text-primary hover:underline mt-2">View All Members</button>
              </div>
            )}
          </section>

          {/* STUDENT MEMBERS SECTION (Names Only) */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Student Members</h2>
              <div className="h-px bg-border flex-1"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* This data should come from 'team' generally, but filtering here for demo or explicit members */}
              {/* Assuming members with role 'Member' who are not captured above, or explicit list */}
              {team?.filter(m => m.role.toLowerCase() === 'member').map((member) => (
                <div key={member.id} className="p-4 bg-white dark:bg-[#2a2a20] rounded-xl border border-border flex items-center justify-center text-center shadow-sm hover:border-primary/50 transition-colors">
                  <span className="font-bold text-[#181811] dark:text-white">{member.name}</span>
                </div>
              ))}

              {/* Fallback if no specific 'Member' role found yet (Mock for User to see) */}
              {(!team?.find(m => m.role.toLowerCase() === 'member')) && (
                <>
                  <div className="p-4 bg-muted/20 border border-dashed border-border rounded-xl text-center text-muted-foreground text-sm col-span-full">
                    Student Members list will appear here. Add members with role "Member".
                  </div>
                </>
              )}
            </div>
          </section>

        </div>
      </div>

      {/* --- CALL TO ACTION FOOTER --- */}
      <div className="border-t border-border bg-card">
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <Rocket className="w-12 h-12 mb-4 text-primary animate-bounce-subtle" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">Want to be on this wall?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            Recruitment opens periodically. Join a network of ambitious creators.
          </p>
          <div className="flex gap-4">
            <a href="/contact" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2">
              Join Us <ArrowRight size={16} />
            </a>
            <a href="/contact" className="bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold py-3 px-8 rounded-full transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

// Simple Helper Icon just in case
function ArrowRight({ size = 24, className = "" }: { size?: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

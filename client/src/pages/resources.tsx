import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Rocket,
    ArrowRight,
    Clock,
    ExternalLink,
    BookOpen,
    LayoutGrid,
    Users,
    Star,
    Download
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for our resources
type ResourceCategory = "All" | "Articles" | "Tools" | "Mentorship" | "Events";

interface Resource {
    id: string;
    type: Exclude<ResourceCategory, "All">;
    title: string;
    description: string;
    image?: string;
    icon?: React.ReactNode;
    metadata: string;
    link: string;
    linkText: string;
    featured?: boolean;
}

export default function Resources() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<ResourceCategory>("All");

    const resources: Resource[] = [
        {
            id: "1",
            type: "Articles",
            title: "Student Entrepreneur’s Comprehensive Handbook",
            description: "The ultimate guide covering ideation, validation, frameworks (Business Model Canvas), and Indian government grants (NIDHI-EIR).",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070",
            metadata: "15 min read",
            link: "/resources/articles/student-entrepreneur-handbook",
            linkText: "Read Handbook",
            featured: true
        },
        {
            id: "2",
            type: "Articles",
            title: "How to Start a Startup",
            description: "Sam Altman's legendary Stanford course (CS183B). The single best resource for understanding the fundamentals.",
            icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Stanford_University_logo.svg/2560px-Stanford_University_logo.svg.png" className="h-24 w-auto object-contain" alt="Stanford" />,
            metadata: "Video Course",
            link: "https://www.youtube.com/watch?v=CBYhVcO4WgI",
            linkText: "Watch Course"
        },
        {
            id: "3",
            type: "Articles",
            title: "Startups in 13 Sentences",
            description: "Paul Graham's distilled wisdom on what makes a startup succeed. Essential reading for every founder.",
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=2070", // Coding/Writing aesthetic
            metadata: "Essay",
            link: "https://paulgraham.com/13sentences.html",
            linkText: "Read Essay"
        },
        {
            id: "4",
            type: "Tools",
            title: "Business Model Canvas",
            description: "Strategyzer's famous one-page business plan template. Map your value prop, customers, and revenue.",
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2070", // Planning/Working aesthetic
            metadata: "PDF Template",
            link: "https://4952096.fs1.hubspotusercontent-na1.net/hubfs/4952096/Insights%20-%20Gated%20-%20Content%20to%20Download/Business%20Model%20Canvas%20-%20Strategyzer.pdf",
            linkText: "Download PDF"
        },
        {
            id: "5",
            type: "Tools",
            title: "The Mom Test Validation",
            description: "How to talk to customers & learn if your business is a good idea when everyone is lying to you.",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2070", // Meeting/Talking aesthetic - better than generic book cover
            metadata: "Validation Guide",
            link: "https://www.momtestbook.com/",
            linkText: "View Resource"
        },
        {
            id: "6",
            type: "Articles",
            title: "Y Combinator Startup School",
            description: "The world's best free curriculum for founders. Learn how to launch a startup from the experts at YC.",
            icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/1024px-Y_Combinator_logo.svg.png" className="h-16 w-16 object-contain" alt="YC" />,
            metadata: "Free Curriculum",
            link: "https://www.startupschool.org/",
            linkText: "Join School"
        },
        {
            id: "7",
            type: "Tools",
            title: "Pitch Deck Template",
            description: "Winning pitch deck templates from Sequoia Capital and other top VCs to help you raise funding.",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070", // Presentation aesthetic
            metadata: "Templates",
            link: "https://www.sequoiacap.com/article/writing-a-business-plan/",
            linkText: "View Templates"
        },
        {
            id: "8",
            type: "Tools",
            title: "No-Code Builder List",
            description: "Build your MVP without code. Includes Bubble, Softr, Glide, and Adalo.",
            image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=2070", // Coding/Tech aesthetic
            metadata: "20+ Tools",
            link: "https://www.nocode.tech/tools",
            linkText: "Browse Tools"
        },
        {
            id: "9",
            type: "Mentorship",
            title: "Startup India Hub",
            description: "Official government portal for recognition, tax benefits, and access to NIDHI-EIR grants.",
            image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=2076", // India Gate or Gov aesthetic - Unsplash has limited India specific gov, using generic 'India' or 'Government building' might be better. Using a professional office/flag aesthetic.
            metadata: "Govt Scheme",
            link: "https://www.startupindia.gov.in/",
            linkText: "Visit Portal"
        },
        {
            id: "10",
            type: "Articles",
            title: "The Future of Student Entrepreneurship",
            description: "Exploring the evolving landscape of student entrepreneurship and the opportunities ahead.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070",
            metadata: "5 min read",
            link: "/resources/articles/future-of-student-entrepreneurship",
            linkText: "Read Now"
        }
    ];

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === "All" || resource.type === selectedFilter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* Content Wrapper */}
            <div className="flex-1 flex justify-center py-5">
                <div className="w-full max-w-[1200px] flex flex-col px-4 md:px-10 lg:px-40">

                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 py-2">
                        <Link href="/" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">
                            Home
                        </Link>
                        <span className="text-muted-foreground text-sm font-medium">/</span>
                        <span className="text-foreground text-sm font-medium">Resources</span>
                    </div>

                    {/* Page Heading & Search */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 py-6">
                        <div className="flex flex-col gap-3 max-w-2xl">
                            <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight text-foreground">
                                Fuel Your <span className="text-primary">Venture</span>
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Curated tools, guides, and mentorship to help you build, launch, and scale your startup ideas.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full lg:w-auto min-w-[320px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search resources..."
                                    className="pl-10 h-12 bg-background border-border"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filter Chips */}
                    <div className="flex gap-3 pb-8 flex-wrap overflow-x-auto no-scrollbar">
                        {["All", "Articles", "Tools", "Mentorship", "Events"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter as ResourceCategory)}
                                className={cn(
                                    "flex h-9 shrink-0 items-center justify-center px-5 rounded-full text-sm font-medium transition-all duration-300",
                                    selectedFilter === filter
                                        ? "bg-primary text-primary-foreground shadow-sm shadow-blue-200 dark:shadow-none hover:bg-primary/90"
                                        : "bg-card border border-border text-foreground hover:bg-accent hover:border-accent-foreground/30"
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Featured Resource (Spotlight) */}
                    <div className="pb-10">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 shadow-lg">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Rocket className="w-[300px] h-[300px] text-white" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 md:p-12 items-center">
                                <div className="flex-1 space-y-4">
                                    <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
                                        <Star className="h-3.5 w-3.5" />
                                        Featured Guide
                                    </div>
                                    <h3 className="text-3xl font-bold text-white tracking-tight">Student Entrepreneur’s Handbook</h3>
                                    <p className="text-gray-300 text-lg max-w-xl">
                                        The ultimate starting point. We've condensed everything you need to know about ideation, validation, and funding into one comprehensive guide.
                                    </p>
                                    <div className="pt-2">
                                        <Link href="/resources/articles/student-entrepreneur-handbook">
                                            <Button className="h-auto py-3 px-6 text-sm font-bold gap-2 bg-primary hover:bg-primary/90 text-white transition-transform hover:-translate-y-0.5">
                                                Start Reading <BookOpen className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/3 aspect-video md:aspect-square relative rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/10">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                    <img
                                        className="h-full w-full object-cover"
                                        alt="Student reading a handbook"
                                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="pb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-foreground">Latest Resources</h2>
                            <Link href="#" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                                View All <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredResources.map((resource) => (
                                <div
                                    key={resource.id}
                                    className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300"
                                >
                                    <div className={cn(
                                        "h-48 overflow-hidden relative flex items-center justify-center",
                                        resource.image ? "" : "bg-muted"
                                    )}>
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="bg-background/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded text-foreground">
                                                {resource.type}
                                            </span>
                                        </div>

                                        {resource.image ? (
                                            <img
                                                src={resource.image}
                                                alt={resource.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="group-hover:scale-110 transition-transform duration-300">
                                                {resource.icon}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col p-5">
                                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {resource.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                                            {resource.description}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                                {resource.type === "Articles" ? <Clock className="h-3.5 w-3.5" /> : null}
                                                {resource.type === "Mentorship" ? <Users className="h-3.5 w-3.5" /> : null}
                                                {resource.metadata}
                                            </span>

                                            {resource.link.startsWith("http") ? (
                                                <a
                                                    href={resource.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                                                >
                                                    {resource.linkText} <ArrowRight className="h-3.5 w-3.5" />
                                                </a>
                                            ) : (
                                                <Link href={resource.link} className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                                    {resource.linkText} <ArrowRight className="h-3.5 w-3.5" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="pb-12">
                        <div className="rounded-2xl bg-slate-900 dark:bg-slate-50 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                            <div className="max-w-xl">
                                <h2 className="text-white dark:text-slate-900 text-2xl md:text-3xl font-bold mb-3">
                                    Stay ahead of the curve
                                </h2>
                                <p className="text-slate-400 dark:text-slate-600">
                                    Join student entrepreneurs. Get the latest tools, grants, and events delivered to your inbox weekly.
                                </p>
                            </div>
                            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="h-12 px-4 bg-white/10 dark:bg-slate-200 border-white/20 dark:border-slate-300 text-white dark:text-black placeholder:text-slate-500 min-w-[260px]"
                                />
                                <Button className="h-12 px-6 font-bold bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

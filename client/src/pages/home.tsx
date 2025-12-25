import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/newsletter-form";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import ecellWhiteLogo from "../assets/Ecell White.png";
import { useTheme } from "@/lib/theme-provider";
import { useEffect, useState, useRef } from "react";
import heroBackground from "../assets/hero_background.jpg";
import visionImage from "../assets/6272280.jpg";
import { HeroParticles } from "@/components/hero-particles";
import { LeadershipMessages } from "@/components/leadership-messages";

// CountUp Component for Stats Animation
const CountUp = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

export default function Home() {
  const { isDarkMode } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set visibility after initial load for animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center bg-gradient-to-br from-background/98 via-background to-background/98 dark:from-background/98 dark:via-background/95 dark:to-background/98 overflow-hidden"
      >
        {/* Animated Pattern Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Image - More Visible */}
          <div
            className="absolute -top-[10%] left-0 w-full h-[120%]"
            style={{
              backgroundImage: `url(${heroBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />

          {/* Hero Particles Overlay */}
          <HeroParticles />
        </div>

        {/* Content */}
        <div className="w-full max-w-[2000px] mx-auto relative px-4 md:px-6 z-10">
          <div className="flex flex-col items-center space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="relative"
            >

              <img
                src={ecellWhiteLogo}
                alt="E-Cell Logo"
                className="h-32 md:h-48 mb-0 filter drop-shadow-lg relative z-10"
                style={{ transform: `translateY(${scrollY * -0.05}px)` }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 text-center"
              style={{ transform: `translateY(${scrollY * -0.08}px)` }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                <span className="bg-gradient-to-r from-primary via-primary to-primary/90 bg-clip-text text-transparent drop-shadow-sm dark:from-primary/90 dark:via-primary dark:to-primary">
                  Welcome to E-Cell
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 text-lg md:text-xl font-medium">
                Fueling Entrepreneurship with Revolutionary Mindset
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4"
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            >
              <Link href="/events">
                <Button
                  size="lg"
                  className="relative overflow-hidden group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white dark:shadow-lg dark:shadow-primary/20"
                >
                  <span className="relative z-10">Explore</span>
                  <div className="absolute inset-0 bg-white/20 dark:bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </Button>
              </Link>

              {/* Scroll Indicator - Now beside the button on desktop */}
              <div
                className="flex items-center animate-bounce-subtle mt-4 md:mt-0"
                style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
              >
                <span className="text-sm text-white/80 mr-2">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-primary/40 dark:border-primary/40 rounded-full flex justify-center">
                  <div className="w-1.5 h-3 bg-primary/70 dark:bg-primary/70 rounded-full mt-2 animate-float" style={{ animationDuration: '1.5s' }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Cell Section */}
      {/* About Cell Section */}
      <section className="w-full py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Crystal elements in About section */}
          <div className="absolute right-0 top-1/4 w-48 h-48 opacity-20 dark:opacity-10">
            <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 transform rotate-15 skew-x-6 animate-crystal-rotate" style={{ animationDuration: '35s' }}></div>
            <div className="absolute inset-0 bg-transparent animate-crystal-shine" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="absolute left-0 bottom-1/4 w-36 h-36 opacity-20 dark:opacity-10">
            <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 transform -rotate-10 skew-y-6 animate-crystal-rotate" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-0 bg-transparent animate-crystal-shine" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="w-full max-w-[2000px] mx-auto relative px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-[800px] mx-auto text-center space-y-4"
          >
            <div className="inline-block mb-2">
              <div className="glass-premium px-4 py-1 rounded-full inline-block">
                <span className="text-sm font-medium text-primary dark:text-primary/90">About Us</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-black">
              About E-Cell
            </h2>
            <p className="text-muted-foreground text-lg dark:text-muted-foreground/90">
              At the Entrepreneurship Cell of SGGSIE&T, we are dedicated to fostering a vibrant start-up culture on campus.
              Our mission is to empower students to turn their innovative ideas into reality by providing
              comprehensive support, resources, and mentorship. We believe in nurturing the entrepreneurial
              spirit and guiding aspiring entrepreneurs through every step of their journey.
            </p>

            {/* Stats Strip */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-border/40 w-full">
              {[
                { label: "Events Hosted", value: 30, suffix: "+" },
                { label: "Startups Incubated", value: 10, suffix: "+" },
                { label: "Participants", value: 500, suffix: "+" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center">
                    <CountUp end={stat.value} duration={2.5} />
                    {stat.suffix}
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground font-medium mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features Cards with Glass Effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                title: "Innovation Hub",
                description: "A creative space where ideas transform into impactful ventures through collaboration and guidance.",
                icon: "✨",
                delay: 0.1
              },
              {
                title: "Skill Development",
                description: "Workshops and training sessions to equip you with essential entrepreneurial skills and knowledge.",
                icon: "🚀",
                delay: 0.2
              },
              {
                title: "Networking",
                description: "Connect with industry experts, successful entrepreneurs, and like-minded peers.",
                icon: "🔗",
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                viewport={{ once: true }}
                className="glass-premium rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/15 dark:bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-foreground/90">{feature.title}</h3>
                <p className="text-muted-foreground dark:text-muted-foreground/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Vision & Mission Section - Blueprint Theme */}
      <section className="w-full py-20 relative overflow-hidden bg-slate-50">
        {/* Blueprint Grid Pattern - Removed */}

        {/* Architectural Shapes */}
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-dashed border-primary/20 rounded-full opacity-50 animate-spin-slow" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-primary/20 rotate-12 opacity-50" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" />
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-dashed border-primary/20 rotate-45 opacity-40" />

        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <div className="space-y-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-4 -mt-12"
              >
                <h2 className="text-3xl font-bold tracking-tighter text-black">
                  Our Vision
                </h2>
                <p className="text-muted-foreground text-lg">
                  To nurture a community of financially literate and entrepreneurial-minded individuals
                  who can create innovative solutions, contribute to economic growth, and make a
                  positive impact in society.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold tracking-tighter text-black">
                  Our Mission
                </h2>
                <p className="text-muted-foreground text-lg">
                  To inspire, educate, and support students in developing entrepreneurial skills
                  and financial literacy, fostering innovation, collaboration, and impactful ventures.
                </p>
              </motion.div>
            </div>

            {/* Right Column: Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative w-full max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-primary/20"
            >
              <img
                src={visionImage}
                alt="Visualization of innovation"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>



      {/* Leadership Messages Section */}
      <LeadershipMessages />

      {/* Features Section with Enhanced Design */}
      <section className="w-full py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent dark:from-primary/10" />
        <div className="w-full max-w-[2000px] mx-auto relative px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/30 dark:border-primary/20 dark:hover:border-primary/40 space-y-4"
              >
                <div className="relative p-2">
                  <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                  <feature.icon className="h-12 w-12 text-primary relative" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground dark:text-muted-foreground/90">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Blueprint Theme */}
      <section className="w-full py-20 relative overflow-hidden bg-slate-50">
        {/* Blueprint Grid Pattern */}
        {/* Blueprint Grid Pattern - Removed */}

        {/* Architectural Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-primary/20 rotate-45 opacity-40" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-dashed border-primary/20 rounded-full opacity-40" />

        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-8 text-center"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-black">
                Stay Updated
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
                Subscribe to our newsletter for the latest updates on events and opportunities.
              </p>
            </div>
            <div className="w-full max-w-sm">
              <NewsletterForm />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Events & Workshops",
    description: "Regular events and workshops to enhance your entrepreneurial skills",
    icon: (props: any) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
        <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
        <path d="M15 2v5h5" />
      </svg>
    ),
  },
  {
    title: "Mentorship",
    description: "Connect with experienced entrepreneurs and industry experts",
    icon: (props: any) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 19a6 6 0 0 0-12 0" />
        <circle cx="8" cy="9" r="4" />
        <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
      </svg>
    ),
  },
  {
    title: "Resources",
    description: "Access to valuable resources and learning materials",
    icon: (props: any) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
];              
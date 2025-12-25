import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import directorImg from "../assets/Director.jpg";
import deanImg from "../assets/Milind_Sir.jpg";

export function LeadershipMessages() {
    return (
        <section className="w-full py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-950/20">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <div className="inline-block mb-2">
                        <div className="glass-premium px-4 py-1 rounded-full inline-block">
                            <span className="text-sm font-medium text-primary dark:text-primary/90">Leadership Speak</span>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white">
                        Words from our Mentors
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-[800px] mx-auto">
                        Guiding our vision and empowering the next generation of entrepreneurs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Director's Message */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="group relative"
                    >
                        <div className="glass-premium rounded-2xl p-8 md:p-10 relative overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                                <Quote size={80} />
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-start mb-6 z-10">
                                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-4 border-white/50 dark:border-white/10 shadow-lg bg-gray-200">
                                    <img
                                        src={directorImg}
                                        alt="Dr. Manesh B. Kokare"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-black dark:text-white mb-1">Dr. Manesh B. Kokare</h3>
                                    <p className="text-primary font-medium mb-1">Director</p>
                                    <p className="text-sm text-muted-foreground">SGGSIE&T, Nanded</p>
                                </div>
                            </div>

                            <div className="prose prose-gray dark:prose-invert max-w-none relative z-10 flex-grow">
                                <p className="text-muted-foreground leading-relaxed italic">
                                    "Dear Students, Entrepreneurs, and Innovators,
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    Welcome to the E-Cell website! As the Director, I am thrilled to see the passion and drive that our students bring to the world of entrepreneurship. The eCell is a platform designed to fuel creativity and empower students to transform their innovative ideas into successful ventures. I encourage you all to explore the various opportunities, events, and mentorship programs that E-Cell offers. It is our mission to support you on your entrepreneurial journey, helping you develop the skills and knowledge necessary to succeed in today’s fast-paced business world. I look forward to seeing the impact you make, and together, we can shape the future of innovation and entrepreneurship."
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Dean's Message */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="group relative"
                    >
                        <div className="glass-premium rounded-2xl p-8 md:p-10 relative overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                                <Quote size={80} />
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-start mb-6 z-10">
                                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-4 border-white/50 dark:border-white/10 shadow-lg bg-gray-200">
                                    <img
                                        src={deanImg}
                                        alt="Dr. Milind Bhalerao"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-black dark:text-white mb-1">Dr. Milind Bhalerao</h3>
                                    <p className="text-primary font-medium mb-1">Dean IIL</p>
                                    <p className="text-sm text-muted-foreground">SGGSIE&T, Nanded</p>
                                </div>
                            </div>

                            <div className="prose prose-gray dark:prose-invert max-w-none relative z-10 flex-grow">
                                <p className="text-muted-foreground leading-relaxed italic">
                                    "Dear Students,
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    Entrepreneurship is not just about starting companies; it is about nurturing a mindset that embraces innovation, resilience, and leadership. At SGGSIE&T, we believe in equipping our students with the tools and opportunities to become future leaders and changemakers. The E-Cell plays a pivotal role in this mission by organizing workshops, competitions, and mentorship programs that inspire students to think beyond conventional boundaries. I am proud of the dedication and enthusiasm of our E-Cell team, and I encourage all students to actively participate in its initiatives. Together, let us create a culture of innovation and entrepreneurship that will leave a lasting impact on society."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

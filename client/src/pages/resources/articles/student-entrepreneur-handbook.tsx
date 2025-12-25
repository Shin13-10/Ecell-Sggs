import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowLeft, User, BookOpen } from "lucide-react";
import { useLocation } from "wouter";

export default function StudentEntrepreneurHandbook() {
    const [_, setLocation] = useLocation();

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Button
                variant="ghost"
                className="mb-6 flex items-center text-muted-foreground hover:text-foreground"
                onClick={() => setLocation('/resources')}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
            </Button>

            <h1 className="text-4xl font-bold mb-4">Student Entrepreneur’s Comprehensive Handbook</h1>

            <div className="flex items-center text-sm text-muted-foreground mb-8">
                <User className="mr-2 h-4 w-4" />
                <span>E-Cell Curated</span>
                <span className="mx-2">•</span>
                <CalendarDays className="mr-2 h-4 w-4" />
                <span>2024 Edition</span>
                <span className="mx-2">•</span>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>15 min read</span>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">

                <h2>1. Theoretical Foundations & Mindset</h2>
                <p>
                    Starting a student startup is different from launching a corporation. You have limited resources but unlimited freedom.
                </p>
                <ul>
                    <li><strong>Paul Graham’s “A Student’s Guide to Startups”:</strong> Understand why being a student is an advantage (low opportunity cost) and a disadvantage (lack of experience).</li>
                    <li><strong>The "Ramen Profitability" Concept:</strong> Aim to make just enough money to pay for basic living expenses. This buys you infinite runway to experiment.</li>
                </ul>

                <h2>2. Ideation & Validation</h2>
                <p>
                    Don't build a solution looking for a problem. Find a problem worth solving.
                </p>
                <h3>The Mom Test (Rob Fitzpatrick)</h3>
                <p>
                    Don't ask your mom if your business idea is good (she lies to protect your feelings). Ask about their life and problems.
                    <br /><em>Rule: Talk about their life, not your idea.</em>
                </p>
                <h3>Design Thinking</h3>
                <p>
                    Empathize &rarr; Define &rarr; Ideate &rarr; Prototype &rarr; Test. Use the Stanford d.school "Design Thinking Bootleg" as a quick guide.
                </p>

                <h2>3. Strategic Frameworks</h2>
                <h3>Business Model Canvas (Strategyzer)</h3>
                <p>
                    Map out your entire business on one page. Key segments: Value Propositions, Customer Segments, Channels, Revenue Streams.
                </p>
                <h3>Lean Startup Methodology (Eric Ries)</h3>
                <p>
                    Build-Measure-Learn. Create a Minimum Viable Product (MVP) quickly, test it, and iterate.
                </p>

                <h2>4. Product Engine: The No-Code Revolution</h2>
                <p>
                    You don't need to be a coding wizard to build an MVP anymore.
                </p>
                <ul>
                    <li><strong>Web Apps:</strong> Bubble.io, Softr</li>
                    <li><strong>Mobile Apps:</strong> Glide, Adalo</li>
                    <li><strong>Automation:</strong> Zapier, Make.com</li>
                </ul>
                <p>
                    <em>Pro Tip: GitHub Student Developer Pack usually offers free credits for many of these tools.</em>
                </p>

                <h2>5. The Indian Startup Ecosystem Rules</h2>
                <ul>
                    <li><strong>Entities:</strong> Understand the difference between LLP and Pvt Ltd. (Hint: Investors prefer Pvt Ltd).</li>
                    <li><strong>Startup India:</strong> Register to get tax exemptions and easier compliance.</li>
                    <li><strong>Grants:</strong> Look for NIDHI-EIR (₹30k/month fellowship) and NIDHI-PRAYAS (Prototype grant up to ₹10L).</li>
                </ul>

                <h2>6. Master Resource Index</h2>
                <ul>
                    <li><strong>Course:</strong> <a href="https://www.youtube.com/watch?v=CBYhVcO4WgI" target="_blank" className="text-primary hover:underline">How to Start a Startup (Sam Altman, Stanford CS183B)</a></li>
                    <li><strong>Essay:</strong> <a href="https://paulgraham.com/13sentences.html" target="_blank" className="text-primary hover:underline">Startups in 13 Sentences (Paul Graham)</a></li>
                    <li><strong>Essay:</strong> <a href="http://paulgraham.com/ds.html" target="_blank" className="text-primary hover:underline">Do Things That Don't Scale (Paul Graham)</a></li>
                </ul>

                <h2>Summary</h2>
                <p>
                    This handbook is a living document. The most important step is the first one: <strong>Start.</strong>
                </p>

            </div>
        </div>
    );
}

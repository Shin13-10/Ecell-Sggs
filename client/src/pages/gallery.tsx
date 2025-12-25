import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Image as ImageIcon, FolderOpen, Linkedin, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";

import growthChart from "../assets/growth_chart.png";

import aluminiMeet from "../assets/Alumini Meet.jpg";
import esummit25 from "../assets/Esummit25.jpg";
import coepPsf from "../assets/coep psf.jpg";
import startupShowdown from "../assets/Startup showdown.jpg";
import cheemaWorkshop from "../assets/cheemaWorkshop.jpg";

export default function Gallery() {
  const galleries = [
    {
      src: startupShowdown,
      alt: "Startup Showdown Event",
      caption: "Startup Showdown",
      description: "Photos from our annual Startup Showdown where students collaborated to build innovative solutions.",
      link: "https://drive.google.com/drive/folders/1o_owD3Ky_ip1TJLCWoMXywHT7dKuOSws"
    },
    {
      src: esummit25,
      alt: "E-Summit Workshop",
      caption: "E-Summit",
      description: "Collection of images of the E-Summit event featuring workshops, talks, and networking sessions.",
      link: "https://drive.google.com/drive/folders/1nQdvZIUwRfTVBiYspbaoGAGHZylHs7AJ"
    },
    {
      src: cheemaWorkshop,
      alt: "Dr. HS Cheema Guest Lecture",
      caption: "Dr. HS Cheema Guest Lecture",
      description: "Insights and valuable lessons from the interactive session with Dr. HS Cheema regarding industrial innovation."
    },
    {
      src: aluminiMeet,
      alt: "Alumni Meet",
      caption: "Alumni Meet",
      description: "Highlights from our Alumni Meet where alumni reconnected and shared their experiences."
    },
    {
      src: coepPsf,
      alt: "Coep Spectra",
      caption: "Coep Spectra",
      description: "Glimpses from our participation in the pitching competition at COEP Technological University."
    },
    {
      src: growthChart,
      alt: "Business Workshop",
      caption: "Business Model Workshop",
      description: "Students learning about business model development in our hands-on workshop series."
    }
  ];

  // Social media links
  const socialLinks = {
    linkedin: "https://www.linkedin.com/company/97036732/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BcRTQ6PS5S8%2BoFLYJyP6iBA%3D%3D",
    instagram: "https://www.instagram.com/sggsiet_ecell?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    facebook: "#"
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        {/* Grid Pattern - Consistent 10% Opacity */}
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_70%,transparent_110%)] opacity-10" />

        {/* Subtle Gradient Glow for Premium Feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent drop-shadow-sm">Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Explore our collection of photos and memories from various E-Cell events, workshops, and activities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col border-primary/20 bg-card/85 backdrop-blur-md shadow-lg hover:shadow-primary/20 transition-all duration-300 group hover:scale-[1.02]">
                <CardContent className="p-0 flex-grow flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={gallery.src}
                      alt={gallery.alt}
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white p-4 pt-8">
                      <h3 className="font-bold text-lg drop-shadow-md">{gallery.caption}</h3>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                    <p className="text-muted-foreground text-sm leading-relaxed min-h-[4.5rem]">{gallery.description}</p>

                    {gallery.link && (
                      <div className="mt-auto pt-2">
                        <a href={gallery.link} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-colors duration-300">
                            <FolderOpen className="h-4 w-4" />
                            <span className="font-semibold">View Full Gallery</span>
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold mb-6">Want to see more?</h2>
          <div className="flex justify-center gap-4">
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center gap-2 px-6 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                Instagram
              </Button>
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center gap-2 px-6 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

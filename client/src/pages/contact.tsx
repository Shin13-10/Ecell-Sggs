import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Phone, Clock, MessageSquare, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_70%,transparent_110%)] opacity-5" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to answer your questions and help you connect with the E-Cell community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Get in Touch
              </h2>
              <p className="text-muted-foreground">
                Have questions about entrepreneurship or our events? We'd love to hear from you.
                Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-6 rounded-lg border border-primary/10">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:ecell@sggs.ac.in" className="text-muted-foreground hover:text-primary transition-colors">
                    ecell@sggs.ac.in
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <a href="tel:+919322199877" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 9322199877
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <address className="text-muted-foreground not-italic">
                    E-Cell Office, Student Activity Center<br />
                    Admin Build, College Campus
                  </address>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Office Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 10:00 AM - 5:00 PM<br />
                    Saturday: 11:00 AM - 3:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.614007075093!2d77.30421677504872!3d19.176232782045424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d7570a3c7c01%3A0x6cb34a2602e80156!2sShri%20Guru%20Gobind%20Singhji%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1707138193390!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="E-Cell Location"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 shadow-lg border-primary/10">
              <h2 className="text-2xl font-semibold mb-6 text-center">Send us a Message</h2>
              <ContactForm />
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <p className="text-muted-foreground mb-6">
            Stay connected with us on social media for the latest updates, events, and announcements.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://www.instagram.com/sggsiet_ecell" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
              <Instagram className="h-6 w-6 text-primary" />
            </a>
            <a href="https://www.linkedin.com/company/97036732" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
              <Linkedin className="h-6 w-6 text-primary" />
            </a>
            <a href="mailto:ecell@sggs.ac.in" className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
              <Mail className="h-6 w-6 text-primary" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

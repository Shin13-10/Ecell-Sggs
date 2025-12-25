import {
  type Event, type InsertEvent,
  type Team, type InsertTeam,
  type Contact, type InsertContact,
  type Newsletter, type InsertNewsletter,
  events, team, contacts, newsletters
} from "@shared/schema";


// Static data constants to ensure consistency across all environments (Local/Vercel)
// This bypasses the need for a database for content that strictly requires an admin dashboard to manage.
const STATIC_EVENTS: Event[] = [
  // Upcoming Events
  {
    id: "1",
    title: "E-Venture 2025",
    description: "The biggest entrepreneurial gathering of the year. Keynotes, pitch battles, and networking with industry leaders.",
    date: new Date("2025-02-27T10:00:00"),
    imageUrl: "e-venture.jpg",
    venue: "Main Auditorium",
    type: "Featured Event",
    status: "upcoming",
    registerLink: "https://forms.gle/WXAaMcK72fVt2BPw9",
    participants: null,
    capacity: 500,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "Visonite Jr",
    description: "Innovation challenge for the School students in Nanded at District level.",
    date: new Date("2025-03-15T09:00:00"),
    imageUrl: "visionite.jpg",
    venue: "TBD",
    type: "Competition",
    status: "upcoming",
    registerLink: "#",
    participants: null,
    capacity: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "Campus Innovators League",
    description: "A Competition between all the departments for having the best impactful and innovative project.",
    date: new Date("2025-04-10T09:00:00"),
    imageUrl: "CIL.png",
    venue: "Campus Wide",
    type: "Competition",
    status: "upcoming",
    registerLink: "#",
    participants: null,
    capacity: 300,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Past Events
  {
    id: "4",
    title: "Funding Fundamentals",
    description: "A comprehensive guide to VC funding and angel investing for student startups. Led by partners from Sequoia India.",
    date: new Date("2024-08-15T15:00:00"),
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKgLsL7xjCi3HyHEcPu0IOFRcQFBOTSqosP7vPlgqL3cY36JZIL_Gjl9IwgSqKie5qFJ1QXxraRNfMrZl36JFI2u5CMMLdn61bDKa3YkqUKSED0rEjYdNJ5sKAN_yptGXbWb7XMXbF5-3af5YeCllsoMvPpvbvd_kdstlvwML4oQd7O2gOoqi583cWiDbharxezcdcBqT1Jo3U3b3-8EU0Y4G4pGOy2hf3UwAVCUa_wl4rxVUujnPlhDNee_dOGwzSL6-QBstp8VQ",
    venue: "Seminar Hall",
    type: "Workshop",
    status: "completed",
    registerLink: null,
    participants: "50 Attendees",
    capacity: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    title: "IdeaStorm Hackathon 2025",
    description: "Over 30+ participants gathered to solve real-world problems.",
    date: new Date("2025-01-20T09:00:00"),
    imageUrl: "ideastormHackathon2025.jpeg",
    venue: "Innovation Centre",
    type: "Hackathon",
    status: "completed",
    registerLink: null,
    participants: "30+ Participants",
    capacity: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    title: "Dr. HS Cheema Guest Lecture",
    description: "Insightful session on industrial innovation and leadership.",
    date: new Date("2024-11-10T11:00:00"),
    imageUrl: "cheemaWorkshop.jpg",
    venue: "Auditorium",
    type: "Guest Lecture",
    status: "completed",
    registerLink: null,
    participants: "100+ Attendees",
    capacity: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "7",
    title: "Curio 2024",
    description: "Exploring curiosity and creativity in entrepreneurship.",
    date: new Date("2024-10-05T14:00:00"),
    imageUrl: "event.jpg",
    venue: "Main Hall",
    type: "Event",
    status: "completed",
    registerLink: null,
    participants: "200+ Attendees",
    capacity: 300,
    createdAt: new Date(),
    updatedAt: new Date()
  }

];

const STATIC_TEAM: Team[] = [
  {
    id: "1",
    name: "Dr. Milind Bhalerao Sir",
    role: "Faculty Coordinator - Dean IIL",
    imageUrl: "Milind_Sir.jpg",
    description: "A visionary mentor guiding the E-Cell with decades of academic and administrative experience. His leadership fosters an environment of innovation, encouraging students to push boundaries and excel in entrepreneurial ventures.",
    email: "deaniil@sggs.ac.in",
    linkedin: null,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Darshan Singh",
    role: "President",
    imageUrl: "Darshan.JPG",
    description: "Leading the organization with strategic vision and fostering a culture of innovation and entrepreneurship.",
    email: "darshanvsingh21@gmail.com",
    linkedin: "https://www.linkedin.com/in/darshan-singh-o86?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BJMwLB5vuTXeRNsM2kwFDqg%3D%3D",
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Shubhangi Pawar",
    role: "Vice President",
    imageUrl: "Shubhangi.jpg",
    description: "Coordinating execution strategies and ensuring seamless collaboration across all departments.",
    email: "shubhangipawar1054@gmail.com",
    linkedin: "https://www.linkedin.com/in/shubhangigpawar",
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Harshada Vidhate",
    role: "Head of Finance",
    imageUrl: "Harshada.jpg",
    description: "Managing financial resources, budgeting, and ensuring fiscal responsibility for all initiatives.",
    email: "harshadavidhate348@gmail.com",
    linkedin: "https://www.linkedin.com/in/harshada-vidhate-665069285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    name: "Tanmay Khanorkar",
    role: "Head of Operations and Planning",
    imageUrl: "Tanmay.JPG",
    description: "Overseeing event planning, logistics, and operational efficiency for successful execution.",
    email: "tanmaykhanorkar1800@gmail.com",
    linkedin: "https://www.linkedin.com/in/tanmay-khanorkar-82769028b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    order: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    name: "Dipti Uikey",
    role: "Head of Ideation",
    imageUrl: "Dipti.JPG",
    description: "Driving creative brainstorming sessions and fostering innovative ideas for startups and events.",
    email: "diptiuikey35@gmail.com",
    linkedin: "https://www.linkedin.com/in/dipti-dinesh-uikey-583211338?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    order: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "7",
    name: "Amarja Dhepe",
    role: "Head of Public Relations",
    imageUrl: "amarja.jpg",
    description: "Building strong relationships with stakeholders and managing the organization's public image.",
    email: "amarjadhepe17@gmail.com",
    linkedin: "https://www.linkedin.com/in/amarjadhepe?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    order: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "8",
    name: "Vaibhavi Dolas",
    role: "Head of Design and Media",
    imageUrl: "Vaibhavi.jpg",
    description: "Leading creative design initiatives and managing media presence to enhance brand identity.",
    email: "dolasvaibhavi654@gmail.com",
    linkedin: "https://www.linkedin.com/in/vaibhavi-dolas-a70b862a8?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bai2OPfqaTrqE9qvh3rgN5w%3D%3D",
    order: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Student Members (Real Data)
  { id: "9", name: "Pratik Pardhi", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 9, createdAt: new Date(), updatedAt: new Date() },
  { id: "10", name: "Manthan Modi", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 10, createdAt: new Date(), updatedAt: new Date() },
  { id: "11", name: "Ajit Kapile", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 11, createdAt: new Date(), updatedAt: new Date() },
  { id: "12", name: "Shivani Bokey", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 12, createdAt: new Date(), updatedAt: new Date() },
  { id: "13", name: "Jinendra Burse", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 13, createdAt: new Date(), updatedAt: new Date() },
  { id: "14", name: "Vaishnavi Maid", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 14, createdAt: new Date(), updatedAt: new Date() },
  { id: "15", name: "Shreedhar Patil", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 15, createdAt: new Date(), updatedAt: new Date() },
  { id: "16", name: "Tanmay Ahuja", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 16, createdAt: new Date(), updatedAt: new Date() },
  { id: "17", name: "Shivam Wagh", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 17, createdAt: new Date(), updatedAt: new Date() },
  { id: "18", name: "Shaikh Umar", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 18, createdAt: new Date(), updatedAt: new Date() },
  { id: "19", name: "Vardhan Wanjari", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 19, createdAt: new Date(), updatedAt: new Date() },
  { id: "20", name: "Dhruv", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 20, createdAt: new Date(), updatedAt: new Date() },
  { id: "21", name: "Sunil", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 21, createdAt: new Date(), updatedAt: new Date() },
  { id: "22", name: "Rohit Chaudhari", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 22, createdAt: new Date(), updatedAt: new Date() },
  { id: "23", name: "Nill Jaiswal", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 23, createdAt: new Date(), updatedAt: new Date() },
  { id: "24", name: "Veda Khandekar", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 24, createdAt: new Date(), updatedAt: new Date() },
  { id: "25", name: "Sandesh Rathod", role: "Member", imageUrl: "", description: "", email: "", linkedin: null, order: 25, createdAt: new Date(), updatedAt: new Date() }
];

export interface IStorage {
  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;

  // Team
  getTeamMembers(): Promise<Team[]>;
  getTeamMember(id: number): Promise<Team | undefined>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;

  // Newsletter
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private contacts: Map<string, Contact>;
  private newsletters: Map<string, Newsletter>;
  private currentContactId: number;
  private currentNewsletterId: number;

  constructor() {
    this.contacts = new Map();
    this.newsletters = new Map();
    this.currentContactId = 1;
    this.currentNewsletterId = 1;
  }

  async getEvents(): Promise<Event[]> {
    return STATIC_EVENTS;
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return STATIC_EVENTS.find(e => e.id === String(id));
  }

  async getTeamMembers(): Promise<Team[]> {
    return STATIC_TEAM;
  }

  async getTeamMember(id: number): Promise<Team | undefined> {
    return STATIC_TEAM.find(t => t.id === String(id));
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = String(this.currentContactId++);
    const newContact: Contact = {
      ...contact,
      id,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const id = String(this.currentNewsletterId++);
    const newNewsletter: Newsletter = {
      ...newsletter,
      id,
      status: "active",
      createdAt: new Date()
    };
    this.newsletters.set(id, newNewsletter);
    return newNewsletter;
  }
}

export const storage = new MemStorage();
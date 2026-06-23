// assets/js/events-data.js
// A comprehensive database of 32 realistic mock events with deep metadata.

const mockEvents = [
  {
    id: 1,
    title: "National HackQuest 2026",
    category: "hackathon",
    categoryLabel: "Hackathon",
    date: "July 12-14, 2026",
    location: "IIT Bombay Campus & Online (Hybrid)",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "IIT Bombay E-Cell & Google Developers",
    icon: "💻",
    color: "var(--cat-hackathon)",
    bgColor: "var(--cat-hackathon-bg)",
    description: "The ultimate national-level hackathon for young designers, developers, and product creators to build products solving India's core infrastructure and digital payment challenges.",
    prizes: "Cash prizes worth $12,000 + Google Cloud Credits",
    registrationsCount: 3450,
    viewsCount: 15400,
    daysLeft: 8,
    teamSize: "2-4 Members",
    timeline: [
      { date: "June 20, 2026", label: "Registration Opens" },
      { date: "July 5, 2026", label: "Idea Submission Deadline" },
      { date: "July 8, 2026", label: "Shortlisted Teams Announced" },
      { date: "July 12-14, 2026", label: "36-Hour Hackathon & Pitching" }
    ],
    schedule: [
      { time: "09:00 AM, July 12", title: "Opening Ceremony & Keynote" },
      { time: "11:00 AM, July 12", title: "Coding Starts & Mentor Matching" },
      { time: "06:00 PM, July 13", title: "First Round Evaluations" },
      { time: "11:00 AM, July 14", title: "Final Presentations & Judging" }
    ],
    speakers: [
      { name: "Dr. Aravind Mehta", role: "Principal Architect, Google Cloud" },
      { name: "Meera Nair", role: "Co-Founder, PaySwitch India" }
    ],
    sponsors: [
      { name: "Google Cloud", logo: "⚡" },
      { name: "Razorpay", logo: "💳" }
    ],
    featured: true
  },
  {
    id: 2,
    title: "AI & Deep Learning Masterclass",
    category: "workshop",
    categoryLabel: "Workshop",
    date: "July 20, 2026",
    location: "Online (Zoom)",
    format: "online",
    price: "paid",
    priceAmount: "$15",
    organizer: "DevMentor Association",
    icon: "🛠️",
    color: "var(--cat-workshop)",
    bgColor: "var(--cat-workshop-bg)",
    description: "An intensive 6-hour masterclass on advanced convolutional neural networks and transformer architectures. Learn with hands-on labs in PyTorch.",
    prizes: "Certificate of Mastery + GitHub Project Review",
    registrationsCount: 620,
    viewsCount: 3200,
    daysLeft: 14,
    teamSize: "Individual",
    timeline: [
      { date: "June 25, 2026", label: "Registrations Open" },
      { date: "July 18, 2026", label: "Registrations Close" },
      { date: "July 20, 2026", label: "Live Workshop Session" }
    ],
    schedule: [
      { time: "10:00 AM", title: "Introduction to PyTorch & Neural Nets" },
      { time: "12:00 PM", title: "CNNs and Image Classification Lab" },
      { time: "02:00 PM", title: "Transformers & LLM Basics" },
      { time: "03:30 PM", title: "Building a Chatbot Project" }
    ],
    speakers: [
      { name: "Rohit Shrivastava", role: "Research Scientist, Meta AI" }
    ],
    sponsors: [
      { name: "PyTorch Foundation", logo: "🔥" }
    ],
    featured: true
  },
  {
    id: 3,
    title: "Mega Technology Job Fair 2026",
    category: "jobfair",
    categoryLabel: "Job Fair",
    date: "Aug 02, 2026",
    location: "Nesco Exhibition Centre, Mumbai",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "HireFirst Recruitment Partners",
    icon: "💼",
    color: "var(--cat-jobfair)",
    bgColor: "var(--cat-jobfair-bg)",
    description: "Connect directly with recruiting managers from over 50+ tier-1 product companies and high-growth tech startups recruiting for SWE, Data, Design, and Product roles.",
    prizes: "On-the-spot interviews and career mentorship advice",
    registrationsCount: 4500,
    viewsCount: 22000,
    daysLeft: 26,
    teamSize: "Individual",
    timeline: [
      { date: "July 01, 2026", label: "Resume Upload Portal Opens" },
      { date: "July 28, 2026", label: "Pre-screening Deadline" },
      { date: "Aug 02, 2026", label: "Job Fair Day & Interviews" }
    ],
    schedule: [
      { time: "09:00 AM", title: "Doors Open & Registration Desk" },
      { time: "10:00 AM", title: "Tech Startup Pitch Panel" },
      { time: "02:00 PM", title: "Speed Interview Sessions" }
    ],
    speakers: [],
    sponsors: [
      { name: "TCS", logo: "🌐" },
      { name: "Amazon", logo: "📦" }
    ],
    featured: true
  },
  {
    id: 4,
    title: "AI Startup Pitch Challenge",
    category: "startup",
    categoryLabel: "Startup Pitch",
    date: "July 28, 2026",
    location: "Online via PitchRoom",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "VentureLaunch Accelerator",
    icon: "🚀",
    color: "var(--cat-startup)",
    bgColor: "var(--cat-startup-bg)",
    description: "A prestigious elevator pitch and business planning challenge for early-stage AI startups looking to raise pre-seed capital from prominent angel investors.",
    prizes: "Funding Pool of $50,000 + 1-on-1 VC mentorship",
    registrationsCount: 210,
    viewsCount: 1890,
    daysLeft: 22,
    teamSize: "1-5 Members",
    timeline: [
      { date: "June 15, 2026", label: "Applications Open" },
      { date: "July 15, 2026", label: "Pitch Deck Submission Deadline" },
      { date: "July 28, 2026", label: "Live Pitch & Investor Q&A" }
    ],
    schedule: [
      { time: "03:00 PM", title: "Investor Panel Panel Discussion" },
      { time: "04:00 PM", title: "Top 10 Finalist Presentations" },
      { time: "05:30 PM", title: "Awards & Networking Lobby" }
    ],
    speakers: [
      { name: "Siddharth Goel", role: "General Partner, Elevation Capital" },
      { name: "Ananya Roy", role: "Angel Investor" }
    ],
    sponsors: [
      { name: "AWS Startups", logo: "☁️" }
    ],
    featured: true
  },
  {
    id: 5,
    title: "GreenEarth Afforestation Drive",
    category: "ngo",
    categoryLabel: "NGO Program",
    date: "July 15, 2026",
    location: "Sanjay Gandhi National Park, Mumbai",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "GreenEarth Foundation",
    icon: "🌍",
    color: "var(--cat-ngo)",
    bgColor: "var(--cat-ngo-bg)",
    description: "Join us in planting 10,000 saplings in Mumbai's lungs. Get certificates, snacks, and contribute to restoration of local ecosystem biodiveristy.",
    prizes: "Certificate of Volunteering + Eco-badge",
    registrationsCount: 380,
    viewsCount: 1200,
    daysLeft: 9,
    teamSize: "Individual or Groups",
    timeline: [
      { date: "June 10, 2026", label: "Volunteer Openings" },
      { date: "July 12, 2026", label: "Registration Deadline" },
      { date: "July 15, 2026", label: "On-site Afforestation Event" }
    ],
    schedule: [
      { time: "07:30 AM", title: "Assembly at SGNP Entrance" },
      { time: "08:00 AM", title: "Plantation Workshop & Tool Distribution" },
      { time: "08:30 AM - 12:00 PM", title: "Plantation Activity" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 6,
    title: "Rhythm & Beats National Music Fest",
    category: "cultural",
    categoryLabel: "Cultural Event",
    date: "Aug 15-16, 2026",
    location: "Delhi University Amphitheatre",
    format: "offline",
    price: "paid",
    priceAmount: "$10",
    organizer: "Delhi University Music Society",
    icon: "🎭",
    color: "var(--cat-cultural)",
    bgColor: "var(--cat-cultural-bg)",
    description: "The grandest inter-collegiate band clash and classical vocal event in Delhi. Witness top universities performing live across two stages.",
    prizes: "Grand Cash Prize of $3,000 + Studio Recording Contract",
    registrationsCount: 1400,
    viewsCount: 9800,
    daysLeft: 30,
    teamSize: "1-12 Members",
    timeline: [
      { date: "July 01, 2026", label: "Video Audition Uploads" },
      { date: "July 30, 2026", label: "Announcement of Finalists" },
      { date: "Aug 15-16, 2026", label: "Grand Live Finale" }
    ],
    schedule: [
      { time: "02:00 PM, Day 1", title: "Acoustic & Classical Vocals Solo" },
      { time: "05:00 PM, Day 1", title: "DJ Night & Soundcheck" },
      { time: "04:00 PM, Day 2", title: "Battle of the Bands" }
    ],
    speakers: [
      { name: "Karan Johar", role: "Renowned Music Director" }
    ],
    sponsors: [
      { name: "Spotify India", logo: "🎵" }
    ],
    featured: true
  },
  {
    id: 7,
    title: "Rural Health & Dental Camp",
    category: "healthcare",
    categoryLabel: "Healthcare Camp",
    date: "July 19, 2026",
    location: "Gram Panchayat Hall, Karjat",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "Fortis Care Foundation",
    icon: "🏥",
    color: "var(--cat-healthcare)",
    bgColor: "var(--cat-healthcare-bg)",
    description: "Free general health checkup, pediatric consulting, and dental check camp for underprivileged families. Medical volunteering opportunities available.",
    prizes: "Free medicines and dental hygiene kit distribution",
    registrationsCount: 98,
    viewsCount: 450,
    daysLeft: 13,
    teamSize: "Individual",
    timeline: [
      { date: "June 20, 2026", label: "Doctor & Volunteer Signup" },
      { date: "July 15, 2026", label: "Final Logistics Plan" },
      { date: "July 19, 2026", label: "Karjat Camp Operations" }
    ],
    schedule: [
      { time: "08:00 AM", title: "Camp Setup & Doctor Briefing" },
      { time: "09:00 AM - 04:00 PM", title: "Patient Consultations & Diagnostics" }
    ],
    speakers: [],
    sponsors: [
      { name: "Abbott Pharma", logo: "💊" }
    ],
    featured: false
  },
  {
    id: 8,
    title: "Food Relief Clean Food Drive",
    category: "volunteer",
    categoryLabel: "Volunteer Drive",
    date: "July 11, 2026",
    location: "Dharavi Slums, Mumbai",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "FeedTheNeed NGO",
    icon: "🤝",
    color: "var(--cat-volunteer)",
    bgColor: "var(--cat-volunteer-bg)",
    description: "Volunteer to distribute clean, cooked meals to families in need. Help in packing, transport, and systematized queue distribution.",
    prizes: "Volunteering Credits + Meal Box",
    registrationsCount: 156,
    viewsCount: 560,
    daysLeft: 7,
    teamSize: "Individual",
    timeline: [
      { date: "June 25, 2026", label: "Volunteer Openings" },
      { date: "July 09, 2026", label: "Briefing Call" },
      { date: "July 11, 2026", label: "Distribution Day" }
    ],
    schedule: [
      { time: "09:30 AM", title: "Packing and Quality Check" },
      { time: "11:00 AM", title: "On-site Distribution" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 9,
    title: "TechMinds Graduate Scholarship 2026",
    category: "scholarship",
    categoryLabel: "Scholarship",
    date: "Sept 01, 2026",
    location: "Online Application Portal",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "Tata Trust & Educational Bureau",
    icon: "🎓",
    color: "var(--cat-scholarship)",
    bgColor: "var(--cat-scholarship-bg)",
    description: "A highly prestigious scholarship program aiming to support brilliant, underprivileged students seeking admission to M.Tech or PhD in CS/AI.",
    prizes: "Full Tuition Coverage + Monthly $500 Stipend",
    registrationsCount: 2890,
    viewsCount: 11200,
    daysLeft: 40,
    teamSize: "Individual",
    timeline: [
      { date: "July 01, 2026", label: "Applications Open" },
      { date: "Aug 15, 2026", label: "Application Submission Deadline" },
      { date: "Sept 01, 2026", label: "Scholarship Merit List Released" }
    ],
    speakers: [],
    sponsors: [
      { name: "Tata Foundation", logo: "🏛️" }
    ],
    featured: false
  },
  {
    id: 10,
    title: "Industry Mentorship Program",
    category: "mentorship",
    categoryLabel: "Mentorship",
    date: "July 25, 2026",
    location: "Online (ConnectMyEvent Portal)",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "FAANG Alumni Network",
    icon: "💡",
    color: "var(--cat-mentorship)",
    bgColor: "var(--cat-mentorship-bg)",
    description: "1-on-1 industry mentorship for senior college students. Get resume reviews, mock interviews, and career roadmap guidance directly from FAANG engineers.",
    prizes: "1-on-1 slots, portfolio review, mock interview",
    registrationsCount: 420,
    viewsCount: 2300,
    daysLeft: 19,
    teamSize: "Individual",
    timeline: [
      { date: "July 01, 2026", label: "Registrations Open" },
      { date: "July 20, 2026", label: "Matchmaking Algorithmic Allocation" },
      { date: "July 25, 2026", label: "Mentorship Program Commencement" }
    ],
    speakers: [
      { name: "Amit Verma", role: "Software Engineer, Netflix" },
      { name: "Shreya Ghoshal", role: "Product Manager, Microsoft" }
    ],
    sponsors: [],
    featured: false
  },
  {
    id: 11,
    title: "Global FinTech Hackathon",
    category: "hackathon",
    categoryLabel: "Hackathon",
    date: "Aug 12-14, 2026",
    location: "Online / Singapore Hub",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "DBS Bank & SG FinTech",
    icon: "💻",
    color: "var(--cat-hackathon)",
    bgColor: "var(--cat-hackathon-bg)",
    description: "Create next-gen decentralized finance and algorithmic trading services using open banking APIs. Build with maximum scalability and compliance.",
    prizes: "SGD 15,000 top prize + fast-tracked internships",
    registrationsCount: 1800,
    viewsCount: 8900,
    daysLeft: 28,
    teamSize: "2-5 Members",
    timeline: [
      { date: "July 05, 2026", label: "Registration Opens" },
      { date: "Aug 05, 2026", label: "Registration Closes" },
      { date: "Aug 12-14, 2026", label: "Hackathon Coding Period" }
    ],
    schedule: [
      { time: "09:00 AM, Aug 12", title: "API Release & Platform Walkthrough" },
      { time: "02:00 PM, Aug 13", title: "Mentorship Sync-up" },
      { time: "05:00 PM, Aug 14", title: "Final Code Commits & Demos" }
    ],
    speakers: [
      { name: "Eng-Chuan Tan", role: "Chief Innovation Officer, DBS" }
    ],
    sponsors: [
      { name: "DBS", logo: "🔴" }
    ],
    featured: true
  },
  {
    id: 12,
    title: "Blockchain Decoded Workshop",
    category: "workshop",
    categoryLabel: "Workshop",
    date: "July 30, 2026",
    location: "BITS Pilani Auditorium",
    format: "offline",
    price: "paid",
    priceAmount: "$8",
    organizer: "Pilani Blockchain Club",
    icon: "🛠️",
    color: "var(--cat-workshop)",
    bgColor: "var(--cat-workshop-bg)",
    description: "Hands-on solidity smart contract coding and security audits workshop. Learn how to write secure code and check for gas optimizations.",
    prizes: "Certificates co-signed by BITS Alumni Blockchain Hub",
    registrationsCount: 190,
    viewsCount: 890,
    daysLeft: 24,
    teamSize: "Individual",
    timeline: [
      { date: "June 30, 2026", label: "Registrations Open" },
      { date: "July 28, 2026", label: "Registrations Close" },
      { date: "July 30, 2026", label: "Workshop Conducted" }
    ],
    speakers: [
      { name: "Vikram Chandra", role: "Solidity Audit Lead, ConsenSys" }
    ],
    sponsors: [],
    featured: false
  },
  {
    id: 13,
    title: "Delhi University Placement Drive",
    category: "jobfair",
    categoryLabel: "Job Fair",
    date: "Sept 10-12, 2026",
    location: "North Campus Grounds, DU",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "DU Central Placement Cell",
    icon: "💼",
    color: "var(--cat-jobfair)",
    bgColor: "var(--cat-jobfair-bg)",
    description: "Centralized placement drive open to final-year DU students from all departments. Opportunities range from business consulting to deep tech.",
    prizes: "Multiple Job Offers & Corporate Internships",
    registrationsCount: 5200,
    viewsCount: 26000,
    daysLeft: 50,
    teamSize: "Individual",
    timeline: [
      { date: "July 10, 2026", label: "Portal Opens & Resume Submission" },
      { date: "Aug 20, 2026", label: "Company Pre-matching Process" },
      { date: "Sept 10, 2026", label: "Campus Interviews & Selection" }
    ],
    speakers: [],
    sponsors: [
      { name: "McKinsey", logo: "📈" },
      { name: "HDFC Bank", logo: "🏦" }
    ],
    featured: false
  },
  {
    id: 14,
    title: "Healthcare Tech Startup Pitch",
    category: "startup",
    categoryLabel: "Startup Pitch",
    date: "Aug 05, 2026",
    location: "Online",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "InnovateHealth Incubator",
    icon: "🚀",
    color: "var(--cat-startup)",
    bgColor: "var(--cat-startup-bg)",
    description: "Pitching platform for health-tech and bio-tech innovations addressing diagnostic efficiency, telemedicine, and smart medical devices.",
    prizes: "Free incubation workspace + $20,000 seed backing",
    registrationsCount: 145,
    viewsCount: 940,
    daysLeft: 20,
    teamSize: "1-4 Members",
    timeline: [
      { date: "June 20, 2026", label: "Applications Open" },
      { date: "July 25, 2026", label: "Proposal Submissions" },
      { date: "Aug 05, 2026", label: "Live Pitching Final" }
    ],
    speakers: [
      { name: "Dr. Sandeep Patel", role: "Partner, Health Ventures" }
    ],
    sponsors: [],
    featured: false
  },
  {
    id: 15,
    title: "Swachh Bharat Cleanliness Drive",
    category: "volunteer",
    categoryLabel: "Volunteer Drive",
    date: "July 13, 2026",
    location: "Juhu Beach, Mumbai",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "Swachh Foundation",
    icon: "🤝",
    color: "var(--cat-volunteer)",
    bgColor: "var(--cat-volunteer-bg)",
    description: "Post-monsoon garbage and plastic cleanup drive. Volunteers will be grouped and supplied with gloves, trash bags, and safety sanitizers.",
    prizes: "Eco-Volunteer Certificate + Swag T-shirt",
    registrationsCount: 220,
    viewsCount: 920,
    daysLeft: 7,
    teamSize: "Individual",
    timeline: [
      { date: "June 10, 2026", label: "Open Registrations" },
      { date: "July 13, 2026", label: "Cleanup Event (06:00 AM)" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 16,
    title: "Digital Art & Design Gala",
    category: "cultural",
    categoryLabel: "Cultural Event",
    date: "Sept 19, 2026",
    location: "Jehangir Art Gallery, Mumbai",
    format: "offline",
    price: "paid",
    priceAmount: "$5",
    organizer: "Creative Arts Guild",
    icon: "🎭",
    color: "var(--cat-cultural)",
    bgColor: "var(--cat-cultural-bg)",
    description: "Display and auction of student digital art, Blender models, UI/UX conceptual systems, and immersive WebGL digital experiences.",
    prizes: "Best Design awards worth $2,000 + Adobe Suite licences",
    registrationsCount: 480,
    viewsCount: 2900,
    daysLeft: 58,
    teamSize: "Individual",
    timeline: [
      { date: "July 15, 2026", label: "Artwork Submission Opens" },
      { date: "Aug 25, 2026", label: "Curator Selection Complete" },
      { date: "Sept 19, 2026", label: "Gallery Exhibition & Auction" }
    ],
    speakers: [
      { name: "Rahul Deshpande", role: "Creative Lead, Adobe India" }
    ],
    sponsors: [
      { name: "Adobe", logo: "🎨" }
    ],
    featured: false
  },
  {
    id: 17,
    title: "Women in Tech Scholarship",
    category: "scholarship",
    categoryLabel: "Scholarship",
    date: "Aug 20, 2026",
    location: "Online Application Portal",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "AnitaB.org India Chapter",
    icon: "🎓",
    color: "var(--cat-scholarship)",
    bgColor: "var(--cat-scholarship-bg)",
    description: "Empowering female engineering students with scholarships, conference sponsorships, and targeted corporate placement mentorship.",
    prizes: "Scholarship award of $1,500 + GHCI Conference Pass",
    registrationsCount: 1100,
    viewsCount: 6500,
    daysLeft: 35,
    teamSize: "Individual",
    timeline: [
      { date: "June 15, 2026", label: "Applications Open" },
      { date: "July 30, 2026", label: "Selection Committee Review" },
      { date: "Aug 20, 2026", label: "Award Announcement" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 18,
    title: "Executive Leadership Mentorship",
    category: "mentorship",
    categoryLabel: "Mentorship",
    date: "Aug 01, 2026",
    location: "Online",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "India Leaders Guild",
    icon: "💡",
    color: "var(--cat-mentorship)",
    bgColor: "var(--cat-mentorship-bg)",
    description: "An exclusive mentorship program targeting young professionals and startup founders to guide them on product strategy and scaling business.",
    prizes: "1-on-1 mentorship sessions with industry veterans",
    registrationsCount: 180,
    viewsCount: 1100,
    daysLeft: 25,
    teamSize: "Individual",
    timeline: [
      { date: "July 01, 2026", label: "Registration Opens" },
      { date: "July 25, 2026", label: "Application Review" },
      { date: "Aug 01, 2026", label: "Program Kick-off" }
    ],
    speakers: [
      { name: "Vineet Nayar", role: "Former CEO, HCL Tech" }
    ],
    sponsors: [],
    featured: false
  },
  {
    id: 19,
    title: "Youth Climate Action Hackathon",
    category: "hackathon",
    categoryLabel: "Hackathon",
    date: "Aug 28-30, 2026",
    location: "Online (Global Teams)",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "ClimateAction Network",
    icon: "💻",
    color: "var(--cat-hackathon)",
    bgColor: "var(--cat-hackathon-bg)",
    description: "Hack for the planet. Build open source tools, analytics, dashboards, and campaigns resolving plastic pollution, solar mapping, and forest metrics.",
    prizes: "Cash fund $8,000 + GitBook Documentation sponsorship",
    registrationsCount: 950,
    viewsCount: 4300,
    daysLeft: 44,
    teamSize: "2-4 Members",
    timeline: [
      { date: "July 10, 2026", label: "Team Signup Opens" },
      { date: "Aug 25, 2026", label: "Signup Deadline" },
      { date: "Aug 28-30, 2026", label: "Hackathon Weekend" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 20,
    title: "UX Design & Figma Bootcamp",
    category: "workshop",
    categoryLabel: "Workshop",
    date: "July 18, 2026",
    location: "Online (Figma Community Room)",
    format: "online",
    price: "paid",
    priceAmount: "$10",
    organizer: "UI Collective India",
    icon: "🛠️",
    color: "var(--cat-workshop)",
    bgColor: "var(--cat-workshop-bg)",
    description: "Learn component properties, auto layout 5.0, variables, and variables-driven interactive prototyping in Figma.",
    prizes: "Figma Pro 1-year licence to top 5 UI systems built",
    registrationsCount: 890,
    viewsCount: 4600,
    daysLeft: 12,
    teamSize: "Individual",
    timeline: [
      { date: "June 20, 2026", label: "Registration Opens" },
      { date: "July 16, 2026", label: "Registration Closes" },
      { date: "July 18, 2026", label: "Live Interactive Session" }
    ],
    speakers: [
      { name: "Anish Gupta", role: "Senior Product Designer, Zomato" }
    ],
    sponsors: [
      { name: "Figma Community", logo: "🎨" }
    ],
    featured: false
  },
  {
    id: 21,
    title: "Healthcare Volunteer Recruitment",
    category: "volunteer",
    categoryLabel: "Volunteer Drive",
    date: "July 24, 2026",
    location: "KEM Hospital, Parel, Mumbai",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "KEM Medical Trust",
    icon: "🤝",
    color: "var(--cat-volunteer)",
    bgColor: "var(--cat-volunteer-bg)",
    description: "Recruitment of non-medical volunteers to assist in hospital reception desk operations, blood donation camp queue management, and patient care tracking.",
    prizes: "KEM Trust Volunteer Badge & Dinner",
    registrationsCount: 120,
    viewsCount: 420,
    daysLeft: 18,
    teamSize: "Individual",
    timeline: [
      { date: "June 30, 2026", label: "Volunteers Applications" },
      { date: "July 22, 2026", label: "Induction Call" },
      { date: "July 24, 2026", label: "Shift Schedule Allocation" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 22,
    title: "National Biotechnology Pitch 2026",
    category: "startup",
    categoryLabel: "Startup Pitch",
    date: "Aug 19, 2026",
    location: "IIT Delhi Biotech Park",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "IIT Delhi Bio-Incubator",
    icon: "🚀",
    color: "var(--cat-startup)",
    bgColor: "var(--cat-startup-bg)",
    description: "Showcase bio-synthetics, agriculture solutions, and genome sequencing tools to tech transfer officers and venture firms.",
    prizes: "Biotech Accelerator Fellowship + $15,000 cash grant",
    registrationsCount: 92,
    viewsCount: 520,
    daysLeft: 34,
    teamSize: "1-4 Members",
    timeline: [
      { date: "July 01, 2026", label: "Abstract Submission" },
      { date: "Aug 05, 2026", label: "Audits & Clearances" },
      { date: "Aug 19, 2026", label: "Pitch Day & Lab Tours" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 23,
    title: "Tech Startup Careers Fair",
    category: "jobfair",
    categoryLabel: "Job Fair",
    date: "July 22, 2026",
    location: "HSR Layout Startup Hub, Bangalore",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "WeWork Bangalore & TechNetwork",
    icon: "💼",
    color: "var(--cat-jobfair)",
    bgColor: "var(--cat-jobfair-bg)",
    description: "Skip the generic HR gates. Walk in and pitch your skills directly to CTOs and engineers at Bangalore's fastest growing unicorns and series-A startups.",
    prizes: "Instant feedback, spot offers and tech networking",
    registrationsCount: 2300,
    viewsCount: 14000,
    daysLeft: 16,
    teamSize: "Individual",
    timeline: [
      { date: "June 20, 2026", label: "Candidate Portal Opens" },
      { date: "July 20, 2026", label: "Resume CV Matcher Active" },
      { date: "July 22, 2026", label: "Event Day (10:00 AM)" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 24,
    title: "Global FinTech Scholarship 2026",
    category: "scholarship",
    categoryLabel: "Scholarship",
    date: "Oct 01, 2026",
    location: "Online",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "FinTech Council Singapore",
    icon: "🎓",
    color: "var(--cat-scholarship)",
    bgColor: "var(--cat-scholarship-bg)",
    description: "Global scholarship targeting graduate students focused on financial math, cryptography, or automated banking transaction algorithms.",
    prizes: "SGD 5,000 scholarship + DBS Singapore internship offer",
    registrationsCount: 880,
    viewsCount: 4200,
    daysLeft: 60,
    teamSize: "Individual",
    timeline: [
      { date: "July 10, 2026", label: "Portal Opens" },
      { date: "Sept 10, 2026", label: "Applications Deadline" },
      { date: "Oct 01, 2026", label: "Results Release" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 25,
    title: "Peer-to-Peer Peer Mentorship Cohort",
    category: "mentorship",
    categoryLabel: "Mentorship",
    date: "Aug 10, 2026",
    location: "Online via Discord",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "Build Club Student Community",
    icon: "💡",
    color: "var(--cat-mentorship)",
    bgColor: "var(--cat-mentorship-bg)",
    description: "An intensive peer mentoring cohort matching college juniors with seniors to build side projects, practice DS Algo, and review resumes together.",
    prizes: "Cohort placement and verified LinkedIn badge",
    registrationsCount: 560,
    viewsCount: 2200,
    daysLeft: 31,
    teamSize: "Individual",
    timeline: [
      { date: "July 10, 2026", label: "Registration Opens" },
      { date: "Aug 05, 2026", label: "Matching Algorithmic Sync" },
      { date: "Aug 10, 2026", label: "Cohort Commences" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 26,
    title: "Hindustani Classical Musical Evening",
    category: "cultural",
    categoryLabel: "Cultural Event",
    date: "Aug 29, 2026",
    location: "NCPA Tata Theatre, Mumbai",
    format: "offline",
    price: "paid",
    priceAmount: "$12",
    organizer: "Sangeet Kala Academy",
    icon: "🎭",
    color: "var(--cat-cultural)",
    bgColor: "var(--cat-cultural-bg)",
    description: "Witness classical sitar, tabla and vocal performances by national award-winning artists and prodigies in college music societies.",
    prizes: "Event Entry ticket, networking dinner",
    registrationsCount: 520,
    viewsCount: 3000,
    daysLeft: 43,
    teamSize: "Individual",
    timeline: [
      { date: "July 01, 2026", label: "Tickets Sale Launch" },
      { date: "Aug 29, 2026", label: "Concert (06:00 PM)" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 27,
    title: "Free Dental and Eye Screening Camp",
    category: "healthcare",
    categoryLabel: "Healthcare Camp",
    date: "July 26, 2026",
    location: "Rotary Club Hall, Panvel",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "Rotary Club Panvel & VisionCare",
    icon: "🏥",
    color: "var(--cat-healthcare)",
    bgColor: "var(--cat-healthcare-bg)",
    description: "Free medical eye screening, cataract check, and dental hygiene check for senior citizens. Free specs will be provided to select patients.",
    prizes: "Free basic specs and dental kits",
    registrationsCount: 140,
    viewsCount: 680,
    daysLeft: 20,
    teamSize: "Individual",
    timeline: [
      { date: "June 25, 2026", label: "Volunteers Registrations" },
      { date: "July 26, 2026", label: "Panvel Camp Execution" }
    ],
    speakers: [],
    sponsors: [
      { name: "VisionCare Ltd", logo: "👁️" }
    ],
    featured: false
  },
  {
    id: 28,
    title: "Animal Shelter Aid & Rescue Drive",
    category: "ngo",
    categoryLabel: "NGO Program",
    date: "July 17, 2026",
    location: "SaveOurPaws Shelter, Thane",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "SaveOurPaws Shelter NGO",
    icon: "🌍",
    color: "var(--cat-ngo)",
    bgColor: "var(--cat-ngo-bg)",
    description: "Volunteering opportunity to wash, feed, walk shelter dogs and cats. Help clean cages and structure the feed storage system.",
    prizes: "Volunteering Certificate + Pet Hugs!",
    registrationsCount: 75,
    viewsCount: 380,
    daysLeft: 11,
    teamSize: "Individual",
    timeline: [
      { date: "June 20, 2026", label: "Signups Open" },
      { date: "July 17, 2026", label: "Shelter Drive Operations" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 29,
    title: "Full Stack WebDev Hackathon",
    category: "hackathon",
    categoryLabel: "Hackathon",
    date: "Sept 15-17, 2026",
    location: "Online / Discord Hubs",
    format: "online",
    price: "free",
    priceAmount: "Free",
    organizer: "JS Devs India Chapter",
    icon: "💻",
    color: "var(--cat-hackathon)",
    bgColor: "var(--cat-hackathon-bg)",
    description: "Build robust full-stack web platforms using Postgres, Node, and any frontend framework. Focus on code modularity and api performance.",
    prizes: "Cash prizes $5,000 + Vercel Hosting Credits",
    registrationsCount: 1650,
    viewsCount: 8200,
    daysLeft: 55,
    teamSize: "1-3 Members",
    timeline: [
      { date: "July 20, 2026", label: "Registration Opens" },
      { date: "Sept 10, 2026", label: "Registration Closes" },
      { date: "Sept 15-17, 2026", label: "Hackathon Hack Period" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  },
  {
    id: 30,
    title: "Product Management Essentials",
    category: "workshop",
    categoryLabel: "Workshop",
    date: "July 29, 2026",
    location: "Online (Zoom)",
    format: "online",
    price: "paid",
    priceAmount: "$12",
    organizer: "ProductSchool India",
    icon: "🛠️",
    color: "var(--cat-workshop)",
    bgColor: "var(--cat-workshop-bg)",
    description: "Learn how to write product requirement documents (PRD), run competitor analysis, and configure web analytics (Mixpanel/GA).",
    prizes: "Course Graduation Badge + PM Template Toolkit",
    registrationsCount: 420,
    viewsCount: 2100,
    daysLeft: 23,
    teamSize: "Individual",
    timeline: [
      { date: "July 01, 2026", label: "Registrations Open" },
      { date: "July 29, 2026", label: "Live Workshop & Case Study Session" }
    ],
    speakers: [
      { name: "Rahul Sharma", role: "Product Director, Swiggy" }
    ],
    sponsors: [],
    featured: false
  },
  {
    id: 31,
    title: "Annual Tech Startup Summit",
    category: "startup",
    categoryLabel: "Startup Pitch",
    date: "Sept 05, 2026",
    location: "Yashobhoomi Conv Centre, Delhi",
    format: "offline",
    price: "paid",
    priceAmount: "$25",
    organizer: "India Founders Hub",
    icon: "🚀",
    color: "var(--cat-startup)",
    bgColor: "var(--cat-startup-bg)",
    description: "The premier startup convention bringing founders, VCs, and tech directors under one roof. Includes product showcase, panel panels, and live pitch pools.",
    prizes: "Seed funding pool $100,000 + Tech acceleration credits",
    registrationsCount: 1500,
    viewsCount: 9400,
    daysLeft: 48,
    teamSize: "1-5 Members",
    timeline: [
      { date: "July 10, 2026", label: "Booth Signup & Pitch Submissions" },
      { date: "Aug 20, 2026", label: "Summit Tickets Launch" },
      { date: "Sept 05, 2026", label: "Live Summit Day" }
    ],
    speakers: [
      { name: "Kunwar Shah", role: "Founder, CRED" }
    ],
    sponsors: [
      { name: "Stripe", logo: "💳" }
    ],
    featured: true
  },
  {
    id: 32,
    title: "Healthcare Camp Volunteers DU",
    category: "volunteer",
    categoryLabel: "Volunteer Drive",
    date: "July 18, 2026",
    location: "Chhatra Marg, DU Campus",
    format: "offline",
    price: "free",
    priceAmount: "Free",
    organizer: "DU Health Centre & NSS DU",
    icon: "🤝",
    color: "var(--cat-volunteer)",
    bgColor: "var(--cat-volunteer-bg)",
    description: "NSS volunteering opportunity to execute blood donation drive in DU Central Library, managing signups, checkups and recovery beds.",
    prizes: "NSS Volunteering Certificate + Refreshments",
    registrationsCount: 180,
    viewsCount: 720,
    daysLeft: 12,
    teamSize: "Individual",
    timeline: [
      { date: "June 25, 2026", label: "Registration Opens" },
      { date: "July 15, 2026", label: "Registration Closes" },
      { date: "July 18, 2026", label: "Drive Execution (09:00 AM)" }
    ],
    speakers: [],
    sponsors: [],
    featured: false
  }
];

// Export logic for browser usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockEvents };
}

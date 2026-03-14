export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  tags: string[];
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "English Native Teacher / Governess",
    company: "Private Family Placement",
    location: "Moscow, Russia",
    type: "Full-time",
    salary: "From 180,000 RUB / month",
    postedDate: "2 days ago",
    tags: ["Education", "Children", "English", "Live-in optional"],
    description:
      "A private family is seeking a professional English Native Teacher / Governess to support children's language development, communication skills, and daily educational activities in a structured home environment.",
    requirements: [
      "Native or fluent English speaker",
      "Experience working with children in teaching, tutoring, or governess roles",
      "Strong communication and interpersonal skills",
      "Professional, patient, and well-presented personality",
      "Previous family or school experience is an advantage",
    ],
    responsibilities: [
      "Teach spoken English through daily interaction and structured lessons",
      "Support children's educational development and homework routine",
      "Organize age-appropriate learning and enrichment activities",
      "Encourage discipline, confidence, and positive communication",
      "Maintain regular communication with parents regarding progress",
    ],
    benefits: [
      "Competitive salary",
      "Long-term family placement opportunity",
      "Professional and respectful working environment",
      "Accommodation may be discussed if required",
      "Supportive placement process",
    ],
  },
  {
    id: "2",
    title: "Nanny / Manny",
    company: "International Family Services",
    location: "Saint Petersburg, Russia",
    type: "Full-time",
    salary: "From 140,000 RUB / month",
    postedDate: "4 days ago",
    tags: ["Childcare", "Family", "Live-in optional", "Private household"],
    description:
      "A family is looking for a responsible and caring nanny or manny to assist with childcare, child supervision, development-focused daily routines, and support in an organized household setting.",
    requirements: [
      "Experience in childcare or family support roles",
      "Strong sense of responsibility and patience",
      "Ability to work with children of different ages",
      "Clean and professional presentation",
      "Basic English or Russian communication ability is helpful",
    ],
    responsibilities: [
      "Supervise and care for children during daily routines",
      "Assist with feeding, hygiene, and activity planning",
      "Support educational and recreational development",
      "Maintain a safe and structured environment",
      "Coordinate with parents regarding the child’s needs and schedule",
    ],
    benefits: [
      "Stable family placement",
      "Friendly and respectful work environment",
      "Competitive monthly salary",
      "Accommodation may be available",
      "Long-term cooperation opportunity",
    ],
  },
  {
    id: "3",
    title: "Restaurant / Hotel Staff",
    company: "Hospitality Partner Group",
    location: "Moscow, Russia",
    type: "Full-time",
    salary: "From 95,000 RUB / month",
    postedDate: "1 week ago",
    tags: ["Hospitality", "Hotel", "Restaurant", "Service"],
    description:
      "A hospitality employer is hiring staff for restaurant and hotel operations. Suitable candidates may work in guest service, housekeeping support, kitchen support, or general service roles depending on experience.",
    requirements: [
      "Previous hospitality or customer service experience is an advantage",
      "Professional attitude and willingness to learn",
      "Good communication and teamwork skills",
      "Ability to work in shifts",
      "Neat personal appearance",
    ],
    responsibilities: [
      "Support hotel or restaurant daily operations",
      "Assist guests or customers professionally",
      "Maintain cleanliness and service standards",
      "Work closely with supervisors and team members",
      "Follow operational and hygiene procedures",
    ],
    benefits: [
      "Stable employment opportunity",
      "Supportive team environment",
      "Training may be provided",
      "Competitive salary package",
      "Possibility of long-term growth",
    ],
  },
  {
    id: "4",
    title: "Cleaner / Dishwasher",
    company: "CleanServe Solutions",
    location: "Kazan, Russia",
    type: "Full-time",
    salary: "From 80,000 RUB / month",
    postedDate: "3 days ago",
    tags: ["Cleaning", "Dishwashing", "Hospitality", "Support staff"],
    description:
      "An employer is seeking reliable support staff for cleaning and dishwashing duties in hospitality and commercial environments. This role is suitable for hardworking individuals with a strong work ethic.",
    requirements: [
      "Ability to perform physically active work",
      "Attention to cleanliness and hygiene",
      "Punctual and responsible attitude",
      "Ability to follow instructions",
      "Previous cleaning or kitchen support experience is helpful",
    ],
    responsibilities: [
      "Clean work areas, kitchen spaces, or public areas",
      "Wash dishes, utensils, and kitchen equipment",
      "Maintain hygiene and sanitation standards",
      "Support kitchen or service teams when necessary",
      "Report supply shortages or maintenance issues",
    ],
    benefits: [
      "Immediate placement possibility",
      "Stable working schedule",
      "Supportive team supervision",
      "Competitive salary",
      "Opportunity for continued employment",
    ],
  },
  {
    id: "5",
    title: "Warehouse Worker",
    company: "Logistics and Supply Co.",
    location: "Yekaterinburg, Russia",
    type: "Full-time",
    salary: "From 100,000 RUB / month",
    postedDate: "5 days ago",
    tags: ["Warehouse", "Logistics", "Packing", "Loading"],
    description:
      "A logistics company is looking for warehouse workers to support stock handling, packaging, sorting, and general warehouse operations in a fast-paced but organized working environment.",
    requirements: [
      "Physically fit and ready for warehouse duties",
      "Ability to work in a team environment",
      "Basic understanding of warehouse discipline",
      "Responsible and punctual attitude",
      "Previous logistics or warehouse experience is an advantage",
    ],
    responsibilities: [
      "Sort, pack, and organize goods in the warehouse",
      "Assist with loading and unloading deliveries",
      "Prepare items for storage or dispatch",
      "Maintain cleanliness and order in the warehouse",
      "Follow safety and handling procedures",
    ],
    benefits: [
      "Stable monthly salary",
      "Consistent work schedule",
      "Organized work environment",
      "Team-based support",
      "Long-term work potential",
    ],
  },
  {
    id: "6",
    title: "Construction / Handyman / General Laborer",
    company: "BuildPro Workforce",
    location: "Novosibirsk, Russia",
    type: "Full-time",
    salary: "From 120,000 RUB / month",
    postedDate: "1 week ago",
    tags: ["Construction", "Handyman", "Labor", "Maintenance"],
    description:
      "A construction employer is hiring dependable workers for site support, handyman duties, general labor, and maintenance-related tasks. Suitable for individuals with practical skills and a strong work attitude.",
    requirements: [
      "Ability to work on-site and follow safety procedures",
      "Basic handyman or construction experience is preferred",
      "Physically fit and hardworking",
      "Ability to work with tools and supervisors' instructions",
      "Reliable and disciplined approach to work",
    ],
    responsibilities: [
      "Assist with general construction and site preparation",
      "Carry materials and support skilled workers",
      "Perform handyman and maintenance tasks as assigned",
      "Keep work areas clean and organized",
      "Follow safety rules and site instructions",
    ],
    benefits: [
      "Competitive salary",
      "Opportunity for stable site work",
      "Supportive supervision",
      "Practical long-term work experience",
      "Potential for role growth based on performance",
    ],
  },
];
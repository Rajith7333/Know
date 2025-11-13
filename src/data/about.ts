import { PersonalInfo, Experience, Education } from '@/types/portfolio';

export const personalInfo: PersonalInfo = {
  name: "John Doe",
  tagline: "Full Stack Developer & Creative Technologist",
  bio: "Passionate developer with a keen eye for design and a love for creating exceptional digital experiences. I specialize in building modern web applications that combine beautiful aesthetics with powerful functionality.",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  avatar: "/images/profile/avatar.jpg",
  resumeUrl: "/resume.pdf",
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    website: "https://johndoe.dev",
    dribbble: "https://dribbble.com/johndoe",
  },
};

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "Tech Innovation Labs",
    location: "San Francisco, CA",
    startDate: "2022-03",
    current: true,
    description: "Leading development of scalable web applications using modern technologies. Mentoring junior developers and architecting solutions for complex business problems.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Digital Creative Agency",
    location: "New York, NY",
    startDate: "2020-06",
    endDate: "2022-02",
    current: false,
    description: "Developed responsive and interactive user interfaces for various client projects. Collaborated with design teams to implement pixel-perfect designs.",
    technologies: ["React", "Vue.js", "JavaScript", "SASS", "Figma"],
  },
  {
    id: "3",
    title: "Junior Web Developer",
    company: "StartUp Hub",
    location: "Austin, TX",
    startDate: "2019-01",
    endDate: "2020-05",
    current: false,
    description: "Built and maintained multiple web applications for startups. Gained experience in full-stack development and agile methodologies.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
];

export const education: Education[] = [
  {
    id: "1",
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    location: "Boston, MA",
    startDate: "2015-09",
    endDate: "2019-05",
    current: false,
    description: "Focused on software engineering and web development. Graduated Magna Cum Laude with a GPA of 3.8/4.0.",
    achievements: [
      "Dean's List for 6 consecutive semesters",
      "Winner of Annual Hackathon 2018",
      "Teaching Assistant for Web Development Course",
    ],
  },
];
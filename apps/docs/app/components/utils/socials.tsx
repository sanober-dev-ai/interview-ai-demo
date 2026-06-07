import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

const categories = [
  {
    id: "ug",
    title: "UG Programs",
    icon: GraduationCap,
  },
  {
    id: "pg",
    title: "PG Programs",
    icon: BookOpen,
  },
  {
    id: "doctoral",
    title: "Doctoral",
    icon: Award,
  },
  {
    id: "certification",
    title: "Certification",
    icon: BriefcaseBusiness,
  },
];

const programsData = {
  ug: [
    {
      title: "B.Tech Computer Science",
      school: "School of Engineering",
      duration: "4 Years",
    },
    {
      title: "BBA Business Administration",
      school: "School of Management",
      duration: "3 Years",
    },
    {
      title: "BCA Artificial Intelligence",
      school: "School of Computer Applications",
      duration: "3 Years",
    },
    {
      title: "B.Sc Data Science",
      school: "School of Science",
      duration: "3 Years",
    },
  ],

  pg: [
    {
      title: "MBA Marketing",
      school: "School of Management",
      duration: "2 Years",
    },
    {
      title: "M.Tech Artificial Intelligence",
      school: "School of Engineering",
      duration: "2 Years",
    },
    {
      title: "MCA Cloud Computing",
      school: "School of Computer Applications",
      duration: "2 Years",
    },
    {
      title: "M.Sc Biotechnology",
      school: "School of Science",
      duration: "2 Years",
    },
  ],

  doctoral: [
    {
      title: "PhD in Computer Science",
      school: "Research Center",
      duration: "3-5 Years",
    },
    {
      title: "PhD in Management",
      school: "School of Management",
      duration: "3-5 Years",
    },
  ],

  certification: [
    {
      title: "UI/UX Certification",
      school: "School of Design",
      duration: "6 Months",
    },
    {
      title: "Digital Marketing Certification",
      school: "Business School",
      duration: "4 Months",
    },
    {
      title: "Cyber Security Program",
      school: "School of Engineering",
      duration: "6 Months",
    },
  ],
};

const socialLinks = [
  {
    icon: <FaWhatsapp size={18} />,
    href: "https://wa.me/919999999999",
    bg: "bg-green-500",
  },
  {
    icon: <FaFacebookF size={18} />,
    href: "https://facebook.com",
    bg: "bg-blue-600",
  },
  {
    icon: <FaXTwitter size={18} />,
    href: "https://twitter.com",
    bg: "bg-black",
  },
  {
    icon: <FaLinkedinIn size={18} />,
    href: "https://linkedin.com",
    bg: "bg-blue-500",
  },
  {
    icon: <FaYoutube size={18} />,
    href: "https://youtube.com",
    bg: "bg-red-600",
  },
  {
    icon: <FaInstagram size={18} />,
    href: "https://instagram.com",
    bg: "bg-pink-500",
  },
];

export { categories, programsData, socialLinks };

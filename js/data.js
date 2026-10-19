/* ==========================================================================
   PORTFOLIO DATA CONFIGURATION
   Easily customizable structured data for ECE & Software Engineer
   ========================================================================== */

export const portfolioData = {
  profile: {
    name: "Md Tahir",
    role: "ECE Graduate & Software Engineer",
    subRoles: [
      "Problem-Solving & Computational Thinking",
      "Software Development & System Design",
      "Logical Reasoning & Algorithmic Thinkingr",
      "Algorithm Design & Optimization",
      "Java Developoment"
    ],
    bio: "Electronics & Communication Engineering graduate fusing hardware precision with modern software craftsmanship. Specialized in high-performance web systems, distributed microservices, edge computing, and embedded IoT architectures.",
    status: "Available for Software Engineering Roles",
    location: "Lucknow, India (Open to Remote & Global Relocation)",
    email: "mdtahir52025@gmail.com",
    github: "https://github.com/mdTahir5",
    linkedin: "https://www.linkedin.com/in/mdtahir05",
    stats: [
      { label: "Coding Experience", value: "1+ Yrs" },
      { label: "Projects Built", value: "5+" },
      { label: "Coding Problems", value: "200+" },
      { label: "Academic Performance in B.Tech", value: "Top 5" }
    ]
  },

  skills: [
    {
      category: "Programming Languages",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
      items: [
        { name: "C / C++", level: 80 },
        { name: "Python", level: 70 },
        { name: "Java", level: 70 },
        { name: "JavaScript", level: 40 },
        { name: "SQL", level: 80 }
      ]
    },
    {
      category: "Software Engineering",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
      items: [
        { name: "Spring Boot & Spring MVC", level: 65 },
        { name: "Microservices & REST APIs", level: 70 },
        { name: "Debugging & Agile Methodology", level: 60},
        { name: "API Integration & Code Review", level: 70},
        { name: "React.js / Node.js", level: 40 },
        { name: "Tailwind CSS / Bootstrap", level: 70 },
      ]
    },
    {
      category: "ECE & Core Electronics",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
      items: [
        { name: "Computer Architecture", level: 75 },
        { name: "Combinational & Sequential Circuits", level: 80 },
        { name: "Analog Circuits", level: 70 },
        { name: "Logic Design & Logic gates", level: 80 },
        { name: "Digital Signal Processing", level: 65 },
        { name: "Microcontrollers & Microprocessors", level: 65 },
        { name: "CMOS & MOSFET", level: 75 },
      ]
    },
    {
      category: "Cloud, DevOps & Tools",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
      items: [
        { name: "Docker & Containerization", level: 45 },
        { name: "IntelliJ IDEA / VS Code", level: 90},
        { name: "Render & Netlify", level: 80 },
        { name: "CI/CD (GitHub Actions)", level: 80 },
        { name: "Postman API", level: 85 },
        { name: "Git & GitHub", level: 90 },
      ]
    }
  ],

  projects: [
    {
      id: "Contact Nest",
      title: "ContactNest — Full-Stack Contact Management System",
      category: "Full-Stack",
      featured: true,
      image: "assets/images/contactnest.png",
      summary: "Secure, responsive full-stack contact management application using Spring Boot, React, and MySQL, featuring JWT authentication, role-based authorization, dynamic search, and seamless CRUD operations.",
      tags: ["Spring Boot", "React.js", "Tailwind CSS", "REST APIs", "JavaScript", "MySQL"],
      demoUrl: "https://phonebookapp01.netlify.app/",
      githubUrl: "https://github.com/mdTahir5/ContactNest"
    },
    {
      id: "CogniQuiz",
      title: "CogniQuiz — AI-Powered Assessment Platform",
      category: "Full-Stack",
      featured: true,
      image: "assets/images/cogniquiz.png",
      summary: " AI-powered assessment platform featuring dynamic quiz generation, secure JWT authentication, competitive rankings, negative marking, real-time exam interfaces, and insightful performance analytics dashboards.",
      tags: ["Spring Boot", "Node.js", "Chart.js", "OpenRouter API Key", "Axios", "SQL"],
      demoUrl: "https://cogniquiz.netlify.app/",
      githubUrl: "https://github.com/mdTahir5/CogniQuiz"
    },
    {
      id: "ImageReco",
      title: "ImageReco — Full-Stack AI Image Analysis & Inventory Inspection Web App",
      category: "Full-Stack",
      featured: true,
      image: "assets/images/imagereco.png",
      summary: "Full-stack AI-powered inventory inspection platform using React, Spring Boot, MySQL, and multimodal vision models for object detection, condition assessment, and automated cataloging.",
      tags: ["Vision AI", "Spring Boot", "REST APIs", "React", "Spring Data JPA", "React"],
      demoUrl: "https://ai-image-reco.netlify.app/",
      githubUrl: "https://github.com/mdTahir5/ImageReco"
    },
    {
      id: "AIBIS",
      title: "AI-Powered Technical Interview Simulator",
      category: "WEB & AI",
      featured: false,
      image: "assets/images/aibis.png",
      summary: "AI-powered interview simulator featuring dynamic technical questions, voice-based interactions, real-time facial monitoring, and automated performance evaluation with detailed feedback and personalized scoring.",
      tags: ["JavaScript", "Express.js", "GPT-4o-mini", "Face-API.js", "Web Speech API", "Node.js"],
      demoUrl: "https://aibis.netlify.app/",
      githubUrl: "https://github.com/mdTahir5/AIBIS"
    },
     {
      id: "IoT Project",
      title: "IoT Based Underground Earthing Monitoring System",
      category: "WEB & AI",
      featured: false,
      image: "assets/images/iotproject.png",
      summary: "ESP32-based real-time soil moisture monitoring system for underground earthing rods, using C++ and Wi-Fi for sensor data collection and transmission.",
      tags: ["ESP32", "Wi-Fi", "Moisture Sensor", "Adafruit IO", "Embedded System", "C++"],
      demoUrl: "https://drive.google.com/file/d/1UdaC1DuloVN3oJKnu7KFG9tGIAWy5Gu1/view",
      githubUrl: "https://github.com/mdTahir5/B.Tech-Final-Year-Project"
    },
  ],

  experience: [
    {
      period: "July 2024 — Aug 2024",
      role: "Software Trainee",
      institution: "ShapeMySkills Pvt Ltd",
      type: "work",
      desc: "Completed intensive Core and Advanced Java training covering OOP, collections, exception handling, JDBC, JSP, and Servlets; developed database-driven CRUD applications and gained practical knowledge of Spring Boot, REST APIs, dependency injection, and annotations."
    },
  ],

  education: [
    {
      period: "2021 — 2025",
      role: "B.Tech in Electronics & Communication Engineering",
      institution: "Dr. A. P. J. Abdul Kalam Technical University, Lucknow",
      type: "education",
      desc: "Graduated with 1st Division with Distinction (CGPA: 7.9/10). Core coursework: Computer Architecture, Digital Electromics, Analog Circuits, Digital Communication, Microprocessors & Microcontrollers, Digital Signal Processing, Data Structures & Algorithms, Operating System, and VLSI Design."
    },
  ]
};

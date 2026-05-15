 // Study Resources Data
// NOTE: To make these downloadable, add actual files to /public/resources/ folder
// Example: /public/resources/economics-formulas.pdf
 
 // Study Resources Data - with UNIQUE IDs across all resources
export const resourcesData = {
  // Cheat Sheets
  cheatSheets: [
    {
      id: 101,
      title: "Economics Formulas Cheat Sheet",
      description: "All essential economics formulas: GDP, inflation, elasticity, supply-demand",
      category: "Economics",
      type: "PDF",
      fileLink: "/resources/economics-formulas.pdf",
      icon: "📊",
      downloads: 245
    },
    {
      id: 102,
      title: "Data Analysis Shortcuts (Excel & Power BI)",
      description: "50+ keyboard shortcuts and quick tips for data analysis",
      category: "Data Analysis",
      type: "PDF",
      fileLink: "/resources/data-analysis-shortcuts.pdf",
      icon: "📈",
      downloads: 189
    },
    {
      id: 103,
      title: "JavaScript Cheat Sheet",
      description: "Complete JavaScript syntax, methods, and examples",
      category: "Programming",
      type: "PDF",
      fileLink: "/resources/javascript-cheatsheet.pdf",
      icon: "💻",
      downloads: 312
    },
    {
      id: 104,
      title: "Python Data Science Cheat Sheet",
      description: "Pandas, NumPy, Matplotlib quick reference",
      category: "Programming",
      type: "PDF",
      fileLink: "/resources/python-datascience.pdf",
      icon: "🐍",
      downloads: 278
    }
  ],
  
  // Practice Exams
  practiceExams: [
    {
      id: 201,
      title: "Microeconomics Final Exam",
      description: "50 questions covering supply/demand, elasticity, market structures",
      category: "Economics",
      type: "PDF",
      fileLink: "/resources/microeconomics-exam.pdf",
      icon: "📝",
      questions: 50,
      duration: "2 hours",
      downloads: 167
    },
    {
      id: 202,
      title: "Macroeconomics Practice Test",
      description: "Comprehensive test on GDP, inflation, monetary policy",
      category: "Economics",
      type: "PDF",
      fileLink: "/resources/macroeconomics-test.pdf",
      icon: "📝",
      questions: 40,
      duration: "90 min",
      downloads: 134
    },
    {
      id: 203,
      title: "Programming Fundamentals Quiz",
      description: "Test your knowledge of variables, loops, functions, and OOP",
      category: "Programming",
      type: "PDF",
      fileLink: "/resources/programming-quiz.pdf",
      icon: "💻",
      questions: 30,
      duration: "1 hour",
      downloads: 223
    }
  ],
  
  // Templates
  templates: [
    {
      id: 301,
      title: "CV / Resume Template",
      description: "Professional CV template for economics and business graduates",
      category: "Career",
      type: "DOCX",
      fileLink: "/resources/cv-template.docx",
      icon: "📄",
      downloads: 412
    },
    {
      id: 302,
      title: "Business Plan Template",
      description: "Complete business plan outline for startups",
      category: "Business",
      type: "DOCX",
      fileLink: "/resources/business-plan.docx",
      icon: "📋",
      downloads: 289
    },
    {
      id: 303,
      title: "Research Paper Template",
      description: "Academic research paper format for economics projects",
      category: "Economics",
      type: "DOCX",
      fileLink: "/resources/research-template.docx",
      icon: "📚",
      downloads: 156
    },
    {
      id: 304,
      title: "Cover Letter Template",
      description: "Professional cover letter for job applications",
      category: "Career",
      type: "DOCX",
      fileLink: "/resources/cover-letter.docx",
      icon: "✉️",
      downloads: 378
    }
  ],
  
  // Infographics
  infographics: [
    {
      id: 401,
      title: "Supply and Demand Curve",
      description: "Visual explanation of supply and demand dynamics",
      category: "Economics",
      type: "PNG",
      fileLink: "/resources/supply-demand.png",
      icon: "📉",
      downloads: 234
    },
    {
      id: 402,
      title: "Data Analysis Workflow",
      description: "Step-by-step data analysis process visualization",
      category: "Data Analysis",
      type: "PNG",
      fileLink: "/resources/data-workflow.png",
      icon: "🔄",
      downloads: 178
    },
    {
      id: 403,
      title: "Programming Roadmap 2025",
      description: "Learning path for aspiring developers",
      category: "Programming",
      type: "PNG",
      fileLink: "/resources/programming-roadmap.png",
      icon: "🗺️",
      downloads: 345
    }
  ]
};

// All resources combined - IDs are now unique (101-104, 201-203, 301-304, 401-403)
export const allResources = [
  ...resourcesData.cheatSheets.map(r => ({ ...r, resourceType: "Cheat Sheet" })),
  ...resourcesData.practiceExams.map(r => ({ ...r, resourceType: "Practice Exam" })),
  ...resourcesData.templates.map(r => ({ ...r, resourceType: "Template" })),
  ...resourcesData.infographics.map(r => ({ ...r, resourceType: "Infographic" }))
];

// Resource categories
export const resourceCategories = [
  "All",
  "Cheat Sheet",
  "Practice Exam",
  "Template",
  "Infographic"
];

// Subject categories
export const subjectCategories = [
  "All",
  "Economics",
  "Data Analysis",
  "Programming",
  "Career",
  "Business"
];
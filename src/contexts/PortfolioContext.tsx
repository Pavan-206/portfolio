import React, { createContext, useContext, useState, useEffect } from 'react';

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  resume: string;
  about: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  icon: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  skills: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  items: Array<{
    name: string;
    value: string;
    description?: string;
  }>;
}

interface Certification {
  id: string;
  title: string;
  provider: string;
  category: string;
  url?: string;
}

interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    subjects: string[];
  };
  projects: Project[];
  experience: Experience[];
  achievements: Achievement[];
  certifications: Certification[];
}

interface PortfolioContextType {
  data: PortfolioData;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateSkills: (skills: PortfolioData['skills']) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updateAchievements: (achievements: Achievement[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  resetToDefaults: () => void;
}

const defaultData: PortfolioData = {
  personalInfo: {
    name: 'K Pavan Kumar',
    title: 'Aspiring Full-Stack Developer | AI & ML Enthusiast | Cloud Manager',
    email: 'kanikepavankumar06@gmail.com',
    phone: '+91 9876543210',
    location: 'Hyderabad, India',
    github: 'https://github.com/xxxxx',
    linkedin: 'https://linkedin.com/in/k-pavan-kumar',
    resume: 'https://drive.google.com/file/d/1W9x9Hg_x4zyqEQ-m5wG3kSO6CvfuF4kL/view?usp=sharing',
    about: 'I\'m an EEE undergraduate at Vardhaman College of Engineering, passionate about bridging the gap between electrical engineering and software development. My passion lies in programming, data management, and building innovative projects that solve real-world problems.'
  },
  skills: {
    languages: ['C', 'C++', 'Python', 'Java', 'HTML'],
    frameworks: ['STL', 'Python Libraries', 'Java Swing'],
    databases: ['Oracle SQL', 'MySQL'],
    tools: ['Git', 'GitHub', 'Jenkins', 'Kubernetes'],
    subjects: ['DSA', 'OOP', 'DBMS', 'CN']
  },
  projects: [
    {
      id: '1',
      title: 'Password Generator',
      description: 'A robust Python tool that creates strong, randomized passwords with customizable length and character sets. Features an intuitive interface and secure random generation algorithms.',
      technologies: ['Python', 'Random Module', 'Loops', 'String Manipulation'],
      githubUrl: 'https://github.com/xxxxx/password-generator',
      liveUrl: '#',
      icon: 'Lock'
    },
    {
      id: '2',
      title: 'Online Exam System',
      description: 'A comprehensive Java Swing application for conducting MCQ-based examinations locally. Includes user authentication, real-time scoring, bookmark functionality, and detailed result analysis.',
      technologies: ['Java Swing', 'Authentication', 'GUI Design', 'Event Handling'],
      githubUrl: 'https://github.com/xxxxx/online-exam-system',
      liveUrl: '#',
      icon: 'GraduationCap'
    },
    {
      id: '3',
      title: 'Restaurant Management System',
      description: 'An optimized database-driven system for restaurant operations including order management, inventory tracking, and customer management. Built with Oracle SQL using advanced database concepts.',
      technologies: ['Oracle SQL', 'DBMS', 'Triggers', 'ER Models', 'Database Optimization'],
      githubUrl: 'https://github.com/xxxxx/restaurant-management',
      liveUrl: '#',
      icon: 'UtensilsCrossed'
    }
  ],
  experience: [
    {
      id: '1',
      title: 'AI/ML Internship',
      company: 'NIELIT',
      location: 'Hyderabad',
      duration: '2024',
      description: 'Comprehensive hands-on training in Artificial Intelligence and Machine Learning, covering fundamental concepts to advanced deep learning techniques. Worked on practical Python projects implementing various ML algorithms and models.',
      skills: ['PCA (Principal Component Analysis)', 'Regression Analysis', 'K-Nearest Neighbors (KNN)', 'Decision Trees', 'Clustering Algorithms', 'Deep Learning Models', 'LSTM Networks', 'CNN (Convolutional Neural Networks)', 'Python for ML']
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Competitive Programming',
      description: 'Active participation in competitive programming platforms',
      category: 'Programming',
      items: [
        { name: 'CodeChef', value: '1259', description: 'Current rating' },
        { name: 'LeetCode', value: '1436', description: 'Current rating' },
        { name: 'HackerRank', value: '2 Badges', description: 'Earned badges' },
        { name: 'Smart Interviews', value: 'Global Rank: 21859', description: 'Global ranking' }
      ]
    },
    {
      id: '2',
      title: 'Competitions & Recognition',
      description: 'Awards and recognition in various competitions',
      category: 'Awards',
      items: [
        {
          name: '3rd Prize in National Quiz by BIS',
          value: 'Winner',
          description: 'Excellence in technical knowledge'
        }
      ]
    },
    {
      id: '3',
      title: 'Leadership',
      description: 'Leadership roles and responsibilities',
      category: 'Leadership',
      items: [
        {
          name: 'Leadership role in Electroverse 2024',
          value: 'Leader',
          description: 'Technical event coordination and management'
        },
        {
          name: 'Event Coordinator - Carpe Diem 2024',
          value: 'Coordinator',
          description: 'Vardhaman College of Engineering (VCEH) - A Literature Fest, June 2024',
          link: 'https://drive.google.com/file/d/1kSF-dJbnOcGhxphxwq00YbjC7SI3AVh0/view?usp=sharing'
        }
      ]
    }
  ],

  certifications: [
    {
      id: '1',
      title: "Cyber Job Simulation",
      provider: "Deloitte Australia – Forage (July 2025)",
      category: "Cyber Threat Detection, Log File Analysis, Access Control Auditing, Metadata Analysis, Security Incident Reporting",
      url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_EBNDxT7ybRkc566hd_1751898578862_completion_certificate.pdf"
    },
    {
      id: '2',
      title: 'C & C++ Programming',
      provider: 'Udemy',
      category: 'Programming Languages'
    },
    {
      id: '3',
      title: 'Python Fundamentals',
      provider: 'Great Learning',
      category: 'Programming Languages'
    },
    {
      id: '4',
      title: 'Data Science',
      provider: 'STTP Program',
      category: 'Data Science & Analytics'
    },
    {
      id: '5',
      title: 'Power BI',
      provider: 'Microsoft Learning',
      category: 'Data Visualization'
    },
    {
      id: '6',
      title: 'Employability Skills',
      provider: 'Wadhwani Foundation',
      category: 'Professional Development'
    }
  ]
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    const savedData = localStorage.getItem('portfolioData');
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const updatePersonalInfo = (info: PersonalInfo) => {
    setData(prev => ({ ...prev, personalInfo: info }));
  };

  const updateSkills = (skills: PortfolioData['skills']) => {
    setData(prev => ({ ...prev, skills }));
  };

  const updateProjects = (projects: Project[]) => {
    setData(prev => ({ ...prev, projects }));
  };

  const updateExperience = (experience: Experience[]) => {
    setData(prev => ({ ...prev, experience }));
  };

  const updateAchievements = (achievements: Achievement[]) => {
    setData(prev => ({ ...prev, achievements }));
  };

  const updateCertifications = (certifications: Certification[]) => {
    setData(prev => ({ ...prev, certifications }));
  };

  const resetToDefaults = () => {
    setData(defaultData);
  };

  return (
    <PortfolioContext.Provider value={{
      data,
      updatePersonalInfo,
      updateSkills,
      updateProjects,
      updateExperience,
      updateAchievements,
      updateCertifications,
      resetToDefaults
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
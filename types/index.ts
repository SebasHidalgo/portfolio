export type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    techStack: string[];
    demoUrl: string | null;
    githubUrl: string | null;
    githubUrls?: { label: string; url: string }[] | null;
};

export type Experience = {
    id: string;
    company: string;
    position: string;
    ubication: string;
    color: string;
    achievements: string[];
    startDate: Date;
    endDate: Date;
};

export type Education = {
    id: string;
    degree: string;
    institution: string;
    ubication: string;
    startDate: Date;
    endDate: Date;
};

export type Skill = {
    id: string;
    name: string;
    category: string;
};


export type SkillCategory =
    | "Languages"
    | "Frontend"
    | "Backend"
    | "Database"
    | "DevOps & Tools";

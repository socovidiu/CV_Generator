export interface ContactData {
    firstName: string;
    lastName: string;
    city: string;
    county: string;
    postcode: string;
    phone: string;
    email: string;
    photo: string;
}

export interface CV {
    id?: string;  // Optional for new CVs
    contact: ContactData;
    education: string;
    experience: string;
    skills: string;
}

export interface ResumeValues {
    firstName: string;
    lastName: string;
    jobTitle?: string;
    city?: string;
    country?: string;
    phone?: string;
    email?: string;
    photo?: File | string | null;
    colorHex?: string;
    borderStyle?: "square" | "circle" | "rounded";
    summary?: string;
    workExperiences?: {
        position?: string;
        company?: string;
        startDate?: string | Date;
        endDate?: string | Date;
        description?: string;
    }[];
    educations?: {
        degree?: string;
        school?: string;
        startDate?: string | Date;
        endDate?: string | Date;
    }[];
    skills?: string[];
}
export interface LinkItem {
    type: "LinkedIn" | "GitHub" | "Website";
    url: string;
}
// export interface ContactData {
//     firstName: string;
//     lastName: string;
//     city: string;
//     county: string;
//     postcode: string;
//     phone: string;
//     email: string;
//     photo: string;
//     links: LinkItem[];
// }

export interface CVData {
    firstName: string;
    lastName: string;
    city: string;
    county: string;
    postcode: string;
    phone: string;
    email: string;
    photo: string | null;

    summary: string;
    skills: string[];

    workExperiences: {
        position: string;
        company: string;
        startDate: string;
        endDate?: string;
        description: string;
    }[];

    educations: {
        degree: string;
        school: string;
        startDate: string;
        endDate?: string;
    }[];

    links: {
        type: "LinkedIn" | "GitHub" | "Website";
        url: string;
    }[];

    colorHex?: string;
    borderStyle?: "square" | "circle" | "rounded";
}
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
import React, { useEffect, useRef, useState } from "react";


function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString("en-GB", {
        month: "2-digit",
        year: "numeric"
    }).replace("/", "/");
}


interface ResumePreviewProps  {
    resumeData: ResumeValues;
}

interface ResumeValues {
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
    workExperiences?: Experience[];
    educations?: Education[];
    skills?: string[];
}

interface Experience {
    position?: string;
    company?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    description?: string;
}

interface Education {
    degree?: string;
    school?: string;
    startDate?: Date | string;
    endDate?: Date | string;
}

const ResumePreviewProps: React.FC<ResumePreviewProps> = ({ resumeData }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }
    }, []);

    return (
        <div className="w-full h-full bg-white text-black" ref={containerRef}>
            <div
                className="p-6 space-y-6"
                style={{ zoom: (1 / 794) * width }}
            >
                <PersonalInfoHeader resumeData={resumeData} />
                <SummarySection resumeData={resumeData} />
                <WorkExperienceSection resumeData={resumeData} />
                <EducationSection resumeData={resumeData} />
                <SkillsSection resumeData={resumeData} />
            </div>
        </div>
    );
};

const PersonalInfoHeader = ({ resumeData }: { resumeData: ResumeValues }) => {
    const {
        photo,
        firstName,
        lastName,
        jobTitle,
        city,
        country,
        phone,
        email,
        colorHex,
        borderStyle,
    } = resumeData;

    const [photoSrc, setPhotoSrc] = useState<string>("");

    useEffect(() => {
        if (photo instanceof File) {
            const url = URL.createObjectURL(photo);
            setPhotoSrc(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPhotoSrc(photo || "");
        }
    }, [photo]);

    return (
        <div className="flex items-center gap-6">
            {photoSrc && (
                <img
                    src={photoSrc}
                    alt="Profile"
                    className="w-24 h-24 object-cover"
                    style={{
                        borderRadius:
                            borderStyle === "square"
                                ? "0px"
                                : borderStyle === "circle"
                                    ? "50%"
                                    : "8px",
                    }}
                />
            )}
            <div>
                <p className="text-3xl font-bold" style={{ color: colorHex }}>
                    {firstName} {lastName}
                </p>
                <p className="font-medium" style={{ color: colorHex }}>
                    {jobTitle}
                </p>
                <p className="text-xs text-gray-500">
                    {[city, country].filter(Boolean).join(", ")}
                    {(city || country) && (phone || email) ? " • " : ""}
                    {[phone, email].filter(Boolean).join(" • ")}
                </p>
            </div>
        </div>
    );
};

const SummarySection = ({ resumeData }: { resumeData: ResumeValues }) => {
    if (!resumeData.summary) return null;
    return (
        <Section title="Professional Profile" color={resumeData.colorHex}>
            <p className="whitespace-pre-line text-sm">{resumeData.summary}</p>
        </Section>
    );
};

const WorkExperienceSection = ({ resumeData }: { resumeData: ResumeValues }) => {
    const experiences = resumeData.workExperiences?.filter(exp =>
        Object.values(exp).some(Boolean)
    );

    if (!experiences?.length) return null;

    return (
        <Section title="Work Experience" color={resumeData.colorHex}>
            {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm font-semibold">
                        <span>{exp.position}</span>
                        <span>
                            {exp.startDate && formatDate(exp.startDate)}
                            {exp.endDate && ` - ${formatDate(exp.endDate)}`}
                        </span>
                    </div>
                    <p className="text-xs font-semibold">{exp.company}</p>
                    <p className="text-xs">{exp.description}</p>
                </div>
            ))}
        </Section>
    );
};

const EducationSection = ({ resumeData }: { resumeData: ResumeValues }) => {
    const educations = resumeData.educations?.filter(edu =>
        Object.values(edu).some(Boolean)
    );

    if (!educations?.length) return null;

    return (
        <Section title="Education" color={resumeData.colorHex}>
            {educations.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm font-semibold">
                        <span>{edu.degree}</span>
                        <span>
                            {edu.startDate && formatDate(new Date(edu.startDate))}
                            {edu.endDate && ` - ${formatDate(new Date(edu.endDate))}`}
                        </span>
                    </div>
                    <p className="text-xs font-semibold">{edu.school}</p>
                </div>
            ))}
        </Section>
    );
};

const SkillsSection = ({ resumeData }: { resumeData: ResumeValues }) => {
    if (!resumeData.skills?.length) return null;
    return (
        <Section title="Skills" color={resumeData.colorHex}>
            <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, idx) => (
                    <span
                        key={idx}
                        className="px-2 py-1 text-xs text-white rounded bg-black"
                        style={{ backgroundColor: resumeData.colorHex }}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </Section>
    );
};

const Section = ({ title, children, color }: { title: string; children: React.ReactNode; color?: string }) => (
    <div className="space-y-3">
        <hr className="border-2" style={{ borderColor: color }} />
        <p className="text-lg font-semibold" style={{ color }}>
            {title}
        </p>
        {children}
    </div>
);

export default ResumePreviewProps;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactData } from "../types/CVtype";
import ContactInfo from "../components/ContactInfo"; 
import ResumePreview from "../components/ResumePreview"; 

type TemplateTypes = "default" | "modern" | "dark";

const templates: Record<TemplateTypes, string> = {
    default: "bg-white text-black p-6 rounded-lg shadow-lg",
    modern: "bg-gray-200 text-black p-6 rounded-lg shadow-lg border-l-4 border-blue-500",
    dark: "bg-gray-900 text-white p-6 rounded-lg shadow-lg"
};

const CvManager: React.FC = () => {
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ContactData>();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateTypes>("default");
    const [photo, setPhoto] = useState<string | null>(null);


    const borderStyle: "square" | "circle" | "rounded" = "rounded";
    // Example
    const resumeData = {
        firstName: "John",
        lastName: "Doe",
        jobTitle: "Software Engineer",
        city: "Bucharest",
        country: "Romania",
        phone: "123-456-789",
        email: "john.doe@example.com",
        photo: null, // This can be a base64 string, file object, or null if no photo is uploaded.
        colorHex: "#3b82f6", // Default color theme for the CV (blue here)
        borderStyle: borderStyle,  // ✅ This is correct
        summary: "Experienced software engineer with expertise in building scalable web applications.",
        workExperiences: [
            {
                position: "Frontend Developer",
                company: "TechCorp",
                startDate: "2022-01-01",
                endDate: "2024-01-01",
                description: "Built and maintained the company's front-end platform using React and Tailwind CSS."
            }
        ],
        educations: [
            {
                degree: "Bachelor of Computer Science",
                school: "University of Bucharest",
                startDate: "2018-09-01",
                endDate: "2022-06-15"
            }
        ],
        skills: ["React", "TypeScript", "Tailwind CSS", "Git"]
    };


    // Watch form values for live preview
    const formValues = watch();

    const onSubmit = async (cvData: ContactData) => {
        console.log("CV Submitted:", cvData);
        reset();
    };

    return (
        <div className="min-h-full flex">
            {/* Left Section - Contact Form */}
            <div className="w-2/5 p-8 bg-gray-100 flex flex-col ">
                <ContactInfo 
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    photo={photo}
                    setPhoto={setPhoto}
                />

                {/* Buttons Section */}
                <div className="flex justify-between mt-4">
                    <button className="px-8 py-3 border border-black text-black font-bold text-lg">BACK</button>
                    
                    <button 
                        type="submit" 
                        className="px-6 py-2 rounded-md shadow-md transition text-white"
                        style={{
                            backgroundColor: Object.keys(errors).length > 0 ? "#d1d5db" : "#f97316",  // Gray if errors exist, Orange otherwise
                            cursor: Object.keys(errors).length > 0 ? "not-allowed" : "pointer"
                        }}
                        disabled={Object.keys(errors).length > 0}
                    >
                        CONTINUE
                    </button>
                </div>

                {/* Template Selector */}
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">Choose Template:</h3>
                    <select className="p-2 border rounded-lg" 
                        onChange={(e) => setSelectedTemplate(e.target.value as TemplateTypes)}
                    >
                        <option value="default">Default</option>
                        <option value="modern">Modern</option>
                        <option value="dark">Dark</option> 
                    </select>
                </div>
            </div>
        
            {/* Right Section - CV Preview */}
            <div className="w-3/5 p-8 bg-gray-500 text-white flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4">Live Preview</h2>
                <div className="min-h-auto w-full flex justify-center items-center">
                    <ResumePreview resumeData={resumeData}/>
                </div>
            </div>
        </div>
    );
};

export default CvManager;

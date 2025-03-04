import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactData } from "../types/CVtype";
import ContactInfo from "../components/ContactInfo"; 

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

    // Watch form values for live preview
    const formValues = watch();

    const onSubmit = async (cvData: ContactData) => {
        console.log("CV Submitted:", cvData);
        reset();
    };

    return (
        <div className="min-h-screen w-[1520px] flex">
            {/* Left Section - Contact Form */}
            <div className="w-2/5 p-8 bg-gray-100 flex flex-col">
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
                <div className="w-[1000px] max-w-full flex shadow-lg">
                    {/* Left Sidebar - Contact & Skills */}
                    <div className="w-1/3 bg-gray-700 text-white p-6">
                        <h1 className="text-3xl font-bold text-center mb-4">
                            {formValues.firstName || "Your"} {formValues.lastName || "Name"}
                        </h1>
                        {photo && (
                            <img 
                                src={photo} 
                                alt="Profile" 
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-white"
                            />
                        )}
                        {/* Contact Section */}
                        <h3 className="font-semibold text-lg border-b border-gray-500 pb-1">CONTACT</h3>
                        <p className="mt-2">{formValues.city}, {formValues.county}, {formValues.postcode}</p>
                        <p>{formValues.phone || "Your Phone"}</p>
                        <p>{formValues.email || "your.email@example.com"}</p>

                        {/* Skills Section */}
                        <h3 className="font-semibold text-lg border-b border-gray-500 pb-1 mt-4">SKILLS</h3>
                        {/* <p>{formValues.skills || "Your skills"}</p> */}
                    </div>

                    {/* Right Section - Summary, Experience, Education */}
                    <div className="w-2/3 bg-white text-black p-6">
                        <h3 className="font-semibold text-lg border-b border-gray-300 pb-1">SUMMARY</h3>
                        {/* <p className="mt-2">{formValues.summary || "Your summary here..."}</p> */}

                        <h3 className="font-semibold text-lg border-b border-gray-300 pb-1 mt-4">EXPERIENCE</h3>
                        {/* <p>{formValues.experience || "Your work experience..."}</p> */}

                        <h3 className="font-semibold text-lg border-b border-gray-300 pb-1 mt-4">EDUCATION</h3>
                        {/* <p>{formValues.education || "Your education details..."}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CvManager;

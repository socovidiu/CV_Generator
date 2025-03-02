import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactData } from "../types/CVtype";
import ContactInfo from "../components/ContactInfo"; 

const templates = {
    default: "bg-white text-black p-6 rounded-lg shadow-lg",
    modern: "bg-gray-200 text-black p-6 rounded-lg shadow-lg border-l-4 border-blue-500",
    dark: "bg-gray-900 text-white p-6 rounded-lg shadow-lg"
};

const CvManager: React.FC = () => {
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ContactData>();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>("default");

    // Watch form values for live preview
    const formValues = watch();

    const onSubmit = async (cvData: ContactData) => {
        console.log("CV Submitted:", cvData);
        reset();
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Form Inputs */}
            <div className="w-1/2 p-8 bg-gray-100">
                <h2 className="text-2xl font-bold mb-6">CV Builder</h2>
                
                 {/* Photo Upload Section */}
                <div className="flex flex-col items-center mt-6 space-x-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-4xl">👤</div>
                    <button className="px-6 py-2 text-sm font-semibold tracking-wide">PHOTO UPLOAD</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                   
                    {/* Form Section */}
                    <div className="grid grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="text-xs font-bold uppercase">First Name</label>
                            <input
                                {...register("firstName", { required: "Name is required" })}
                                placeholder="Firat Name"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase">Last Name</label>
                            <input
                                {...register("lastName", { required: "Name is required" })}
                                placeholder="Last Name"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Adress */}
                        <div>
                            <label className="text-xs font-bold uppercase">City</label>
                            <input
                                {...register("city", { required: "City is required" })}
                                placeholder="City"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase">County</label>
                            <input
                                {...register("county", { required: "County is required" })}
                                placeholder="County"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase">Postcode</label>
                            <input
                                {...register("postcode", { required: "Postcode is required" })}
                                placeholder="Postcode"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Contacts */}
                        <div>
                            <label className="text-xs font-bold uppercase">Email</label>
                            <input
                                {...register("email", { required: "Email is required" })}
                                placeholder="Email"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        <div>
                            <label className="text-xs font-bold uppercase">Phone</label>
                            <input
                                {...register("phone")}
                                placeholder="Phone"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>



                        {/* <input {...register("education")} placeholder="Education" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input {...register("experience")} placeholder="Experience" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input {...register("skills")} placeholder="Skills" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /> */}
                        {/* Buttons Section */}
                       
                    </div>
                </form>
                <div className="flex justify-between mt-8">
                    <button className="px-8 py-3 border border-black text-black font-bold text-lg">BACK</button>
                    <button type="submit" 
                        style={{backgroundColor: 'coral'}}
                        className="text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                        {/* {editingId ? "Continue" : "Create CV"} */}
                        CONTINUE
                    </button>
                </div>

                {/* Template Selector */}
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">Choose Template:</h3>
                    <select className="p-2 border rounded-lg" 
                        onChange={(e) => setSelectedTemplate(e.target.value as keyof typeof templates)}
                    >
                        <option value="default">Default</option>
                        <option value="modern">Modern</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </div>

            {/* Right Section - CV Preview */}
            <div className="w-1/2 p-8 bg-gray-500 text-white flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4">Live Preview</h2>
                <div className={`w-96 ${templates[selectedTemplate]}`}>
                    <h3 className="text-2xl font-bold">{(formValues.firstName + formValues.lastName)|| "Your Name"}</h3>
                    <p className="text-gray-600">
                        {(formValues.city + ", " + formValues.county+ ", " + formValues.postcode) || "Adress"}
                    </p>
                    <p className="text-gray-600">{formValues.email || "your.email@example.com"}</p>
                    <p className="text-gray-600">{formValues.phone || "Your Phone Number"}</p>
                    {/* <h4 className="font-semibold mt-4">Education</h4>
                    <p>{formValues.education || "Your education details"}</p>
                    <h4 className="font-semibold mt-4">Experience</h4>
                    <p>{formValues.experience || "Your work experience"}</p>
                    <h4 className="font-semibold mt-4">Skills</h4>
                    <p>{formValues.skills || "Your skills"}</p> */}
                </div>
            </div>
        </div>
    );
};

export default CvManager;

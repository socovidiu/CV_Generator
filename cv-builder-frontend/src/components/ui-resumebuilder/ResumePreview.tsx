import React, { useRef } from "react";
import { CVData } from "../../types/CVtype";
import { useReactToPrint } from "react-to-print";

interface ResumePreviewProps {
    resumeData: CVData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
    const previewRef = useRef<HTMLDivElement>(null);

    const handleDownload = useReactToPrint({
        contentRef: previewRef, 
        documentTitle: "My_CV",
    });

    return (
        <div className="w-full bg-blue-800 p-6 shadow-lg rounded-lg">
            {/* Resume Content */}
            <div ref={previewRef} className="p-6 border border-gray-300">
                {/* Personal Info */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{resumeData.firstName} {resumeData.lastName}</h1>
                    <p className="text-lg text-gray-600">{resumeData.jobTitle}</p>
                    <p className="text-sm">{resumeData.city}, {resumeData.country} | {resumeData.phone} | {resumeData.email}</p>
                    {resumeData.links.map((link, index) => (
                        <div key={index} className="flex gap-2">

                        </div>
                    ))}

                </div>

                {/* Summary */}
                {resumeData.summary && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold border-b pb-2">About Me</h2>
                        <p className="text-sm mt-2">{resumeData.summary}</p>
                    </div>
                )}

                {/* Skills */}
                {resumeData.skills?.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
                        <ul className="text-sm mt-2">
                            {resumeData.skills.map((skill, index) => (
                                <li key={index} className="list-disc ml-4">{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Work Experience */}
                {resumeData.workExperiences?.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Work Experience</h2>
                        {resumeData.workExperiences.map((exp, index) => (
                            <div key={index} className="mt-4">
                                <p className="text-md font-bold">{exp.position} - {exp.company}</p>
                                <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate || "Present"}</p>
                                <p className="text-sm mt-1">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {resumeData.educations?.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
                        {resumeData.educations.map((edu, index) => (
                            <div key={index} className="mt-4">
                                <p className="text-md font-bold">{edu.degree}</p>
                                <p className="text-sm">{edu.school}</p>
                                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate || "Present"}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Download PDF Button */}
            <button 
                onClick={() => handleDownload()}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Download PDF
            </button>
        </div>
    );
};

export default ResumePreview;

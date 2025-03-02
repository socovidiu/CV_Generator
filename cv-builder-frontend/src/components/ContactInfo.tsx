import React from "react";
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

interface ContactInfoProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
    handleSubmit: UseFormHandleSubmit<any>;
    onSubmit: (data: any) => void;
    editingId: string | null;
    setSelectedTemplate: (value: string) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
    register,
    errors,
    handleSubmit,
    onSubmit,
    editingId,
    setSelectedTemplate
}) => {
    return (
        <div className="w-1/2 p-8 bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">CV Builder</h2>

            {/* Photo Upload Section */}
            <div className="flex flex-col items-center mt-6 space-y-3">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-4xl">👤</div>
                <button className="px-6 py-2 text-sm font-semibold tracking-wide">PHOTO UPLOAD</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Form Section */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                    <div>
                        <label className="text-xs font-bold uppercase">First Name</label>
                        <input
                            {...register("firstName", { required: "First name is required" })}
                            placeholder="First Name"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase">Last Name</label>
                        <input
                            {...register("lastName", { required: "Last name is required" })}
                            placeholder="Last Name"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Address Fields */}
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

                    {/* Contact Fields */}
                    <div>
                        <label className="text-xs font-bold uppercase">Email</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase">Phone</label>
                        <input
                            {...register("phone")}
                            placeholder="Phone"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="flex justify-center gap-4 mt-8">
                    <button className="px-8 py-3 border border-black text-black font-bold text-lg">BACK</button>
                    <button type="submit"
                        style={{ backgroundColor: 'coral' }}
                        className="text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                        {editingId ? "Update CV" : "Create CV"}
                    </button>
                </div>

                {/* Template Selector */}
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">Choose Template:</h3>
                    <select className="p-2 border rounded-lg" 
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="modern">Modern</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default ContactInfo;

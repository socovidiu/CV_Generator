import React, { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { ContactData } from "../types/CVtype";

interface ContactInfoProps {
    register: UseFormRegister<ContactData>;
    errors: FieldErrors<ContactData>;
    handleSubmit: UseFormHandleSubmit<ContactData>;
    onSubmit: (cvData: ContactData) => void;
    photo: string | null;
    setPhoto: (photo: string | null) => void; 
}

const ContactInfo: React.FC<ContactInfoProps> = ({ register, errors, handleSubmit, onSubmit, photo, setPhoto }) => {


    // Handle file selection
    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPhoto(reader.result as string);
            reader.readAsDataURL(file);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold mb-4">Contact Info</h2>

            {/* Photo Upload Section */}
            <div className="flex flex-col items-center mt-6">
                <label htmlFor="photo-upload" className="cursor-pointer">
                    {photo ? (
                        <img 
                            src={photo} 
                            alt="Uploaded" 
                            className="w-24 h-24 rounded-full object-cover border border-gray-400"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-4xl">
                            👤
                        </div>
                    )}
                </label>
                <input 
                    id="photo-upload" 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                />
            </div>

            {/* Grid Layout for Inputs */}
            <div className="grid grid-cols-2 gap-4 w-full">
                {/* First Name */}
                <div>
                    <label className="block text-xs font-semibold">FIRST NAME</label>
                    <input 
                        {...register("firstName", { required: "First name is required" })} 
                        className="w-full border rounded-md p-2"
                        placeholder="First Name"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-xs font-semibold">LAST NAME</label>
                    <input 
                        {...register("lastName", { required: "Last name is required" })} 
                        className="w-full border rounded-md p-2"
                        placeholder="Last Name"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                </div>

                {/* City */}
                <div>
                    <label className="block text-xs font-semibold">CITY</label>
                    <input 
                        {...register("city", { required: "City is required" })} 
                        className="w-full border rounded-md p-2"
                        placeholder="City"
                    />
                    {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                </div>

                {/* County */}
                <div>
                    <label className="block text-xs font-semibold">COUNTY</label>
                    <input 
                        {...register("county", { required: "County is required" })} 
                        className="w-full border rounded-md p-2"
                        placeholder="County"
                    />
                    {errors.county && <p className="text-red-500 text-xs">{errors.county.message}</p>}
                </div>

                {/* Postcode */}
                <div>
                    <label className="block text-xs font-semibold">POSTCODE</label>
                    <input 
                        {...register("postcode", { 
                            required: "Postcode is required", 
                            pattern: { value: /^[A-Za-z0-9 ]{3,10}$/, message: "Invalid postcode format" } 
                        })} 
                        className="w-full border rounded-md p-2"
                        placeholder="Postcode"
                    />
                    {errors.postcode && <p className="text-red-500 text-xs">{errors.postcode.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs font-semibold">EMAIL</label>
                    <input 
                        {...register("email", { 
                            required: "Email is required", 
                            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email format" } 
                        })} 
                        className="w-full border rounded-md p-2"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="col-span-2">
                    <label className="block text-xs font-semibold">PHONE</label>
                    <input 
                        {...register("phone", { 
                            required: "Phone number is required", 
                            pattern: { value: /^[0-9]{10,15}$/, message: "Invalid phone number" } 
                        })} 
                        className="w-full border rounded-md p-2"
                        placeholder="Phone"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>
            </div>

            
        </form>
    );
};

export default ContactInfo;

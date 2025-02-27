import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllCvs, createCv, updateCv, deleteCv } from "../api/cvService";
import { CV } from "../types/CVtype";

const CvManager: React.FC = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<CV>();
    const [cvs, setCvs] = useState<CV[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchCvs();
    }, []);

    const fetchCvs = async () => {
        const data = await getAllCvs();
        setCvs(data);
    };

    const onSubmit = async (cvData: CV) => {
        if (editingId) {
            await updateCv(editingId, cvData);
            setEditingId(null);
        } else {
            await createCv(cvData);
        }
        fetchCvs();
        reset();
    };

    const handleEdit = (cv: CV) => {
        setEditingId(cv.id || null);
        Object.keys(cv).forEach((key) => {
            setValue(key as keyof CV, cv[key as keyof CV]);
        });
    };

    const handleDelete = async (id: string) => {
        await deleteCv(id);
        fetchCvs();
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white">
            <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">CV Manager</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                {...register("name", { required: "Name is required" })}
                                placeholder="Name"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <input
                                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                                placeholder="Email"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    <input
                        {...register("phone", { required: "Phone is required" })}
                        placeholder="Phone"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}

                    <input {...register("education")} placeholder="Education" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input {...register("experience")} placeholder="Experience" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input {...register("skills")} placeholder="Skills" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    <div className="flex justify-center gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                            {editingId ? "Update CV" : "Create CV"}
                        </button>
                        {editingId && (
                            <button type="button" className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 transition" onClick={() => { setEditingId(null); reset(); }}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <ul className="mt-8 w-full max-w-3xl space-y-3">
                {cvs.map((cv) => (
                    <li key={cv.id} className="p-4 bg-white shadow-md flex justify-between items-center rounded-lg">
                        <div>
                            <p className="font-bold text-lg">{cv.name}</p>
                            <p className="text-gray-600">{cv.email}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(cv)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition">Edit</button>
                            <button onClick={() => handleDelete(cv.id!)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CvManager;

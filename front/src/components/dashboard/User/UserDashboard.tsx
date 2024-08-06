'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../AuthContext";
import { IUser } from "@/src/types/IUser";
import Swal from "sweetalert2";

interface DashboardUserProps {
    userId: number;
}

const DashboardUser: React.FC<DashboardUserProps> = ({ userId }) => {
    const router = useRouter();
    const { user, setUser, token } = useAuth();
    const [formData, setFormData] = useState<IUser | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    if (!user) {
        return <div>Error loading user data.</div>;
    }

    if (userId !== user.id || user.admin) {
        router.push("/login");
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        const updateData: Partial<IUser> = {
            name: formData.name,
            email: formData.email,
            ...(formData.phone && { phone: formData.phone }),
            ...(formData.birthday && { birthday: new Date(formData.birthday).toISOString() }),
            ...(formData.allergies && { allergies: formData.allergies }),
            ...(formData.address && { address: formData.address }),
            ...(formData.city && { city: formData.city }),
            ...(formData.country && { country: formData.country }),
        };

        try {
            const response = await fetch(`http://localhost:3001/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setIsEditing(false);
                Swal.fire({
                    title: 'Profile Updated',
                    text: 'Your profile has been updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    router.push(`/account/user/${userId}/dashboard`);
                });
            } else {
                const errorResponse = await response.json();
                console.error('Failed to update user data:', errorResponse);
                Swal.fire({
                    title: 'Update Failed',
                    text: 'There was an issue updating your profile.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            Swal.fire({
                title: 'Error',
                text: 'There was an error updating your profile.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="mb-10">
            <div className="flex flex-col items-left bg-gray-800 bg-opacity-75 w-[90%] mx-auto rounded-md p-10">
                <section className="flex flex-col space-y-2 text-left">
                    {!isEditing ? (
                        <>
                            <p className="font-bold">{`👤Name: ${user?.name}`}</p>
                            <p className="font-bold">{`🎂Birthday: ${user?.birthday ? new Date(user.birthday).toISOString().split('T')[0] : ''}`}</p>
                            <p className="font-bold">{`📧Email: ${user?.email}`}</p>
                            <p className="font-bold">{`📍Address: ${user?.address}`}</p>
                            <p className="font-bold">{`🌎Country: ${user?.country}`}</p>
                            <p className="font-bold">{`📱Phone: ${user?.phone}`}</p>
                            <p className="font-bold">{`🤧Allergies: ${user?.allergies}`}</p>
                            <div className="pt-6 flex">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-500 text-white px-2 py-2 rounded w-32">
                                    Edit Profile
                                </button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData?.name || ''}
                                    onChange={handleChange}
                                    className="block w-full p-2 mt-1 rounded bg-gray-700 text-white"
                                    required
                                />
                            </label>
                            <label>
                                Birthday:
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData?.birthday ? new Date(formData.birthday).toISOString().split('T')[0] : ''}
                                    onChange={handleChange}
                                    className="block w-full p-2 mt-1 rounded bg-gray-700 text-white"
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData?.email || ''}
                                    onChange={handleChange}
                                    className="block w-full p-2 mt-1 rounded bg-gray-700 text-white"
                                    required
                                    readOnly
                                />
                            </label>
                            <label>
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData?.address || ''}
                                    onChange={handleChange}
                                    className="block w-full p-2 mt-1 rounded bg-gray-700 text-white"
                                />
                            </label>
                            <label>
                                Country:
                                <input
                                    type="text"
                                    name="country"
                                    value={formData?.country || ''}
                                    onChange={handleChange}
                                    className="block w-full p-2 mt-1 rounded bg-gray-700 text-white"
                                />
                            </label>
                            <label>
                                Phone:
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData?.phone || ''}
                                    onChange={handleChange}
                                    className="block w-full p-2 mt-1 rounded bg-gray-700 text-white"
                                />
                            </label>
                            <label>
                                Allergies:
                                <input
                                    type="text"
                                    name="allergies"
                                    value={formData?.allergies || ''}
                                    onChange={handleChange}
                                    className="block w-full p-2 mt-1 rounded bg-gray-700 text-white"
                                />
                            </label>
                            <button
                                type="submit"
                                className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded ml-2">
                                Cancel
                            </button>
                        </form>
                    )}
                </section>
            </div>
        </div>
    );
};

export default DashboardUser;

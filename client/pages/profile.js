import React, { useState } from 'react';
import NavBar from './navbar';
import Link from 'next/link'



export default function Profile({ currUser }) {
    if (!currUser){
        return(
            <div>
                Loading
            </div>
        )
    }
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({
        username: currUser.username,
        email: currUser.email,
        instructor_name: currUser.instructor_name,
        instructor_email: currUser.instructor_email
    });
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedProfile((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        const response = await fetch(`http://127.0.0.1:5555//profile/${currUser.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfile)
        });
        setIsEditing(false);
        window.location.reload(); 
    };

    const handleDeleteProfile = () => {
        setShowConfirmation(true);
    }

    const handleConfirmDelete = async () => {
        const response = await fetch(`http://127.0.0.1:5555//profile/${currUser.id}`, {
            method: 'DELETE',
          });
          window.location.href = '/';
    }

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    }

    if (!currUser) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <NavBar/>
            <h1>Profile</h1>
            {isEditing ? (
                <form>
                <label>
                    Username:
                    <input
                    type="text"
                    name="username"
                    value={updatedProfile.username}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                    type="text"
                    name="email"
                    value={updatedProfile.email}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Instructor Name:
                    <input
                    type="text"
                    name="instructor_name"
                    value={updatedProfile.instructor_name}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Instructor Email:
                    <input
                    type="text"
                    name="instructor_email"
                    value={updatedProfile.instructor_email}
                    onChange={handleInputChange}
                    />
                </label>
                <button type="button" onClick={handleSaveProfile}>Save</button>
                </form>
            ) : (
                <div>
                    <p>{`Username: ${currUser.username}`}</p>
                    <p>{`Email: ${currUser.email}`}</p>
                    <p>{`Instructor Name: ${currUser.instructor_name}`}</p>
                    <p>{`Instructor Email: ${currUser.instructor_email}`}</p>
                    <button onClick={handleEditProfile}>Edit Profile Information</button>
                </div>
            )}
            <button onClick ={handleDeleteProfile}>Delete Profile</button>
            {showConfirmation && (
                <div className = "overlay">
                    <div className = "help-content">
                        <p>Are you sure? This action cannot be undone</p>
                        <button onClick = {handleConfirmDelete}>Yes, delete my profile</button>
                        <button onClick = {handleCancelDelete}>No, keep my account active</button>
                    </div>
                </div>
            )}
        </div>
    );
}
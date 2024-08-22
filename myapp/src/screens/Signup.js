import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setcredentials] = useState({ name: '', email: '', password: '', location: '' });

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:2929/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.location
            }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
            alert('User created successfully');
        } else {
            alert('Error creating user');
        }
    };

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={HandleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Your name'
                                name='name'
                                value={credentials.name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Your location'
                                name="location"
                                value={credentials.location}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name='email'
                                value={credentials.email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                name='password'
                                value={credentials.password}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                        <Link to="/login" className="btn btn-link text-center w-100 mt-3">Already a user</Link>
                    </form>
                </div>
            </div>
        </>
    );
}

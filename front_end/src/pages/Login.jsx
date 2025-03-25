import React from 'react';
import { useState } from "react";
import { Description, Field, Fieldset, Input, Label } from '@headlessui/react';
import clsx from 'clsx'
import logo from '../assets/Moodvies-02.svg';
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 font-sans">
        {/* Combined Wrapper for Description & Form */}
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
            
            {/* Left Side - Logo & Description */}
            <div className="w-full md:w-1/2 bg-primary text-white p-8 flex flex-col justify-center items-center">
                <img src={logo} alt="Logo" className="w-16 h-16 mb-4"/>
                <h1 className="text-3xl font-semibold text-accent">MoodVies</h1>
                <p className="mt-3 text-center text-gray-300">
                    Discover movies that match your mood! Whether you're feeling happy, nostalgic, or adventurous, 
                    MoodVies curates the best films for you.
                </p>
            </div>

                {/* Right Side - Registration Form */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-center text-primary">Login to Your account</h2>

                <Fieldset className="mt-6 space-y-4">
                    {/* Email Field */}
                    <Field>
                        <Label className="text-sm font-medium text-primary">Email</Label>
                        <Input
                            type="email"
                            placeholder="Email address"
                            className={clsx(
                            "mt-2 block w-full rounded-md border border-gray-400 p-2 text-sm text-black",
                            "focus:border-accent focus:ring focus:ring-accent/50"
                            )}
                        />
                    </Field>

                    {/* Password Field */}
                    <Field>
                        <Label className="text-sm font-medium text-primary">Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter password"
                            className={clsx(
                            "mt-2 block w-full rounded-md border border-gray-400 p-2 text-sm text-black",
                            "focus:border-accent focus:ring focus:ring-accent/50"
                            )}
                        />
                    </Field>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-accent text-primary p-2 font-medium rounded-md hover:bg-green-300 transition"
                        >
                        Login
                        </button>
                        <div>
                            <Link to="/Register" className='hover:underline' >
                                Don't have an account? Sign Up Now!
                            </Link>
                        </div>
                </Fieldset>
            </div>
        </div>
    </div>
  )
}

export default Login

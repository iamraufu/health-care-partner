import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BarChart from '../components/BarChart';
import { useForm } from "react-hook-form";
import useAuth from '../hooks/useAuth';

const SelfCare = () => {

    const { user } = useAuth()
    const [waterError, setWaterError] = useState('');
    const [waterSuccess, setWaterSuccess] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {

        const details = {
            count: parseInt(data.count),
            date: data.date,
            email: user.email
        }

        fetch('http://localhost:5000/water', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === false) {
                    setWaterError(result.message)
                    setWaterSuccess("")
                }
                else {
                    setWaterError("")
                    setWaterSuccess(result.message)
                    document.getElementById('water-form').reset()
                }
            })
    }

    return (
        <div className='bg-brand'>
            <Navbar />
            <div className="container mt-5">
                <h2 className='text-brand fs-5'>Your Daily Glass of Water Tracker</h2>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-8">
                        <BarChart />
                    </div>

                    <div className="col-md-4 mt-3">
                        <h2 className='fs-5'>Input Today's Data</h2>
                        <form id='water-form' onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-3">
                                <input type='date' placeholder='Date' className='form-control' {...register("date", { required: true })} />
                                <p>{errors.date && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="my-3">
                                <input min='0' type='number' placeholder='Glass of Water' className='form-control' {...register("count", { required: true })} />
                                <p>{errors.count && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <p className='text-danger fw-bold'>{waterError}</p>
                            <p className='text-success fw-bold'>{waterSuccess}</p>

                            <button className='btn btn-success w-100'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelfCare;
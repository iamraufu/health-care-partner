import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import BarChart from '../components/BarChart';

const MentalHealth = () => {

    const { user } = useAuth()
    const [moodMeter, setMoodMeter] = useState(5)

    const [moodError, setMoodError] = useState('');
    const [moodSuccess, setMoodSuccess] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const details = {
            meter: parseInt(data.meter),
            note: data.note,
            email: user.email,
            date: data.date
        }
        fetch('http://localhost:5001/mood', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === false) {
                    setMoodError(result.message)
                    setMoodSuccess("")
                }
                else {
                    setMoodError("")
                    setMoodSuccess(result.message)
                    document.getElementById('mood-form').reset()
                    setMoodMeter(5)
                }
            })
    }

    return (
        <div className='bg-brand'>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-brand fs-5">Submit your mood meter today</h2>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-4">
                        <form id='mood-form' onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-3">
                                <input onChangeCapture={(e) => setMoodMeter(e.target.value)} defaultValue={5} type="range" min='1' max='10' name="" id="" {...register("meter", { required: true })} />
                            </div>
                            <p>{errors.meter && <span className='text-danger'>*This field is required</span>}</p>
                            <p className='fs-5 mt-3'>Your Mood Meter: <span className='text-brand fw-bold'>{moodMeter}</span></p>

                            <div className="my-3">
                                <input type='date' placeholder='Date' className='form-control' {...register("date", { required: true })} />
                                <p>{errors.date && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="mb-3">
                                <input type='text' placeholder="Note" {...register("note", { required: true })} className='form-control' />
                                <p>{errors.note && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <p className='text-danger fw-bold'>{moodError}</p>
                            <p className='text-success fw-bold'>{moodSuccess}</p>

                            <button className='btn btn-sm btn-primary px-5'>Submit</button>
                        </form>
                    </div>

                    <div className="col-md-8"><BarChart label='Mental Health' title='Mental Health Meter' bg='#' chartData={1} /></div>
                </div>
            </div>
        </div>
    );
};

export default MentalHealth;
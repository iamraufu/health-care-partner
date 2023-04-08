import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';

const MentalHealth = () => {

    const [moodMeter, setMoodMeter] = useState(5)

    const [moodError, setMoodError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const details = {
            meter: parseInt(data.meter),
            note: data.note
        }
        // fetch('http://localhost:5000/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => res.json())
        //     .then(result => {
        //         if (result.status === false) {
        //             setLoginError(result.message)
        //         }
        //         else {
        //             setUser(result.user)
        //             setLoginError('')
        //             localStorage.setItem('uId', result.user._id)
        //         }
        //     })
    }

    return (
        <div className='bg-brand'>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-brand fs-5">Submit your mood meter today</h2>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-3">
                            <input onChangeCapture={(e) => setMoodMeter(e.target.value)} defaultValue={5} type="range" min='1' max='10' name="" id="" {...register("meter", { required: true })} />
                        </div>
                        <p>{errors.meter && <span className='text-danger'>*This field is required</span>}</p>
                        <p className='fs-5 mt-3'>Your Mood Meter: <span className='text-brand fw-bold'>{moodMeter}</span></p>

                        <div className="mb-3">
                            <input type='text' {...register("note", { required: true })} className='form-control' />
                            <p>{errors.note && <span className='text-danger'>*This field is required</span>}</p>
                        </div>
                        <button className='btn btn-sm btn-primary px-5'>Submit</button>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default MentalHealth;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const CreateEmployeeComponent = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (id === '_add') {
            return;
        } else {
            EmployeeService.getEmployeeById(id).then((res) => {
                let employee = res.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setEmailId(employee.emailId);
            });
        }
    }, [id]);

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = { firstName, lastName, emailId };

        if (id === '_add') {
            EmployeeService.createEmployee(employee).then((res) => {
                navigate(`/employees`);
            });
        } else {
            EmployeeService.updateEmployee(employee, id).then((res) => {
                navigate(`/employees`);
            });
        }
    };

    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    };

    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);
    };

    const changeEmailHandler = (event) => {
        setEmailId(event.target.value);
    };

    const cancel = () => {
        navigate(`/employees`);
    };

    const getTitle = () => {
        return id === '_add' ? <h3 className='text-center mb-4'>Add Employee</h3> : <h3 className='text-center mb-4'>Update Employee</h3>;
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card mt-4 bg-secondary'>
                        <div className='card-body'>
                            {getTitle()}
                            <form>
                                <div className='mb-3'>
                                    <label htmlFor='firstName' className='form-label'>
                                        <b>First Name:</b>
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control border-2 border-dark'
                                        id='firstName'
                                        placeholder='Enter First Name'
                                        value={firstName}
                                        onChange={changeFirstNameHandler}
                                    />
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor='lastName' className='form-label'>
                                        <b>Last Name:</b>
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control border-2 border-dark'
                                        id='lastName'
                                        placeholder='Enter Last Name'
                                        value={lastName}
                                        onChange={changeLastNameHandler}
                                    />
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor='emailId' className='form-label'>
                                        <b>Email Id:</b>
                                    </label>
                                    <input
                                        type='email'
                                        className='form-control border-2 border-dark'
                                        id='emailId'
                                        placeholder='Enter Email Address'
                                        value={emailId}
                                        onChange={changeEmailHandler}
                                    />
                                </div>

                                <div className='d-grid'>
                                    <button type='button' className='btn btn-primary' onClick={saveOrUpdateEmployee}>
                                        Save
                                    </button>
                                    <button type='button' className='btn btn-danger mt-2' onClick={cancel}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeComponent;

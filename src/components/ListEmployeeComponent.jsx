import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ListEmployeeComponent = ({props}) => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    console.log("props :" + props);

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then((res) => {
            setEmployees(employees.filter((employee) => employee.id !== id));
        });
    };

    const viewEmployee = (id) => {
        navigate(`/view-employee/${id}`);
    };

    const editEmployee = (id) => {
        navigate(`/add-employee/${id}`);
    };

    const addEmployee = () => {
        navigate(`/add-employee/_add`);
    };

    useEffect(() => {
        EmployeeService.getEmployees().then((res) => {
            console.log("res:", res);
            setEmployees(res.data);
        });
    }, []);

    return (
        <div className=''>
            <h2 className="text-center"><u>Employee List</u></h2>
            <div className='col-md-12'>
                <button className='btn btn-primary active' onClick={addEmployee}>
                    Add Employee
                </button>
            </div>
            <div className='row mt-3'>
                <table className='table table-striped table-bordered border-secondary'>
                    <thead>
                        <tr>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <button onClick={() => editEmployee(employee.id)} className="btn btn-info">
                                        Update
                                    </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => deleteEmployee(employee.id)} className="btn btn-danger">
                                        Delete
                                    </button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => viewEmployee(employee.id)} className="btn btn-info">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListEmployeeComponent;

/*
import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                id: this.props.match.params.id,
                firstName: '',
                lastName:  '',
                emailId: '',
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({firstName: employee.firstName,
                lastName: employee.lastName,
                emailId: employee.emailId
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee => ' + JSON.stringify(employee));
        EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
            this.props.history.push('/employees');
        });
       
    }

    changeFirstNameHandler(event){
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler(event){
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler(event){
        this.setState({emailId: event.target.value});
    }

    cancel() {
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                    <div className='container'>
                        <div className='row'>
                            <div className='card col-md-6 offset-md-3 offset-md-3'>
                                <h3 className='text-center'>Update Employee</h3>
                                <div className='card-body'>
                                    <form>
                                        <div className='form-group mt-3'>
                                            <label> First Name: </label>
                                            <input placeholder='First Name' name = "firstName" className='form-control' value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>

                                        <div className='form-group mt-3'>
                                            <label> Last Name: </label>
                                            <input placeholder='Last Name' name = "lastName" className='form-control' value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>

                                        <div className='form-group mt-3'>
                                            <label> Email Id:</label>
                                            <input placeholder='Email Address' name = "emailId" className='form-control' value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className='btn btn-success mt-4' onClick={this.updateEmployee}>Save</button>
                                        <button className='btn btn-danger mt-4' onClick={this.cancel.bind(this)} style = {{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default UpdateEmployeeComponent;
*/


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const UpdateEmployeeComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    id,
    firstName: '',
    lastName: '',
    emailId: '',
  });

  useEffect(() => {
    EmployeeService.getEmployeeById(id).then((res) => {
      let employeeData = res.data;
      setEmployee({
        ...employee,
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        emailId: employeeData.emailId,
      });
    });
  }, [id]);

  const updateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(employee, id).then(() => {
        navigate('/employees');
    });
  };

  const changeFirstNameHandler = (event) => {
    setEmployee({ ...employee, firstName: event.target.value });
  };

  const changeLastNameHandler = (event) => {
    setEmployee({ ...employee, lastName: event.target.value });
  };

  const changeEmailHandler = (event) => {
    setEmployee({ ...employee, emailId: event.target.value });
  };

  const cancel = () => {
    navigate('/employees');
  };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h3 className='text-center'>Update Employee</h3>
            <div className='card-body'>
              <form>
                <div className='form-group mt-3'>
                  <label> First Name: </label>
                  <input
                    placeholder='First Name'
                    name='firstName'
                    className='form-control'
                    value={employee.firstName}
                    onChange={changeFirstNameHandler}
                  />
                </div>

                <div className='form-group mt-3'>
                  <label> Last Name: </label>
                  <input
                    placeholder='Last Name'
                    name='lastName'
                    className='form-control'
                    value={employee.lastName}
                    onChange={changeLastNameHandler}
                  />
                </div>

                <div className='form-group mt-3'>
                  <label> Email Id:</label>
                  <input
                    placeholder='Email Address'
                    name='emailId'
                    className='form-control'
                    value={employee.emailId}
                    onChange={changeEmailHandler}
                  />
                </div>

                <button className='btn btn-success mt-4' onClick={updateEmployee}>
                  Save
                </button>
                <button className='btn btn-danger mt-4' onClick={cancel} style={{ marginLeft: '10px' }}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployeeComponent;

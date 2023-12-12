/*
import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)


        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            this.setState({employee: res.data});
        });
    }

    cancel() {
        this.props.history.push(`/employees`);
    }

    render() {
        return (
            <div>
                <br></br>
                    <div className='card col-md-6 offset-md-3 mt-3'>
                        <h3 className='text-center'>View Employee Details</h3>
                        <div className='card-body'>
                            <div className='row'>
                                <label> Employee First Name: {this.state.employee.firstName}</label><p></p>
                            </div>

                            <div className='row'>
                                <label> Employee Last Name: {this.state.employee.lastName}</label><p></p>
                                
                            </div>

                            <div className='row'>
                                <label> Employee Email Id: {this.state.employee.emailId}</label>
                                
                            </div>
                            <button className='btn btn-danger mt-4' onClick={this.cancel.bind(this)} style = {{marginLeft: "10px"}}>Back</button>
                        </div>
                    </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;
*/

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ViewEmployeeComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    EmployeeService.getEmployeeById(id).then((res) => {
      setEmployee(res.data);
    });
  }, [id]);

  const cancel = () => {
    navigate('/employees');
  };

  return (
    <div>
      <br />
      <div className='card col-md-6 offset-md-3 mt-3'>
        <h3 className='text-center'>View Employee Details</h3>
        <div className='card-body'>
          <div className='row'>
            <label> Employee First Name: {employee.firstName}</label>
            <p></p>
          </div>

          <div className='row'>
            <label> Employee Last Name: {employee.lastName}</label>
            <p></p>
          </div>

          <div className='row'>
            <label> Employee Email Id: {employee.emailId}</label>
          </div>
          <button className='btn btn-danger mt-4' onClick={cancel} style={{ marginLeft: '10px' }}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeComponent;

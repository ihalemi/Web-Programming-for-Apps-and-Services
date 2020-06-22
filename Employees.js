import React from 'react';
import moment from 'moment';
import MainContainer from './MainContainer.js';

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.dataSource = this.props.dataSource;
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        fetch(this.dataSource)
        .then(res => res.json())
        .then(data => {
            this.setState({
                employees: data
            });
        }).catch(err => {
            console.log("Error");
        });
    }

    componentWillMount() {
    }

    render() {
        return (
            <div>
                <MainContainer sidebar={this.props.title}>
                <h1 className="page-header">{this.props.title}</h1>

                <div className="table-responsive overview-table">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name &amp; Position</th>
                                <th>Address</th>
                                <th>Phone Num</th>
                                <th>Hire Date</th>
                                <th>Salary Bonus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map((emp, index) => {
                                return (
                                    <tr>
                                        <td>{emp.FirstName} {emp.LastName} - {emp.Position.PositionName}</td>
                                        <td>{emp.AddressStreet} {emp.AddressState} {emp.AddressCity} {emp.AddressZip}</td>
                                        <td>{emp.PhoneNum} ext {emp.Extension}</td>
                                        <td>{moment(emp.HireDate).utc().format('LL')}</td>
                                        <td>$ {emp.SalaryBonus}</td>
                                    </tr>
                              )
                            })}
                        </tbody>
                    </table>
                </div>
                </MainContainer>
            </div>
        )
    }
}

export default Employees;
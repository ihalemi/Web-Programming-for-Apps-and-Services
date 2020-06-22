import React from 'react';
import MainContainer from './MainContainer.js';

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.dataSource = this.props.dataSource;
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        fetch(this.dataSource)
        .then(res => res.json())
        .then(data => {
            this.setState({
                teams: data
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
                                <th>Name</th>
                                <th>Projects</th>
                                <th>Employees</th>
                                <th>Team Lead</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.teams.map((team, index) => {
                                return (
                                    <tr>
                                        <td>{team.TeamName}</td>
                                        <td>
                                            {team.Projects.map((project, index) => {
                                                return (
                                                    <li key={index}>{project.ProjectName}</li>
                                                )
                                            })}
                                        </td>
                                        <td>{team.Employees.length} Employees</td>
                                        <td>{team.TeamLead.FirstName} {team.TeamLead.LastName}</td>
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

export default Teams;
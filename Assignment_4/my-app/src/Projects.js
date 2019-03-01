import React from 'react';
import moment from 'moment';
import MainContainer from './MainContainer.js';

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.dataSource = this.props.dataSource;
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        fetch(this.dataSource)
        .then(res => res.json())
        .then(data => {
            this.setState({
                projects: data
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
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.projects.map((project, index) => {
                                let endDate="";
                                if(project.ProjectEndDate == null) endDate="n/a";
                                else endDate = moment(project.ProjectEndDate).utc().format('LL');

                                let startDate = moment(project.ProjectStartDate).utc().format('LL');
                                return (
                                    <tr>
                                        <td>{project.ProjectName}</td>
                                        <td>{project.ProjectDescription}</td>
                                        <td>{startDate}</td>
                                        <td>{endDate}</td>
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

export default Projects;
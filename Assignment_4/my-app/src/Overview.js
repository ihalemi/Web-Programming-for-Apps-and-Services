import React from 'react';
import MainContainer from './MainContainer.js';
import ProjectsPanel from './ProjectsPanel.js';
import TeamsPanel from './TeamsPanel.js';
import EmployeesPanel from './EmployeesPanel.js';

class Overview extends React.Component {
    render() {
        let url = "https://quiet-crag-62906.herokuapp.com/";
        return (
            <MainContainer sidebar={this.props.title}>
                <h1 className="page-header">{this.props.title}</h1>
                <div className="row">
                    <div className="col-md-4">
                        <ProjectsPanel title="Projects" dataSource={url + "projects"}/>
                    </div>
                    <div className="col-md-4">
                        <TeamsPanel title="Teams" dataSource={url + "teams"}/>
                    </div>
                    <div className="col-md-4">
                        <EmployeesPanel title="Employees" dataSource={url + "employees"}/>
                    </div>
                </div>
            </MainContainer>
        )
    }
}

export default Overview;
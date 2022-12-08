import React from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function Workspace({ project, workspace, idx, screens }) {

    return (
        <div className='project' key={idx}>
            <p>{project.name}</p>
            <p>Platform: {project.platform}</p>
            <p># of Screens: {project.numberOfScreens}</p>
            <p># of Members: {project.numberOfMembers}</p>
            <p>Status: {project.status}</p>
            <button onClick={useNavigate('/project', {state: {workspace: {workspace}, project: {project}, screens: {screens}}})}>View</button>
        </div>
    )
};
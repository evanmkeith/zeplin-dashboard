import React from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function Project({ project, workspace, idx, screens }) {
    const navigate = useNavigate();
    const w = workspace.workspace;

    return (
        <div className='project' key={idx}>
            <p>{project.name}</p>
            <p>Platform: {project.platform}<br/># of Screens: {project.numberOfScreens}<br/># of Members: {project.numberOfMembers}<br/>Status: {project.status}</p>
            <button onClick={() => navigate('/project', {state: {workspace: {w}, project: {project}, screens: {screens}}})} className='project_buton'>View</button>
        </div>
    )
};
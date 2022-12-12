import React from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function Project({ project, workspace, idx, screens }) {
    const navigate = useNavigate();
    const w = workspace.workspace;
    const projectUrl = `https://app.zeplin.io/projects?pid=${project.id}`;

    console.log(screens);

    return (
        <div className='project' key={idx}>
            <a href={projectUrl} target='_blank' className='project-title_link'>{project.name}</a>
            <p>Platform: {project.platform}<br/># of Screens: {project.numberOfScreens}<br/># of Members: {project.numberOfMembers}<br/>Status: {project.status}</p>
            <button onClick={() => navigate('/project', {state: {workspace: {w}, project: {project}, screens: {screens}}})} className='project_buton'>View</button>
        </div>
    )
};
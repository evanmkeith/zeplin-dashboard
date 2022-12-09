import React from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function Workspace({ workspace, index }) {
    const logo = workspace.workspaceLogo !== null ? (<img src={workspace.workspaceLogo} width='25px'/>) : (<img src='https://cdn.sanity.io/images/wd3e2pma/production/7b336dc26fd85ae98b414761d58238d225876a88-60x48.svg' width='25px'/>);
    const navigate = useNavigate();

    console.log('workspace ',workspace);

    return (
        <div className='workspace' key={index}>
            {logo}
            <h4>{workspace.workspaceName}</h4>
            <button onClick={() => navigate('/workspace', {state:{workspace: {workspace}}})} className='workspace_button'>View</button>
        </div>
    )
};
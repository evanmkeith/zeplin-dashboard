import React from 'react'; 
import { NavLink } from 'react-router-dom';
import * as zeplinApi from '../../api/zeplin.service';

export default function Nav({ user }) {
    const avatar = user.avatar ? (<img src={user.avatar} width='25px'/>) : user.emotar ? user.emotar : (<img src='https://cdn.sanity.io/images/wd3e2pma/production/7b336dc26fd85ae98b414761d58238d225876a88-60x48.svg' width='25px'/>);

    return (
        <div id='navBar'>
            <h1>Zeplin Dashboard</h1>
            <div>
                <NavLink 
                    to='/'
                    >
                Home
                </NavLink>
                <NavLink 
                    to='/workspaces'
                    >
                Workspaces
                </NavLink>
            </div>
            <div>
             {avatar} 
            </div>
        </div>
    )
}
import React from 'react'; 
import { NavLink } from 'react-router-dom';
import * as zeplinApi from '../../api/zeplin.service';

export default function Nav() {

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
        </div>
    )
}
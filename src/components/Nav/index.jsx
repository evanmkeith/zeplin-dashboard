import React from 'react'; 
import { NavLink } from 'react-router-dom';
import * as zeplinApi from '../../api/zeplin.service';
import '../../styles/css/nav.css';

export default function Nav({ user }) {
    const avatar = user.avatar ? (<img className='nav-image' src={user.avatar} width='25px'/>) : user.emotar ? user.emotar : (<img className='nav-image' src='https://cdn.sanity.io/images/wd3e2pma/production/7b336dc26fd85ae98b414761d58238d225876a88-60x48.svg' width='25px'/>);

    return (
        <div id='navBar'>
            <div id='navBar_title'>
            <h2>Zeplin Dashboard</h2>
            </div>
            <div id='navBar_nav'>
                <div id='navBar_links'>
                    <NavLink 
                        style={{ textDecoration: 'none', color: 'black' }}
                        to='/'
                        >
                    Home
                    </NavLink>
                    <NavLink 
                        style={{ textDecoration: 'none', color: 'black' }}
                        to='/workspaces'
                        >
                    Workspaces
                    </NavLink>
                </div>
                {avatar} 
            </div>
        </div>
    )
}
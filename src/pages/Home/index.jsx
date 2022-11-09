import * as zeplinApi from '../../api/zeplin.service';
import _ from 'lodash';

import {
    useState, 
    useEffect
} from 'react';
import Notification from '../../components/Notification'
import { NotificationsApi } from '@zeplin/sdk/dist/apis/notifications-api';
const notificationTypes = {
    'Project' : ["workspace.project"], 
    'Styleguide': ["workspace.styleguide"], 
    'Extensions': ["project.extension","styleguide.extension" ], 
    'Membership': ["user.project_membership", "user.styleguide_membership"], 
    'Components': ["project.component", "styleguide.component"],
    'Colors': ["project.color", "styleguide.color"],
    'Comments': ["project.screen.note", "project.screen.note.comment"],
    'Screens': ["project.screen"],
    'Text Styles': ["project.text_style", "styleguide.text_style"],
    'Spacing Tokens': ["project.spacing_token", "styleguide.spacing_token"],
    'Jira Integration': ["project.screen.jira_integration", "project.jira_integration"],
    'Member': ["workspace.organization.member", "project.member", "styleguide.member"],
    'Slack Integration': ["project.slack_integration", "styleguide.slack_integration"],
    //'Flows': ["project.flow_board"]
}



export default function Home() {
    const [ notificationsFilterdByUser, setNotificationsFilterdByUser ] = useState([]);
    const [ notifications, setNotifications ] = useState([]);
    const [ offset, setOffset] = useState(0);
    const [ filter, setFilter ] = useState([]);
    const notificationActors = notifications == [] ? [] : _.uniq(notifications.map(notification => notification.actor.user.email));

    useEffect(() => {

        getAllNotifications(filter, offset);
        offset == 0 ? document.getElementById("prev-page-button").disabled = true : document.getElementById("prev-page-button").disabled = false;
    }, [filter, offset]);

    const getAllNotifications = async(filter, offset) => { 
        return zeplinApi.getAllNotifications(filter, offset).then((res) => {
            setNotifications(res);
            setNotificationsFilterdByUser(res);  
            res.length < 50 ? document.getElementById("next-page-button").disabled = true : document.getElementById("next-page-button").disabled = false;
        }).catch(err => console.log(err));
    };

    const handleChangeType = (e) => {
        e.preventDefault();
        const options = e.target.options;
        let value = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            value.push(notificationTypes[options[i].value]);
          }
        };
        return setFilter(value.flat());
    };

    const handleClearTypeSelected = (e) => {
        e.preventDefault();
        document.getElementById("type-form").reset();
        getAllNotifications();
    };

    const handleClearUserSelected =(e) => {
        e.preventDefault();
        document.getElementById("notification-users").reset();
        setNotificationsFilterdByUser(notifications);
    };

    const handleFilterUser = (e) => {
        e.preventDefault();
        const options = e.target.options;
        let value = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        };
        const filteredNotifications = notifications.filter(notification => value.includes(notification.actor.user.email));
        setNotificationsFilterdByUser(filteredNotifications);
    };

    const handleChangeOffset = (e, direction) => {
        e.preventDefault();
        if(direction == 'prev'){
            const newOffset = offset - 50;
            setOffset(newOffset);
        } else {
            const newOffset = offset + 50;
            setOffset(newOffset);
        };
    };
 
    console.log('offset ', offset, 'filter ', filter);

    return (
        <div> 
            <h2>Home</h2>
            <div>
                <form id='type-form' onChange={(e) => handleChangeType(e)}>
                    <label for="type">Choose a notification type:</label>
                    <select name="types" id="types" multiple size='10'>
                        {Object.keys(notificationTypes).map((type, idx) => {
                            return (<option value={type} key={idx}>{type}</option>)
                        })}
                    </select>
                    <button onClick={(e) => handleClearTypeSelected(e)}>Clear</button>
                </form>
                {notificationActors.length == 0 ? (<></>) : (
                    <form id='notification-users' onChange={(e)=> handleFilterUser(e)}>
                        <label for="user">Filter by user:</label>
                        <select name="users" id="users" multiple size='5'>
                            {notificationActors.map((type, idx) => {
                                return (<option value={type} key={idx}>{type}</option>)
                            })}
                        </select>
                        <button onClick={(e) => handleClearUserSelected(e)}>Clear</button>
                    </form>
                )}
            </div>
            <div> 
                <h3>Notifications</h3>
                <button id='prev-page-button' onClick={(e) => handleChangeOffset(e, 'prev')}>prev</button><button id='next-page-button' onClick={(e) => handleChangeOffset(e, 'next')}>next</button>
                <ol>
                    {notificationsFilterdByUser.length > 0 ? notificationsFilterdByUser.map((notification, idx) => {
                        return (
                            <Notification notification={notification} key={idx}/>
                        )
                    }) : (<li key='1'>Fetching</li>) }
                </ol>
            </div>
        </div>
    )

};
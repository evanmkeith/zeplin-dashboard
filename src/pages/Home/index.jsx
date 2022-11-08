import * as zeplinApi from '../../api/zeplin.service';
import _ from 'lodash';

import {
    useState, 
    useEffect
} from 'react';
import Notification from '../../components/Notification'
import { NotificationsApi } from '@zeplin/sdk/dist/apis/notifications-api';
const notificationTypes = [
    "workspace.project", 
    "workspace.styleguide",
    "project.extension", 
    "styleguide.extension",
    "user.project_membership",
    "user.styleguide_membership",
    "project.component",
    "styleguide.component",
    "project.color",
    "styleguide.color",
    "project.screen.note",
    "project.screen.note.comment", 
    "project.screen",
    "project.text_style",
    "styleguide.text_style",
    "project.spacing_token",
    "styleguide.spacing_token",
    "project.jira_attachment", 
    "project.screen_section.jira_attachment",
    "project.screen.jira_attachment", 
    "project.screen.jira_integration",
    "project.jira_integration",
    "workspace.organization.member", 
    "project.slack_integration", 
    "styleguide.slack_integration", 
    "project.member", 
    "styleguide.member",
    "project.flow_board"
];



export default function Home() {
    const [ notifications, setNotifications ] = useState([]);
    const [ offset, setOffset] = useState(0);
    const [ filter, setFilter ] = useState([]);
    const notificationActors = notifications == [] ? [] : _.uniq(notifications.map(notification => notification.actor.user.email));
    const filteredNotifications = notifications;

    useEffect(() => {
        getAllNotifications(filter, offset);
    }, [filter, offset]);

    const getAllNotifications = async(filter, offset) => { 
        return zeplinApi.getAllNotifications(filter, offset).then((res) => {
            setNotifications(res);
        })
    };

    const changeType = (e) => {
        const options = e.target.options;
        let value = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        };
        return setFilter(value);
    };

    const filterUser = () => {
        return 
    }
    console.log(notifications);
    console.log(notificationActors);
 
    return (
        <div> 
            <h2>Home</h2>
            <div>
                <form onChange={(e) => changeType(e)} >
                    <label for="type">Choose a notification type:</label>
                    <select name="types" id="types" multiple size='10'>
                        {notificationTypes.map((type, idx) => {
                            return (<option value={type} key={idx}>{type}</option>)
                        })}
                    </select>
                </form>
                <form>
                    <label for="user">Filter by user:</label>
                    <select name="users" id="users" multiple size='5'>
                        {notificationActors.map((type, idx) => {
                            return (<option value={type} key={idx}>{type}</option>)
                        })}
                    </select>
                </form>
            </div>
            <div> 
                <h3>Notifications</h3>
                <ol>
                    {notifications.length > 0 ? notifications.map((notification, idx) => {
                        return (
                            <Notification notification={notification} key={idx}/>
                        )
                    }) : (<li key='1'>Fetching</li>) }
                </ol>
            </div>
        </div>
    )

};
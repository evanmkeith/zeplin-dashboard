import * as zeplinApi from '../../api/zeplin.service';

import {
    useState, 
    useEffect
} from 'react';
import Notification from '../../components/Notification'

export default function Home() {
    const [ notifications, setNotifications ] = useState([]);

    useEffect(() => {
        getAllNotifications();
    }, []);

    const getAllNotifications = async() => { 
        return zeplinApi.getAllNotifications().then((res) => {
            setNotifications(res);
        })
    }

    console.log(notifications);
 
    return (
        <div> 
            <h2>Home</h2>
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
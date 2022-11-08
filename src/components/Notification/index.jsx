import moment from 'moment';

export default function Notifications({ notification, key }) {
    const types = {
        "workspace.project": 'project', 
        "workspace.styleguide": 'styleguide',
        "project.extension": 'project extension', 
        "styleguide.extension": 'styleguide extension',
        "user.project_membership": 'user',
        "user.styleguide_membership": 'user',
        "project.component": 'project component',
        "styleguide.component": 'styleguide component',
        "project.color": 'project color',
        "styleguide.color": 'styleguide color',
        "project.screen.note": 'comment',
        "project.screen.note.comment": 'annotation', 
        "project.screen": 'screen',
        "project.text_style": 'project text style',
        "styleguide.text_style": 'styleguide text style',
        "project.spacing_token": 'project spacing token',
        "styleguide.spacing_token": 'styleguide spacing token',
        "project.jira_attachment": 'Jira attachment', 
        "project.screen_section.jira_attachment": 'Jira attachement',
        "project.screen.jira_attachment": 'Jira attachment', 
        "project.screen.jira_integration" : 'Jira integration',
        "project.jira_integration": 'Jira integration',
        "workspace.organization.member": 'member', 
        "project.slack_integration": 'Slack integration', 
        "styleguide.slack_integration": 'Slack integration', 
        "project.member": 'project', 
        "styleguide.member": 'styleguide',
        "project.flow_board": 'flow board'
    };
    const actions = {
        'invited': 'invited',
        'role_updated': 'updated a role for',
        'removed': 'removed',
        'added': 'added',
        'joined': 'joined',
        'created': 'added',
        'updated': 'updated',
        'deleted': 'deleted',
        'version_created': 'added a new version of',
        'mentioned': 'mentioned',  
        'activated': 'activated',
        'archived': 'archived',
        'ownership_transferred': 'transferred the ownsership of',
        'resolved': 'resolved'
    };
    const userImage = notification.actor.user.avatar ? (<img src={notification.actor.user.avatar} width='25px'/>) : notification.actor.user.emotar ? notification.actor.user.emotar : (<img src='https://cdn.sanity.io/images/wd3e2pma/production/7b336dc26fd85ae98b414761d58238d225876a88-60x48.svg' width='25px'/>);
    const name = notification.actor.user.username.charAt(0).toUpperCase() + notification.actor.user.username.slice(1);
    const createdAt = moment.unix(notification.created).format("dddd, MMMM Do YYYY [at] h:mm a");
    const contextValues = notification.context ? Object.values(notification.context) : [];
    const contextKeys = notification.context ? Object.keys(notification.context) : [];
    const resourceValues = notification.resource ? Object.values(notification.resource) : [];
    const resourceKeys = notification.resource ? Object.keys(notification.resource) : [];

    const notificationContext = () => {
        const extra = contextValues.map((c, idx) => {
            const extra = c.extra ? c.extra : '';
            const extraKeys = Object.keys(extra);
            if(extra[extraKeys[0]].includes('public-cdn.zeplin.dev')){
                return (<p><a href={extra[extraKeys[0]]} target='_blank'>{contextKeys[idx]}:</a> <img src={extra[extraKeys[0]]} width='100px'/></p>)
            } else if(extra[extraKeys[0]].includes('http') && extra[extraKeys[0]].includes('[') && extra[extraKeys[0]].includes(']')){
                const destructuredSubStringText = extra[extraKeys[0]].match(/(?<=\[).+?(?=\])/g);
                const destructuredSubStringLink = extra[extraKeys[0]].match(/(?<=\().+?(?=\))/g);
                const strStart = extra[extraKeys[0]].substring(0, (extra[extraKeys[0]].indexOf('[') - 1));
                const strEnd = extra[extraKeys[0]].substring((extra[extraKeys[0]].indexOf(')') + 1), extra[extraKeys[0]].length);
                return (<p>{contextKeys[idx]}: {strStart} <a href={destructuredSubStringLink} target='_blank'>{destructuredSubStringText}</a> {strEnd}</p>)
            }
            return (<p>{contextKeys[idx]}: {extra[extraKeys[0]]}</p>)
        });
        return extra
    };

    const notificationResource = () => {
        const extra = resourceValues[0];
        
        return ''
    }

    return(
        <>
            <li key={key}>
                <p>{userImage} {name} <strong>{actions[notification.action]}</strong> a <strong>{types[notification.type] ? types[notification.type] : notification.type}</strong></p>
                {notificationContext() ? notificationContext() : (<></>)}
                <p>created: {createdAt}</p>
                <p></p>
            </li>
        </>
    )
}
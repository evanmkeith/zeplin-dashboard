import { 
    ZeplinApi, 
    Configuration 
  }  from "@zeplin/sdk";

const accessToken = import.meta.env.VITE_ZEPLIN_ACCESS_TOKEN;
const zeplin = new ZeplinApi(
    new Configuration({ 
      accessToken: accessToken
    })
  );

const getAllProjects = async() => {
    const projects = [];
    let data = []; 
    let i = 0;
    do {
        ({ data } = await zeplin.projects.getProjects({
          offset: i * 100,
          limit: 100,
        }));
        projects.push(...data);
        i += 1;
      } while (data.length === 100);
    return projects
};

const getAllNotifications = async() => {
    const { 
        data 
      } = await zeplin.notifications.getUserNotifications({
        limit: 50,
        offset: 0  
      });
    return data
};

const getAllWorkspaces = async() => {
  const { 
    data 
  } = await zeplin.organizations.getOrganizations(
    searchParams
  );

  return data
}
 
export {
    getAllProjects,
    getAllNotifications, 
    getAllWorkspaces
}
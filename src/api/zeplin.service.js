import axios from 'axios';
import fs from 'fs/promises';
import pLimit from 'p-limit';
import rateLimit from 'axios-rate-limit';
import { 
    ZeplinApi, 
    Configuration 
  }  from "@zeplin/sdk";

const http = rateLimit(axios.create(), { maxRequests: 200, perMilliseconds: 60000 });
const accessToken = import.meta.env.VITE_ZEPLIN_ACCESS_TOKEN;
const zeplin = new ZeplinApi(
    new Configuration({ 
      accessToken: accessToken
    }), 
    undefined,
    http,
  );
const dir = 'Screens'

const getUser = async() => {
  const { 
    data 
  } = await zeplin.users.getCurrentUser();
  return data
}

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

const getAllNotifications = async(filter, offset) => {
    const { 
        data 
      } = await zeplin.notifications.getUserNotifications({
        limit: 50,
        offset: offset,
        type: filter
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
}; 

const getProjectScreens = async(project) => {
  const { name: projectName, numberOfScreens } = project;

  const iterations = [...Array(Math.ceil(numberOfScreens / 100)).keys()];
  const screens = (await Promise.all(iterations.map(async (i) => {
    const { data } = await zeplin.screens.getProjectScreens(
      project.id,
      { offset: i * 100, limit: 100 },
    );
    return data;
  }))).flat();

  return screens.map((screen) => ({
    projectName,
    ...screen,
  }));
};

const getLatestScreenVersion = async(projectId, screenId) => {
  const { 
    data 
  } = await zeplin.screens.getLatestScreenVersion(
    projectId,
    screenId
  );

  return data
}; 

const downloadScreen = async (screen) => {
  const { name, image: { originalUrl }, projectName } = screen;
  const { data } = await axios.get(originalUrl, { 
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/png'
      }
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${dir}/${projectName}/${name}.png`); //or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch((error) => console.log(error));

  //, { responseType: 'stream' }

  // await fs.mkdir(`${dir}/${projectName}`, { recursive: true });
  // await fs.writeFile(`${dir}/${projectName}/${name}.png`, data);
  //return (`${dir}/${projectName}/${name}.png`, data)
};

const downloadAllScreens = async(screens) => {
  // await fs.rm(dir, { recursive: true, force: true });
  // await fs.mkdir(dir);

  const limit = pLimit(20);
  const downloadScreens = screens.map((screen) => limit(() => downloadScreen(screen)));

  return await Promise.all(downloadScreens);
}
 
export {
    getAllProjects,
    getAllNotifications, 
    getAllWorkspaces, 
    getUser,
    getProjectScreens,
    getLatestScreenVersion,
    downloadAllScreens
}
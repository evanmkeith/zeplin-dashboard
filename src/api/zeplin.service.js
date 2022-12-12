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
          status: 'active'
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
      link.setAttribute('download', `${dir}/${projectName}/${name}.png`); 
      document.body.appendChild(link);
      link.click();
    }).catch((error) => console.log(error));
};

const downloadAllScreens = async(screens) => {
  const limit = pLimit(1);
  const downloadScreens = screens.map((screen) => limit(() => downloadScreen(screen)));

  return await Promise.all(downloadScreens);
};

const downloadAsset = async({ name, url, filename }) => {
  return await axios.get(url, { 
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/png'
    }
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `/${name}/${filename}`); 
    document.body.appendChild(link);
    link.click();
  }).catch((error) => console.log(error));
};

const downloadProjectAssets = async(assets) => {
  const limit = pLimit(1);
  await assets.map((asset) => (limit(() => downloadAsset(asset))));
};

const getProjectAssetData = async (screen, projectId, formats) => {
  const { id, name } = screen;
  const { data } = await zeplin.screens
    .getLatestScreenVersion(projectId, id);
  return data.assets.flatMap(({ displayName, contents }) => {
    // remove any asset that are not in the formats defined in PROJECT_OPTIONS.formats
    const filteredContents = contents.filter((content) => (
      formats.includes(content.format)
    ));
    return filteredContents.map(({ url, format, density }) => ({
      name,
      url,
      filename: `${displayName.replaceAll('/', '-')}-${density}x.${format}`,
    }));
  });
};

export {
    getAllProjects,
    getAllNotifications, 
    getAllWorkspaces, 
    getUser,
    getProjectScreens,
    getLatestScreenVersion,
    downloadAllScreens, 
    getProjectAssetData, 
    downloadProjectAssets
}
import { getToken } from "../services/authService";
import { HttpMethod } from "../src/core/utils/types";
import axios, { Method } from 'axios';

export const dataBalkRobotEndpoints = {
    getUserDetails: "https://databalkrobotapi.azurewebsites.net/User/GetUserDetails/",
    getZaak: "https://databalkrobotapi.azurewebsites.net/Incident/GetIncidentById/",
    postZaak: "https://databalkrobotapi.azurewebsites.net/Incident/CreateIncident",
    getWeekClips: "https://databalkrobotapi.azurewebsites.net/WeekClip/GetWeekClipsForLicentie",
    getActiveZaken: "https://databalkrobotapi.azurewebsites.net/Incident/GetActiveIncidentsForClient/",
    getResolvedZaken: "https://databalkrobotapi.azurewebsites.net/Incident/GetResolvedIncidentsForClient/",
    getKnowledgeArticles: "https://databalkrobotapi.azurewebsites.net/KnowledgeArticle/GetKnowledgeArticles/t",
    getKnowledgeArticle: "https://databalkrobotapi.azurewebsites.net/KnowledgeArticle/GetKnowledgeArticleByPublicNumber/",
    postIncidentAnnotation: "https://databalkrobotapi.azurewebsites.net/Incident/CreateIncidentAnnotation",
};

// DataBalk Discovery Endpoint and Scopes
const dataBalkDiscovery = {
  authorizationEndpoint: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843/oauth2/v2.0/authorize',
  tokenEndpoint: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843/oauth2/v2.0/token',
};

const DATABALK_SCOPES = 'api://ddbce1b6-ea7d-408e-9b52-5eebe91cf895/read.data';

// Function to invoke DataBalk API
export const invokeDataBalkRobot = async <T>(
    endpoint: string,
    method: HttpMethod,
    body?: any
): Promise<T> => {
    try {
        const token = await getToken('dataBalk', DATABALK_SCOPES, dataBalkDiscovery);

        const response = await axios({
            url: endpoint,
            method: method as Method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: body ? JSON.stringify(body) : undefined,
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: T = response.data;
        return data;
    } catch (error: any) {
        console.error('Error in invokeDataBalkRobot:', error);
        throw error;
    }
};

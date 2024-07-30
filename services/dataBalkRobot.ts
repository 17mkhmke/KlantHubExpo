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
};

export const invokeDataBalkRobot = async <T>(
    endpoint: string,
    method: HttpMethod,
    body?: any
): Promise<T> => {
    try {
        const token = await getToken('dataBalk');
        console.log('Request details:', { endpoint, method, token });

        const response = await axios({
            url: endpoint,
            method: method as Method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: body ? JSON.stringify(body) : undefined,
        });

        console.log('Response status:', response.status);

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

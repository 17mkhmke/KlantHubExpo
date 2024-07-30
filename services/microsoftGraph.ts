import {HttpMethod} from './../src/core/utils/types'
export const graphConfig = {
    graphMe: "https://graph.microsoft.com/v1.0/me",
    graphMyPhoto: "https://graph.microsoft.com/v1.0/me/photo/$value",
    graphFindMeetingTimes: "https://graph.microsoft.com/v1.0/me/findMeetingTimes",
    graphScheduleMeeting: "https://graph.microsoft.com/v1.0/me/events",
    graphCalenderView: "https://graph.microsoft.com/v1.0/me/calendarview",
    scopes: {
        scopes: ["User.Read","Calendars.Read", "Calendars.Read.Shared", "Calendars.ReadWrite", "Calendars.ReadWrite.Shared", "openid", "profile", "offline_access", 'api://ddbce1b6-ea7d-408e-9b52-5eebe91cf895/read.data']
    }
};

export const invokeMsGraph = async <T>(
    accessToken: string,
    endpoint: string,
    method: HttpMethod,
    body?: any
): Promise<T> => {
    try {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;
        headers.append("Authorization", bearer);
        headers.append("Content-Type", "application/json");

        const requestOptions: RequestInit = {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(endpoint, requestOptions);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json() as T;
        return data;

    } catch (error: any) {
        console.error('Error fetching data:', error);
        throw error;

    }
}
import { getToken } from "../services/authService";
import { HttpMethod } from "../src/core/utils/types";

const ticketProxyDiscovery = {
  authorizationEndpoint: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843/oauth2/v2.0/authorize',
  tokenEndpoint: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843/oauth2/v2.0/token',
};

const TICKETPROXY_SCOPES = 'api://ddbce1b6-ea7d-408e-9b52-5eebe91cf895/read.data';
export const ticketProxyEndpoints = {
    getQuery: "https://databalk-ticket-proxy.azurewebsites.net/v1/devops/query/",
    getDevOpsCase: "https://databalk-ticket-proxy.azurewebsites.net/v1/devops/workitem",
};

export const invokeTicketProxy = async <T>(
    endpoint: string,
    method: HttpMethod,
    body?: any
): Promise<T> => {
    try {
        const token = await getToken('ticketProxy', TICKETPROXY_SCOPES, ticketProxyDiscovery);

        const headers = new Headers();
        headers.append("Content-Type", "application/json; charset=utf-8");
        headers.append("Authorization", `Bearer ${token}`);

        const requestOptions: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(endpoint, requestOptions);

        if (!response.ok) {
            const responseText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
        }

        const data: T = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error in invokeTicketProxy:', error);
        throw error;
    }
};

import { getToken } from "../services/authService";
import { HttpMethod } from "../src/core/utils/types";

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
        const token = await getToken('dataBalk');

        const headers = new Headers();
        headers.append("Content-Type", "application/json; charset=utf-8");
        headers.append("Authorization", `Bearer ${token}`);

        const requestOptions: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        };

        console.log('Request details:', { endpoint, method, headers: Object.fromEntries(headers) });

        const response = await fetch(endpoint, requestOptions);

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers));

        const responseText = await response.text();
        console.log('Response text:', responseText.substring(0, 200) + '...'); // Log first 200 chars

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
        }

        let data: T;
        try {
            data = JSON.parse(responseText) as T;
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            throw new Error('Failed to parse response as JSON');
        }

        return data;
    } catch (error: any) {
        console.error('Error in invokeTicketProxy:', error);
        throw error;
    }
};
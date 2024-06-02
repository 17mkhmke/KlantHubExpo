// import { getToken } from "../src/core/utils/functions";

// export const dataBalkRobotEndpoints = {
//   getUserDetails: "https://databalkrobotapi.azurewebsites.net/User/GetUserDetails/",
//   getZaak: "https://databalkrobotapi.azurewebsites.net/Incident/GetIncidentById/",
//   postZaak: "https://databalkrobotapi.azurewebsites.net/Incident/CreateIncident",
//   getWeekClips: "https://databalkrobotapi.azurewebsites.net/WeekClip/GetWeekClipsForLicentie",
// };

// export enum HttpMethod {
//   GET = 'GET',
//   POST = 'POST',
// }
// export const fetchUserDetails = async (token: string) => {
//     try {
//       const response = await fetch(dataBalkRobotEndpoints.getUserDetails, {
//         method: HttpMethod.GET,
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch user details');
//       }
  
//       const userDetails = await response.json();
//       return userDetails;
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//       throw error;
//     }
//   };
  
// export const invokeDataBalkRobot = async <T>(endpoint: string, method: HttpMethod, body?: any): Promise<T> => {
//   try {
//     const token = await getToken();

//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", `Bearer ${token}`);

//     const requestOptions: RequestInit = {
//       method,
//       headers,
//       body: body ? JSON.stringify(body) : undefined,
//     };

//     const response = await fetch(endpoint, requestOptions);

//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }

//     const contentLength = response.headers.get('content-length');
//     if (contentLength && parseInt(contentLength) === 0) {
//       throw new Error('Empty response');
//     }

//     const data = await response.json() as T;
//     return data;
//   } catch (error: any) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

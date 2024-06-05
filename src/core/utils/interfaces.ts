import { ImageSourcePropType } from "react-native";

export interface Appointment {
    name: string;
    role: string;
    email: string;
    link: string;
    image: ImageSourcePropType;
  }
  export interface UserData {
    id: string;
    fullname: string;
    surname?: string;
    displayName: string;
    givenName: string;
    company: string;
    customerId: string;
    jobTitle: string;
    mail: string;
    userPrincipalName: string | null;
    crmUserId: string;
    role: number;
    officeLocation?: string;
    licentie1?: string;
    licentie2?: string;
    licenties: string[];
    teamsChannelUrl?: string;
    testMonitorUrl?: string;
    plannerUrl?: string;
    sharePointUrl?: string;
    klantClipUrl?: string;
  }
  
import { ImageSourcePropType } from "react-native";

export interface Appointment {
    name: string;
    role: string;
    email: string;
    link: string;
    image: ImageSourcePropType;
  }
  export interface TimelineEntry {
    createdOn: Date;
    description: string;
    documentBody: string;
    fileName: string;
    isPortalReaction: boolean;
    mimeType: string;
    subject: string;
  }
  export interface Incident {
    incidentId: string;
    licentie?: string
    licentieId?: string
    medewerkerId: string;
    totalHoursSpent?: number
    behandelaar?: string;
    behandelaarPhoto?: string;
    accountId: string;
    type: number;
    onderwerp: string;
    beschrijving: string;
    fibo: number;
    prioriteit: number;
    melder: string;
    melderPhoto?: string;
    status: number;
    zaaknummer: string;
    gemaaktOp: Date;
    kenmerkKlant?: string | null;
    wachtdatum?: Date;
    wachtreden: number;
    reproduceerbaar: number | boolean;
    inDeWacht?: boolean;
    timelineEntries?: TimelineEntry[];
    leverancierId?: string;
    subLeverancierId?: string;
    stateCode?: number
}

export interface IncidentPage {
    count: number
    totalCount: number
    currentPage: number
    incidents: Incident[]
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
  export interface DevOpsQuery {
    name: string;
    path: string;
    dlm: string;
    fromDate: string;
    toDate: string;
    total: number,
    paged: boolean,
    totalPages: number,
    currentPage: number,
    totalItems: number,
    workItems: WorkItem[];
  }
  
  export interface Idea {
    ideeënnummer: string;
    onderwerp: string;
    klant: string;
    klantName: string;
    licentie: string;
    licentieName: string;
    actief: number;
  }
  
  export interface WorkItem {
    productName: string;
    id: number;
    title: string;
    state: string;
    type: string;
    dlm: string;
    releaseNotes: string;
    link: string;
    created: string;
    fibo: string;
    reporter: string;
    iteration: string;
    tags: string[];
    fullIteration: string;
    path?: string;
    iterationLevel3?: string
    assignedTo: {
      displayName: string;
      imageUrl: string;
    };
    omgeving: string;
    inrichtingnodig: string;
    description?: string
    testMonitor?: string
    databalkZaak?: string
    zaakNumber?: string
  }
  
  export interface WeekClip {
    week: string;
    youTubeUrl: string;
  }
  
  export interface GroupedData {
    [key: string]: WorkItem[];
  }
  export interface DBProduct {
    licentieId?: string;
    name: string;
    releaseNotesQueryId: string;
    routeKaartQueryId: string;
    featureQueryId?: string;
    color: string;
    logo: string;
    homeLink?: string;
    isActive?: boolean;
    devopsPath: string;
  }
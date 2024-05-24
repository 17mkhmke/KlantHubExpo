import { ImageSourcePropType } from "react-native";

export interface Appointment {
    name: string;
    role: string;
    email: string;
    link: string;
    image: ImageSourcePropType;
  }
  
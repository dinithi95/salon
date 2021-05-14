import {Service} from "../service/Service";

export interface Appointment {
  id: string;
  nic: string;
  name: string;
  email: string;
  mobile: string;
  code: string;
  date: string;
  start: string;
  end: string;
  cost: string;
  status: string;
  services: Service[];
}

import { ObjectId } from "mongodb";

interface AppointmentRequest {
  _id?: ObjectId;
  userName: string;
  userPet: string;
  requestDate: string;
  requestTime: string;
  requestReason: string;
}

export default AppointmentRequest;

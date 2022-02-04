import { ObjectId } from "mongodb";
import MedicalRecord from "./MedicalRecord";

interface Pet {
  _id?: ObjectId;
  ownerId: ObjectId;
  petFirstName: string;
  petLastName: string;
  species: string;
  breed: string;
  color: string;
  sex: string;
  dateOfBirth: string;
  isFixed: boolean;
  weight: number;
  diet: string;
  picture: string;
  medicalRecords: MedicalRecord[];
}

export default Pet;

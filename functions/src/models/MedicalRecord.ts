import { ObjectId } from "mongodb";

interface MedicalRecord {
  _id?: ObjectId;
  path: string;
}

export default MedicalRecord;

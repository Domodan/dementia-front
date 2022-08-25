import { database } from "../lib/init-firebase";
import { collection } from "firebase/firestore";


export const dataCollectionRef = collection(database, 'location');
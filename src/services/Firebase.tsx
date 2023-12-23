import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { database } from '../config/firebase'

const collectionRef = collection(database, 'repos')

export const show = async (uid: string) => {
  try {
    const docRef = doc(collectionRef, uid)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  } catch (error) {
    console.error('Database Error: Failed to retrieve record.')
  }
}

export const create = async (uid: string) => {
  const repository = {
    uid,
    movies: [],
    createdAt: serverTimestamp(),
    lastUpdate: serverTimestamp(),
  }

  try {
    const repositoryRef = doc(collectionRef, uid)
    await setDoc(repositoryRef, repository)
  } catch (error) {
    console.error('Database Error: Failed to create new database.')
  }
}

export const update = async (data: object[], uid: string) => {
  const updatedRef = {
    movies: data,
    lastUpdate: serverTimestamp(),
  }

  try {
    const repositoryRef = doc(collectionRef, uid)
    await updateDoc(repositoryRef, updatedRef)
  } catch (error) {
    console.error('Database Error: Failed to update record.')
  }
}

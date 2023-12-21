import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore'
import { database } from '../config/firebase'

const collectionRef = collection(database, 'repos')

const create = async (uid: string) => {
  const repository = {
    uid,
    createdAt: serverTimestamp(),
    lastUpdate: serverTimestamp(),
  }

  try {
    const repositoryRef = doc(collectionRef, repository.uid)
    await setDoc(repositoryRef, repository)
  } catch (error) {
    console.error(error)
  }
}

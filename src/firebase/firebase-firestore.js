import {collection} from 'firebase/firestore'
import {db} from './firebase.utils'


export const getCollection = () => {
    return collection(db,'usercart');
}
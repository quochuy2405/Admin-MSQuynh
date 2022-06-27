// Import the functions you need from the SDKs you need
// import { Student } from '@/types/interface'
import type { Course, loginUser, Student } from '@/types/interface'
import { initializeApp } from 'firebase/app'
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore/lite'
import { doc, setDoc } from 'firebase/firestore/lite'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore/lite'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const googleAuthProvider = new GoogleAuthProvider()
const facebookAuthProvider = new FacebookAuthProvider()

googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')
facebookAuthProvider.addScope('user_birthday')
const firebaseConfig = {
  apiKey: 'AIzaSyCA4AHCUbDbF0fpXQ3n2qcp4VQ96Y9gS4A',
  authDomain: 'msquynh-f8e52.firebaseapp.com',
  projectId: 'msquynh-f8e52',
  storageBucket: 'msquynh-f8e52.appspot.com',
  messagingSenderId: '364826220169',
  appId: '1:364826220169:web:75493c83fca750786dd858',
  measurementId: 'G-TLV1LQPMZ7'
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage()
const db = getFirestore(app)

// Get a list of courses from your database
const coursesConverter: FirestoreDataConverter<Course> = {
  toFirestore(post: Course): DocumentData {
    return { ...post }
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): Course {
    return docSnap.data() as Course
  }
}
const getCourses = async () => {
  const courses = collection(db, 'courses').withConverter(coursesConverter)
  const coursesSnapshot = await getDocs(courses)
  const coursesList = coursesSnapshot.docs.map((doc) => doc.data())
  const listCourses: Array<Course> = coursesList.reduce((list: Array<Course>, itemCurrent) => {
    return [...list, itemCurrent]
  }, [])
  return listCourses
}
// checkIdUser
const checkIdUser = async (id: string) => {
  const queryCheckUser = query(collection(db, 'accounts'), where('user_id', '==', id))
  const studentIsExit = await getDocs(queryCheckUser)
  if (studentIsExit.size) {
    return studentIsExit.docs[0].id
  }
  return null
}
// G
// Get a list of users from your database
const getUser = async (user: loginUser) => {
  const queryCheckUser = query(collection(db, 'accounts'), where('username', '==', user.username), where('password', '==', user.password))
  const studentIsExit = await getDocs(queryCheckUser)
  if (studentIsExit.size) {
    return studentIsExit.docs[0].id
  }
  return null
}
// Get a list student by class code  from your database
const studentConverter: FirestoreDataConverter<Student> = {
  toFirestore(post: Student): DocumentData {
    return { ...post }
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): Student {
    return docSnap.data() as Student
  }
}
// get Student by class code
const getStudentsByClassCode = async (classCode: string) => {
  try {
    if (classCode) {
      const courses = query(collection(db, 'students'), where('class_code', '==', classCode)).withConverter(studentConverter)
      const citySnapshot = await getDocs(courses)
      const cityList = citySnapshot.docs.map((doc) => doc.data())
      const list: Array<Student> = cityList.reduce((list: Array<Student>, itemCurrent) => {
        return [...list, itemCurrent]
      }, [])
      return list
    }
    return []
  } catch (error) {
    return []
  }
}
// upload and store image
const uploadImage = async (image: any) => {
  if (image) {
    const UploadTask = ref(storage, `imageProducts/${image.name}`)
    return await uploadBytes(UploadTask, image).then((snapshot) => {
      return snapshot.metadata.fullPath
    })
  }
}
const autoGenerateId = () => {
  return 'QH' + Date.now()
}
// create courses
const createCourse = async (course: Course) => {
  try {
    if (!course) {
      return false
    }
    const queryCheckcourse = query(collection(db, 'courses'), where('class_code', '==', course.class_code))
    const courseIsExit = await getDocs(queryCheckcourse)
    if (!courseIsExit.size) {
      const cityRef = doc(db, 'courses', course.class_code + autoGenerateId())
      await setDoc(cityRef, course)
      return true
    } else {
      return null
    }
  } catch (e) {
    return false
  }
}

export { getCourses, getUser, getStudentsByClassCode, uploadImage, createCourse, checkIdUser, storage }

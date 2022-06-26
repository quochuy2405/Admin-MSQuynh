interface Course {
  name: string
  description?: string
  max_vol?: number
  current_vol?: string
  class_code: string
  thumbnail?: string
  level: number
  date_open?: string
}
interface Student {
  name: string
  birth_day: string
  phone_number: string
  class_code: string
  email: string
  user_id: string
}
interface loginUser {
  username: string
  password: string
}
interface User {
  [x: string]: unknown
  userId: string | null
  name: string | null
}

interface ImageType {
  alt: string | undefined
  src: string | any
  width?: string | number | undefined
  height?: string | number | undefined
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | 'raw' | undefined
}
export type { Student, Course, User, ImageType, loginUser }

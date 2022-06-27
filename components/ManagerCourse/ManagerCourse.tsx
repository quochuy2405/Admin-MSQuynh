import { AppCtx } from '@/Context/GlobalContext'
import { getCourses } from '@/firebase'
import type { Course } from '@/types/interface'
import React, { useContext, useEffect, useState } from 'react'
import { ListCourse } from '../Courses'
import Styles from '@/components/ManagerCourse/ManagerCourse.module.scss'
function ManagerCourse() {
  const [listCourse, setListCourse] = useState<Array<Course>>()
  const { setLoadingCourse } = useContext(AppCtx)
  useEffect(() => {
    const fetch = async () => {
      const listCourse = await getCourses()
      if (listCourse) setListCourse(listCourse)
      else setListCourse([])
      setLoadingCourse(true)
    }
    fetch()
  }, [listCourse?.length])
  return (
    <div>
      <h1 className={Styles.title}>Quảng lý khóa học</h1>
      <ListCourse list={listCourse} />
    </div>
  )
}

export default ManagerCourse

/* eslint-disable prefer-spread */
import { AppCtx } from '@/Context/GlobalContext'
import type { Course as TCourse } from '@/types/interface'
import { Box, Skeleton } from '@mui/material'
import { useContext } from 'react'
import Course from './Course'
import Styles from './ListCourse.module.scss'

interface ListCourses {
  size?: number
  list?: Array<TCourse>
}

function ListCourse({ size, list }: ListCourses): JSX.Element {
  const { loadingCourse } = useContext(AppCtx)
  return (
    <div className={Styles.listCourse}>
      {!loadingCourse
        ? Array.apply(null, Array(3)).map((item, index) => (
            <Box key={Date.now() + index}>
              <Skeleton variant="rectangular" width={345} height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          ))
        : list?.slice(0, size)?.map((item) => <Course {...item} key={item.name + item.description} />)}
    </div>
  )
}

export default ListCourse

/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { storage } from '@/firebase'
import type { Course as TCourse } from '@/types/interface'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Styles from './Course.module.scss'

const link = 'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2019/10/23170637/Graphic-Design-Courses.jpg'

function Course(course: TCourse): JSX.Element {
  const router = useRouter()
  const [url, setUrl] = useState('')
  useEffect(() => {
    getDownloadURL(ref(storage, `imageProducts/${course?.thumbnail}`))
      .then((url: string) => setUrl(url))
      .catch(() => {
        return ''
      })
  }, [course])

  return (
    <Card className={Styles.course}>
      <CardActionArea>
        <CardMedia defaultValue={link} component="img" height="140" image={url || link} alt={course?.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course?.description}
            <div className={Styles.contentNumber}>
              <p>
                Số lượng:{course?.current_vol}/{course?.max_vol}
              </p>
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Course

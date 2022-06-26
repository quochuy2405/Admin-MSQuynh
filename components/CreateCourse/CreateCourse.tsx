/* eslint-disable @next/next/no-img-element */
import { Button, IconButton, Input, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoCameraSharp } from 'react-icons/io5'
import Styles from '@/components/CreateCourse/CreateCourse.module.scss'
import Image from 'next/image'
import { createCourse, uploadImage } from '@/firebase'
import type { Course } from '@/types/interface'
import { useSnackbar } from 'notistack'

function CreateCourse(): JSX.Element {
  const [fileImage, setFileImage] = useState<any>()
  const { enqueueSnackbar } = useSnackbar()
  const [course, setCourse] = useState<Course>({
    name: '',
    class_code: '',
    level: 0,
    current_vol: '0',
    max_vol: 0,
    date_open: '',
    description: '',
    thumbnail: ''
  })

  const showImageCover = async (event: React.ChangeEvent<HTMLInputElement | any>) => {
    if (event) {
      const file = event.target.files[0]

      if (file) {
        const fileType = file['type']
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
        if (!validImageTypes.includes(fileType)) {
          console.log('sai định dạng')
          setFileImage(undefined)
        } else {
          if (file) {
            file.preview = URL.createObjectURL(file)

            setFileImage(file)
          }
        }
      }
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourse({ ...course, [event.target.name]: event.target.value })
  }
  const submitFrom = async () => {
    if (course.class_code && course.date_open && course.date_open && course.level && course.thumbnail && course.max_vol) {
      const isUpload = await uploadImage(fileImage)
      if (isUpload) {
        const isCreate = await createCourse(course)
        if (isCreate) {
          enqueueSnackbar('Tạo khóa học thành công', { variant: 'success' })
        } else {
          enqueueSnackbar('Tạo khóa học thất bại', { variant: 'error' })
        }
      } else {
        enqueueSnackbar('Lỗi tải ảnh', { variant: 'error' })
      }
    } else {
      enqueueSnackbar('Không được bỏ thông tin *', { variant: 'warning' })
    }
  }
  useEffect(() => {
    if (fileImage) setCourse({ ...course, thumbnail: fileImage?.name })
  }, [fileImage])

  return (
    <>
      <p className={Styles.titleCreateCourse}>Tạo khóa học</p>
      <div className={Styles.overScroll}>
        <div className={Styles.createCourse}>
          <TextField
            value={course.class_code}
            required
            name="class_code"
            label="Mã lớp"
            variant="outlined"
            fullWidth
            onChange={(e) => onChangeInput(e)}
          />
          <TextField value={course.name} required name="name" label="Tên lớp" variant="outlined" fullWidth onChange={(e) => onChangeInput(e)} />
          <TextField value={course.level} required name="level" label="Lớp" variant="outlined" fullWidth onChange={(e) => onChangeInput(e)} />
          <TextField
            value={course.date_open}
            name="date_open"
            label="Thời gian khai giảng"
            variant="outlined"
            fullWidth
            onChange={(e) => onChangeInput(e)}
          />
          <TextField
            value={course.max_vol}
            required
            name="max_vol"
            label="Số lượng học sinh tối đa"
            variant="outlined"
            fullWidth
            onChange={(e) => onChangeInput(e)}
          />
          <TextareaAutosize
            className={Styles.textDescription}
            placeholder="Mô tả"
            aria-label="minimum height"
            style={{ width: '100%' }}
            minRows={4}
            maxRows={10}
            value={course.description}
            name="description"
            onChange={(e) => onChangeInput(e)}
          />

          <div className={Styles.imageCover} style={{ width: '100%', minHeight: '200px' }}>
            <label htmlFor="icon-button-file" className={Styles.btnImageCover}>
              <input accept={'image/*'} id="icon-button-file" type="file" style={{ display: 'none' }} onChange={(e) => showImageCover(e)} />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <IoCameraSharp />
              </IconButton>
            </label>
            {fileImage && <img src={fileImage?.preview} alt="anh" />}
          </div>
          <Button variant="contained" style={{ padding: '10px', fontSize: '1.1rem', fontWeight: '600' }} onClick={() => submitFrom()} fullWidth>
            Tạo khóa học
          </Button>
        </div>
      </div>
    </>
  )
}

export default CreateCourse

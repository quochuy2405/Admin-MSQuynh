import { Metadata, Table } from '@/components'
import { getCourses } from '@/firebase'
import Styles from '@/styles/pages/admin.module.scss'
import type { Course } from '@/types/interface'
import type { NextPage } from '@/types/next'
import TreeItem from '@mui/lab/TreeItem'
import TreeView from '@mui/lab/TreeView'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TbChevronDown, TbChevronRight } from 'react-icons/tb'
const Admin: NextPage = (): JSX.Element => {
  const router = useRouter()
  const [listClass, setListClass] = useState<Array<Course>>()
  const [listLevel, setListLevel] = useState<Array<string>>([])
  const [classCurrent, setClassCurrent] = useState<Course>()
  const fetch = async () => {
    const classes = await getCourses()
    if (classes) {
      setListClass(classes)
      const uniqueLevel = [...new Set(classes.map((item) => item.level.toString()))]
      const listLevelName = uniqueLevel.reduce((list: Array<string>, itemCurrent: string) => {
        return [...list, itemCurrent]
      }, [])
      setListLevel(listLevelName)
    }
  }
  useEffect(() => {
    const userId = window.localStorage.getItem('idUser')
    if (!userId) {
      router.push('/')
    } else {
      fetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listClass?.length])

  //set classcode
  const onSetClassCode = (course: Course) => {
    setClassCurrent(course)
  }
  return (
    <>
      <Metadata title="Trang chủ - Learning Code" description="Trang chủ - Learning Code" />
      <div className={Styles.admin}>
        <TreeView
          className={Styles.navTree}
          aria-label="file system navigator"
          defaultCollapseIcon={<TbChevronDown />}
          defaultExpandIcon={<TbChevronRight />}
          sx={{ height: 500, flexGrow: 1, overflowY: 'auto' }}
        >
          <TreeItem nodeId="0_danhsach" label="Tổng quan">
            <TreeItem nodeId="1_khoahoc" label="Tạo khóa học" />
          </TreeItem>
          {listLevel?.map((level) => (
            <TreeItem key={level} nodeId={level} label={`Lớp ${level}`}>
              {listClass?.map(
                (classItem) =>
                  classItem &&
                  level == classItem.level.toString() && (
                    <TreeItem
                      key={classItem.class_code}
                      nodeId={`${level + classItem.class_code}`}
                      label={classItem.class_code}
                      onClick={() => onSetClassCode(classItem)}
                    />
                  )
              )}
            </TreeItem>
          ))}
        </TreeView>

        <div className={Styles.bodyView}>
          <p>Danh sách lớp</p>
          {classCurrent && <Table course={classCurrent} />}
        </div>
      </div>
    </>
  )
}

export default Admin

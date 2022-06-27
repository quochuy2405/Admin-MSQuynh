import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { MdDelete } from 'react-icons/md'
import { BsCheck2Circle } from 'react-icons/bs'
import { RiCloseCircleLine } from 'react-icons/ri'
import { getStudentsByClassCode, updateStatusRegisterById } from '@/firebase'
import type { Course, Student } from '@/types/interface'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { TbTableExport } from 'react-icons/tb'
import Styles from '@/styles/pages/admin.module.scss'
import { useSnackbar } from 'notistack'
import { AppCtx } from '@/Context/GlobalContext'

const actions = [{ icon: <TbTableExport />, name: 'Print' }]
export default function BasicTable({ course }: { course: Course }) {
  const [students, setStudents] = useState<Array<Student>>([])
  const [studentFillter, setStudentFillter] = useState<Array<Student>>([])
  const [open, setOpen] = useState(false)
  const { refresh, setRefresh } = useContext(AppCtx)
  const { enqueueSnackbar } = useSnackbar()
  const [filter, setFilter] = useState(0)
  // handle Close snackbar
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  // get Students By ClassCode
  useEffect(() => {
    const fetch = async () => {
      const listStudent = await getStudentsByClassCode(course?.class_code)

      setStudents(listStudent)
    }
    fetch()
  }, [course?.class_code, filter, refresh])
  // switch filter
  useEffect(() => {
    switch (filter) {
      case 0: {
        setStudentFillter(students)
        break
      }
      case 1: {
        const list = students?.filter((item) => item?.status == 0)
        setStudentFillter(list)

        break
      }
      case 2: {
        const list = students?.filter((item) => item?.status == 1)
        setStudentFillter(list)
        break
      }
      default: {
        setStudentFillter(students)
      }
    }
  }, [filter, students])
  //copy To Clipboard
  function copyToClipboard(text: string) {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(text)
    setOpen(true)
  }
  // accept  student by update status code
  const onChangeStatus = async (student: Student, value: number) => {
    const result = await updateStatusRegisterById(student, value)

    if (result) {
      const message = value ? 'Đã xác nhận thông tin' : 'Đã chuyển đổi trạng thái'
      enqueueSnackbar(message, { variant: 'success' })
      setRefresh((e) => !e)
    } else {
      enqueueSnackbar('Hú hú có lỗi xảy ra :((', { variant: 'error' })
    }
  }
  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Đã copy
        </Alert>
      </Snackbar>
      <b>Số lượng học sinh: 2/30</b>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '20px' }}>
        <b>Hiển thị:</b>
        <FormControlLabel onClick={() => setFilter(1)} control={<Checkbox checked={filter === 1} />} label="Đang chờ" />
        <FormControlLabel onClick={() => setFilter(2)} control={<Checkbox checked={filter === 2} />} label="Đã xác nhận" />

        <FormControlLabel
          onClick={() => setFilter(0)}
          control={
            <IconButton style={{ color: '#ff2828e0' }} aria-label="delete" size="small">
              <RiCloseCircleLine size={20} />
            </IconButton>
          }
          label="Bỏ lọc"
        />
      </div>
      <TableContainer style={{ height: '100vh' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ position: 'sticky', backgroundColor: 'white', top: '0', zIndex: '99' }}>
            <TableRow>
              <TableCell>Mã lớp</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Tên học viên</TableCell>
              <TableCell>Số điện thoại </TableCell>
              <TableCell>Ngày sinh </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ngày đăng ký </TableCell>
              <TableCell>Xác nhận</TableCell>
              <TableCell>Hủy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ paddingTop: '100px' }}>
            {studentFillter?.map((student) => (
              <TableRow key={student?.class_code + student?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <Tooltip title={`Copy: ${student?.class_code}`}>
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(student?.class_code.toString())}>
                    {student?.class_code}
                  </TableCell>
                </Tooltip>
                <Tooltip title={`Copy: ${course?.name}`}>
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(course?.name)}>
                    <p className={Styles.textOver}>{course?.name}</p>
                  </TableCell>
                </Tooltip>
                <Tooltip title={`Copy: ${course?.name}`}>
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(student?.name)}>
                    {student?.name}
                  </TableCell>
                </Tooltip>
                <Tooltip title={`Copy: ${student?.phone_number}`}>
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(student?.phone_number)}>
                    {student?.phone_number}
                  </TableCell>
                </Tooltip>
                <Tooltip title={`Copy: ${student?.birth_day.toString()}`}>
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(student?.birth_day.toString())}>
                    <p className={Styles.textOver}> {student?.birth_day.toString()}</p>
                  </TableCell>
                </Tooltip>
                <Tooltip title={`Copy: ${student?.email}`}>
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(student?.email)}>
                    <p className={Styles.textOver}>{student?.email}</p>
                  </TableCell>
                </Tooltip>
                <Tooltip title={`Copy: ${student?.created_date}`}>
                  <TableCell>
                    <p className={Styles.textOver}>{student?.created_date}</p>
                  </TableCell>
                </Tooltip>
                <TableCell>
                  {!student?.status ? (
                    <Button
                      onClick={() => onChangeStatus(student, 1)}
                      disableFocusRipple={student?.status > 0}
                      disabled={student?.status > 0}
                      color="success"
                      variant="outlined"
                      startIcon={<BsCheck2Circle />}
                    >
                      Xác nhận
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onChangeStatus(student, 0)}
                      disabled={student?.status == 0}
                      color="warning"
                      variant="outlined"
                      startIcon={<BsCheck2Circle />}
                    >
                      Hoàn tác
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Button color="error" variant="outlined" startIcon={<MdDelete />}>
                    Hủy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'absolute', transform: 'translateZ(10px)', flexGrow: 1, bottom: 50, right: 50 }}>
        <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', bottom: 16, right: 0 }} icon={<SpeedDialIcon />}>
          {actions.map((action) => (
            <SpeedDialAction key={action?.name} icon={action?.icon} tooltipTitle={action?.name} />
          ))}
        </SpeedDial>
      </Box>
    </>
  )
}

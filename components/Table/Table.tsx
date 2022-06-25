import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { MdDelete } from 'react-icons/md'
import { getStudentsByClassCode } from '@/firebase'
import type { Course, Student } from '@/types/interface'
import { Alert, Box, Button, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import { TbTableExport } from 'react-icons/tb'
import Styles from '@/styles/pages/admin.module.scss'

const actions = [{ icon: <TbTableExport />, name: 'Print' }]
export default function BasicTable({ course }: { course: Course }) {
  const [students, setStudents] = useState<Array<Student>>([])
  const [open, setOpen] = useState(false)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  useEffect(() => {
    const fetch = async () => {
      const listStudent = await getStudentsByClassCode(course?.class_code)
      setStudents(listStudent)
    }
    fetch()
  }, [course?.class_code])

  //copy To Clipboard
  function copyToClipboard(text: string) {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(text)
    setOpen(true)
  }
  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Đã copy
        </Alert>
      </Snackbar>
      <b>Số lượng học sinh: 2/30</b>
      <TableContainer style={{ height: '100vh' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ position: 'sticky', backgroundColor: 'white', top: '0' }}>
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
            {students.map((row) => (
              <TableRow key={row?.user_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <Tooltip title="Copy">
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(row.class_code.toString())}>
                    {row.class_code}
                  </TableCell>
                </Tooltip>
                <Tooltip title="Copy">
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(course?.name)}>
                    {course?.name}
                  </TableCell>
                </Tooltip>
                <Tooltip title="Copy">
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(row?.name)}>
                    {row?.name}
                  </TableCell>
                </Tooltip>
                <Tooltip title="Copy">
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(row?.phone_number)}>
                    {row?.phone_number}
                  </TableCell>
                </Tooltip>
                <Tooltip title="Copy">
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(row.birth_day)}>
                    {row.birth_day}
                  </TableCell>
                </Tooltip>
                <Tooltip title="Delete">
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(row?.email)}>
                    <p className={Styles.textOver}>{row?.email}</p>
                  </TableCell>
                </Tooltip>
                <TableCell>
                  <p className={Styles.textOver}>{`${new Date(Date.now())}`}</p>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<MdDelete />}>
                    Xác nhận
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<MdDelete />}>
                    Hủy đăng ký
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
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
          ))}
        </SpeedDial>
      </Box>
    </>
  )
}

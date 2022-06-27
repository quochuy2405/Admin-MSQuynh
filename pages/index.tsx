import { Metadata } from '@/components'
import { checkIdUser, getUser } from '@/firebase'
import Styles from '@/styles/pages/index.module.scss'
import type { loginUser } from '@/types/interface'
import type { NextPage } from '@/types/next'
import type { SnackbarOrigin } from '@mui/material'
import { Alert, Button, Container, Snackbar, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface State extends SnackbarOrigin {
  open: boolean
}

const Home: NextPage = (): JSX.Element => {
  const router = useRouter()
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right'
  })
  const { vertical, horizontal, open } = state
  const [user, setUser] = useState<loginUser>({
    username: '',
    password: ''
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const onLogin = async () => {
    const idUser = await getUser(user)
    if (idUser) {
      window.localStorage.setItem('idUser', 'quochuy2001' + idUser)
      router.push('/admin')
    } else {
      setState({ ...state, open: true })
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const id = window.localStorage.getItem('idUser') || ''

      if (id.startsWith('quochuy2001')) {
        router.push('/admin')
      }
    }
    fetch()
  }, [])

  const handleClose = () => {
    setState({ ...state, open: false })
  }
  return (
    <>
      <Metadata title="Trang chủ - Learning Code" description="Trang chủ - Learning Code" />
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Lỗi đăng nhập
        </Alert>
      </Snackbar>
      <div className={Styles.container}>
        <p className={Styles.title}>Ô mai gút chào mừng đến với MS.Quynh</p>
        <div className={Styles.formLogin}>
          <p className={Styles.titleLogin}>Đăng nhập</p>

          <TextField
            value={user.username}
            required
            id="outlined-required"
            name="username"
            label="Tên đăng nhập"
            fullWidth
            onChange={(e) => onChange(e)}
          />

          <TextField value={user.password} required id="outlined-required" name="password" label="Mật khẩu" fullWidth onChange={(e) => onChange(e)} />

          <Button variant="contained" style={{ padding: '10px', fontSize: '1.1rem', fontWeight: '600' }} onClick={() => onLogin()} fullWidth>
            Đăng nhập
          </Button>
          <p className={Styles.copyRight}>© 2022HuyPui</p>
        </div>
      </div>
    </>
  )
}

export default Home

import React, { useEffect, useState } from 'react';
import '../main.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import MainLogo from '../assets/images/MainLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../modules/auth';



const ResponsiveAppBar = () => {


  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }

  useEffect(()=>{
      window.addEventListener('scroll', updateScroll);
  });

  // redux에서 변수 얻기
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const loginNum = useSelector(state => state.auth.user.num);
  const loginName = useSelector(state => state.auth.user.name);
  const loginProfile = useSelector(state => state.auth.user.profile);
  const loginType = useSelector(state => state.auth.user.type);

  const pages = ['여행지', '인기 일정', 'About'];
  const pageLinks = ['city/list', 'plan/list', ''];

  const loginSettings = ['Mypage', 'Schedule ', 'Logout'];
  const loginLinks = ['mypage/1', 'dashboard','logout'];

  const logoutSettings = ['Login', 'Join'];
  const logoutLinks = ['login', 'join'];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navi = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
   
//카카오톡 로그아웃

const KakaoLogout = () => {
  if (window.Kakao.Auth.getAccessToken()) {
    window.Kakao.API.request({
      url: '/v1/user/unlink',
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
    alert('로그아웃이 완료되었습니다.');
    window.Kakao.Auth.setAccessToken(undefined);
    navi("/");
  }
};



  // 헤더 숨기기
  if ((window.location.pathname.startsWith('/plan')) && !window.location.pathname.startsWith('/plan/list')) return null;

  // if ((window.location.pathname == '/') && (window.scrollY <= 50)) return null;

  if ((window.location.pathname == '/')) return null;

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={MainLogo} alt='' style={{width:'60px'}}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <Link to={`/${pageLinks[index]}`} key={index}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Link to={`/${pageLinks[index]}`} key={index}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {
                  isLoggedIn && loginType == 2 && <Avatar alt={loginName} src={loginProfile} />
                }
                {
                  isLoggedIn && loginType == 1 && <Avatar alt={loginName} src={`${process.env.REACT_APP_SPRING_URL}save/${loginProfile}`} />
                }
                {
                  !isLoggedIn && <Avatar src="/static/images/avatar/2.jpg" />
                }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appFbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
                // 로그인 상태의 메뉴
                isLoggedIn && loginSettings.map((setting,index) => (
                  <MenuItem key={setting} onClick={() => {
                    handleCloseUserMenu();

                    if(index === loginSettings.length - 1){ // 마지막 메뉴(로그아웃)를 클릭했을 때
                      localStorage.removeItem('jwtToken');
                      localStorage.removeItem('persist:root');
                      localStorage.removeItem('kakao_13541ddd20e5c786378637deb831a2be');
                      KakaoLogout();
                      dispatch(logout());
                      navi("/");

                    }
                    else{
                      navi(loginLinks[index]);
                    }
                  }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))
              }
              {
                // 로그아웃 상태의 메뉴
                !isLoggedIn && logoutSettings.map((setting,index) => (
                  <MenuItem key={setting} onClick={() => {
                    handleCloseUserMenu();
                    navi(logoutLinks[index]);
                  }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;

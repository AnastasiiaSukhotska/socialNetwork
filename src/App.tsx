import './App.css';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Navigate } from "react-router";
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import UsersPageContainer from './components/Users/UsersPageContainer';
import ProfilePageContainer from './components/ProfilePage/ProfilePageContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { instalizeApp } from './redux/reducers/appReducer';
import { Preloader } from './components/Preloader/Preloader';
import { AppStateType } from './redux/redux-store';

const DialogsPageContainer = React.lazy(() => import('./components/Dialogs/DialogsPageContainer'));

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
  instalizeApp: () => void
}


class App extends Component<MapStateToPropsType & MapDispatchToPropsType> {
  componentDidMount() {
    this.props.instalizeApp();
  }

  render() {
    if (!this.props.instalized) {
      return <Preloader />
    }
    return (

      <BrowserRouter>
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className='app-wrapper-content'>
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route element={<ProfilePageContainer />} path='/profile/:profileId' />
                <Route element={<ProfilePageContainer />} path='/profile' />
                <Route element={<DialogsPageContainer />} path='/dialogs/*' />
                <Route element={<UsersPageContainer title='hello'/>} path='/users' />
                <Route element={<LoginPage />} path='/login' />
                <Route element={<div>404 not found</div>} path='*'/> 

              </Routes>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  instalized: state.app.instalized
})

export default compose(connect(mapStateToProps, { instalizeApp }))(App);

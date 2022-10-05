import './App.css';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Navigate } from "react-router";
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import UsersPageContainer from './components/Users/UsersPageContainer';
import ProfilePageContainerWithRouterProps from './components/ProfilePage/ProfilePageContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { instalizeApp } from './redux/reducers/appReducer';
import { Preloader } from './components/Preloader/Preloader';

const DialogsPageContainer = React.lazy(() => import('./components/Dialogs/DialogsPageContainer'));



class App extends Component {
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
                <Route element={<ProfilePageContainerWithRouterProps />} path='/profile/:profileId' />
                <Route element={<ProfilePageContainerWithRouterProps />} path='/profile' />
                <Route element={<DialogsPageContainer />} path='/dialogs/*' />
                <Route element={<UsersPageContainer />} path='/users' />
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

let mapStateToProps = (state) => ({
  instalized: state.app.instalized
})

export default compose(connect(mapStateToProps, { instalizeApp }))(App);

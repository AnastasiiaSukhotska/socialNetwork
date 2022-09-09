import './App.css';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DialogsPageContainer from './components/Dialogs/DialogsPageContainer';
import UsersPageContainer from './components/Users/UsersPageContainer';
import ProfilePageContainerWithRouterProps from './components/ProfilePage/ProfilePageContainer';
import  HeaderContainer  from './components/Header/HeaderContainer';
import  LoginPage  from './components/Login/Login';

 
function App(props) {
 
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route element={<ProfilePageContainerWithRouterProps/>} path='/profile/:profileId' />
            <Route element={<ProfilePageContainerWithRouterProps/>} path='/profile' />
            <Route element={<DialogsPageContainer/>} path='/dialogs/*' />
            <Route element={<UsersPageContainer/>} path='/users' />
            <Route element={<LoginPage />} path='/login' />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { Component } from 'react';
import style from './Header.module.css';
import { Header } from './Header';
import { connect } from 'react-redux';
import {  authentication, logout } from '../../redux/reducers/authReducer';

class HeaderContainer extends React.Component {
    componentDidMount() {
                 this.props.authentication();
    }


    render() {
        return <Header {...this.props} />
    }

}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth,

    }
}



export default connect(mapStateToProps, { authentication, logout })(HeaderContainer);
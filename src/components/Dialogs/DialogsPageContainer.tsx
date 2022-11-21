import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../redux/reducers/dialogsPageReducer';
import { AppStateType } from '../../redux/redux-store';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { DialogsPage } from './DialogsPage';



let mapStateToProps = (state: AppStateType) => {
    return {
        message: state.dialogsPage.messages,
        dialogs: state.dialogsPage.dialogs,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {addNewMessage: actions.addNewMessageActionCreator}),
    withAuthRedirect
)(DialogsPage);
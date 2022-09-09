import { connect } from 'react-redux';
import { compose } from 'redux';
import { addNewMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/reducers/dialogsPageReducer';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { DialogsPage } from './DialogsPage';



let mapStateToProps = (state) => {
    return {
        message: state.dialogsPage.messages,
        dialogs: state.dialogsPage.dialogs,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) =>  {
    return {
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextActionCreator(text));
        },
        addNewMessage: () => {
            dispatch(addNewMessageActionCreator())
        }
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(DialogsPage);
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addNewMessageActionCreator } from '../../redux/reducers/dialogsPageReducer';
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
       
        addNewMessage: (newMessageText) => {
            dispatch(addNewMessageActionCreator(newMessageText))
        }
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(DialogsPage);
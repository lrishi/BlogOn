import React from 'react';
import BlogEditor from './blog-editor.component';
import RegistrationPrompt from '../../components/registration-prompt/registration-prompt.component';
import { connect as connectRedux } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';

class BlogEditorScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'New Post',
    };

    constructor( props ) {
        super( props );
    }

    render () {
        if ( this.props.currentUser !== null ) {
            return ( <BlogEditor /> );
        } else {
            return ( <RegistrationPrompt /> );
        }
    };
}

const mapStateToProps = ( state ) => ( {
    currentUser: selectCurrentUser( state )
} );

export default connectRedux( mapStateToProps )( BlogEditorScreen );
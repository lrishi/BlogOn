import React from 'react';
import BlogEditor from './blog-editor.component';
import RegistrationPrompt from '../../components/registration-prompt/registration-prompt.component';
import { connect as connectRedux } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { getGlobalNavigationContext, getGlobalStackNavigationContext } from '../../components/navigator/navigator.exports';

class BlogEditorScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'New Post',
        title: 'New Post'
    };

    constructor( props ) {
        super( props );
        this.props.navigation.setParams( { title: 'New Post' } );
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
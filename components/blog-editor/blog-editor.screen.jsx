import React from 'react';
import { Text } from 'react-native';
import BlogEditor from './blog-editor.component';
import RegistrationPrompt from '../../components/registration-prompt/registration-prompt.component';
import { connect as connectRedux } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faPlus as newBlog,
} from '@fortawesome/free-solid-svg-icons';


class BlogEditorScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'New Post',
    };

    constructor( props ) {
        super( props );
        this.props.navigation.setParams( {
            title: ( <Text style={ { fontSize: 22 } }> <FontAwesomeIcon size={ 18 } icon={ newBlog } color={ 'white' } />  New Post</Text > )
        } );
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
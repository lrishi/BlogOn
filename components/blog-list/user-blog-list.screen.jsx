import React from 'react';
import BlogList from './blog-list.component';
import { connect as connectRedux } from 'react-redux';
import { userSelectorGetCurrentUser } from '../../redux/user/user.selectors';
import RegistrationPrompt from '../../components/registration-prompt/registration-prompt.component';

import { Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faIdCardAlt as headerIcon } from '@fortawesome/free-solid-svg-icons';

class UserBlogListScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'My Blogs',
    };

    constructor( props ) {
        super( props );
        this.props.navigation.setParams( {
            title: (
                <Text style={ { fontSize: 22 } }> <FontAwesomeIcon size={ 18 } icon={ headerIcon } color={ 'white' } />  My Blogs
                </Text > )

        } );
    }

    render () {
        if ( this.props.currentUser !== null ) {
            return (
                <BlogList hasUser={ true }
                    navigation={ this.props.navigation }
                />
            );
        } else {
            return ( <RegistrationPrompt /> );
        }
    };
}

const mapStateToProps = ( state ) => ( {
    currentUser: userSelectorGetCurrentUser( state )
} );

export default connectRedux( mapStateToProps )( UserBlogListScreen );
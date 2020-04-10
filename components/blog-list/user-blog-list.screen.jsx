import React from 'react';
import BlogList from './blog-list.component';
import { connect as connectRedux } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import RegistrationPrompt from '../../components/registration-prompt/registration-prompt.component';

class UserBlogListScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'My Blogs',
    };

    constructor( props ) {
        super( props );
        this.props.navigation.setParams( { title: 'My Blogs' } );
    }

    render () {
        if ( this.props.currentUser !== null ) {
            return ( <BlogList hasUser={ true } /> );
        } else {
            return ( <RegistrationPrompt /> );
        }
    };
}

const mapStateToProps = ( state ) => ( {
    currentUser: selectCurrentUser( state )
} );

export default connectRedux( mapStateToProps )( UserBlogListScreen );
import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { auth } from '../../firebase/firebase.utils';
import { connect as connectRedux } from 'react-redux';
import { blogActionSetIsLoading } from '../../redux/blog/blog.actions';
import { blogActionListUserMultiple, blogActionSetRefreshing } from '../../redux/blog/blog.actions';

import styles from './sign-out.styles';

import {
    DecoratedIndicatorInfo,
    DecoratedButtonDanger,
} from '../../components/decorated-natives/decorated-natives.components';

class SignOut extends React.Component {
    constructor( props ) {
        super( props );
    }

    signOutHandler = async () => {
        const { notifyIsLoading, listUserItem, blogActionSetRefreshing } = this.props;
        notifyIsLoading( true );
        try {
            await auth.signOut();
            listUserItem( [] );
            blogActionSetRefreshing( false );
            setTimeout( () => notifyIsLoading( false ), 1000 );
        } catch ( error ) {
            alert( error.message );
            notifyIsLoading( false );
        }
    };

    render () {
        return (
            <ScrollView contentContainerStyle={ styles.container }>
                <DecoratedIndicatorInfo style={ styles.indicator } >
                    Are you sure you want to Sign Out?
                </DecoratedIndicatorInfo>
                <DecoratedButtonDanger
                    title="Sign Out"
                    onPress={ this.signOutHandler }
                    style={ styles.signOutButton }
                />
            </ScrollView>
        );
    }
};
const mapDispatchToProps = dispatch => ( {
    notifyIsLoading: ( item ) => dispatch( blogActionSetIsLoading( item ) ),
    listUserItem: ( item ) => dispatch( blogActionListUserMultiple( item ) ),
    blogActionSetRefreshing: ( item ) => dispatch( blogActionSetRefreshing( item ) ),
} );

export default connectRedux( null, mapDispatchToProps )( SignOut );
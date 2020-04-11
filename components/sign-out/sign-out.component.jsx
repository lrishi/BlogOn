import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { auth } from '../../firebase/firebase.utils';
import { connect as connectRedux } from 'react-redux';
import { setIsLoading } from '../../redux/blog/blog.actions';
import { listUserMultiple, setRefreshing } from '../../redux/blog/blog.actions';

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
        const { notifyIsLoading, listUserItem, setRefreshing } = this.props;
        notifyIsLoading( true );
        try {
            await auth.signOut();
            listUserItem( [] );
            setRefreshing( false );
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
    notifyIsLoading: ( item ) => dispatch( setIsLoading( item ) ),
    listUserItem: ( item ) => dispatch( listUserMultiple( item ) ),
    setRefreshing: ( item ) => dispatch( setRefreshing( item ) ),
} );

export default connectRedux( null, mapDispatchToProps )( SignOut );
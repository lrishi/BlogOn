import React from 'react';
import { ScrollView, Text } from 'react-native';
import { auth } from '../../firebase/firebase.utils';
import { connect as connectRedux } from 'react-redux';
import { blogActionSetIsLoading } from '../../redux/blog/blog.actions';

import styles from './sign-in.styles';

import {
    DecoratedTextInput,
    DecoratedButtonInfo,
} from '../../components/decorated-natives/decorated-natives.components';

const INITIAL_STATE = {
    email: '',
    password: '',
};

class SignIn extends React.Component {
    constructor( props ) {
        super( props );
        this.state = INITIAL_STATE;
    }

    signInHandler = async event => {
        const { email, password } = this.state;
        const { notifyIsLoading } = this.props;
        notifyIsLoading( true );
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword( email, password );
        } catch ( error ) {
            alert( error.message );
            setTimeout( () => notifyIsLoading( false ), 1000 );
        }
        this.setState( INITIAL_STATE );
    };

    handleChange = ( name, value ) => {
        this.setState( { [ name ]: value } );
    };

    render () {
        const { email, password } = this.state;
        return (
            <ScrollView contentContainerStyle={ styles.container }>

                <DecoratedTextInput
                    contextMenuHidden={ true }
                    keyboardType="email-address"
                    placeholder="Your email"
                    textContentType="emailAddress"
                    value={ email }
                    onChangeText={ ( value ) => this.handleChange( "email", value ) }
                    style={ [ styles.input, { marginTop: 40 } ] }

                />
                <DecoratedTextInput
                    contextMenuHidden={ true }
                    placeholder="Your Password"
                    secureTextEntry={ true }
                    textContentType="password"
                    value={ password }
                    onChangeText={ ( value ) => this.handleChange( "password", value ) }
                    style={ styles.input }
                />
                <DecoratedButtonInfo
                    title="Sign In"
                    onPress={ this.signInHandler }
                    style={ styles.button }
                />
            </ScrollView>
        );
    }
};

const mapDispatchToProps = dispatch => ( {
    notifyIsLoading: ( item ) => dispatch( blogActionSetIsLoading( item ) ),
} );

export default connectRedux( null, mapDispatchToProps )( SignIn );
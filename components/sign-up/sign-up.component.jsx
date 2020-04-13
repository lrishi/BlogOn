import React from 'react';
import { ScrollView, TextInput, Button, TabBarIOSItem } from 'react-native';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { connect as connectRedux } from 'react-redux';
import { blogActionSetIsLoading } from '../../redux/blog/blog.actions';

import styles from './sign-up.styles';

import {
    DecoratedTextInput,
    DecoratedButtonSuccess,
} from '../../components/decorated-natives/decorated-natives.components';

const INITIAL_STATE = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

class SignUp extends React.Component {
    constructor( props ) {
        super( props );
        this.state = INITIAL_STATE;
    }

    signUpHandler = async event => {
        event.preventDefault();

        const { notifyIsLoading } = this.props;

        const { displayName, email, password, confirmPassword } = this.state;
        if ( displayName.trim() === "" ||
            email.trim() === "" ||
            password === "" ||
            confirmPassword === "" ) {
            alert( "None of the fiels can be empty!" );
            return;
        }
        if ( password !== confirmPassword ) {
            alert( "Passwords don't match!" );
            return;
        }
        notifyIsLoading( true );
        try {
            const { user } = await auth.createUserWithEmailAndPassword( email, password );
            await createUserProfileDocument( user, { displayName } );
            this.setState( INITIAL_STATE );
        } catch ( error ) {
            alert( error.message );
            setTimeout( () => notifyIsLoading( false ), 1000 );
        }
    };

    handleChange = ( name, value ) => {
        this.setState( { [ name ]: value } );
    };

    render () {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <ScrollView contentContainerStyle={ styles.container }>
                <DecoratedTextInput
                    contextMenuHidden={ true }
                    placeholder="Your name"
                    value={ displayName }
                    onChangeText={ ( value ) => this.handleChange( "displayName", value ) }
                    style={ styles.input }
                    returnKeyType={ "next" }
                />
                <DecoratedTextInput
                    contextMenuHidden={ true }
                    keyboardType="email-address"
                    placeholder="Your email"
                    textContentType="emailAddress"
                    value={ email }
                    onChangeText={ ( value ) => this.handleChange( "email", value ) }
                    style={ styles.input }
                    returnKeyType={ "next" }
                />
                <DecoratedTextInput
                    contextMenuHidden={ true }
                    placeholder="Choose a password"
                    secureTextEntry={ true }
                    textContentType="password"
                    value={ password }
                    onChangeText={ ( value ) => this.handleChange( "password", value ) }
                    style={ styles.input }
                    returnKeyType={ "next" }
                />
                <DecoratedTextInput
                    contextMenuHidden={ true }
                    placeholder="Repeat password"
                    secureTextEntry={ true }
                    value={ confirmPassword }
                    onChangeText={ ( value ) => this.handleChange( "confirmPassword", value ) }
                    style={ styles.input }
                    returnKeyType={ "done" }
                />
                <DecoratedButtonSuccess
                    title="  Sign Up  "
                    onPress={ this.signUpHandler }
                    style={ styles.button }
                />
            </ScrollView>
        );
    }
};

const mapDispatchToProps = dispatch => ( {
    notifyIsLoading: ( item ) => dispatch( blogActionSetIsLoading( item ) ),
} );

export default connectRedux( null, mapDispatchToProps )( SignUp );
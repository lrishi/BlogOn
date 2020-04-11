import React from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

import styles from './decorated-natives.styles';

export const DecoratedTextInput = ( props ) => {
    return (
        <TextInput { ...props }
            style={ props.hasOwnProperty( 'style' ) ?
                StyleSheet.compose( styles.decoratedTextInput, props.style ) :
                styles.decoratedTextInput }
        />
    );
};



export const DecoratedButton = ( props ) => {
    const { title = "", textStyle = "" } = props;
    return (
        <TouchableOpacity { ...props }
            style={ props.hasOwnProperty( 'style' ) ?
                StyleSheet.compose( styles.decoratedButton, props.style ) :
                styles.decoratedButton } >
            <Text style={ StyleSheet.compose( styles.decoratedButtonText, textStyle ) }>
                { title }
            </Text>
        </TouchableOpacity >
    );
};

export const DecoratedButtonPrimary = DecoratedButton;
export const DecoratedButtonSecondary = ( props ) => {
    let _style = "";
    if ( props.hasOwnProperty( 'style' ) ) {
        _style = StyleSheet.compose( styles.buttonSecondary, props.style );
    } else {
        _style = styles.buttonSecondary;
    }
    return (
        <DecoratedButton { ...props } style={ _style }
            textStyle={ props.hasOwnProperty( 'textStyle' ) ?
                StyleSheet.compose( styles.secondaryButtonText, textStyle ) :
                styles.secondaryButtonText
            }
        />
    );
};

export const DecoratedButtonInfo = ( props ) => {
    let _style = "";
    if ( props.hasOwnProperty( 'style' ) ) {
        _style = StyleSheet.compose( styles.buttonInfo, props.style );
    } else {
        _style = styles.buttonInfo;
    }
    return (
        <DecoratedButton { ...props } style={ _style }
            textStyle={ props.hasOwnProperty( 'textStyle' ) ?
                StyleSheet.compose( styles.infoButtonText, textStyle ) :
                styles.infoButtonText
            }
        />
    );
};

export const DecoratedButtonWarning = ( props ) => {
    let _style = "";
    if ( props.hasOwnProperty( 'style' ) ) {
        _style = StyleSheet.compose( styles.buttonWarning, props.style );
    } else {
        _style = styles.buttonWarning;
    }
    return (
        <DecoratedButton { ...props } style={ _style }
            textStyle={ props.hasOwnProperty( 'textStyle' ) ?
                StyleSheet.compose( styles.warningButtonText, textStyle ) :
                styles.warningButtonText
            }
        />
    );
};

export const DecoratedButtonSuccess = ( props ) => {
    let _style = "";
    if ( props.hasOwnProperty( 'style' ) ) {
        _style = StyleSheet.compose( styles.buttonSuccess, props.style );
    } else {
        _style = styles.buttonSuccess;
    }
    return (
        <DecoratedButton { ...props } style={ _style }
            textStyle={ props.hasOwnProperty( 'textStyle' ) ?
                StyleSheet.compose( styles.successButtonText, textStyle ) :
                styles.successButtonText
            }
        />
    );
};

export const DecoratedButtonDanger = ( props ) => {
    let _style = "";
    if ( props.hasOwnProperty( 'style' ) ) {
        _style = StyleSheet.compose( styles.buttonDanger, props.style );
    } else {
        _style = styles.buttonDanger;
    }
    return (
        <DecoratedButton { ...props } style={ _style }
            textStyle={ props.hasOwnProperty( 'textStyle' ) ?
                StyleSheet.compose( styles.dangerButtonText, textStyle ) :
                styles.dangerButtonText
            }
        />
    );
};
import React from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import styles from './decorated-natives.styles';
import CurrentTheme from '../../themes/current.theme';

export const DecoratedIndicator = ( props ) => {
    return (
        <Text { ...props }
            style={ props.hasOwnProperty( 'style' ) ?
                StyleSheet.compose( styles.decoratedIndicator, props.style ) :
                styles.decoratedIndicator }
        />
    );
};

export const DecoratedIndicatorPrimary = DecoratedIndicator;

export const DecoratedIndicatorInfo = ( props ) => {
    return (
        <DecoratedIndicator
            { ...props }
            style={ props.hasOwnProperty( 'style' ) ?
                StyleSheet.compose( styles.decoratedIndicatorInfo, props.style ) :
                styles.decoratedIndicatorInfo }
        >
            <FontAwesomeIcon
                icon={ faInfoCircle }
                size={ CurrentTheme.FontSizeLarge }
                style={ styles.infoIcon } />  { props.children }
        </DecoratedIndicator>
    );
};

export const DecoratedIndicatorWarning = ( props ) => {
    return (
        <DecoratedIndicator
            { ...props }
            style={ props.hasOwnProperty( 'style' ) ?
                StyleSheet.compose( styles.decoratedIndicatorWarning, props.style ) :
                styles.decoratedIndicatorWarning }
        >
            <FontAwesomeIcon
                icon={ faExclamationTriangle }
                size={ CurrentTheme.FontSizeLarge }
                style={ styles.warningIcon } />  { props.children }
        </DecoratedIndicator>
    );
};

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
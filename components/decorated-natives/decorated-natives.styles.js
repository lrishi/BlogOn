import { StyleSheet } from 'react-native';
import CurrentTheme from '../../themes/current.theme';

export default StyleSheet.create( {
    decoratedIndicator: {
        backgroundColor: CurrentTheme.Colors.primary,
        color: CurrentTheme.ComplementColors.primary,
        padding: 30,
        paddingTop: 30,
        paddingBottom: 30,
        overflow: "hidden",
        borderRadius: 5,
        margin: 10,
        elevation: 2,
        fontSize: CurrentTheme.FontSizeLarge,
    },
    decoratedIndicatorInfo: {
        backgroundColor: CurrentTheme.Colors.info,
        color: CurrentTheme.ComplementColors.info,
    },
    infoIcon: {
        elevation: 3,
        color: CurrentTheme.ComplementColors.info,
    },
    decoratedIndicatorWarning: {
        backgroundColor: CurrentTheme.Colors.warning,
        color: CurrentTheme.ComplementColors.warning,
    },
    warningIcon: {
        elevation: 3,
        color: CurrentTheme.ComplementColors.warning,
    },
    decoratedTextInput: {
        backgroundColor: CurrentTheme.ComplementColors.primary,
        padding: 10,
        width: '100%',
        color: CurrentTheme.TextColor,
        borderColor: CurrentTheme.Colors.primary,
        borderBottomWidth: 3,
    },
    decoratedButton: {
        paddingTop: 8,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: CurrentTheme.Colors.primary,
        elevation: 5,
        alignSelf: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: CurrentTheme.Colors.primary,
        justifyContent: 'center'
    },
    decoratedButtonText: {
        width: '100%',
        fontSize: CurrentTheme.FontSize,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        color: CurrentTheme.ComplementColors.primary,
        textTransform: 'uppercase',
    },
    buttonSecondary: {
        backgroundColor: CurrentTheme.Colors.secondary,
        borderColor: CurrentTheme.Colors.secondary,
    },
    secondaryButtonText: {
        color: CurrentTheme.ComplementColors.secondary
    },
    buttonDanger: {
        backgroundColor: CurrentTheme.Colors.danger,
        borderColor: CurrentTheme.Colors.danger,
    },
    dangerButtonText: {
        color: CurrentTheme.ComplementColors.danger
    },
    buttonWarning: {
        backgroundColor: CurrentTheme.Colors.warning,
        borderColor: CurrentTheme.Colors.warning,
    },
    warningButtonText: {
        color: CurrentTheme.ComplementColors.warning
    },
    buttonInfo: {
        backgroundColor: CurrentTheme.Colors.info,
        borderColor: CurrentTheme.Colors.info,
    },
    infoButtonText: {
        color: CurrentTheme.ComplementColors.info
    },
    buttonSuccess: {
        backgroundColor: CurrentTheme.Colors.success,
        borderColor: CurrentTheme.Colors.success,
    },
    successButtonText: {
        color: CurrentTheme.ComplementColors.success
    }
} );
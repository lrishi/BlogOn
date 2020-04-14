import { StyleSheet } from 'react-native';
import CurrentTheme from '../../themes/current.theme';

export default StyleSheet.create( {
    container: {
        padding: 10,
        alignItems: 'center'
    },
    input: {
        marginTop: 20,
        width: '95%',
        maxWidth: 350,
        textAlign: 'center',
        fontSize: CurrentTheme.FontSize,
        borderColor: CurrentTheme.Colors.info
    },
    button: {
        marginTop: 30
    },
} );
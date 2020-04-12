import { StyleSheet } from 'react-native';
import CurrentTheme from '../../themes/current.theme';

export default StyleSheet.create( {
    headerButton: {
        padding: 10,
        marginRight: 0,
    },
    headerText: {
        color: 'white',
        fontSize: CurrentTheme.FontSize,
        fontWeight: 'bold',
    },
    shareButton: {
        padding: 10,
        marginRight: 10
    }
} );
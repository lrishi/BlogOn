import { StyleSheet } from 'react-native';
import CurrentTheme from '../../themes/current.theme';
import { FontSizeLarge } from '../../themes/basic.theme';

export default StyleSheet.create( {
    container: {
        height: '100%',
        backgroundColor: 'white'
    },
    coverImage: {
        minHeight: 300,
        maxHeight: 500,
        height: '35%',
        width: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontWeight: 'bold',
        fontSize: CurrentTheme.FontSizeLargest,
        margin: 10,
        marginBottom: 5,
        padding: 0,
        textTransform: 'uppercase',
    },
    metaData: {
        color: '#888',
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    blogText: {
        fontSize: FontSizeLarge,
        padding: 20
    }
} );
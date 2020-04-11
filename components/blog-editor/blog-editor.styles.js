import { StyleSheet } from 'react-native';
import CurrentTheme from '../../themes/current.theme';

export default StyleSheet.create( {
    container: {
        padding: 10,
        backgroundColor: 'white',
        width: '100%',
    },
    input: {
        marginTop: 20,
        fontSize: CurrentTheme.FontSize,
        borderColor: CurrentTheme.Colors.info,
        fontSize: CurrentTheme.FontSizeLarge,
    },
    button: {
        marginTop: 30
    },
    coverImage: {
        height: 300,
        width: '100%',
        resizeMode: 'cover',
        marginTop: 20,
        marginBottom: 20,
    },
    noImageMessage: {
        height: 300,
        width: '100%',
        textAlign: 'center',
        fontSize: CurrentTheme.FontSize,
        backgroundColor: '#EEE',
        padding: 20,
        borderColor: '#AAA',
        marginTop: 20,
        marginBottom: 20,
    },
    imageButtonHolder: {
        flexDirection: "row",
    },
    imageButton: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    detailedEditor: {
        marginTop: 20,
        marginBottom: 20,
        borderColor: CurrentTheme.Colors.info,
        minHeight: 200,
        maxHeight: 200,
        fontSize: CurrentTheme.FontSizeLarge,
        textAlign: "justify",
    },
    publishButton: {
        height: 80,
    }
} );
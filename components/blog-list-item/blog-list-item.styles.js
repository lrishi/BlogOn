import { StyleSheet } from 'react-native';
import { withOrientation } from 'react-navigation';

export default StyleSheet.create( {
    blogListItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '90%',
        minHeight: 120,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: "center",
        marginTop: 10,
        elevation: 2,
        padding: 10,
    },
    blogListThumbnail: {
        width: '45%',
        height: '100%',
        resizeMode: "cover",
        borderWidth: 1,
        borderColor: "black",

    },
    blogListTextWrapper: {
        width: '55%',
        height: '100%',
        paddingLeft: 10,
    },
    blogListTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',

    },
    blogMetaData: {
        fontSize: 12,
        color: 'grey',
    },
    blogExcerpt: {
        fontSize: 13,
        color: 'grey',
        textTransform: 'uppercase'
    },
    blogActionWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        width: '100%',
    },
    blogActionButton: {
        margin: 5,
        backgroundColor: '#ccc',
        elevation: 4,
        color: 'white',
        borderRadius: 2,
        padding: 5
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
    },

} );
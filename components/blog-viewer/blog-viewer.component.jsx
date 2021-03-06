import React from 'react';
import { Share, ScrollView, View, Text, Image } from 'react-native';
import { connect as connectRedux } from 'react-redux';

import { selectBlogViewable } from '../../redux/blog/blog.selectors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarDay as clockIcon, faPen as authorIcon } from '@fortawesome/free-solid-svg-icons';
import styles from "./blog-viewer.styles";
import { stylerSelectorGetDimensions } from '../../redux/styler/styler.selectors';

class BlogViewer extends React.Component {

    constructor( props ) {
        super( props );
        props.navigation.setParams(
            {
                shareHandler: () => {
                    const { blog } = props;
                    this.shareItem( blog );
                }
            }
        );

    }

    shareItem = async () => {
        const { blog } = this.props;
        const redirectUrl = "https://tinyurl.com/vkgpzd3?id=" + blog.id;
        try {
            await Share.share(
                {
                    message:
                        "Checkout my blog '" + blog.title + "' on BlogOn!. Click here: " + redirectUrl
                },
                {
                    title: 'Sharing post: ' + blog.title,
                }
            );
        } catch ( error ) {
            alert( error.message );
        }
    };

    render () {
        const { blog, windowDimensions } = this.props;
        if ( blog == null ) {
            return (
                <ScrollView>
                    <Text>Loading...</Text>
                </ScrollView>
            );
        }
        // console.log( windowDimensions.width, windowDimensions.height );
        if ( windowDimensions.isPortrait() ) {
            return (
                <ScrollView contentContainerStyle={ styles.container }>
                    <Image
                        source={ { uri: `data:image/gif;base64,${ blog.image }` } }
                        style={ styles.coverImage } />
                    <Text style={ styles.title }>
                        { blog.title }
                    </Text>
                    <Text style={ styles.metaData }>
                        <FontAwesomeIcon icon={ authorIcon } size={ 14 } color={ 'grey' } /> { blog.author !== null ? blog.author.displayName.substring( 0, 20 ) : "Unknown" } { '\n' }
                        <FontAwesomeIcon icon={ clockIcon } size={ 14 } color={ 'grey' } /> { blog.ts_added.toDate().toDateString().substring( 0, 20 ) }
                    </Text>
                    <Text style={ styles.blogText }>
                        { blog.editor }
                    </Text>
                </ScrollView>
            );
        } else {
            return (
                <ScrollView contentContainerStyle={ styles.container }>
                    <Image
                        source={ { uri: `data:image/gif;base64,${ blog.image }` } }
                        style={ styles.landScapeCoverImage } />
                    <View style={ styles.landScapeWrapper }>
                        <View style={ styles.mdataWrapper }>
                            <Text style={ styles.landScapeTitle }>
                                { blog.title }
                            </Text>
                            <Text style={ styles.landScapeMdata }>
                                <FontAwesomeIcon icon={ authorIcon } size={ 14 } color={ 'grey' } /> { blog.author !== null ? blog.author.displayName.substring( 0, 20 ) : "Unknown" } { '\n' }
                                <FontAwesomeIcon icon={ clockIcon } size={ 14 } color={ 'grey' } /> { blog.ts_added.toDate().toDateString().substring( 0, 20 ) }
                            </Text>
                        </View>
                        <Text style={ styles.landScapeBlogText }>
                            { blog.editor }
                        </Text>
                    </View>
                </ScrollView>
            );
        }
    }

}

const mapStateToProps = ( state ) => ( {
    blog: selectBlogViewable( state ),
    windowDimensions: stylerSelectorGetDimensions( state ),
} );

export default connectRedux( mapStateToProps )( BlogViewer );

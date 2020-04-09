import React from 'react';
import { View, Text, Image } from 'react-native';


const BlogListItem = ( { blog } ) => {
    return (
        <View>
            <Text>{ blog.title }</Text>
            <Text>By { blog.author !== null ? blog.author.displayName : "Unknown" }</Text>

            <Image
                style={ { width: '100%', height: 300, resizeMode: 'stretch' } }
                source={ { uri: `data:image/gif;base64,${ blog.image }` } }
            />
            <Text>Added on { blog.ts_added.toDate().toString() }, Modified on { blog.ts_updated.toDate().toString() }</Text>
            <Text>{ blog.editor }</Text>
        </View>

    );
};

export default BlogListItem;
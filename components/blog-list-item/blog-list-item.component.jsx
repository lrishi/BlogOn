import React from 'react';
import { View, Text } from 'react-native';


const BlogListItem = ( { blog: { id,
    author,
    title,
    image,
    text,
    ts_add,
    ts_mod } } ) => (

        <View>
            <Text>{ title }</Text>
            <Text>{ text }</Text>
            <Text>Added on { ts_add }</Text>
        </View>

    );

export default BlogListItem;
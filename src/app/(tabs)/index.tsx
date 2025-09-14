import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

import PostListItem from '../../components/PostListItem';
import { Post } from '../../types';

import posts from '../../../assets/data/posts.json';

const typedPosts: Post[] = posts as Post[];

export default function HomeScreen() {
  // Check if posts exist and have items
  const hasPosts = Array.isArray(typedPosts) && typedPosts.length > 0;
  
  if (!hasPosts) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No posts available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={typedPosts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  listContainer: {
    padding: 10,
  },
});

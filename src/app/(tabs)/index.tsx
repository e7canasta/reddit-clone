import { StyleSheet, Text, View, Image } from 'react-native';
import { formatDistanceToNowStrict } from 'date-fns';
import MaterialCommunityIcons  from '@expo/vector-icons/MaterialCommunityIcons';

import posts from '../../../assets/data/posts.json';

export default function HomeScreen() {
  const post = posts[0];

  return (
    <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 10 }}>
      {/* POST HEADER */}
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', margin: 10 }}>
        <Image source={{ uri: post.group.image }} style={{ width: 25, height: 25, borderRadius: 25 }} />
        <Text style={{ fontWeight: 'bold' }}>{post.group.name}</Text>
        <Text style={{ color: 'gray' }}>{formatDistanceToNowStrict(new Date(post.created_at), { addSuffix: true })}</Text>
        <View style={{ flexDirection: 'row', gap: 5, marginLeft: 'auto' }}>
          <Text style={styles.joinButtonText}>Join</Text>
        </View>
      </View>

      {/* POST CONTENT */}
      <Text style={styles.postContent}>{post.title}</Text>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <Text numberOfLines={4}  style={styles.postDescription}>{post.description}</Text>

      {/* POST FOOTER */}
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <MaterialCommunityIcons name="arrow-up-bold-outline" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>{post.upvotes}</Text>
        <MaterialCommunityIcons name="arrow-down-bold-outline" size={24} color="black" />
        <MaterialCommunityIcons name="comment-outline" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>{post.nr_of_comments}</Text>
        <MaterialCommunityIcons name="heart-outline" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>{post.upvotes}</Text>
        <MaterialCommunityIcons name="message-outline" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>{post.nr_of_comments}</Text>
        <MaterialCommunityIcons name="eye-outline" size={24} color="black" />
        <View style={{ flexDirection: 'row', gap: 5, marginLeft: 'auto' }}>
          <MaterialCommunityIcons name="trophy-outline" size={24} color="black" />
          <MaterialCommunityIcons name="share-outline" size={24} color="black" />
          <MaterialCommunityIcons name="bookmark-outline" size={24} color="black" />
          <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
        </View>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  joinButtonText: {
    backgroundColor: "#0d469b",
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  postTitle: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  postContent: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  postImage: {
    width: '100%',
    aspectRatio: 4/3,
    borderRadius: 15,
  },
  postDescription: {
    color: 'gray',
    marginBottom: 10,
  },
});
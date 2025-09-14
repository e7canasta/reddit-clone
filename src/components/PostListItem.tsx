import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { formatDistanceToNowStrict } from 'date-fns';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Post } from '../types';

type PostListItemProps = {
    post: Post;
};

// Post item component with conditional rendering
export default function PostListItem ({ post }: PostListItemProps) {
  // Helper function to safely format date
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNowStrict(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return '';
    }
  };

  if (!post) return null;
  
  return (
    <View style={styles.postContainer}>
      {/* POST HEADER */}
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', margin: 10 }}>
        {post.group?.image && (
          <Image 
            source={{ uri: post.group.image }} 
            style={{ width: 25, height: 25, borderRadius: 25 }} 
          />
        )}
        {post.group?.name && (
          <Text style={{ fontWeight: 'bold' }}>{post.group.name}</Text>
        )}
        {post.created_at && (
          <Text style={{ color: 'gray' }}>{formatDate(post.created_at)}</Text>
        )}
        <View style={{ flexDirection: 'row', gap: 5, marginLeft: 'auto' }}>
          <Text style={styles.joinButtonText}>Join</Text>
        </View>
      </View>

      {/* POST CONTENT */}
      {post.title && (
        <Text style={styles.postContent}>{post.title}</Text>
      )}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}
      {post.description && (
        <Text numberOfLines={4} style={styles.postDescription}>{post.description}</Text>
      )}

      {/* POST FOOTER */}
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <MaterialCommunityIcons name="arrow-up-bold-outline" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>{post.upvotes || 0}</Text>
        <MaterialCommunityIcons name="arrow-down-bold-outline" size={24} color="black" />
        <MaterialCommunityIcons name="comment-outline" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>{post.nr_of_comments || 0}</Text>
        <MaterialCommunityIcons name="heart-outline" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>{post.upvotes || 0}</Text>
        <MaterialCommunityIcons name="message-outline" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>{post.nr_of_comments || 0}</Text>
        <MaterialCommunityIcons name="eye-outline" size={24} color="black" />
        <View style={{ flexDirection: 'row', gap: 5, marginLeft: 'auto' }}>
          <MaterialCommunityIcons name="trophy-outline" size={24} color="black" />
          <MaterialCommunityIcons name="share-outline" size={24} color="black" />
          <MaterialCommunityIcons name="bookmark-outline" size={24} color="black" />
          <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'white',
    marginBottom: 15,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
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
    paddingHorizontal: 10,
  },
  postImage: {
    width: '100%',
    aspectRatio: 4/3,
    borderRadius: 15,
    marginBottom: 10,
  },
  postDescription: {
    color: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

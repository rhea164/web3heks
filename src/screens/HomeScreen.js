import React, { useContext} from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../context/PostContext';

// const mockPosts = [
//   {
//     id: '1',
//     user: 'Sarah J.',
//     avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
//     title: 'Beach Cleanup Drive',
//     description: 'Organized a community beach cleanup. We collected over 200 lbs of trash!',
//     image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=400&h=250',
//     likes: 89,
//     comments: 12,
//   },
//   {
//     id: '2',
//     user: 'Mike R.',
//     avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
//     title: 'Volunteer at Local Food Bank',
//     description: 'Spent the day helping sort and distribute food to those in need.',
//     image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400&h=250',
//     likes: 56,
//     comments: 8,
//   },
//   {
//     id: '3',
//     user: 'Emma L.',
//     avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
//     title: 'Tree Planting Initiative',
//     description: 'Joined a local group to plant 50 new trees in our city park!',
//     image: 'https://images.unsplash.com/photo-1564114973748-419542e4399a?auto=format&fit=crop&q=80&w=400&h=250',
//     likes: 102,
//     comments: 15,
//   },
//   // Add more mock posts as needed
// ];

const PostCard = ({ post }) => (
  <Card containerStyle={styles.postCard}>
    <View style={styles.userInfo}>
      <Avatar
        rounded
        source={{ uri: post.avatar }}
        size="small"
      />
      <Text style={styles.userName}>{post.user}</Text>
    </View>
    <Card.Title style={styles.postTitle}>{post.title}</Card.Title>
    <Card.Image
      source={{ uri: post.image }}
      style={styles.postImage}
    />
    <Text style={styles.postDescription}>{post.description}</Text>
    <View style={styles.postActions}>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="heart" type="feather" color="#FF6B6B" size={20} />
        <Text style={styles.actionText}>{post.likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="message-circle" type="feather" color="#4ECDC4" size={20} />
        <Text style={styles.actionText}>{post.comments}</Text>
      </TouchableOpacity>
    </View>
  </Card>
);

const HomeScreen = ({ navigation }) => {
  const {state}= useContext(Context)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={styles.headerTitle}>Community Feed</Text>
        <TouchableOpacity>
          <Icon name="bell" type="feather" color="#FFF" size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={state}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2746',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    color: '#FFF',
  },
  postCard: {
    backgroundColor: '#2A365A',
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    color: '#FFF',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  postTitle: {
    color: '#FFF',
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
  },
  postImage: {
    height: 200,
    borderRadius: 10,
  },
  postDescription: {
    color: '#FFF',
    marginTop: 10,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFF',
    marginLeft: 5,
  },
});

export default HomeScreen;
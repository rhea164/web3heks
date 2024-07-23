import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Icon, ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
        <Avatar
            rounded
            source={{ uri: 'https://cdn1.iconfinder.com/data/icons/business-avatar-7/64/17_avatar_people_woman_business_businesswoman_woman_female_glasses_long_hair-1024.png' }}
            size="medium"
          />
          <Text h4 style={styles.greeting}>Hi, Karen!</Text>
          
          <Icon name="settings" type="feather" color="#FFF" />
        </View>

        <View style={styles.tokenContainer}>
          <MaterialIcons name="token" color="#4A90E2" size={30} />
          <Text style={styles.tokenPoints}>250</Text>
          <Text style={styles.tokenLabel}>Token Points</Text>
          <Icon name="chevron-right" type="feather" color="#4A90E2" />
        </View>

        <Button
          title="Claim your badge!"
          buttonStyle={styles.badgeButton}
          titleStyle={styles.badgeButtonText}
        />

        <Text h4 style={styles.latestLabel}>Latest</Text>

        {[
          { title: 'Learn Essentials of Git', icon: 'git-branch' },
          { title: 'Web Development Basics', icon: 'code' },
          { title: 'Introduction to Blockchain', icon: 'link' }
        ].map((item, index) => (
          <ListItem key={index} containerStyle={styles.courseItem}>
            <Icon name={item.icon} type="feather" color="#4A90E2" />
            <ListItem.Content>
              <ListItem.Title style={styles.courseTitle}>{item.title}</ListItem.Title>
            </ListItem.Content>
            <Text style={styles.coursePoints}>20 Points</Text>
          </ListItem>
        ))}
      </ScrollView>
    </View>
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
    marginTop:30
  },
  greeting: {
    color: '#FFF',
    paddingRight:100
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0E0C0',
    borderRadius: 10,
    padding: 15,
    margin: 20,
  },
  tokenPoints: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#4A90E2',
  },
  tokenLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  badgeButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  badgeButtonText: {
    fontWeight: 'bold',
  },
  latestLabel: {
    color: '#FFF',
    marginLeft: 20,
    marginBottom: 10,
  },
  courseItem: {
    backgroundColor: '#2A365A',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  courseTitle: {
    color: '#FFF',
  },
  coursePoints: {
    color: '#4A90E2',
  },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#2A365A',
//     paddingVertical: 15,
//     paddingBottom:30
//   },
});

export default UserProfileScreen;

{/* <View style={styles.navbar}>

<Entypo name='home' size={24} color={'#8899AA'}/>
<Feather name='check-circle' size={24} color={'#8899AA'}/>
<Feather name='plus-circle' size={24} color={'#8899AA'}/>
<Entypo name='wallet' size={24} color={'#8899AA'}/>
<Feather name='user' size={24} color={'#FFF'}/>

 
</View> */}
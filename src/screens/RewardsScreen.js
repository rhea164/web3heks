import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Text, Button, Icon, SearchBar, Card, Overlay } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const PopularCard = ({ title, points, downloads, color }) => (
  <Card containerStyle={[styles.popularCard, { backgroundColor: color }]}>
    <Card.Title style={styles.cardTitle}>{title}</Card.Title>
    <View style={styles.cardInfo}>
      <Text style={styles.cardPoints}>{points} Points</Text>
      <View style={styles.downloadInfo}>
      <Text style={styles.cardDownloads}>{downloads} Downloads </Text>
      <Feather name='download' size={20}/>
      </View>
    </View>
  </Card>
);

const RecommendedCard = ({ title, points, downloads }) => (
  <Card containerStyle={styles.recommendedCard}>
    <Card.Title style={styles.cardTitle}>{title}</Card.Title>
    <View style={styles.cardInfo}>
      <Text style={styles.cardPoints}>{points} Points</Text>
      <View style={styles.downloadInfo}>
      <Text style={styles.cardDownloads}>{downloads} Downloads</Text>
      <Feather name='download' size={20}/>
      </View>
    </View>
  </Card>
);

const RewardsScreen = () => {
  const [search, setSearch] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!isMenuVisible);

  const popularCourses = [
    { id: '1', title: "Orator Skills", points: 500, downloads: 1200, color: '#FF6B6B' },
    { id: '2', title: "Filmmaker Basics", points: 750, downloads: 980, color: '#4ECDC4' },
    { id: '3', title: "Web Design", points: 600, downloads: 1500, color: '#45B7D1' },
    { id: '4', title: "Data Science 101", points: 800, downloads: 1100, color: '#F9C80E' },
    { id: '5', title: "Digital Marketing", points: 550, downloads: 1300, color: '#FF8C42' },
  ];

  const recommendedCourses = [
    { id: '1', title: "Machine Learning Basics", points: 700, downloads: 950 },
    { id: '2', title: "Graphic Design Fundamentals", points: 450, downloads: 1400 },
    { id: '3', title: "Financial Planning", points: 600, downloads: 800 },
    { id: '4', title: "Mobile App Development", points: 850, downloads: 1200 },
    { id: '5', title: "Creative Writing Workshop", points: 400, downloads: 700 },
    { id: '6', title: "Blockchain Fundamentals", points: 750, downloads: 900 },
    { id: '7', title: "Digital Photography", points: 500, downloads: 1100 },
    { id: '8', title: "Artificial Intelligence Ethics", points: 650, downloads: 750 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={styles.headerTitle}>Rewards</Text>
        <Icon name="user" type="feather" color="#FFF" size={24} />
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchInputContainer}
        />
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" type="feather" color="#FFF" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text h4 style={styles.sectionTitle}>Popular</Text>
        <FlatList
          horizontal
          data={popularCourses}
          renderItem={({ item }) => <PopularCard {...item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        <Text h4 style={styles.sectionTitle}>Recommended</Text>
        <FlatList
          data={recommendedCourses}
          renderItem={({ item }) => <RecommendedCard {...item} />}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </ScrollView>

      <Overlay isVisible={isMenuVisible} onBackdropPress={toggleMenu} overlayStyle={styles.overlay}>
        <Text h4 style={styles.overlayTitle}>Filter & Sort</Text>
        <Button title="Most Popular" buttonStyle={styles.menuButton} />
        <Button title="Highest Rated" buttonStyle={styles.menuButton} />
        <Button title="Newest" buttonStyle={styles.menuButton} />
        <Button title="Lowest to Highest Points" buttonStyle={styles.menuButton} />
        <Button title="Saved Rewards" buttonStyle={styles.menuButton} />
        <Button title="Redeemed Rewards" buttonStyle={styles.menuButton} />
      </Overlay>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    flex: 1,
    marginRight: 10,
  },
  searchInputContainer: {
    backgroundColor: '#2A365A',
  },
  sectionTitle: {
    color: '#FFF',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  popularCard: {
    width: 200,
    borderRadius: 10,
    marginHorizontal: 0,
    marginLeft:20,
    marginBottom: 10,
  },
  recommendedCard: {
    backgroundColor: '#8A89C0',
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#000',
    textAlign: 'left',
  },
  cardInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  downloadInfo:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  cardPoints: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cardDownloads: {
    color: '#FFF',
    opacity: 0.7,
  },
  overlay: {
    backgroundColor: '#1E2746',
    width: '80%',
    padding: 20,
  },
  overlayTitle: {
    color: '#FFF',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#2A365A',
    marginBottom: 10,
  },
});

export default RewardsScreen;
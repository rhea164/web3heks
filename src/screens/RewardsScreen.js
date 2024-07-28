import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Text, Button, Icon, SearchBar, Card, Overlay } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Context as BalanceContext } from '../context/BalanceContext';
import axios from 'axios';

const RewardCard = ({ title, points, quantity_left, description, color }) => (
  <Card containerStyle={[styles.rewardCard, { backgroundColor: color }]}>
    <Card.Title style={styles.cardTitle}>{title}</Card.Title>
    <View style={styles.cardInfo}>
      <Text style={styles.cardPoints}>{points} Points</Text>
      <Text style={styles.cardQuantity}>Quantity Left: {quantity_left}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  </Card>
);

const RewardsScreen = () => {
  const [search, setSearch] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { state, updateBalance, updateContributions, updateBadges } = useContext(BalanceContext);

  const categories = ['class', 'food', 'merch', 'event', 'other'];

  const toggleMenu = () => setMenuVisible(!isMenuVisible);

  useEffect(() => {
    fetchRewards();
    checkAndUpdateBadges();
  }, [state.userContributions]);

  useEffect(() => {
    setFilteredRewards(
      rewards.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, rewards]);

  //10.1.98.18:5000
  //192.168.1.4:8000

  const purchaseCourse = (courseTitle, points) => {
    const cost = points/1000; // 0.25 SOL
    if (state.balance >= cost) {
      updateBalance(state.balance - cost);
      Alert.alert('Purchase Successful', `You have purchased "${courseTitle}" for ${cost} SOL`);
    } else {
      Alert.alert('Insufficient Balance', 'You do not have enough SOL to purchase this course');
    }
  };

  const checkAndUpdateBadges = () => {
    const newBadges = [...state.badges];
    if (state.userContributions >= 40 && !newBadges.includes('platinum')) {
      newBadges.push('platinum');
    } else if (state.userContributions >= 30 && !newBadges.includes('gold')) {
      newBadges.push('gold');
    } else if (state.userContributions >= 20 && !newBadges.includes('silver')) {
      newBadges.push('silver');
    } else if (state.userContributions >= 10 && !newBadges.includes('bronze')) {
      newBadges.push('bronze');
    }
    if (newBadges.length > state.badges.length) {
      updateBadges(newBadges);
      Alert.alert('New Badge Earned!', `You've earned a new badge: ${newBadges[newBadges.length - 1]}`);
    }
  };

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://10.1.98.18:5000/rewards');
      setRewards(removeDuplicates(response.data));
      setFilteredRewards(removeDuplicates(response.data));
      setSelectedCategory(''); // Reset the category when fetching all rewards
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch rewards');
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularRewards = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://10.1.98.18:5000/rewards/popular');
      setRewards(removeDuplicates(response.data));
      setFilteredRewards(removeDuplicates(response.data));
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch popular rewards');
    } finally {
      setLoading(false);
    }
  };

 

  const fetchRewardsByPoints = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://10.1.98.18:5000/rewards');
      const sortedRewards = removeDuplicates(response.data).sort((a, b) => a.points - b.points);
      setRewards(sortedRewards);
      setFilteredRewards(sortedRewards);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch rewards by points');
    } finally {
      setLoading(false);
    }
  };

  const fetchRewardsByQuantity = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://10.1.98.18:5000/rewards');
      const sortedRewards = removeDuplicates(response.data).sort((a, b) => a.quantity_left - b.quantity_left);
      setRewards(sortedRewards);
      setFilteredRewards(sortedRewards);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch rewards by quantity');
    } finally {
      setLoading(false);
    }
  };

  const fetchRewardsByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://10.1.98.18:5000/rewards/category?category=${category}`);
      setRewards(removeDuplicates(response.data));
      setFilteredRewards(removeDuplicates(response.data));
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch rewards by category');
    } finally {
      setLoading(false);
    }
  };

  const removeDuplicates = (data) => {
    const uniqueTitles = new Set();
    return data.filter(item => {
      if (!uniqueTitles.has(item.title)) {
        uniqueTitles.add(item.title);
        return true;
      }
      return false;
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setLoading(true);
    if (category) {
      fetchRewardsByCategory(category);
    } else {
      fetchRewards();
    }
    setMenuVisible(false);
  };

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
        <Icon name="menu" type="feather" color="#FFF" size={24} onPress={toggleMenu} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <FlatList
          data={filteredRewards}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => purchaseCourse(item.title, item.points)}>
          <RewardCard {...item} />
          </TouchableOpacity>
          
          )}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<Text h4 style={styles.sectionTitle}>Rewards</Text>}
        />
      )}

      <Overlay isVisible={isMenuVisible} onBackdropPress={toggleMenu} overlayStyle={styles.overlay}>
        <Text h4 style={styles.overlayTitle}>Filter & Sort</Text>
        <Button title="By Popularity" buttonStyle={styles.menuButton} onPress={fetchPopularRewards} />
        
        <Button title="By Points" buttonStyle={styles.menuButton} onPress={fetchRewardsByPoints} />
        <Button title="By Quantity" buttonStyle={styles.menuButton} onPress={fetchRewardsByQuantity} />
        <Text style={styles.pickerLabel}>By Category:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={handleCategoryChange}
          style={styles.picker}
        >
          <Picker.Item label="All Categories" value="" />
          {categories.map((category) => (
            <Picker.Item key={category} label={category.charAt(0).toUpperCase() + category.slice(1)} value={category} />
          ))}
        </Picker>
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
  rewardCard: {
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
  cardPoints: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cardQuantity: {
    color: '#FFF',
    opacity: 0.7,
  },
  cardDescription: {
    color: '#FFF',
    opacity: 0.9,
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
  pickerLabel: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#2A365A',
    color: '#FFF',
    marginBottom: 10,
  },
});

export default RewardsScreen;
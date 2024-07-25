import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Text, Card, Icon, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockVerifications = [
  {
    id: '1',
    title: 'Beach Cleanup Drive',
    status: 'posted',
    steps: ['posted', 'under review', 'verified', 'claim rewards!'],
  },
  {
    id: '2',
    title: 'Organizing a Park Cleanup',
    status: 'under review',
    steps: ['posted', 'under review', 'verified', 'claim rewards!'],
  },
  {
    id: '3',
    title: 'Donating School Supplies',
    status: 'verified',
    steps: ['posted', 'under review', 'verified', 'claim rewards!'],
  },
];

const VerificationCard = ({ verification }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150], // Adjust this value based on your content
  });

return (
    <TouchableOpacity onPress={toggleExpand}>
        <Card containerStyle={styles.verificationCard}>
            <View style={styles.cardContent}>
                <Text style={styles.verificationTitle}>{verification.title}</Text>
                <Icon
                    name={expanded ? "chevron-up" : "chevron-down"}
                    type="feather"
                    color="#FFF"
                    size={20}
                />
            </View>
            {expanded ? null : (
                <View style={styles.statusContainer}>
                    <View
                        style={[
                            styles.statusDot,
                            { backgroundColor: getStatusColor(verification.status) },
                        ]}
                    />
                    <Text style={styles.statusText}>{verification.status}</Text>
                </View>
            )}
            <Animated.View style={[styles.workflowContainer, { height }]}>
                {verification.steps.map((step, index) => (
                    <View key={index} style={styles.workflowStep}>
                        <View
                            style={[
                                styles.workflowDot,
                                { backgroundColor: getStepColor(step, verification.status) },
                            ]}
                        />
                        {index !== verification.steps.length - 1 && (
                            <View
                                style={[
                                    styles.workflowLine,
                                    { backgroundColor: getStepColor(step, verification.status) },
                                ]}
                            />
                        )}
                        <Text style={styles.workflowText}>{step}</Text>
                    </View>
                ))}
            </Animated.View>
        </Card>
    </TouchableOpacity>
);
};

const getStatusColor = (status) => {
  switch (status) {
    case 'posted': return '#4ECDC4';
    case 'under review': return '#FFD700';
    case 'verified': return '#32CD32';
    default: return '#FFF';
  }
};

const getStepColor = (step, currentStatus) => {
  const stepIndex = ['posted', 'under review', 'verified', 'claim rewards!'].indexOf(step);
  const currentIndex = ['posted', 'under review', 'verified', 'claim rewards!'].indexOf(currentStatus);
  return stepIndex <= currentIndex ? '#32CD32' : '#8899AA';
};

const VerificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/women/41.jpg' }}
          size="small"
        />
        <Text h4 style={styles.headerTitle}>Verification status</Text>
      </View>
      <FlatList
        data={mockVerifications}
        renderItem={({ item }) => <VerificationCard verification={item} />}
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
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    color: '#FFF',
    marginLeft: 10,
  },
  verificationCard: {
    backgroundColor: '#2A365A',
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verificationTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
  },
  workflowContainer: {
    overflow: 'hidden',
  },
  workflowStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  workflowDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  workflowLine: {
    position: 'absolute',
    left: 6,
    top: 12,
    bottom: -17,
    width: 2,
    backgroundColor: '#8899AA',
  },
  workflowText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default VerificationScreen;
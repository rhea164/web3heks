import 'react-native-get-random-values'; // Add this line
import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Icon, ListItem, Avatar } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
// import { Connection, PublicKey } from '@solana/web3.js';
import { getBalance } from '../../solana-program/src/utils/solanaUtils';
import { Context as BalanceContext } from '../context/BalanceContext';

// const USER_PUBLIC_KEY = '82owrUYBdJHA2DznNYYxqouCgQtoPVenFbRrg559bHX5';

const UserProfileScreen = () => {
  const { state: {balance,userContributions, badges}, setBalance } = useContext(BalanceContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const newBalance = await getBalance();
        setBalance(newBalance / 1e9); // Convert lamports to SOL
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    fetchBalance();
  }, []);

  // const [solBalance, setSolBalance] = useState(0);
  // const [transactions, setTransactions] = useState([]);

  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     try {
  //       const connection = new Connection("https://api.devnet.solana.com");
  //       const publicKey = new PublicKey(USER_PUBLIC_KEY);
  //       const balance = await connection.getBalance(publicKey);
  //       setSolBalance(balance / 1e9); // Convert lamports to SOL
  //     } catch (error) {
  //       console.error("Failed to fetch balance:", error);
  //     }
  //   };

  //   const fetchTransactions = async () => {
  //     try {
  //       const connection = new Connection("https://api.devnet.solana.com");
  //       const publicKey = new PublicKey(USER_PUBLIC_KEY);
  //       const transactionSignatures = await connection.getConfirmedSignaturesForAddress2(publicKey);
  //       setTransactions(transactionSignatures);
  //     } catch (error) {
  //       console.error("Failed to fetch transactions:", error);
  //     }
  //   };

  //   fetchBalance();
  //   fetchTransactions();
  // }, []);

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
          <Text style={styles.tokenPoints}>{balance.toFixed(2)}</Text>
          <Text style={styles.tokenLabel}>SOL Balance</Text>
          <Icon name="chevron-right" type="feather" color="#4A90E2" />
        </View>
        <View style={styles.badgeContainer}>
          <Text h4 style={styles.badgeTitle}>Your Badges</Text>
          {badges.map((badge, index) => (
            <View key={index} style={styles.badge}>
              <MaterialIcons name="stars" color="#FFD700" size={24} />
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))}
        </View>

        <Text h4 style={styles.contributionsLabel}>Total Contributions: {userContributions}</Text>

        <Text h4 style={styles.latestLabel}>Latest Transactions</Text>
        {transactions.map((tx, index) => (
          <ListItem key={index} containerStyle={styles.transactionItem}>
            <ListItem.Content>
              <ListItem.Title style={styles.transactionSignature}>{tx.signature}</ListItem.Title>
            </ListItem.Content>
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
    marginTop: 30,
  },
  greeting: {
    color: '#FFF',
    paddingRight: 100,
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
  transactionItem: {
    backgroundColor: '#2A365A',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  transactionSignature: {
    color: '#FFF',
  },
  badgeContainer: {
    backgroundColor: '#2A365A',
    borderRadius: 10,
    padding: 15,
    margin: 20,
  },
  badgeTitle: {
    color: '#FFF',
    marginBottom: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  badgeText: {
    color: '#FFF',
    marginLeft: 10,
  },
  contributionsLabel: {
    color: '#FFF',
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default UserProfileScreen;

// const USER_PUBLIC_KEY = '82owrUYBdJHA2DznNYYxqouCgQtoPVenFbRrg559bHX5';

// const UserProfileScreen = () => {
//   const [solBalance, setSolBalance] = useState(0);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         const connection = new Connection("https://api.devnet.solana.com");
//         const publicKey = new PublicKey(USER_PUBLIC_KEY);
//         const balance = await connection.getBalance(publicKey);
//         setSolBalance(balance / 1e9); // Convert lamports to SOL
//       } catch (error) {
//         console.error("Failed to fetch balance:", error);
//       }
//     };

//     fetchBalance();
//   }, []);
//   return (
 //   <View style={styles.container}>
  //     <ScrollView>
  //       <View style={styles.header}>
  //         <Avatar
  //           rounded
  //           source={{ uri: 'https://cdn1.iconfinder.com/data/icons/business-avatar-7/64/17_avatar_people_woman_business_businesswoman_woman_female_glasses_long_hair-1024.png' }}
  //           size="medium"
  //         />
  //         <Text h4 style={styles.greeting}>Hi, Karen!</Text>
  //         <Icon name="settings" type="feather" color="#FFF" />
  //       </View>

  //       <View style={styles.tokenContainer}>
  //         <MaterialIcons name="token" color="#4A90E2" size={30} />
  //         <Text style={styles.tokenPoints}>{solBalance.toFixed(2)}</Text>
  //         <Text style={styles.tokenLabel}>SOL Balance</Text>
  //         <Icon name="chevron-right" type="feather" color="#4A90E2" />
  //       </View>

  //       <Button
  //         title="Claim your badge!"
  //         buttonStyle={styles.badgeButton}
  //         titleStyle={styles.badgeButtonText}
  //       />

  //       <Text h4 style={styles.latestLabel}>Latest Transactions</Text>
  //       {transactions.map((tx, index) => (
  //         <ListItem key={index} containerStyle={styles.transactionItem}>
  //           <ListItem.Content>
  //             <ListItem.Title style={styles.transactionSignature}>{tx.signature}</ListItem.Title>
  //           </ListItem.Content>
  //         </ListItem>
  //       ))}
  //     </ScrollView>
  //   </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1E2746',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     marginTop:30
//   },
//   greeting: {
//     color: '#FFF',
//     paddingRight:100
//   },
//   tokenContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0E0C0',
//     borderRadius: 10,
//     padding: 15,
//     margin: 20,
//   },
//   tokenPoints: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color: '#4A90E2',
//   },
//   tokenLabel: {
//     fontSize: 16,
//     color: '#666',
//     marginLeft: 10,
//     flex: 1,
//   },
//   badgeButton: {
//     backgroundColor: '#4A90E2',
//     borderRadius: 10,
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   badgeButtonText: {
//     fontWeight: 'bold',
//   },
//   latestLabel: {
//     color: '#FFF',
//     marginLeft: 20,
//     marginBottom: 10,
//   },
//   courseItem: {
//     backgroundColor: '#2A365A',
//     borderRadius: 10,
//     marginHorizontal: 20,
//     marginBottom: 10,
//   },
//   courseTitle: {
//     color: '#FFF',
//   },
//   coursePoints: {
//     color: '#4A90E2',
//   },
// //   navbar: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     backgroundColor: '#2A365A',
// //     paddingVertical: 15,
// //     paddingBottom:30
// //   },
// });

// export default UserProfileScreen;

// {/* <View style={styles.navbar}>

// <Entypo name='home' size={24} color={'#8899AA'}/>
// <Feather name='check-circle' size={24} color={'#8899AA'}/>
// <Feather name='plus-circle' size={24} color={'#8899AA'}/>
// <Entypo name='wallet' size={24} color={'#8899AA'}/>
// <Feather name='user' size={24} color={'#FFF'}/>

 
// </View> */}
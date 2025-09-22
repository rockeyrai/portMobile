// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import PortfolioChart from "@/components/mainpage/portfolioChart";
import { PortfolioDisplay } from "@/components/mainpage/portfolioDisplay";
import { HoldingsList } from "@/components/mainpage/stockList";
import BottomNav from "@/components/mainpage/buttomNav";
import ProfileHeader from "@/components/mainpage/header";
import { chartDataExample } from "@/components/mainpage/data";

export default function WealthViewContainer() {
  // Fake data example
  const fakePortfolioData = {
    totalValue: 25000,
    totalProfit: 3500,
    todayChange: 200,
    todayChangePercent: 0.8,
    isLoading: false,
  };

  const fakeHoldings = [
    {
      id: "1",
      ticker: "AAPL",
      name: "Apple",
      units: 10,
      currentPrice: 175,
      purchasePrice: 150,
    },
    {
      id: "2",
      ticker: "TSLA",
      name: "Tesla",
      units: 5,
      currentPrice: 320,
      purchasePrice: 300,
    },
  ];

  const fakeSimulatedData = [
    { stockName: "Apple", simulatedPriceChange: 2, simulatedPriceChangePercentage: 1.2 },
    { stockName: "Tesla", simulatedPriceChange: -3, simulatedPriceChangePercentage: -0.9 },
  ];


  const isLoading = false;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileHeader/>

        <PortfolioDisplay
          totalValue={fakePortfolioData.totalValue}
          totalProfit={fakePortfolioData.totalProfit}
          todayChange={fakePortfolioData.todayChange}
          todayChangePercent={fakePortfolioData.todayChangePercent}
          isLoading={fakePortfolioData.isLoading}
        />
        <PortfolioChart chartData={chartDataExample} />
        <HoldingsList
          holdings={fakeHoldings}
          simulatedData={fakeSimulatedData}
          isLoading={isLoading}
        />


      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // space for BottomNav
    gap: 24,
  },
});

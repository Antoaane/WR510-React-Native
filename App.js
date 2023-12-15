import React from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Home from './views/Home';

import * as color from './styles/variables/colors';
import * as text from './styles/texts';
import * as layout from './styles/layouts';

export default function App() {
  return (
    <SafeAreaView style={StyleSheet.compose(
        layout.container, {
          backgroundColor: color.gray,
        }
      )}
    >
      <StatusBar style="auto" />
      <View style={layout.titleContainer}>
        <Text style={text.mainTitle}>Pocke Wiki</Text>
      </View>
      <Home />
    </SafeAreaView>
  );
}

// style={StyleSheet.compose(
//   variable, {
//   }
// )}
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeGreeting({
  userName ,
  greetingText,
  subtitleText = "Here's what's happening in your workspace.",
})
{
  const greeting =
    greetingText ||
    (() => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    })();

  return (
    <View style={greetingStyles.container}>
      <Text style={greetingStyles.title}>
        {greeting}, {userName}
      </Text>
      <Text style={greetingStyles.subtitle}>{subtitleText}</Text>
    </View>
  );
}

const greetingStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#132B2C',
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14.5,
    fontWeight: '400',
    color: '#687E7B',
    marginTop: 6,
    lineHeight: 20,
  },
});

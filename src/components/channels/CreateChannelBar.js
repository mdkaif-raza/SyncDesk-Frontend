import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * CreateChannelBar
 * Bottom full-width rounded pill button (border-radius: 9999px)
 * with centered label and inline plus glyph
 */
export default function CreateChannelBar({
  onCreatePress,
}) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.createButton,
          pressed && styles.createButtonPressed,
        ]}
        onPress={onCreatePress}
        accessibilityRole="button"
        accessibilityLabel="Create channel"
      >
        <Text style={styles.plusIcon}>+</Text>
        <Text style={styles.buttonText}>Create channel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingBottom: 4,
  },
  createButton: {
    backgroundColor: '#173E3B',
    height: 52,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#173E3B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 3,
  },
  createButtonPressed: {
    backgroundColor: '#133532',
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  plusIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '400',
    marginRight: 8,
    lineHeight: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

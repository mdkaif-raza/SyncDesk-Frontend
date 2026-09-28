import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * NewMessageAction
 * Bottom action card and floating action button for composing new direct message
 */
export default function NewMessageAction({
  onComposePress,
}) {
  return (
    <View style={{ marginTop: 8, paddingBottom: 16 }}>
      {/* Floating Action Button (FAB) Row */}
      <View
        style={{
          alignItems: 'flex-end',
          marginBottom: 16,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            styles.center,
            {
              backgroundColor: '#1B3E3C',
              borderColor: '#F5EFE6',
              borderRadius: 26,
              borderWidth: 3,
              elevation: 6,
              height: 52,
              opacity: pressed ? 0.85 : 1,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              width: 52,
            },
          ]}
          onPress={onComposePress}
          accessibilityRole="button"
          accessibilityLabel="New direct message"
        >
          <Text style={{ fontSize: 22 }}>✏️</Text>
        </Pressable>
      </View>

      {/* Sheet handle bar indicator */}
      <View
        style={[
          styles.center,
          styles.mb10,
        ]}
      >
        <View
          style={{
            backgroundColor: '#DDD5C4',
            borderRadius: 2,
            height: 4,
            width: 36,
          }}
        />
      </View>

      {/* New Direct Message Card */}
      <Pressable
        style={({ pressed }) => [
          styles.rowBetween,
          styles.pd16,
          {
            alignItems: 'center',
            backgroundColor: '#EBE4D6',
            borderRadius: 18,
            opacity: pressed ? 0.88 : 1,
          },
        ]}
        onPress={onComposePress}
      >
        <View style={[styles.row, { alignItems: 'center' }]}>
          <View
            style={[
              styles.center,
              styles.mr12,
              {
                backgroundColor: '#1B3E3C',
                borderRadius: 14,
                height: 30,
                width: 30,
              },
            ]}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '600',
                lineHeight: 20,
              }}
            >
              +
            </Text>
          </View>

          <Text
            style={[
              styles.ts15,
              styles.bold,
              {
                color: '#132B2C',
              },
            ]}
          >
            New direct message
          </Text>
        </View>

        <Text
          style={{
            color: '#8A9995',
            fontSize: 20,
            fontWeight: '500',
          }}
        >
          ›
        </Text>
      </Pressable>
    </View>
  );
}

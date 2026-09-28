import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * MessageSearch
 * Clean search input for filtering direct messages & contacts
 */
export default function MessageSearch({
  value,
  onChangeText,
  placeholder = 'Search conversations...',
}) {
  return (
    <View
      style={[
        styles.row,
        styles.pdh14,
        styles.mb16,
        {
          alignItems: 'center',
          backgroundColor: '#EAE3D4',
          borderRadius: 16,
          height: 46,
        },
      ]}
    >
      <Text style={[styles.mr10, { color: '#8A9995', fontSize: 16 }]}>
        🔍
      </Text>
      <TextInput
        style={[
          styles.flex1,
          styles.ts14,
          {
            color: '#132B2C',
            height: '100%',
            padding: 0,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8A9995"
      />
      {value && value.length > 0 && (
        <Pressable
          style={({ pressed }) => [
            styles.center,
            styles.pd4,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={() => onChangeText && onChangeText('')}
        >
          <Text style={{ color: '#8A9995', fontSize: 14, fontWeight: '700' }}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}


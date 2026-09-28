import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const THEME = {
  darkSlate: '#17383A',
  cardBg: '#FFFDF8',
  inputBgDisabled: '#EFECE6',
  mutedText: '#788383',
  border: '#DED9CE',
  errorRed: '#C85B59',
  deepTeal: '#245F60',
};

/**
 * ProfileInput
 * Styled input card with left icon, top label, text input, read-only state, and helper/error text.
 */
export function ProfileInput({
  icon,
  label,
  value,
  onChangeText,
  placeholder,
  readOnly = false,
  helperText,
  errorMessage,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) {
  return (
    <View style={styles.container}>
      {/* Input Card Container */}
      <View
        style={[
          styles.inputCard,
          readOnly ? styles.disabledCard : styles.activeCard,
          !!errorMessage && styles.errorCard,
        ]}
      >
        {/* Left Icon */}
        <View style={styles.iconContainer}>
          <Text
            style={[
              styles.iconSymbol,
              readOnly && styles.disabledIconSymbol,
            ]}
          >
            {icon}
          </Text>
        </View>

        {/* Input Details */}
        <View style={styles.inputDetails}>
          {!!label && (
            <Text style={styles.inputLabel}>{label}</Text>
          )}
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={THEME.mutedText}
            editable={!readOnly}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            style={[
              styles.textInput,
              readOnly && styles.disabledTextInput,
            ]}
          />
        </View>
      </View>

      {/* Helper Text or Validation Error Message */}
      {!!errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : !!helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  inputCard: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#17383A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  activeCard: {
    backgroundColor: THEME.cardBg,
    borderColor: THEME.border,
  },
  disabledCard: {
    backgroundColor: THEME.inputBgDisabled,
    borderColor: THEME.border,
  },
  errorCard: {
    borderColor: THEME.errorRed,
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconSymbol: {
    fontSize: 18,
    color: THEME.darkSlate,
  },
  disabledIconSymbol: {
    color: THEME.mutedText,
  },
  inputDetails: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: THEME.mutedText,
    marginBottom: 2,
  },
  textInput: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.darkSlate,
    padding: 0,
    height: 22,
  },
  disabledTextInput: {
    color: THEME.mutedText,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 11,
    color: THEME.mutedText,
    marginTop: 4,
    marginLeft: 6,
  },
  errorText: {
    fontSize: 11,
    color: THEME.errorRed,
    marginTop: 4,
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default ProfileInput;

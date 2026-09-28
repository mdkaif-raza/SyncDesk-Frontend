import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../colors/colors';

export const styles = StyleSheet.create({
  // Flex & Alignment
  flex1: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  itemsCenter: { alignItems: 'center' },
  justifyCenter: { justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowCenter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },

  // Spacing - Padding Horizontal
  pdh8: { paddingHorizontal: 8 },
  pdh12: { paddingHorizontal: 12 },
  pdh16: { paddingHorizontal: 16 },
  pdh24: { paddingHorizontal: 24 },

  // Spacing - Padding Vertical
  pdv4: { paddingVertical: 4 },
  pdv8: { paddingVertical: 8 },
  pdv10: { paddingVertical: 10 },
  pdv12: { paddingVertical: 12 },
  pdv14: { paddingVertical: 14 },
  pdv16: { paddingVertical: 16 },

  // Spacing - Padding Specific
  pdt8: { paddingTop: 8 },
  pdt12: { paddingTop: 12 },
  pdt14: { paddingTop: 14 },
  pdt16: { paddingTop: 16 },
  pdb12: { paddingBottom: 12 },
  pdb16: { paddingBottom: 16 },
  pdb24: { paddingBottom: 24 },
  pdb32: { paddingBottom: 32 },
  pd12: { padding: 12 },
  pd14: { padding: 14 },
  pd16: { padding: 16 },

  // Spacing - Margin Top
  mt2: { marginTop: 2 },
  mt4: { marginTop: 4 },
  mt8: { marginTop: 8 },
  mt10: { marginTop: 10 },
  mt14: { marginTop: 14 },
  mt18: { marginTop: 18 },
  mt20: { marginTop: 20 },
  mt24: { marginTop: 24 },

  // Spacing - Margin Bottom
  mb3: { marginBottom: 3 },
  mb6: { marginBottom: 6 },
  mb8: { marginBottom: 8 },
  mb10: { marginBottom: 10 },
  mb12: { marginBottom: 12 },
  mb14: { marginBottom: 14 },
  mb16: { marginBottom: 16 },
  mb20: { marginBottom: 20 },
  mb24: { marginBottom: 24 },
  mb28: { marginBottom: 28 },

  // Spacing - Margin Horizontal
  mr4: { marginRight: 4 },
  mr6: { marginRight: 6 },
  mr8: { marginRight: 8 },
  mr10: { marginRight: 10 },
  ml4: { marginLeft: 4 },
  ml6: { marginLeft: 6 },
  ml8: { marginLeft: 8 },
  ml10: { marginLeft: 10 },

  // Typography - Font Sizes
  ts11: { fontSize: 11 },
  ts12: { fontSize: 12 },
  ts13: { fontSize: 13 },
  ts14: { fontSize: 14 },
  ts15: { fontSize: 15 },
  ts16: { fontSize: 16 },
  ts20: { fontSize: 20 },
  ts22: { fontSize: 22 },
  ts28: { fontSize: 28 },
  ts32: { fontSize: 32 },

  // Typography - Weights & Family
  bold: {
    fontWeight: '700',
    fontFamily: Platform.select({
      ios: 'Plus Jakarta Sans',
      android: 'PlusJakartaSans-Bold',
      default: 'system-ui, sans-serif',
    }),
  },
  semiBold: {
    fontWeight: '600',
    fontFamily: Platform.select({
      ios: 'Plus Jakarta Sans',
      android: 'PlusJakartaSans-SemiBold',
      default: 'system-ui, sans-serif',
    }),
  },
  medium: {
    fontWeight: '500',
    fontFamily: Platform.select({
      ios: 'Plus Jakarta Sans',
      android: 'PlusJakartaSans-Medium',
      default: 'system-ui, sans-serif',
    }),
  },
  regular: {
    fontWeight: '400',
    fontFamily: Platform.select({
      ios: 'Plus Jakarta Sans',
      android: 'PlusJakartaSans-Regular',
      default: 'system-ui, sans-serif',
    }),
  },

  // Border Radii
  rounded4: { borderRadius: 4 },
  rounded8: { borderRadius: 8 },
  rounded12: { borderRadius: 12 },
  rounded14: { borderRadius: 14 },
  rounded18: { borderRadius: 18 },
  rounded20: { borderRadius: 20 },
  rounded24: { borderRadius: 24 },
  roundedFull: { borderRadius: 9999 },

  // Backgrounds
  screenBg: { backgroundColor: Colors.screenBg },
});

export const globalStyles = styles;
export default styles;

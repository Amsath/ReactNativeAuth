import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PrimaryButton: React.FC<{ title: string; onPress: () => void; disabled?: boolean }> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity style={[styles.btn, disabled && { opacity: 0.6 }]} onPress={onPress} disabled={disabled}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: { backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  txt: { color: 'white', fontWeight: '700' },
});

export default PrimaryButton;
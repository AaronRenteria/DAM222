import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet } from 'react-native';

export default function KeyboardDismissView({ children, style }) {
  return (
    <KeyboardAvoidingView
      style={[styles.contenedor, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Pressable style={styles.contenedor} onPress={Keyboard.dismiss} accessible={false}>
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
});

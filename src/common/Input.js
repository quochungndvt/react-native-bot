import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const HFInput = ({ label, value, onChangeText, placeholder }) => {
  const { containerStyle, labelStyle, inputStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>
        {label}
      </Text>
      <TextInput
      autoFocus
      style={inputStyle}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: '#fff',
    width: 300,
    height: 40,
    lineHeight: 40,
    borderRadius: 20,
    borderWidth: 0,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#999',
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: 10,
    flex: 1
  },
  containerStyle: {
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
export { HFInput };

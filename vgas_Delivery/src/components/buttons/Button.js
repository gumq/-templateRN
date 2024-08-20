import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ children, style, disabled, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      {...{ disabled }}
      activeOpacity={0.85}
      style={[style, disabled && styles.disabled]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export default Button;

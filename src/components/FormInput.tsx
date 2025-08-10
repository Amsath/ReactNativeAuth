import React from "react";
import { View, TextInput, Text, StyleSheet, TextInputProps } from "react-native";

type Props = TextInputProps & {
  label?: string;
  error?: string | null;
};

const FormInput: React.FC<Props> = ({ label, error, ...rest }) => {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={[styles.input, error ? styles.inputError : null]} {...rest} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { marginBottom: 6, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#f44336",
  },
  errorText: {
    marginTop: 6,
    color: "#f44336",
  },
});

export default FormInput;

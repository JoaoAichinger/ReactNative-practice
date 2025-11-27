// src/components/SearchBar.js
import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Buscar filmes...",
}) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      {value?.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close-circle" size={18} style={styles.clearIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 6,
    color: "#777",
  },
  input: {
    flex: 1,
    height: 40,
  },
  clearIcon: {
    marginLeft: 6,
    color: "#777",
  },
});

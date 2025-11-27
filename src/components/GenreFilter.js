// src/components/GenreFilter.js
import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";

const GENRES = [
  { id: null, name: "Populares" }, // para resetar o filtro
  { id: 28, name: "Ação" },
  { id: 35, name: "Comédia" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Terror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Ficção" },
];

export default function GenreFilter({ selectedGenre, onSelectGenre }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {GENRES.map((genre) => {
          const isActive = selectedGenre === genre.id;
          return (
            <TouchableOpacity
              key={genre.id ?? "popular"}
              style={[styles.tag, isActive && styles.tagActive]}
              onPress={() => onSelectGenre(genre.id)}
            >
              <Text style={[styles.tagText, isActive && styles.tagTextActive]}>
                {genre.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  tagActive: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  tagText: {
    fontSize: 14,
    color: "#333",
  },
  tagTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});

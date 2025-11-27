import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { getPopularMovies } from "../services/api";
import { getImageUrl } from "../config/tmdb";

export default function MovieListScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPopularMovies().then(data => setMovies(data.results));
  }, []);

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Detalhes', { movieId: item.id })}
        >
          <Image
            source={{ uri: getImageUrl(item.poster_path) }}
            style={styles.poster}
          />
          <Text style={styles.movieTitle}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: { padding: 10, alignItems: 'center' },
  card: { marginBottom: 20, alignItems: 'center', width: 150 },
  poster: { width: 150, height: 225, borderRadius: 8, marginBottom: 8 },
  movieTitle: { fontSize: 16, textAlign: 'center', fontWeight: '500' },
});

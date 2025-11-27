import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { getMovieDetails } from "../services/api";
import { getImageUrl } from "../config/tmdb";

export default function MovieDetailsScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return null;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: getImageUrl(movie.backdrop_path, 'w1280') }}
        style={styles.backdrop}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  backdrop: { width: '100%', height: 200, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
  overview: { fontSize: 16, lineHeight: 22 },
});

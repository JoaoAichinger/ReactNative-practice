import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { getPopularMovies, getMovieDetails } from "./src/services/api";
import { getImageUrl } from "./src/config/tmdb";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);

  // Carregar filmes populares ao abrir o app
  useEffect(() => {
    getPopularMovies().then(data => setMovies(data.results));
  }, []);

  // Quando tocar num item, buscar detalhes da API
  const openDetails = async (id) => {
    const details = await getMovieDetails(id);
    setSelected(details);
  };

  // Tela de detalhes
  if (selected)
    return (
      <View style={styles.detailsContainer}>
        <TouchableOpacity onPress={() => setSelected(null)}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: getImageUrl(selected.backdrop_path, "w1280") }}
          style={styles.backdrop}
        />

        <Text style={styles.title}>{selected.title}</Text>
        <Text style={styles.overview}>{selected.overview}</Text>
      </View>
    );

  // Tela de lista
  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => openDetails(item.id)}>
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
  listContainer: {
    padding: 10,
    alignItems: "center",
  },
  card: {
    marginBottom: 20,
    alignItems: "center",
    width: 150,
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    fontSize: 18,
    marginBottom: 10,
  },
  backdrop: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    lineHeight: 22,
  },
});

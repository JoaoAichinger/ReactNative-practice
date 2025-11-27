// src/screens/MovieListScreen.js
import React, { useEffect, useState } from "react";
import {FlatList,TouchableOpacity,Text,Image,StyleSheet,ActivityIndicator,View,} from "react-native";
import {getPopularMovies,getMoviesByGenre,searchMovies,} from "../services/api";
import { getImageUrl } from "../config/tmdb";
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";

export default function MovieListScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState("popular"); // "popular" | "genre" | "search"

  // Carrega filmes iniciais
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      const data = await getPopularMovies();
      setMovies(data?.results ?? []);
      setMode("popular");
      setSelectedGenre(null);
    } catch (error) {
      console.log("Erro ao carregar filmes populares:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMoviesByGenre = async (genreId) => {
    if (genreId === null) {
      // clicou em "Populares"
      await loadPopularMovies();
      return;
    }

    try {
      setLoading(true);
      const data = await getMoviesByGenre(genreId);
      setMovies(data?.results ?? []);
      setMode("genre");
      setSelectedGenre(genreId);
      setSearchQuery(""); // limpa busca quando troca de gênero
    } catch (error) {
      console.log("Erro ao carregar filmes por gênero:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query) {
      // se apagar a busca, volta para o contexto atual:
      if (selectedGenre) {
        await loadMoviesByGenre(selectedGenre);
      } else {
        await loadPopularMovies();
      }
      return;
    }

    try {
      setLoading(true);
      const data = await searchMovies(query);
      setMovies(data?.results ?? []);
      setMode("search");
    } catch (error) {
      console.log("Erro ao buscar filmes:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Barra de busca */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch}
      />

      {/* Filtro por gênero (tags) */}
      <GenreFilter
        selectedGenre={selectedGenre}
        onSelectGenre={loadMoviesByGenre}
      />

      {/* Lista de filmes */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Detalhes", { movieId: item.id })
            }
          >
            {item.poster_path && (
              <Image
                source={{ uri: getImageUrl(item.poster_path, "w500") }}
                style={styles.poster}
              />
            )}
            <Text style={styles.movieTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text>Nenhum filme encontrado.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "rgba(0, 26, 51, 1)",
    
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginBottom: 20,
    width: "48%",
    alignItems: "center",
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3, // mantém proporção 2:3
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 1)",
  },
});

import axios from 'axios';
import { TMDB_CONFIG, getImageUrl } from '../config/tmdb';

// Instância do axios configurada
const api = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  params: {
    api_key: TMDB_CONFIG.API_KEY,
    language: TMDB_CONFIG.DEFAULT_LANGUAGE,
  },
});

// Função para buscar filmes populares
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    throw error;
  }
};

// Função para buscar filmes por gênero
export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get('/discover/movie', {
      params: { 
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes por gênero:', error);
    throw error;
  }
};

// Função para buscar detalhes de um filme específico
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    throw error;
  }
};

// Função para buscar filmes por nome
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query, page }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    throw error;
  }
};

// Exportar função para construir URL da imagem
export { getImageUrl };

export default api;


// Configurações da API do TMDB
export const TMDB_CONFIG = {
  
  API_KEY: '04d3ae7190963b446f380b32bfeb804c',
  
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  
  IMAGE_SIZES: {
    POSTER: 'w500',
    BACKDROP: 'w1280',
    PROFILE: 'w185'
  },
  

  DEFAULT_LANGUAGE: 'pt-BR'
};


export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
};

export default TMDB_CONFIG;


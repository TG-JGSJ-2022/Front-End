const SERVER_PORT = '5000';
const NEURAL_NETWORK_PORT = '8080';

export const environment = {
  production: false,
  model_endpoint: `http://localhost:${SERVER_PORT}/recibir-imagen`,
  result_endpoint: `http://localhost:${SERVER_PORT}/resultado`,
  api_login: `http://localhost:${SERVER_PORT}/login`,
  api_logout: `http://localhost:${SERVER_PORT}/logout`,
  api_courses: `http://localhost:${SERVER_PORT}/courses`,
  api_course_sessions: `http://localhost:${SERVER_PORT}/course-sessions`,
  api_sesion_data : `http://localhost:${SERVER_PORT}/info_sesion`
};

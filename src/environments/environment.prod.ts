const port = '5000';
const NEURAL_NETWORK_PORT = '8080';
// const url = "http://servidorflaskprueba-env-1.eba-2wecp7sf.us-east-1.elasticbeanstalk.com"
const url = "http://localhost:5000"
export const environment = {
  production: false,
  model_endpoint: `${url}/recibir-imagen`,
  result_endpoint: `${url}/resultado`,
  api_login: `${url}/login`,
  api_logout: `${url}/logout`,
  api_courses: `${url}/courses`,
  api_course_sessions: `${url}/course-sessions`,
  api_sesion_data : `${url}/info_sesion`
};

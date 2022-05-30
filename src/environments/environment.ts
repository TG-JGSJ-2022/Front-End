// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const port = '5000';
const NEURAL_NETWORK_PORT = '8080';
//const url = "http://servidorflaskprueba-env-1.eba-2wecp7sf.us-east-1.elasticbeanstalk.com"
const url = "http://localhost:5000"
export const environment = {
  production: false,
  model_endpoint: `${url}/recibir-imagen`,
  result_endpoint: `${url}/resultado`,
  api_login: `${url}/login`,
  api_logout: `${url}/logout`,
  api_courses: `${url}/courses`,
  api_course_sessions: `${url}/course-sessions`,
  api_sesion_data : `${url}/info_sesion`,
  api_profesor_sesion: `${url}/profesor-sesion`,
  api_end_sesion: `${url}/finalizar-sesion`
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

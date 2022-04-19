// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const SERVER_PORT = '5000';
const NEURAL_NETWORK_PORT = '8080';

export const environment = {
  production: false,
  model_endpoint: `http://localhost:${SERVER_PORT}/recibir-imagen`,
  result_endpoint: `http://localhost:${SERVER_PORT}/resultado`,
  api_login: `http://localhost:${SERVER_PORT}/login`,
  api_courses: `http://localhost:${SERVER_PORT}/courses`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // En desarrollo usamos el proxy: las peticiones a '/api' se redirigen a la API remota
  apiBase: '/api',
  key: '61cc90d493ffb12ef68c193c60512e3e3ee7f28d78b4d520e12229f804d5a7a1' //aqui debes colocar tu key cuando esta deje de funconar.
};

// Mantener export por compatibilidad
export const API_BASE = environment.apiBase;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

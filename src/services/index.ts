// ./src/services/index.ts

// Apis
export { default as apiRebox } from './apis/apiRebox';
export { default as apiViaCep } from './apis/apiViaCep';
export { default as apiIbge } from './apis/apiIbge';
export { default as apiGoogleMaps } from './apis/apiGoogleMaps';

// Serviços de manipulação do local ou session storage
export { default as sessionStorageService } from './storage/session/sessionStorageService';
export { default as recoverPasswordStorageService } from './storage/recoverPassword/recoverPasswordStorageService';
export { default as addressStorageService } from './storage/address/addressStorageService';
export { default as newContractStorageService } from './storage/contract/newContractStorageService';

// ./src/pages/index.ts

// Telas de exceção
export { default as NotFound } from './exception/NotFound';
export { default as Maintenance } from './exception/Maintenance';

// Telas públicas - sem necessidade de autenticação
export { default as SignIn } from './public/SignIn';
export { default as RecoverPassword } from './public/RecoverPassword';
export { default as Register } from './public/Register';
// export { default as Assistance } from './public/Assistance';

// Telas privadas
export { default as Panel } from './private/Panel';
export { default as Vehicles } from './private/Vehicles';
export { default as Contracts } from './private/Contracts';
export { default as ContractNew } from './private/Contracts/New';
export { default as Charges } from './private/Charges';
export { default as Called } from './private/Called';
export { default as Profile } from './private/Profile';
export { default as Settings } from './private/Settings';
export { default as Help } from './private/Help';
export { default as CalledNew } from './private/Called/New';
export { default as CalledShow } from './private/Called/Show';
// export { default as ContractShow } from './private/Contract/Show';
// export { default as Notification } from './private/Notification';
// export { default as VehicleShow } from './private/Vehicle/Show';

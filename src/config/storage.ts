// ./src/config/storage.ts

// Usuário
const REBOX_USER_CODE_WHO_INDICATED = '@Rebox:User:code_who_indicated';
const REBOX_USER_ENVIRONMENT = '@Rebox:User:environment';

// Sessão
const REBOX_SESSION_TOKEN = '@Rebox:Session:token'; // Token de acesso do usuário logado
const REBOX_SESSION_ID = '@Rebox:Session:id'; // ID da sessão que foi aberta
const REBOX_SESSION_LOGGED_IN_USER = '@Rebox:Session:User'; // Dados do usuário logado
const REBOX_SESSION_REMEMBER = '@Rebox:Session:rememberMe'; // Controla se a sessão o login deve ser lembrado

// Recuperação de senha
const REBOX_RECOVER_PASSWORD = '@Rebox:RecoverPassword'; // Dados da recuperação de senha vindas da api
const REBOX_RECOVER_PASSWORD_USER_EMAIL = '@Rebox:RecoverPassword:User:email';

// Configurações
const REBOX_SETTING_THEME = '@Rebox:Setting:theme';

// Endereço do usuário
const REBOX_USER_ADDRESSES = '@Rebox:Addresses';

// Chamado
const REBOX_CALLED = '@Rebox:Called';
const REBOX_CALLED_LIST_TOTAL = '@Rebox:Called:List:total';
const REBOX_CALLED_SOURCE_ADDRESS = '@Rebox:Called:origin';
const REBOX_CALLED_DESTINATION_ADDRESS = '@Rebox:Called:destination';
const REBOX_CALLED_ADDRESS_ORIGIN = '@Rebox:CalledAddress:Origin';
const REBOX_CALLED_ADDRESS_DESTINATION = '@Rebox:CalledAddress:Destination';

// Venda/Contrato
const REBOX_SALE_NEW_PRODUCT = '@Rebox:Sale:New:Product';
const REBOX_SALE_NEW_CART = '@Rebox:Sale:New:Cart';
const REBOX_SALE_DISCOUNT_COUPON = '@Rebox:Sale:DiscountCoupon';
const REBOX_SALE_NEW_CUSTOMER = '@Rebox:Sale:New:Customer';
const REBOX_SALE_NEW_VEHICLE = '@Rebox:Sale:New:Vehicle';
const REBOX_SALE_NEW_PAYMENT = '@Rebox:Sale:New:Payment';

// Paginação
const REBOX_PAGINATION_VEHICLES_LIST_PAGE = '@Rebox:Pagination:Vehicles:page';
const REBOX_PAGINATION_CONTRACTS_LIST_PAGE = '@Rebox:Pagination:Contracts:page';
const REBOX_PAGINATION_CALLED_LIST_PAGE = '@Rebox:Pagination:Called:page';
const REBOX_PAGINATION_CHARGES_LIST_PAGE = '@Rebox:Pagination:Charges:page';

// Filtros
const REBOX_FILTERS_CUSTOMERS_LIST = '@Rebox:Filters:Customers:list';
const REBOX_FILTERS_AFFILIATES_LIST = '@Rebox:Filters:Affiliates:list';
const REBOX_FILTERS_PROVIDERS_LIST = '@Rebox:Filters:Providers:list';
const REBOX_FILTERS_CONTRACTS_LIST = '@Rebox:Filters:Contracts:list';
const REBOX_FILTERS_CONTRACTS_LIST_BAD_DEBT =
  '@Rebox:Filters:Contracts:currentPaymentsStatus';
const REBOX_FILTERS_CALLED_LIST = '@Rebox:Filters:Called:list';
const REBOX_FILTERS_RESCUES_LIST = '@Rebox:Filters:Rescues:list';
const REBOX_FILTERS_CHARGES_LIST = '@Rebox:Filters:Charges:list';

export default {
  REBOX_USER_CODE_WHO_INDICATED,
  REBOX_USER_ENVIRONMENT,
  REBOX_SESSION_TOKEN,
  REBOX_SESSION_ID,
  REBOX_SESSION_LOGGED_IN_USER,
  REBOX_SESSION_REMEMBER,
  REBOX_RECOVER_PASSWORD,
  REBOX_RECOVER_PASSWORD_USER_EMAIL,
  REBOX_SETTING_THEME,
  REBOX_USER_ADDRESSES,
  REBOX_CALLED,
  REBOX_CALLED_LIST_TOTAL,
  REBOX_CALLED_SOURCE_ADDRESS,
  REBOX_CALLED_DESTINATION_ADDRESS,
  REBOX_CALLED_ADDRESS_ORIGIN,
  REBOX_CALLED_ADDRESS_DESTINATION,
  REBOX_SALE_NEW_PRODUCT,
  REBOX_SALE_NEW_CART,
  REBOX_SALE_DISCOUNT_COUPON,
  REBOX_SALE_NEW_CUSTOMER,
  REBOX_SALE_NEW_VEHICLE,
  REBOX_SALE_NEW_PAYMENT,
  REBOX_PAGINATION_CONTRACTS_LIST_PAGE,
  REBOX_PAGINATION_CALLED_LIST_PAGE,
  REBOX_PAGINATION_VEHICLES_LIST_PAGE,
  REBOX_PAGINATION_CHARGES_LIST_PAGE,
  REBOX_FILTERS_CUSTOMERS_LIST,
  REBOX_FILTERS_AFFILIATES_LIST,
  REBOX_FILTERS_PROVIDERS_LIST,
  REBOX_FILTERS_CONTRACTS_LIST,
  REBOX_FILTERS_CONTRACTS_LIST_BAD_DEBT,
  REBOX_FILTERS_CALLED_LIST,
  REBOX_FILTERS_RESCUES_LIST,
  REBOX_FILTERS_CHARGES_LIST,
};

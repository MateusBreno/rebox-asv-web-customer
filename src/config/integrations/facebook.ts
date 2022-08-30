// ./src/config/facebook.ts
export default {
  pixels: {
    salesMonitoring: {
      pixelId: '934629557213531',
      advancedMatching: {
        fn: 'rebox', // Primeiro nome em letra minúscula
        ln: 'marketing', // Sobrenome em letra minúscula
        em: 'faleconosco@rebox.com.br', // O email
        db: '20210119', // Data de nascimento dígitos apenas com ano de nascimento, mês e dia
        ge: 'm', // Gênero uma única letra minúscula "f" ou "m", se desconhecido, deixe em branco
        ph: '551140033132', // Telefone dígitos incluindo apenas o código do país e código de área
        country: 'br', // Código do país com duas letras minúsculas
        ct: 'barradatijuca', // Cidade minúsculas com quaisquer espaços removidos
        st: 'rj', // Código do estado ou província de duas letras minúsculas
        zp: '22640102', // CEP ou Código postal
      },
      options: {
        autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
        debug: false, // enable logs
      },
      track: {
        event: 'Purchase',
        value: { currency: 'BRL', value: 30.0 },
      },
    },
  },
};

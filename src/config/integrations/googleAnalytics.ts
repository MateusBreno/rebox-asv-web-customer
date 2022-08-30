export default {
  pixels: {
    salesMonitoring: {
      gaTrackingID: 'UA-186988377-1', // Requerido. ID de acompanhamento do GA como UA-000000-01.
      options: {
        debug: false, // Opcional. Se definido como true, emitirá feedback adicional para o console.
        titleCase: true, // Opcional. O padrão é true. Se definido como false, as strings não serão convertidas para maiúsculas e minúsculas antes de serem enviadas para o GA.
        // gaOptions: {
        //   userId: '',
        // },
        // gaAddress: '', // Opcional. Se você estiver hospedando seu analytics.js, você pode especificar o URL para ele aqui.
        alwaysSendToDefaultTracker: true, // Opcional. O padrão é true. Se definido false e usando vários rastreadores, o evento não será enviado ao rastreador padrão.
        testMode: false, // Opcional. O padrão é false. Ativa o modo de teste.
        standardImplementation: false, // Opcional. O padrão é false. Permite carregar o GA como o Google espera.
        useExistingGa: false, // Opcional. Ignora a chamada para window.ga(), supondo que você a tenha executado manualmente.
        redactEmail: true, // Opcional. O padrão é true. Habilita a redação de um email como a string que está em "Event Category" e "Event Action".
      },
    },
  },
};

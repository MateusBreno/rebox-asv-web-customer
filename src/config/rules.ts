// ./src/config/rules.ts
export default {
  rebox: {
    default: {
      systemStartDate: '2021-03-20',
    },
    session: {
      limitOfDaysToExpireAccess: 3, // Limite em dias para expirar o acesso salvo
    },
    charge: {
      minimumAmountAcceptedInCharges: 5, // Valor mínimo aceito em cobranças
      maximumAmountAcceptedInCharges: 1000, // Valor máximo
      maximumDaysForCompensation: 3, // Prazo máximo de dias úteis para compensar uma cobrança
    },
    called: {
      maximumHoursForArrivalAtOrigin: 2, // Limite máximo de horas para a chegada do prestador
      maximumHoursToMeetTheDestination: 2, // Limite máximo de horas para prestador cumprir o destino
    },
    contract: {
      meetGracePeriodInDays: 3, // Define o prazo de carência que o cliente deve aguardar após o pagamento do contrato
    },
    user: {
      referralCode: {
        minimumCharacterSize: 13, // Define o tamanho mínimo do código de indicação
      },
      password: {
        minimumCharacterSize: 6, // Define o tamanho mínimo da senha
      },
    },
    pagination: {
      vehicles: {
        itemLimit: 15, // Define o limite de itens (per_page) a ser exibido nas listagens do sistema
      },
      contracts: {
        itemLimit: 15,
      },
      called: {
        itemLimit: 15,
      },
      charges: {
        itemLimit: 15,
      },
    },
    indication: {
      cash_bonus: {
        fixed: {
          level_one: {
            min_amount: 15 /* Deve ser maior ou igual */,
            max_amount: 30 /* Deve ser menor */,
            value: 15,
          },
          level_two: {
            min_amount: 30 /* Deve ser maior ou igual */,
            max_amount: 45 /* Deve ser menor */,
            value: 25,
          },
          level_three: {
            min_amount: 45 /* Deve ser maior ou igual */,
            max_amount: 60 /* Deve ser menor */,
            value: 35,
          },
          level_four: {
            min_amount: 60 /* Deve ser maior ou igual */,
            max_amount: 140 /* Deve ser menor */,
            value: 45,
          },
        },
        recurrent: {
          level_one: {
            min_amount: 15 /* Deve ser maior ou igual */,
            max_amount: 25 /* Deve ser menor */,
            value: 1,
          },
          level_two: {
            min_amount: 25 /* Deve ser maior ou igual */,
            max_amount: 45 /* Deve ser menor */,
            value: 1.7,
          },
          level_three: {
            min_amount: 45 /* Deve ser maior ou igual */,
            max_amount: 60 /* Deve ser menor */,
            value: 2.5,
          },
          level_four: {
            min_amount: 60 /* Deve ser maior ou igual */,
            max_amount: 140 /* Deve ser menor */,
            value: 6,
          },
        },
      },
    },
  },
  google: {
    places: {
      autocomplete: {
        minimumTextLimit: 6,
      },
    },
  },
};

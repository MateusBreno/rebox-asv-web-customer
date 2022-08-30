// ./src/config/routes.ts
export default {
  rebox: {
    defaults: {
      source: '/',
      returnBase: '/login',
      mainRedirect: '/painel',
    },
    privates: {
      panel: {
        path: '/painel',
        routeFragment: '/painel',
        next: {},
      },
      profile: {
        path: '/perfil',
        routeFragment: '/perfil',
        next: {},
      },
      contract: {
        path: '/contratos',
        routeFragment: '/contratos',
        next: {
          show: {
            path: '/contratos/:id',
            routeFragment: '/:id',
            next: {},
          },
          new: {
            path: '/contratos/novo',
            routeFragment: '/novo',
            next: {},
          },
        },
      },
      called: {
        path: '/chamados',
        routeFragment: '/chamados',
        next: {
          new: {
            path: '/chamados/novo',
            routeFragment: '/novo',
            next: {},
          },
          drives: {
            path: '/chamados/acionamentos',
            routeFragment: '/acionamentos',
            next: {
              show: {
                path: '/chamados/acionamentos/:id',
                routeFragment: '/:id',
                next: {},
              },
            },
          },
        },
      },
      help: {
        path: '/ajuda',
        routeFragment: '/ajuda',
        next: {},
      },
      notification: {
        path: '/notificacoes',
        routeFragment: '/notificacoes',
        next: {},
      },
      setting: {
        path: '/configuracoes',
        routeFragment: '/configuracoes',
        next: {},
      },
      vehicle: {
        path: '/veiculos',
        routeFragment: '/veiculos',
        next: {
          show: {
            path: '/veiculos/:id',
            routeFragment: '/:id',
            next: {},
          },
        },
      },
      charge: {
        path: '/cobrancas',
        routeFragment: '/cobrancas',
        next: {
          show: {
            path: '/cobrancas/:id',
            routeFragment: '/:id',
            next: {},
          },
        },
      },
    },
    publics: {
      home: {
        path: '/',
        routeFragment: '/',
        next: {},
      },
      signIn: {
        path: '/login',
        routeFragment: '/login',
        next: {},
      },
      recoverPassword: {
        path: '/esqueci-minha-senha',
        routeFragment: '/esqueci-minha-senha',
        next: {},
      },
      register: {
        path: '/cadastro',
        routeFragment: '/cadastro',
        next: {},
      },
    },
  },
};

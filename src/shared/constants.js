const constants = {
  ICON_MENU: 'ICON_MENU',
  SIDE_DRAWER: 'SIDE_DRAWER',
  HOME_URL: '/',
  AUTH_URL: '/auth',
  CONNECTION_AS_URL: '/connexion-en-tant-que',
  LOGOUT_URL: '/logout',
  VALIDATION_URL: '/validation',
  HISTORIC_URL: '/historique',
  MESSAGES_URL: '/messages',
  FACTURATION_VALIDATION_URL: '/facturation-validation',
  FACTURATION_HISTORIC_URL: '/facturation-historique',
  ADMIN_URL: '/administration',
  ROLES: {
    PERFORMER: 'Performer',
    DELEGATE: 'Delegate',
    BILLING: 'Billing'
  },
  CONTEXT: {
    VALIDATION: 'VALIDATION',
    FACTURATION: 'FACTURATION',
    HISTORIC: 'HISTORIC'
  },
  FILTER: {
    ORDER_BY: {
      CONTACT: 'contact',
      CONTACT_TYPE: 'typeContact',
      PRESTATION_DATE: 'prestationDate',
      PATIENT: 'patient',
      PRESTATION: 'prestation'
    },
    DIRECTION: {
      ASC: 'asc',
      DESC: 'desc'
    }
  },
  MODAL_CONTEXT: {
    DETAIL: 'DETAIL',
    DISAGREEMENT: 'DISAGREEMENT',
    ADD_PTS: 'ADD_PTS'
  },
  BILLING_DISAGREEMENT_TAB_CONTEXT: {
    DETAIL: 'DETAIL',
    HANDLING: 'HANDLING'
  }
}

export default constants

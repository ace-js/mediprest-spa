export const prestationDetail = {
  sideA: [
    { label: 'Contact', value: 'contact', type: 'text' },
    { label: 'Type de contact', value: 'typeContact', type: 'text' },
    { label: 'Chambre particulière', value: 'isParticularRoom', type: 'bool' },
    { label: 'Urgence', value: 'isEmergency', type: 'bool' }
  ],
  sideB: [
    {label: 'prestataire INAMI', value: 'performer._id', type: 'text'},
    { label: 'Code prestation', value: 'prestation._id', type: 'text' },
    { label: 'Libelé prestation', value: 'prestation.label', type: 'text' },
    { label: 'Date prestation', value: 'prestationDate', type: 'date' }
  ]
}

export const adminDetail = {
  sideA: [
    { label: 'Validée', value: 'isValidated', type: 'bool' },
    {
      label: 'Validé par',
      value: 'validatedBy',
      subValues: ['name', 'firstname'],
      type: 'text',
      multi: true
    },
    { label: 'Facturé', value: 'isInvoiced', type: 'bool' },
    {
      label: 'Facturé par',
      value: 'invoicedBy',
      subValues: ['name', 'firstname'],
      type: 'text',
      multi: true
    }
  ],
  sideB: [
    { label: 'Désaccord', value: 'disagreement', type: 'bool' },
    {
      label: 'Créé par',
      value: 'disagreement.creator',
      subValues: ['name', 'firstname'],
      type: 'text',
      multi: true
    },
    {
      label: 'Géré par',
      value: 'disagreement.handler',
      subValues: ['name', 'firstname'],
      type: 'text',
      multi: true
    },
    { label: 'Traité', value: 'disagreement.traited', type: 'bool' },
    {
      label: 'Raison du désaccord',
      value: 'disagreement.comment',
      type: 'area'
    }
  ]
}

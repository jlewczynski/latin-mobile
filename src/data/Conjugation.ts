import { TConjugation, TConjunctiveTenses, TImperativeTenses, TIndicativeTenses, TNumbers } from "../models/Conjugation";

const t = (str: string[]): TNumbers => ({
  singularis: [str[0] ?? '', str[1] ?? '', str[2] ?? ''],
  pluralis: [str[3] ?? '', str[4] ?? '', str[5] ?? ''],
});

function v(s0: string[], s1: string[]): TImperativeTenses;
function v(s0: string[], s1: string[], s2: string[], s3: string[]): TConjunctiveTenses;
function v(s0: string[], s1: string[], s2: string[], s3: string[], s4: string[], s5: string[]): TIndicativeTenses;
function v(s0: string[], s1: string[], s2?: string[], s3?: string[], s4?: string[], s5?: string[]) {
  if (s5 !== undefined) {
    return {
      praesens: t(s0 ?? []),
      imperfectum: t(s1 ?? []),
      'futurum primum': t(s2 ?? []),
      perfectum: t(s3 ?? []),
      plusquamperfectum: t(s4 ?? []),
      'futurum exactum': t(s5 ?? []),
    } as TIndicativeTenses;
  }
  if (s3 !== undefined) {
    return {
      praesens: t(s0 ?? []),
      imperfectum: t(s1 ?? []),
      perfectum: t(s2 ?? []),
      plusquamperfectum: t(s3 ?? []),
    } as TConjunctiveTenses;
  }
  return {
    praesens: t(s0 ?? []),
    futurum: t(s1 ?? []),
  } as TImperativeTenses;
}

const indicativeSum = (prefix: string): [string[],string[],string[]] => [
  [`${prefix} sum`, `${prefix} es`, `${prefix} est`, `${prefix} sumus`, `${prefix} estis`, `${prefix} sunt`],
  [`${prefix} eram`, `${prefix} eras`, `${prefix} erat`, `${prefix} eramus`, `${prefix} eratis`, `${prefix} erant`],
  [`${prefix} ero`, `${prefix} eris`, `${prefix} erit`, `${prefix} erimus`, `${prefix} eritis`, `${prefix} erunt`],
];

const conjunctiveSum = (prefix: string): [string[],string[]] => [
  [`${prefix} sim`, `${prefix} sis`, `${prefix} sit`, `${prefix} simus`, `${prefix} sitis`, `${prefix} sint`],
  [`${prefix} essem`, `${prefix} esses`, `${prefix} esset`, `${prefix} essemus`, `${prefix} essetis`, `${prefix} essent`],
]

const amo: TConjugation = {
  word: 'kochać',
  indicativus: {
    activum: v(
      ['amo', 'amas', 'amat', 'amamus', 'amatis', 'amant'],
      ['amabam', 'amabas', 'amabat', 'amabamus', 'amabatis', 'amabant'],
      ['amabo', 'amabis', 'amabit', 'amabimus', 'amabitis', 'amabunt'],
      ['amavi', 'amavisti', 'amavit', 'amavimus', 'amavistis', 'amaverunt'],
      ['amaveram', 'amaveras', 'amaverat', 'amaveramus', 'amaveratis', 'amaverant'],
      ['amavero', 'amaveris', 'amaverit', 'amaverimus', 'amaveritis', 'amaverint'],
    ),
    passivum: v(
      ['amor', 'amaris', 'amatur', 'amamur', 'amamini', 'amantur'],
      ['amabar', 'amabaris', 'amabatur', 'amabamur', 'amabamini', 'amabantur'],
      ['amabor', 'amaberis', 'amabitur', 'amabimur', 'amabimini', 'amabuntur'],
      ...(indicativeSum('amatus')),
    ),
  },
  coniunctivus: {
    activum: v(
      ['amem', 'ames', 'amet', 'amemus', 'ametis', 'ament'],
      ['amarem', 'amares', 'amaret', 'amaremus', 'amaretis', 'amarent'],
      ['amaverim', 'amaveris', 'amaverit', 'amaverimus', 'amaveritis', 'amaverint'],
      ['amavissem', 'amavisses', 'amavisset', 'amavissemus', 'amavissetis', 'amavissent'],
    ),
    passivum: v(
      ['amer', 'ameris', 'ametur', 'amemur', 'amemini', 'amentur'],
      ['amarer', 'amareris', 'amaretur', 'amaremur', 'amaremini', 'amarentur'],
      ...conjunctiveSum('amatus'),
    ),
  },
  imperativus: {
    activum: v(
      ['', 'ama', '', '', 'amate'],
      ['', 'amato', 'amato', '', 'amatote', 'amanto'],
    ),
    passivum: v(
      ['', 'amare', '', '', 'amamini'],
      ['', 'amator', 'amator', '', '', 'amantor'],
    ),
  },
  infinitivus: {
    activum: ['amare', 'amavisse', 'amaturum esse'],
    passivum: ['amari', 'amatum esse', 'amatum ri'],
  },
  participium: {
    activum: ['amans', '', 'amaturus'],
    passivum: ['', 'amatus', 'amandus'],
  },
  gerundium: {
    genetivus: 'amandi',
    dativus: 'amando',
    accusativus: 'amandum',
    ablativus: 'amando',
  },
  supinum: {
    accusativus: 'amatum',
    ablativus: 'amatu',
  }
}

const moneo: TConjugation = {
  word: 'napominać',
  indicativus: {
    activum: v(
      ['moneo', 'mones', 'monet', 'monemus', 'monetis', 'monent'],
      ['monebam', 'monebas', 'monebat', 'monebamus', 'monebatis', 'monebant'],
      ['monebo', 'monebis', 'monebit', 'monebimus', 'monebitis', 'monebunt'],
      ['monui', 'monuisti', 'monuit', 'monuimus', 'monuistis', 'monuerunt'],
      ['monueram', 'monueras', 'monuerat', 'monueramus', 'monueratis', 'monuerint'],
      ['monuero', 'monueris', 'monuerit', 'monuerimus', 'monueritis', 'monuerint'],
    ),
    passivum: v(
      ['moneor', 'moneris', 'monetur', 'monemur', 'monemini', 'monentur'],
      ['monebar', 'monebaris', 'monebatur', 'monebamur', 'monebamini', 'monebantur'],
      ['monebor', 'moneberis', 'monebitur', 'monebimur', 'monebimini', 'monebuntur'],
      ...indicativeSum('monitus'),
    ),
  },
  coniunctivus: {
    activum: v(
      ['moneam', 'moneas', 'moneat', 'moneamus', 'moneatis', 'moneant'],
      ['monerem', 'moneres', 'moneret', 'moneremus', 'moneretis', 'monerent'],
      ['monuerim', 'monueris', 'monuerit', 'monuerimus', 'monueritis', 'monuerint'],
      ['monuissem', 'monuisses', 'monuisset', 'monuissemus', 'monuissetis', 'monuissent'],
    ),
    passivum: v(
      ['monear', 'monearis', 'moneatur', 'moneamur', 'moneamini', 'moneantur'],
      ['monerer', 'monereris', 'moneretur', 'moneremur', 'moneremini', 'monerentur'],
      ...conjunctiveSum('monitus'),
    ),
  },
  imperativus: {
    activum: v(
      ['', 'mone', '', '', 'monete'],
      ['', 'moneto', 'moneto', '', 'monetote', 'monento'],
    ),
    passivum: v(
      ['', 'monere', '', '', 'monemini'],
      ['', 'monetor', 'monetor', '', '', 'monentor'],
    ),
  },
  infinitivus: {
    activum: ['monere', 'monuisse', 'moniturum esse'],
    passivum: ['moneri', 'monitum esse', 'monitum iri'],
  },
  participium: {
    activum: ['monens', '', 'moniturus'],
    passivum: ['', 'monitus', 'monendus'],
  },
  gerundium: {
    genetivus: 'monendi',
    dativus: 'monendo',
    accusativus: 'monendum',
    ablativus: 'monendo',
  },
  supinum: {
    accusativus: 'monitum',
    ablativus: 'monitu',
  }
}

const ago: TConjugation = {
  word: 'czynić, działać',
  indicativus: {
    activum: v(
      ['ago', 'agis', 'agit', 'agimus', 'agitis', 'agunt'],
      ['agebam', 'agebas', 'agebat', 'agebamus', 'agebatis', 'agebant'],
      ['agam', 'ages', 'aget', 'agemus', 'agetis', 'agent'],
      ['egi', 'egisti', 'egit', 'egimus', 'egitis', 'egerunt'],
      ['egeram', 'egeras', 'egerat', 'egeramus', 'egeratis', 'egerant'],
      ['egero', 'egeris', 'egerit', 'egerimus', 'egeritis', 'egering'],
    ),
    passivum: v(
      ['agor', 'ageris', 'agitur', 'agimur', 'agimini', 'aguntur'],
      ['agebar', 'agebaris', 'agebatu', 'agebamur', 'agebamini', 'agebantur'],
      ['agar', 'ageris', 'agetur', 'agemur', 'agemini', 'agentur'],
      ...indicativeSum('actus'),
    ),
  },
  coniunctivus: {
    activum: v(
      ['agam', 'agas', 'agat', 'agamus', 'agatis', 'agant'],
      ['agerem', 'ageres', 'agerent', 'ageremus', 'ageretis', 'agerent'],
      ['egerim', 'egeris', 'egerit', 'egerimus', 'egeritis', 'egerint'],
      ['egissem', 'egisses', 'egisset', 'egissemus', 'egissetis', 'egissent'],
    ),
    passivum: v(
      ['agar', 'agaris', 'agatur', 'agamur', 'agamini', 'agantur'],
      ['agerer', 'agereris', 'ageretur', 'ageremus', 'ageremini', 'agerentur'],
      ...conjunctiveSum('actus'),
    ),
  },
  imperativus: {
    activum: v(
      ['', 'age', '', '', 'agite', ''],
      ['', 'agito', 'agito', '', 'agitote', 'agunto'],
    ),
    passivum: v(
      ['', 'agere', '', '', 'agimini', ''],
      ['', 'agitor', 'agitor', '', '', 'aguntor'],
    ),
  },
  infinitivus: {
    activum: ['agire', 'agesse', 'acturum esse'],
    passivum: ['agi', 'actum esse', 'actum iri'],
  },
  participium: {
    activum: ['agens', '', 'acturus'],
    passivum: ['', 'actus', 'agendus'],
  },
  gerundium: {
    genetivus: 'agendi',
    dativus: 'agendo',
    accusativus: 'agendum',
    ablativus: 'agendo',
  },
  supinum: {
    accusativus: 'actum',
    ablativus: 'actu',
  },
};

const capio: TConjugation = {
  word: 'łapać, chwytać',
  indicativus: {
    activum: v(
      ['capio', 'capis', 'capit', 'capimus', 'capitis', 'capiunt'],
      ['capiebam', 'capiebas', 'capiebat', 'capiebamus', 'capiebatis', 'capiebant'],
      ['capiam', 'capies', 'capiet', 'capiemus', 'capietis', 'capient'],
      ['cepi', 'cepisti', 'cepit', 'cepimus', 'cepistis', 'ceperunt'],
      ['ceperam', 'ceperas', 'ceperat', 'ceperamus', 'ceperatis', 'ceperant'],
      ['cepero', 'ceperis', 'ceperit', 'ceperimus', 'ceperitis', 'ceperint'],
    ),
    passivum: v(
      ['capior', 'caperis', 'capitur', 'capimur', 'capimini', 'capiuntur'],
      ['capiebar', 'capiebaris', 'capiebatur', 'capiebamus', 'capiebamini', 'capiebantur'],
      ['capiar', 'capieris', 'capietur', 'capiemur', 'capiemini', 'capientur'],
      ...indicativeSum('captus'),
    ),
  },
  coniunctivus: {
    activum: v(
      ['capiam', 'capias', 'capiat', 'capiamus', 'capiatis', 'capiant'],
      ['caperem', 'caperes', 'caperet', 'caperemus', 'caperetis', 'caperent'],
      ['ceperim', 'ceperis', 'ceperit', 'ceperimus', 'ceperitis', 'ceperint'],
      ['cepissem', 'cepisses', 'cepisset', 'cepissemus', 'cepissetis', 'cepissent'],
    ),
    passivum: v(
      ['capiar', 'capiaris', 'capiatur', 'capiamur', 'capiamini', 'capiantur'],
      ['caperer', 'capereris', 'caperetur', 'caperemur', 'caperemini', 'caperentur'],
      ...conjunctiveSum('captus'),
    ),
  },
  imperativus: {
    activum: v(
      ['', 'cape', '', '', 'capite', ''],
      ['', 'capito', 'capito', '', 'capitote', 'capiunto'],
    ),
    passivum: v(
      ['', 'capere', '', '', 'capimini', ''],
      ['', 'capitor', 'capitor', '', '', 'capiuntor'],
    ),
  },
  infinitivus: {
    activum: ['capere', 'capisse', 'capturum esse'],
    passivum: ['capi', 'captum esse', 'captum iri'],
  },
  participium: {
    activum: ['capiens', '', 'capturus'],
    passivum: ['', 'capus', 'capiendus'],
  },
  gerundium: {
    genetivus: 'capiendi',
    dativus: 'capiendo',
    accusativus: 'capiendum',
    ablativus: 'capiendo',
  },
  supinum: {
    accusativus: 'captum',
    ablativus: 'captu',
  },
};

const audio: TConjugation = {
  word: 'słyszeć',
  indicativus: {
    activum: v(
      ['audio', 'audis', 'audit', 'audimus', 'auditis', 'audiunt'],
      ['audiebam', 'audiebas', 'audiebat', 'audiebamus', 'audiebatis', 'audiebant'],
      ['audiam', 'audies', 'audiet', 'audiemus', 'audietis', 'audient'],
      ['audivi', 'audivisti', 'audivit', 'audivimus', 'audivistis', 'audiverunt'],
      ['audiveram', 'audiveras', 'audiverat', 'audiveramus', 'audiveratis', 'audiverant'],
      ['audivero', 'audiveris', 'audiverit', 'audiverimus', 'audiveritis', 'audiverint'],
    ),
    passivum: v(
      ['audior', 'audiris', 'auditur', 'audimur', 'audimini', 'audiuntur'],
      ['audiebar', 'audiebaris', 'audiebatur', 'audiebamur', 'audiebamini', 'audiebantur'],
      ['audiar', 'audieris', 'audietur', 'audiemur', 'audiemini', 'audientur'],
      ...indicativeSum('auditus'),
    ),
  },
  coniunctivus: {
    activum: v(
      ['audiam', 'audias', 'audiat', 'audiamus', 'audiatis', 'audiant'],
      ['audirem', 'audires', 'audiret', 'audiremus', 'audiretis', 'audirent'],
      ['audiverim', 'audiveris', 'audiverit', 'audiverimus', 'audiveritis', 'audiverint'],
      ['audivissem', 'audivisses', 'audivisset', 'audivissemus', 'audivissetis', 'audivissent'],
    ),
    passivum: v(
      ['audiar', 'audiaris', 'audiatur', 'audiamur', 'audiamini', 'audiantur'],
      ['audirer', 'audireris', 'audiretur', 'audiremur', 'audiremini', 'audirentur'],
      ...conjunctiveSum('auditus'),
    ),
  },
  imperativus: {
    activum: v(
      ['', 'audi', '', '', 'audite', ''],
      ['', 'audito', 'audito', '', 'auditote', 'audiunto'],
    ),
    passivum: v(
      ['', 'audire', '', '', 'audimini', ''],
      ['', 'auditor', 'auditor', '', '', 'audiuntor'],
    ),
  },
  infinitivus: {
    activum: ['audire', 'audivisse', 'auditurum esse'],
    passivum: ['audiri', 'auditum esse', 'auditum iri'],
  },
  participium: {
    activum: ['audiens', '', 'auditurus'],
    passivum: ['', 'auditus', 'audiendus'],
  },
  gerundium: {
    genetivus: 'audiendi',
    dativus: 'audiendo',
    accusativus: 'audiendum',
    ablativus: 'audiendo',
  },
  supinum: {
    accusativus: 'auditum',
    ablativus: 'audito',
  },
};

const eo: TConjugation = {
  word: 'iść',
  indicativus: {
    activum: v(
      ['eo', 'is', 'it', 'imus', 'itis', 'eunt'],
      ['ibam', 'ibas', 'ibat', 'ibamus', 'ibatis', 'ibant'],
      ['ibo', 'ibis', 'ibit', 'ibimus', 'ibitis', 'ibunt'],
      ['ii', 'isti', 'iit', 'iimus', 'istis', 'ierunt'],
      ['ieram', 'ieras', 'ierat', 'ieramus', 'ieratis', 'ierant'],
      ['iero', 'ieris', 'ierit', 'ierimus', 'ieritis', 'ierunt'],
    ),
    passivum: v(
      ['eor', 'iris', 'itur', 'imur', 'imini', 'euntur'],
      ['ibar', 'ibaris', 'ibatur', 'ibamur', 'ibamini', 'ibantur'],
      ['ibor', 'iberis', 'ibitur', 'ibimur', 'ibimini', 'ibuntur'],
      ...indicativeSum('itus')
    ),
  },
  coniunctivus: {
    activum: v(
      ['eam', 'eas', 'eat', 'eamus', 'eatis', 'eant'],
      ['item', 'ires', 'iret', 'iremus', 'iretis', 'irent'],
      ['ierim', 'ieris', 'ierit', 'ierimus', 'ieritis', 'ierint'],
      ['issem', 'isses', 'isset', 'issemus', 'issetis', 'issent'],
    ),
    passivum: v(
      ['ear', 'earis', 'eatur', 'eamur', 'eamini', 'eantur'],
      ['irer', 'ireris', 'iretur', 'iremus', 'iremini', 'irentur'],
      ...conjunctiveSum('itus'),
    ),
  },
  imperativus: {
    activum: v(
      ['', 'i', '', '', 'ite', ''],
      ['', 'ito', 'ito', '', 'itote', 'eunto'],
    ),
    passivum: v(
      ['', 'ire', '', '', 'imini', ''],
      ['', 'itor', 'itor', '', '', 'euntor'],
    ),
  },
  infinitivus: {
    activum: ['ire', 'isse', 'iturum esse'],
    passivum: ['iri', 'itum esse', 'itum iri'],
  },
  participium: {
    activum: ['iens', '', 'iturus'],
    passivum: ['', 'itus', 'eundus'],
  },
  gerundium: {
    genetivus: 'eundi',
    dativus: 'eundo',
    accusativus: 'eundum',
    ablativus: 'eundo',
  },
  supinum: {
    accusativus: 'itum',
    ablativus: 'itu',
  },
};

const fero: TConjugation = {
  word: 'nosić',
  indicativus: {
    activum: v(
      ['fero', 'fers', 'fert', 'feimus', 'feritis', 'ferunt'],
      ['ferebam', 'ferebas', 'ferebat', 'ferebamus', 'ferebatis', 'ferebant'],
      ['feram', 'feres', 'feret', 'feremus', 'feretis', 'ferent'],
      ['tuli', 'tulisti', 'tulit', 'tulimus', 'tulistis', 'tulerunt'],
      ['tuleram', 'tuleras', 'tulerat', 'tuleramus', 'tuleratis', 'tulerant'],
      ['tulero', 'tuleris', 'tulerit', 'tulerimus', 'tuleritis', 'tulerint'],
    ),
    passivum: v(
      ['feror', 'ferris', 'fertur', 'ferimur', 'ferimini', 'feruntur'],
      ['ferebar', 'ferebaris', 'ferebatur', 'ferebamur', 'ferebamini', 'ferebantur'],
      ['ferar', 'fereris', 'feretur', 'feremur', 'feremini', 'ferentur'],
      ...indicativeSum('latus'),
    ),
  },
  coniunctivus: {
    activum: v(
      ['feram', 'feras', 'ferat', 'feramus', 'feratis', 'ferant'],
      ['ferrem', 'ferres', 'ferret', 'ferremus', 'ferretis', 'ferrent'],
      ['tulerim', 'tuleris', 'tulerit', 'tulerimus', 'tuleritis', 'tulerint'],
      ['tulissem', 'tulisses', 'tulisset', 'tulissemus', 'tulissetis', 'tulissent'],
    ),
    passivum: v(
      ['ferar', 'feraris', 'feratur', 'feramur', 'feramini', 'ferantur'],
      ['ferrer', 'ferreris', 'ferretur', 'ferremur', 'ferremini', 'ferrentur'],
      ...conjunctiveSum('latus'),
    ),
  },
  imperativus: {
    activum: v(
      ['', 'fer', '', '', 'ferte', ''],
      ['', 'ferto', 'ferto', '', 'fertote', 'ferunto'],
    ),
    passivum: v(
      ['', 'ferre', '', '', 'ferimini', ''],
      ['', 'fertor', 'fertor', '', '', 'feruntor'],
    ),
  },
  infinitivus: {
    activum: ['ferre', 'tulisse', 'laturum esse'],
    passivum: ['ferri', 'latum esse', 'latum iri'],
  },
  participium: {
    activum: ['ferens', '', 'laturus'],
    passivum: ['', 'latus', 'ferendus'],
  },
  gerundium: {
    genetivus: 'ferendi',
    dativus: 'ferendo',
    accusativus: 'ferendum',
    ablativus: 'ferendo',
  },
  supinum: {
    accusativus: 'latum',
    ablativus: 'latu',
  },
}

const facio: TConjugation = {
  word: 'robić',
  indicativus: {
    activum: v(
      ['facio', 'facis', 'facit', 'facimus', 'facitis', 'faciunt'],
      ['faciebam', 'faciebas', 'faciebat', 'faciebamus', 'faciebatis', 'faciebant'],
      ['faciam', 'facies', 'faciet', 'faciemus', 'facietis', 'facient'],
      ['feci', 'fecisti', 'fecit', 'fecimus', 'fecistis', 'fecerunt'],
      ['feceram', 'feceras', 'fecerat', 'feceramus', 'feceratis', 'fecerant'],
      ['fecero', 'feceris', 'fecerit', 'fecerimus', 'feceritis', 'fecerint'],
    ),
    passivum: v(
      ['fio', 'fis', 'fit', 'fimus', 'fitis', 'fiunt'],
      ['fiebam', 'fiebas', 'fiebat', 'fiebamus', 'fiebatis', 'fiebant'],
      ['fiam', 'fies', 'fiet', 'fiemus', 'fietis', 'fient'],
      ...indicativeSum('factus'),
    ),
  },
  coniunctivus: {
    activum: v(
      ['faciam', 'facias', 'faciat', 'faciamus', 'faciatis', 'faciant'],
      ['facerem', 'faceres', 'faceret', 'faceremus', 'faceretis', 'facerent'],
      ['fecerim', 'feceris', 'fecerit', 'fecerimus', 'feceritis', 'fecerint'],
      ['fecissem', 'fecisses', 'fecisset', 'fecissemus', 'fecissetis', 'fecissent'],
    ),
    passivum: v(
      ['fiam', 'fias', 'fiat', 'fiamus', 'fiatis', 'fiant'],
      ['fierem', 'fieres', 'fieret', 'fieremus', 'fieretis', 'fierent'],
      ...conjunctiveSum('factus'),
    ),
  },
  imperativus: {
    activum: v(
      ['', 'fac', '', '', 'facite', ''],
      ['', 'facito', 'facito', '', 'facitote', 'faciunto'],
    ),
    passivum: v(
      ['', 'fi', '', '', 'fite', ''],
      ['', 'fito', 'fito', '', 'fitote', 'fiunt'],
    ),
  },
  infinitivus: {
    activum: ['facere', 'fecisse', 'facturum esse'],
    passivum: ['fieri', 'factum esse', 'facturum iri'],
  },
  participium: {
    activum: ['faciens', '', 'facturus'],
    passivum: ['', 'factus', 'faciendus'],
  },
  gerundium: {
    genetivus: 'faciendi',
    dativus: 'faciendo',
    accusativus: 'faciendum',
    ablativus: 'faciendo',
  },
  supinum: {
    accusativus: 'factum',
    ablativus: 'factu',
  },
};

const sum: TConjugation = {
  word: 'być',
  indicativus: {
    activum: v(
      ['sum', 'es', 'est', 'sumus', 'estis', 'sunt'],
      ['eram', 'eras', 'erat', 'eramus', 'eratis', 'erant'],
      ['ero', 'eris', 'erit', 'erimus', 'eritis', 'erunt'],
      ['fui', 'fuisti', 'fuit', 'fuimus', 'fuistis', 'fuerunt'],
      ['fueram', 'fueras', 'fuerat', 'fueramus', 'fueratis', 'fuerant'],
      ['fuero', 'fueris', 'fuerit', 'fuerimus', 'fueritis', 'fuerint'],
    ),
  },
  coniunctivus: {
    activum: v(
      ['sim', 'sis', 'sit', 'simus', 'sitis', 'sint'],
      ['essem', 'esses', 'esset', 'essemus', 'essetis', 'essent'],
      ['fuerim', 'fueris', 'fuerit', 'fuerimus', 'fueritis', 'fuerint'],
      ['fuissem', 'fuisses', 'fuisset', 'fuissemus', 'fuissetis', 'fuissent'],
    ),
  },
  imperativus: {
    activum: v(
      ['', 'es', '', '', 'este', ''],
      ['', 'esto', 'esto', '', 'estote', 'sunto'],
    ),
  },
  infinitivus: {
    activum: ['esse', 'fuisse', 'futurum esse'],
  },
  participium: {
    activum: ['', '', 'futurus'],
  }
}

const possum: TConjugation = {
  word: 'móc',
  indicativus: {
    activum: v(
      ['possum', 'potes', 'potest', 'possumus', 'potestis', 'possunt'],
      ['poteram', 'poteras', 'poterat', 'poteramus', 'poteratis', 'poterant'],
      ['potero', 'poteris', 'poterit', 'poterimus', 'poteritis', 'poterunt'],
      ['potui', 'potuisti', 'potuit', 'potuimus', 'potuistis', 'potuerunt'],
      ['potueram', 'potueras', 'potuerat', 'potueramus', 'potueratis', 'potuerant'],
      ['potuero', 'potueris', 'potuerit', 'potuerimus', 'potueritis', 'potuerunt'],
    )
  },
  coniunctivus: {
    activum: v(
      ['possim', 'possis', 'possit', 'possimus', 'possitis', 'possint'],
      ['possem', 'posses', 'posset', 'possemus', 'possetis', 'possent'],
      ['potuerim', 'potueris', 'potuerit', 'potuerimus', 'potueritis', 'potuerint'],
      ['potuissem', 'potuisses', 'potuisset', 'potuissemus', 'potuissetis', 'potuissent'],
    )
  },
  infinitivus: {
    activum: ['posse', 'potuisse', ''],
  },
  participium: {
    activum: ['potens', '', ''],
  }
}

const volo: TConjugation = {
  word: 'chcieć',
  indicativus: {
    activum: v(
      ['volo', 'vis', 'vult', 'volumus', 'vultis', 'volunt'],
      ['volebam', 'volebas', 'volebat', 'volebamus', 'volebatis', 'volebant'],
      ['volam', 'voles', 'volet', 'volemus', 'voletis', 'volent'],
      ['volui', 'voluisti', 'voluit', 'voluimus', 'voluistis', 'voluerunt'],
      ['volueram', 'volueras', 'voluerat', 'volueramus', 'volueratis', 'voluerant'],
      ['voluero', 'volueris', 'voluerit', 'voluerimus', 'volueritis', 'voluerint'],
    ),
  },
  coniunctivus: {
    activum: v(
      ['velim', 'velis', 'velit', 'velimus', 'velitis', 'velint'],
      ['vellem', 'velles', 'vellet', 'vellemus', 'velletis', 'vellent'],
      ['voluerim', 'volueris', 'voluerit', 'voluerimus', 'volueritis', 'voluerint'],
      ['voluissem', 'voluisses', 'voluisset', 'voluissemus', 'voluissetis', 'voluissent'],
    ),
  },
  infinitivus: {
    activum: ['velle', 'voluisse', ''],
  },
  participium: {
    activum: ['volens', '', ''],
  },
};

const nolo: TConjugation = {
  word: 'nie chcieć',
  indicativus: {
    activum: v(
      ['nolo', 'non vis', 'non vult', 'nolumus', 'non vultis', 'nolunt'],
      ['nolebam', 'nolebas', 'nolebat', 'nolebamus', 'nolebatis', 'nolebant'],
      ['nolam', 'noles', 'nolet', 'nolemus', 'noletis', 'nolent'],
      ['nolui', 'noluisti', 'noluit', 'noluimus', 'noluistis', 'noluerunt'],
      ['nolueram', 'nolueras', 'noluerat', 'nolueramus', 'nolueratis', 'noluerant'],
      ['noluero', 'nolueris', 'noluerit', 'noluerimus', 'nolueritis', 'noluerint'],
    ),
  },
  coniunctivus: {
    activum: v(
      ['nolim', 'nolis', 'nolit', 'nolimus', 'nolitis', 'nolint'],
      ['nollem', 'nolles', 'nollet', 'nollemus', 'nolletis', 'nollent'],
      ['noluerim', 'nolueris', 'noluerit', 'noluerimus', 'nolueritis', 'noluerint'],
      ['noluissem', 'noluisses', 'noluisset', 'noluissemus', 'noluissetis', 'noluissent'],
    ),
  },
  imperativus: {
    activum: v(
      ['', 'noli', '', '', 'nolite', ''],
      ['', 'nolito', 'nolito', '', 'nolitote', 'nolunto'],
    ),
  },
  infinitivus: {
    activum: ['nolle', 'noluisse', ''],
  },
  participium: {
    activum: ['nolens', '', ''],
  },
};

const malo: TConjugation = {
  word: 'woleć',
  indicativus: {
    activum: v(
      ['malo', 'mavis', 'mavult', 'malumus', 'mavultis', 'malunt'],
      ['malebam', 'malebas', 'malebat', 'malebamus', 'malebatis', 'malebant'],
      ['malam', 'males', 'malet', 'malemus', 'maletis', 'malent'],
      ['malui', 'maluisti', 'maluit', 'maluimus', 'maluistis', 'maluerunt'],
      ['malueram', 'malueras', 'maluerat', 'malueramus', 'malueratis', 'maluerant'],
      ['maluero', 'malueris', 'maluerit', 'maluerimus', 'malueritis', 'maluerint'],
    ),
  },
  coniunctivus: {
    activum: v(
      ['malim', 'malis', 'malit', 'malimus', 'malitis', 'malint'],
      ['mallem', 'malles', 'mallet', 'mallemus', 'malletis', 'mallent'],
      ['maluerim', 'malueris', 'maluerit', 'maluerimus', 'malueritis', 'maluerint'],
      ['maluissem', 'maluisses', 'maluisset', 'maluissemus', 'maluissetis', 'maluissent'],
    ),
  },
  infinitivus: {
    activum: ['malle', 'maluisse', ''],
  },
  participium: {
    activum: ['malens', '', ''],
  },
};

export const words = [
  amo,
  moneo,
  ago,
  capio,
  audio,
  eo,
  fero,
  facio,
  sum,
  possum,
  volo,
  nolo,
  malo,
]

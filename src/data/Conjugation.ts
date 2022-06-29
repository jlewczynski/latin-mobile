import { TConjugation, TConjunctiveTenses, TImperativeTenses, TIndicativeMood, TIndicativeTenses, TNumbers, TTenses } from "../models/Conjugation";

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
      ['amatus sum', 'amatus es', 'amatus est', 'amatus sumus', 'amatus estis', 'amatus sunt'],
      ['amatus eram', 'amatus eras', 'amatus erat', 'amatus eramus', 'amatus eratis', 'amatus erant'],
      ['amatus ero', 'amatus eris', 'amatus erit', 'amatus erimus', 'amatus eritis', 'amatus erunt'],
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
      ['amatus sim', 'amatus sis', 'amatus sit', 'amatus simus', 'amatus sitis', 'amatus sint'],
      ['amatus essem', 'amatus esses', 'amatus esset', 'amatus essemus', 'amatus essetis', 'amatus essent'],
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
      ['monitus sum', 'monitus es', 'monitus est', 'monitus sumus', 'monitus estis', 'monitus sunt'],
      ['monitus eram', 'monitus eras', 'monitus erat', 'monitus eramus', 'monitus eratis', 'monitus erant'],
      ['monitus ero', 'monitus eris', 'monitus erit', 'monitus erimus', 'monitus eritis', 'monitus erunt'],
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
      ['monitus sim', 'monitus sis', 'monitus sit', 'monitus simus', 'monitus sitis', 'monitus sint'],
      ['monitus essem', 'monitus esses', 'monitus esset', 'monitus essemus', 'monitus essetis', 'monitus essent'],
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
      ['actus sum', 'actus es', 'actus est', 'actus sumus', 'actus estis', 'actus sunt'],
      ['actus eram', 'actus eras', 'actus erat', 'actus eramus', 'actus eratis', 'actus erant'],
      ['actus ero', 'actus eris', 'actus erit', 'actus erimus', 'actus eritis', 'actus erunt'],
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
      ['actus sim', 'actus sis', 'actus sit', 'actus simus', 'actus sitis', 'actus sint'],
      ['actus essem', 'actus esses', 'actus esset', 'actus essemus', 'actus essetis', 'actus essent'],
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
      ['captus sum', 'captus es', 'captus est', 'captus sumus', 'captus estis', 'captus sunt'],
      ['captus eram', 'captus eras', 'captus erat', 'captus eramus', 'captus eratis', 'captus erant'],
      ['captus ero', 'captus eris', 'captus erit', 'captus erimus', 'captus eritis', 'captus erunt'],
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
      ['captus sim', 'captus sis', 'captus sit', 'captus simus', 'captus sitis', 'captus sint'],
      ['captus essem', 'captus esses', 'captus esset', 'captus essemus', 'captus essetis', 'captus essent'],
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
}

export const words = [
  amo,
  moneo,
  ago,
  capio,
]

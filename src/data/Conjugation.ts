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


export const words = [
  amo,
]

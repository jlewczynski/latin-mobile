import { capitalize } from "../utils";

export const moods = [
  'indicativus',
  'coniunctivus',
  'imperativus',
] as const;

export type TMood = typeof moods[number];

export const voices = [
  'activum',
  'passivum',
] as const;

export type TVoice = typeof voices[number];

export const tenses: Record<TMood, readonly string[]> = {
  indicativus: [
    'praesens',
    'imperfectum',
    'futurum primum',
    'perfectum',
    'plusquamperfectum',
    'futurum exactum',
  ] as const,
  coniunctivus: [
    'praesens',
    'imperfectum',
    'perfectum',
    'plusquamperfectum',
  ] as const,
  imperativus: [
    'praesens',
    'futurum',
  ] as const,
};

export const numbers = [
  'singularis',
  'pluralis',
] as const;
export type TNumber = typeof numbers[number];

export type TNumbers = Record<TNumber, [string, string, string]>;
export type TTenses<T extends string> = Record<T, TNumbers>;
export type TIndicativeTenses = TTenses<typeof tenses.indicativus[number]>;
export type TConjunctiveTenses = TTenses<typeof tenses.coniunctivus[number]>;
export type TImperativeTenses = TTenses<typeof tenses.imperativus[number]>;
export type TMoods<T> = {
  activum: T;
  passivum?: T;
}
export type TIndicativeMood = TMoods<TIndicativeTenses>;
export type TConjunctiveMood = TMoods<TConjunctiveTenses>;
export type TImperativeMood = TMoods<TImperativeTenses>;

export const gerundiumCases = [
  'genetivus',
  'dativus',
  'accusativus',
  'ablativus',
] as const;
export type TGerundiumCases = typeof gerundiumCases[number];

export const supinumCases = [
  'accusativus',
  'ablativus',
] as const;
export type TSupinumCases = typeof supinumCases[number];

export type TConjugation = {
  word: string;
  indicativus: TIndicativeMood;
  coniunctivus: TConjunctiveMood;
  imperativus?: TImperativeMood;
  infinitivus: TMoods<[string, string, string]>;
  participium: TMoods<[string, string, string]>;
  gerundium?: Record<TGerundiumCases, string>;
  supinum?: Record<TSupinumCases, string>;
}

function emptyMood<T extends string>(usedTenses: readonly T[], passive: boolean = true): Record<TVoice, TTenses<T>> {
  return voices.reduce((mood, voice) => {
    if (!passive && voice === 'passivum') {
      return mood;
    }
    mood[voice] = usedTenses.reduce((voice, tense) => {
      voice[tense] = {
        singularis: ['', '', ''],
        pluralis: ['', '', ''],
      }
      return voice;
    }, {} as TTenses<T>);
    return mood;
  }, {} as Record<TVoice, TTenses<T>>)
}

export function empty(template?: TConjugation): TConjugation {
  const passive = template ? Boolean(template.indicativus.passivum) : true;
  const imperative = template ? Boolean(template.imperativus) : true;
  return {
    word: template?.word ?? '',
    indicativus: emptyMood(tenses.indicativus, passive),
    coniunctivus: emptyMood(tenses.coniunctivus, passive),
    imperativus: imperative ? emptyMood(tenses.imperativus, passive) : undefined,
    infinitivus: {
      activum: ['', '', ''],
      passivum: ['', '', ''],
    },
    participium: {
      activum: ['', '', ''],
      passivum: ['', '', ''],
    },
    gerundium: passive ? {
      genetivus: '',
      dativus: '',
      accusativus: '',
      ablativus: '',
    } : undefined,
    supinum: passive ? {
      accusativus: '',
      ablativus: '',
    } : undefined,
  }
}

export const testModes = (template?: TConjugation) => {
  const passive = template ? Boolean(template.indicativus.passivum) : true;
  const imperative = template ? Boolean(template.imperativus) : true;
  const result = moods.flatMap(m => tenses[m].flatMap(t => `${m}.activum.${t}`))
  if (passive) {
    result.push(
      ...moods.flatMap(m => tenses[m].flatMap(t => `${m}.passivum.${t}`)),
      'infinitivus', 'participium', 'gerundium+supinum'
      );
  } else {
    result.push('infinitivus+participium');
  }
  if (!imperative) {
    return result.filter(mode => !mode.startsWith('imperativus'));
  }
  return result;
}

export const getTestModeData = (v: TConjugation, testMode: string): string[] => {
  const parts = testMode.split('.');
  if (parts.length === 1) {
    if (testMode === 'infinitivus') {
      return v.infinitivus.activum.concat(v.infinitivus.passivum ?? ['', '', '']);
    }
    if (testMode === 'participium') {
      return v.participium.activum.concat(v.participium.passivum ?? ['', '', '']);
    }
    if (testMode === 'infinitivus+participium') {
      return v.infinitivus.activum.concat(v.participium.activum);
    }
    if (testMode === 'gerundium+supinum' && v.gerundium && v.supinum) {
      return gerundiumCases.map(c => v.gerundium![c]).concat(supinumCases.map(c => v.supinum![c]));
    }
    return [];
  }
  
  let cur: any = v;
  while (parts.length !== 0) {
    cur = cur[parts.shift()!];
    if (!cur) {
      return [];
    }
  }
  return (cur as TNumbers).singularis.concat((cur as TNumbers).pluralis);
}

export const setTestModeData = (v: TConjugation, testMode: string, value: string[]) => {
  const parts = testMode.split('.');
  if (parts.length === 1) {
    if (testMode === 'infinitivus') {
      v.infinitivus.activum = [value[0] ?? '', value[1] ?? '', value[2] ?? ''];
      v.infinitivus.passivum = [value[3] ?? '', value[4] ?? '', value[5] ?? ''];
    }
    if (testMode === 'participium') {
      v.participium.activum = [value[0] ?? '', value[1] ?? '', value[2] ?? ''];
      v.participium.passivum = [value[3] ?? '', value[4] ?? '', value[5] ?? ''];
    }
    if (testMode === 'infinitivus+participium') {
      v.infinitivus.activum = [value[0] ?? '', value[1] ?? '', value[2] ?? ''];
      v.participium.activum = [value[3] ?? '', value[4] ?? '', value[5] ?? ''];
    }
    if (testMode === 'gerundium+supinum' && v.gerundium && v.supinum) {
      v.gerundium.genetivus = value[0] ?? '';
      v.gerundium.dativus = value[1] ?? '';
      v.gerundium.accusativus = value[2] ?? '';
      v.gerundium.ablativus = value[3] ?? '';
      v.supinum.accusativus = value[4] ?? '';
      v.supinum.ablativus = value[5] ?? '';
    }
  } else {
    let cur: any = v;
    while (parts.length !== 0) {
      cur = cur[parts.shift()!];
      if (!cur) {
        return [];
      }
    }
    const num = cur as TNumbers;
    num.singularis = [value[0] ?? '', value[1] ?? '', value[2] ?? ''];
    num.pluralis = [value[3] ?? '', value[4] ?? '', value[5] ?? ''];
  }
}

export type TErrorList = string[];

export const validate = (template: TConjugation, answer: TConjugation, mode: string): TErrorList | null => {
  const correct = getTestModeData(template, mode);
  const answers = getTestModeData(answer, mode);
  if (!correct.length) {
    return ['INVALID MODE'];
  }
  
  const result: string[] = [];
  let err = false;
  correct.forEach((v, vi) => {
    const a = answers[vi] ?? '';
    if (v.toLocaleLowerCase() !== a.toLocaleLowerCase()) {
      result.push(`${a} <- ${v}`);
      err = true;
    } else {
      result.push('');
    }
  });

  if (err) {
    return result;
  }
  return null;
}

export const getModeLabels = (testMode: string) => {
  const parts = testMode.split('.');
  if (parts.length === 1) {
    if (testMode === 'infinitivus' || testMode === 'participium') {
      return [
        { section: 'Activum', labels: ['Preasens', 'Perfectum', 'Futurum'] },
        { section: 'Passivum', labels: ['Preasens', 'Perfectum', 'Futurum'] },
      ];
    }
    if (testMode === 'infinitivus+participium') {
      return [
        { section: 'Infinitivus', labels: ['Preasens', 'Perfectum', 'Futurum'] },
        { section: 'Participium', labels: ['Preasens', 'Perfectum', 'Futurum'] },
      ];
    }
    if (testMode === 'gerundium+supinum') {
      return [
        { section: 'Gerundium', labels: ['Genetivus', 'Dativus', 'Accusativus', 'Ablativus'] },
        { section: 'Supinum', labels: ['Accusativus', 'Ablativus'] },
      ];
    }
  } else {
    return [
      { section: 'Singularis', labels: ['persona I', 'persona II', 'persona III'] },
      { section: 'Pluralis', labels: ['persona I', 'persona II', 'persona III'] },
    ];
  }

  return [];
}

export const modeLabel = (mode: string): string => capitalize(mode.replaceAll('.', ' ').replaceAll('+', ' & '));

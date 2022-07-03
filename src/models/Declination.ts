export const cases = [
  'nominativus',
  'genetivus',
  'dativus',
  'accusativus',
  'ablativus',
  'vocativus',
] as const;

export type TCaseName = typeof cases[number];

export const numbers = [
  'singularis',
  'pluralis',
] as const;
export type TDeclinationNumber = typeof numbers[number];

export type TDeclinationNumberSet = Record<TCaseName, string>;

export type TDeclination = {
  word: string;
  category: string;
} & Record<TDeclinationNumber, TDeclinationNumberSet>;

export function empty(template?: TDeclination): TDeclination {
  return {
    word: template?.word ?? '',
    category: template?.category ?? '',
    singularis: {
      nominativus: '',
      genetivus: '',
      dativus: '',
      accusativus: '',
      ablativus: '',
      vocativus: '',
    },
    pluralis: {
      nominativus: '',
      genetivus: '',
      dativus: '',
      accusativus: '',
      ablativus: '',
      vocativus: '',
    }
  }
}

export type TErrorList = Record<TDeclinationNumber, TCaseName[]>;

export function validate(template: TDeclination, answers: TDeclination) {
  const result: TErrorList = {
    singularis: [],
    pluralis: [],
  }
  let valid = true;

  numbers.forEach(n => cases.forEach(c => {
    if (template[n][c].toLocaleLowerCase() !== answers[n][c].toLocaleLowerCase()) {
      result[n].push(c);
      valid = false;
    }
  }));

  if (!valid) {
    return result;
  }
  return null;
}
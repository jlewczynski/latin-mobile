export const grades = [
  'regular',
  'comparative',
  'superlative',
] as const;

export type TGradeName = typeof grades[number];

export type TComparison = {
  word: string;
} & Record<TGradeName, string>;

export function empty(template?: TComparison): TComparison {
  return {
    word: template?.word ?? '',
    regular: '',
    comparative: '',
    superlative: '',
  }
}

export type TErrorList = TGradeName[];

export function validate(template: TComparison, answers: TComparison) {
  const result: TErrorList = [];
  let valid = true;

  grades.forEach(g => {
    if (template[g].toLocaleLowerCase() !== answers[g].toLocaleLowerCase()) {
      result.push(g);
      valid = false;
    }
  });

  if (!valid) {
    return result;
  }
  return null;
}
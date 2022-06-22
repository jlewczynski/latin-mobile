import { TComparison } from "../models/Comparison";

const w = (word: string, regular: string, comparative: string, superlative: string): TComparison => ({
  word,
  regular,
  comparative,
  superlative,
});

export const words: TComparison[] = [
  //regular adjectives
  w('długi', 'longus', 'longior', 'longissimus'),
  w('łatwy', 'facilis', 'facilior', 'facillimus'),
  w('mocny', 'fortis', 'fortior', 'fortissimus'),
  w('wolny', 'liber', 'liberior', 'liberrimus'),
  w('szczęśliwy', 'felix', 'felicior', 'felicissimus'),
  w('piękny', 'pulcher', 'pulchrior', 'pulcherrimus'),
  w('mądry', 'sapiens', 'sapientionr', 'sapientissimus'),
  w('ostry', 'acer', 'acrior', 'acerrimus'),
  //irregular adjectives
  w('dobry', 'bonus', 'melior', 'optimus'),
  w('mały', 'parvus', 'minor', 'minimus'),
  w('wielki', 'magnus', 'maior', 'maximus'),
  w('wysoki', 'superus', 'superior', 'summus'),
  w('zły', 'malus', 'peior', 'pessimus'),
  w('prowadzący', 'prior', 'prior', 'primus'),
  w('liczny', 'multus', 'plus', 'plurimus'),
  //regular adverbs
  w('długo', 'longe', 'longius', 'longissime'),
  w('łatwo', 'facile', 'facilius', 'facillime'),
  w('mocno', 'fortiter', 'fortius', 'fortissime'),
  w('wolno', 'libere', 'liberius', 'liberrime'),
  w('szczęśliwie', 'feliciter', 'felicius', 'felicissime'),
  w('pięknie', 'pulchre', 'pulchrium', 'pulcherrime'),
  w('mądrze', 'sapienter', 'sapientius', 'sapientissime'),
  w('ostro', 'acriter', 'acrius', 'acerrime'),
  //irregular adverbs
  w('dobrze', 'bene', 'melius', 'optime'),
  w('mało', 'parum', 'minus', 'minime'),
  w('bardzo', 'magnopere', 'maius', 'maxime'),
  w('długo', 'diu', 'prius', 'diutissime'),
  w('źle', 'male', 'peius', 'pessime'),
  w('prowadząc', 'pro', 'prius', 'primum'),
  w('licznie', 'multum', 'plus', 'plurimum'),
];

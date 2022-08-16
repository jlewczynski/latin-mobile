import { TComparison } from "../models/Comparison";

const w = (word: string, mode: string, regular: string, comparative: string, superlative: string): TComparison => ({
  word,
  mode,
  regular,
  comparative,
  superlative,
});

export const words: TComparison[] = [
  //regular adjectives
  w('długi', 'adiectiva regularia', 'longus', 'longior', 'longissimus'),
  w('łatwy', 'adiectiva regularia', 'facilis', 'facilior', 'facillimus'),
  w('mocny', 'adiectiva regularia', 'fortis', 'fortior', 'fortissimus'),
  w('wolny', 'adiectiva regularia', 'liber', 'liberior', 'liberrimus'),
  w('szczęśliwy', 'adiectiva regularia', 'felix', 'felicior', 'felicissimus'),
  w('piękny', 'adiectiva regularia', 'pulcher', 'pulchrior', 'pulcherrimus'),
  w('mądry', 'adiectiva regularia', 'sapiens', 'sapientior', 'sapientissimus'),
  w('ostry', 'adiectiva regularia', 'acer', 'acrior', 'acerrimus'),
  //irregular adjectives
  w('dobry', 'adiectiva irregularia', 'bonus', 'melior', 'optimus'),
  w('mały', 'adiectiva irregularia', 'parvus', 'minor', 'minimus'),
  w('wielki', 'adiectiva irregularia', 'magnus', 'maior', 'maximus'),
  w('wysoki', 'adiectiva irregularia', 'superus', 'superior', 'summus'),
  w('zły', 'adiectiva irregularia', 'malus', 'peior', 'pessimus'),
  w('prowadzący', 'adiectiva irregularia', 'pro', 'prior', 'primus'),
  w('liczny', 'adiectiva irregularia', 'multus', 'plus', 'plurimus'),
  //regular adverbs
  w('długo', 'adverbia regularia', 'longe', 'longius', 'longissime'),
  w('łatwo', 'adverbia regularia', 'facile', 'facilius', 'facillime'),
  w('mocno', 'adverbia regularia', 'fortiter', 'fortius', 'fortissime'),
  w('wolno', 'adverbia regularia', 'libere', 'liberius', 'liberrime'),
  w('szczęśliwie', 'adverbia regularia', 'feliciter', 'felicius', 'felicissime'),
  w('pięknie', 'adverbia regularia', 'pulchre', 'pulchrium', 'pulcherrime'),
  w('mądrze', 'adverbia regularia', 'sapienter', 'sapientius', 'sapientissime'),
  w('ostro', 'adverbia regularia', 'acriter', 'acrius', 'acerrime'),
  //irregular adverbs
  w('dobrze', 'adverbia irregularia', 'bene', 'melius', 'optime'),
  w('mało', 'adverbia irregularia', 'parum', 'minus', 'minime'),
  w('bardzo', 'adverbia irregularia', 'magnopere', 'magis', 'maxime'),
  w('długo', 'adverbia irregularia', 'diu', 'diutius', 'diutissime'),
  w('źle', 'adverbia irregularia', 'male', 'peius', 'pessime'),
  w('prowadząc', 'adverbia irregularia', 'pro', 'prius', 'primum'),
];

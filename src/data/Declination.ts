import { TDeclination, TDeclinationNumberSet } from "../models/Declination";

const num = (cases: string[]): TDeclinationNumberSet => ({
  nominativus: cases[0] ?? '',
  genetivus: cases[1] ?? '',
  dativus: cases[2] ?? '',
  accusativus: cases[3] ?? cases[0] ?? '',
  ablativus: cases[4] ?? cases[2] ?? '',
  vocativus: cases[5] ?? cases[0] ?? '',
});
const noun = (word: string, sg: string[], pl: string[]): TDeclination => ({
  word,
  singularis: num(sg),
  pluralis: num(pl),
});

export const words: TDeclination[] = [
  //I declinatio
  noun('róża', ['rosa', 'rosae', 'rosae', 'rosam', 'rosa'], ['rosae', 'rosarum', 'rosis', 'rosas']),
  //II declinatio
  noun('przyjaciel', ['amicus', 'amici', 'amico', 'amicum', 'amico', 'amice'], ['amici', 'amicorum', 'amicis', 'amicos']),
  noun('syn', ['filius', 'filii', 'filio', 'filium', 'filio', 'fili'], ['filii', 'filiorum', 'filiis', 'filios']),
  noun('chłopiec', ['puer', 'pueri', 'puero', 'puerum'], ['pueri', 'puerorum', 'pueris', 'pueros']),
  noun('prezent', ['donum', 'doni', 'dono', 'donum'], ['dona', 'donorum', 'donis']),
];

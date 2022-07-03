import { TDeclination, TDeclinationNumberSet } from "../models/Declination";

const num = (cases: string[]): TDeclinationNumberSet => ({
  nominativus: cases[0] ?? '',
  genetivus: cases[1] ?? '',
  dativus: cases[2] ?? '',
  accusativus: cases[3] ?? cases[0] ?? '',
  ablativus: cases[4] ?? cases[2] ?? '',
  vocativus: cases[5] ?? cases[0] ?? '',
});
const w = (word: string, category: string, sg: string[], pl: string[]): TDeclination => ({
  word,
  category,
  singularis: num(sg),
  pluralis: num(pl),
});

export const words: TDeclination[] = [
  //substantiva
  //I declinatio
  w('róża', 'substantiva I', ['rosa', 'rosae', 'rosae', 'rosam', 'rosa'], ['rosae', 'rosarum', 'rosis', 'rosas']),
  //II declinatio
  w('przyjaciel', 'substantiva II', ['amicus', 'amici', 'amico', 'amicum', 'amico', 'amice'], ['amici', 'amicorum', 'amicis', 'amicos']),
  w('syn', 'substantiva II', ['filius', 'filii', 'filio', 'filium', 'filio', 'fili'], ['filii', 'filiorum', 'filiis', 'filios']),
  w('chłopiec', 'substantiva II', ['puer', 'pueri', 'puero', 'puerum'], ['pueri', 'puerorum', 'pueris', 'pueros']),
  w('pole', 'substantiva II', ['ager', 'agri', 'agro', 'agrum'], ['agri', 'agrorum', 'agris', 'agros']),
  w('prezent', 'substantiva II', ['donum', 'doni', 'dono', 'donum'], ['dona', 'donorum', 'donis']),
  //III declinatio
  w('król', 'substantiva III', ['rex', 'regis', 'regi', 'regem', 'rege'], ['reges', 'regum', 'regibus']),
  w('ciało', 'substantiva III', ['corpus', 'corporis', 'corpori', 'corpus', 'corpore'], ['corpora', 'corporum', 'corporibus']),
  w('owca', 'substantiva III', ['ovis', 'ovis', 'ovi', 'ovem', 'ove'], ['oves', 'ovium', 'ovibus']),
  w('miasto', 'substantiva III', ['urbs', 'urbis', 'urbi', 'urbem', 'urbe'], ['urbes', 'urbium', 'urbibus']),
  w('morze', 'substantiva III', ['mare', 'maris', 'mari', 'mare'], ['maria', 'marium', 'maribus']),
  w('siła', 'substantiva III', ['vis', 'vis', 'vi', 'vim'], ['vires', 'virium', 'viribus']),
  //IV declinatio
  w('owoc', 'substantiva IV', ['fructus', 'fructus', 'fructui', 'fructum', 'fructu'], ['fructus', 'fructuum', 'fructibus']),
  w('kolano', 'substantiva IV', ['genu', 'genus', 'genui', 'genu', 'genu'], ['genua', 'genuum', 'genibus']),
  //V declinatio
  w('dzień', 'substantiva V', ['dies', 'diei', 'diei', 'diem', 'die'], ['dies', 'dierum', 'diebus']),
  w('rzecz', 'substantiva V', ['res', 'rei', 'rei', 'rem', 're'], ['res', 'rerum', 'rebus']),
  //adiectiva
  //I & II declinationes
  w('wielki', 'adiectiva I & II', ['magnus', 'magni', 'magno', 'magnum', 'magno', 'magne'], ['magni', 'magnorum', 'magnis', 'magnos']),
  w('wielka', 'adiectiva I & II', ['magna', 'magnae', 'magnae', 'magnam', 'magna'], ['magnae', 'magnarum', 'magnis', 'magnas']),
  w('wielkie', 'adiectiva I & II', ['magnum', 'magni', 'magno'], ['magna', 'magnorum', 'magnis']),
  w('wolny', 'adiectiva I & II', ['liber', 'liberi', 'libero', 'liberum'], ['liberi', 'liberorum', 'liberis', 'liberos']),
  w('wolna', 'adiectiva I & II', ['libera', 'liberae', 'liberae', 'liberam', 'libera'], ['liberae', 'liberarum', 'liberis', 'liberas']),
  w('wolne', 'adiectiva I & II', ['liberum', 'liberi', 'libero'], ['libera', 'liberorum', 'liberis']),
  w('piękny', 'adiectiva I & II', ['pulcher', 'pulchri', 'pulchro', 'pulchrum'], ['pulchri', 'pulchrorum', 'pulchris', 'pulchros']),
  w('piękna', 'adiectiva I & II', ['pulchra', 'pulchrae', 'pulchrae', 'pulchram', 'pulchra'], ['pulchrae', 'pulchrarum', 'pulchris', 'pulchras']),
  w('piękne', 'adiectiva I & II', ['pulchrum', 'pulchri', 'pulchro'], ['pulchra', 'pulchrorum', 'pulchris']),
  //III declinatio
  w('mocny/a', 'adiectiva III', ['fortis', 'fortis', 'forti', 'fortem'], ['fortes', 'fortium', 'fortibus']),
  w('mocne', 'adiectiva III', ['forte', 'fortis', 'forti'], ['fortia', 'fortium', 'fortibus']),
  w('ostry', 'adiectiva III', ['acer', 'acris', 'acri', 'acrem'], ['acres', 'acrium', 'acribus']),
  w('ostra', 'adiectiva III', ['acris', 'acris', 'acri', 'acrem'], ['acres', 'acrium', 'acribus']),
  w('ostre', 'adiectiva III', ['acre', 'acris', 'acri'], ['acria', 'acrium', 'acribus']),
  w('możny/a', 'adiectiva III', ['potens', 'potentis', 'potenti', 'potentem'], ['potentes', 'potentium', 'potentibus']),
  w('możne', 'adiectiva III', ['potens', 'potentis', 'potenti'], ['potentia', 'potentium', 'potentibus']),
  //comparativus
  w('mocniejszy/a', 'comparativus', ['fortior', 'fortioris', 'fortiori', 'fortiorem', 'fortiore'], ['fortiores', 'fortiorum', 'fortioribus']),
  w('mocniejsze', 'comparativus', ['fortius', 'fortioris', 'fortiori', 'fortius', 'fortiore'], ['fortiora', 'fortiorum', 'fortioribus']),
  //pronomina
  w('ten (bliższy)', 'pronomia', ['hic', 'huius', 'huic', 'hunc', 'hoc'], ['hi', 'horum', 'his', 'hos']),
  w('ta (bliższy)', 'pronomia', ['haec', 'huius', 'huic', 'hanc', 'hac'], ['hae', 'harum', 'his', 'has']),
  w('to (bliższy)', 'pronomia', ['hoc', 'huius', 'huic', 'hoc', 'hoc'], ['haec', 'horum', 'his']),
  w('ten (dalszy)', 'pronomia', ['iste', 'istius', 'isti', 'istum', 'isto'], ['isti', 'istorum', 'istis', 'istos']),
  w('ta (dalszy)', 'pronomia', ['ista', 'istius', 'isti', 'istam', 'ista'], ['istae', 'istarum', 'istis', 'istas']),
  w('to (dalszy)', 'pronomia', ['istud', 'istius', 'isti', 'istud', 'isto'], ['ista', 'istorum', 'istis']),
  w('tamten', 'pronomia', ['ille', 'illius', 'illi', 'illum', 'illo'], ['illi', 'illorum', 'illis', 'illos']),
  w('tamta', 'pronomia', ['illa', 'illius', 'illi', 'illam', 'illa'], ['illae', 'illarum', 'illis', 'illas']),
  w('tamto', 'pronomia', ['illud', 'illius', 'illi', 'illud', 'illo'], ['illa', 'illorum', 'illis']),
  w('sam', 'pronomia', ['ipse', 'ipsius', 'ipsi', 'ipsum', 'ipso'], ['ipsi', 'ipsorum', 'ipsis', 'ipsos']),
  w('sama', 'pronomia', ['ipsa', 'ipsius', 'ipsi', 'ipsam', 'ipsa'], ['ipsae', 'ipsarum', 'ipsis', 'ipsas']),
  w('samo', 'pronomia', ['ipsum', 'ipsius', 'ipsi', 'ipsum', 'ipso'], ['ipsa', 'ipsorum', 'ipsis']),
  w('on', 'pronomia', ['is', 'eius', 'ei', 'eum', 'eo'], ['ei', 'eorum', 'eis', 'eos']),
  w('ona', 'pronomia', ['ea', 'eius', 'ei', 'eam', 'ea'], ['eae', 'earum', 'eis', 'eas']),
  w('ono', 'pronomia', ['id', 'eius', 'ei', 'id', 'eo'], ['ea', 'eorum', 'eis']),
  w('ten sam', 'pronomia', ['idem', 'eiusdem', 'eidem', 'eundem', 'eodem'], ['eidem', 'eorundem', 'eisdem', 'eosdem']),
  w('ta sama', 'pronomia', ['eadem', 'eiusdem', 'eidem', 'eandem', 'eadem'], ['eaedem', 'earundem', 'eisdem', 'easdem']),
  w('to samo', 'pronomia', ['idem', 'eiusdem', 'eidem', 'idem', 'eodem'], ['eadem', 'eorundem', 'eisdem']),
  w('który', 'pronomia', ['qui', 'cuius', 'cui', 'quem', 'quo'], ['qui', 'quorum', 'quibus', 'quos']),
  w('która', 'pronomia', ['quae', 'cuius', 'cui', 'quam', 'qua'], ['quae', 'quarum', 'quibus', 'quas']),
  w('które', 'pronomia', ['quod', 'cuius', 'cui', 'quod', 'quo'], ['quae', 'quorum', 'quibus']),
  w('ja', 'pronomia', ['ego', 'mei', 'mihi', 'me', 'me', ''], ['nos', 'nostrum', 'nobis', 'nos', 'nobis']),
  w('ty', 'pronomia', ['tu', 'tui', 'tibi', 'te', 'te', ''], ['vos', 'vestrum', 'vobis', 'vos', 'vobis', '']),
  w('on (osobowe)', 'pronomia', ['', 'sui', 'sibi', 'se', 'se', ''], ['', 'sui', 'sibi', 'se', 'se', '']),
  //verba irregulara
  w('sam', 'verba irregulara', ['solus', 'solius', 'soli', 'solum', 'solo'], ['soli', 'solorum', 'solis', 'solos']),
  w('sam', 'verba irregulara', ['sola', 'solius', 'soli', 'solam', 'sola'], ['solae', 'solarum', 'solis', 'solas']),
  w('samo', 'verba irregulara', ['solum', 'solius', 'soli', 'solum', 'solo'], ['sola', 'solorum', 'solis']),
  w('cały', 'verba irregulara', ['totus', 'totius', 'toti', 'totum', 'toto'], ['toti', 'totorum', 'totis', 'totos']),
  w('cała', 'verba irregulara', ['tota', 'totius', 'toti', 'totam', 'tota'], ['totae', 'totarum', 'totis', 'totas']),
  w('całe', 'verba irregulara', ['totum', 'totius', 'toti', 'totum', 'toto'], ['tota', 'totorum', 'totis']),
];

import { TDeclination, TDeclinationNumberSet } from "../models/Declination";

const num = (cases: string[]): TDeclinationNumberSet => ({
  nominativus: cases[0] ?? '',
  genetivus: cases[1] ?? '',
  dativus: cases[2] ?? '',
  accusativus: cases[3] ?? cases[0] ?? '',
  ablativus: cases[4] ?? cases[2] ?? '',
  vocativus: cases[5] ?? cases[0] ?? '',
});
const w = (word: string, sg: string[], pl: string[]): TDeclination => ({
  word,
  singularis: num(sg),
  pluralis: num(pl),
});

export const words: TDeclination[] = [
  //substantiva
  //I declinatio
  w('róża', ['rosa', 'rosae', 'rosae', 'rosam', 'rosa'], ['rosae', 'rosarum', 'rosis', 'rosas']),
  //II declinatio
  w('przyjaciel', ['amicus', 'amici', 'amico', 'amicum', 'amico', 'amice'], ['amici', 'amicorum', 'amicis', 'amicos']),
  w('syn', ['filius', 'filii', 'filio', 'filium', 'filio', 'fili'], ['filii', 'filiorum', 'filiis', 'filios']),
  w('chłopiec', ['puer', 'pueri', 'puero', 'puerum'], ['pueri', 'puerorum', 'pueris', 'pueros']),
  w('pole', ['ager', 'agri', 'agro', 'agrum'], ['agri', 'agrorum', 'agris', 'agros']),
  w('prezent', ['donum', 'doni', 'dono', 'donum'], ['dona', 'donorum', 'donis']),
  //III declinatio
  w('król', ['rex', 'regis', 'regi', 'regem', 'rege'], ['reges', 'regum', 'regibus']),
  w('ciało', ['corpus', 'corporis', 'corpori', 'corpus', 'corpore'], ['corpora', 'corporum', 'corporibus']),
  w('owca', ['ovis', 'ovis', 'ovi', 'ovem', 'ove'], ['oves', 'ovium', 'ovibus']),
  w('miasto', ['urbs', 'urbis', 'urbi', 'urbem', 'urbe'], ['urbes', 'urbium', 'urbibus']),
  w('morze', ['mare', 'maris', 'mari', 'mare'], ['maria', 'marium', 'maribus']),
  w('siła', ['vis', 'vis', 'vi', 'vim'], ['vires', 'virium', 'viribus']),
  //IV declinatio
  w('owoc', ['fructus', 'fructus', 'fructui', 'fructum', 'fructu'], ['fructus', 'fructuum', 'fructibus']),
  w('kolano', ['genu', 'genus', 'genui', 'genu', 'genu'], ['genua', 'genuum', 'genibus']),
  //V declinatio
  w('dzień', ['dies', 'diei', 'diei', 'diem', 'die'], ['dies', 'dierum', 'diebus']),
  w('rzecz', ['res', 'rei', 'rei', 'rem', 're'], ['res', 'rerum', 'rebus']),
  //adiectiva
  //I & II declinationes
  w('wielki', ['magnus', 'magni', 'magno', 'magnum', 'magno', 'magne'], ['magni', 'magnorum', 'magnis', 'magnos']),
  w('wielka', ['magna', 'magnae', 'magnae', 'magnam', 'magna'], ['magnae', 'magnarum', 'magnis', 'magnas']),
  w('wielkie', ['magnum', 'magni', 'magno'], ['magna', 'magnorum', 'magnis']),
  w('wolny', ['liber', 'liberi', 'libero', 'liberum'], ['liberi', 'liberorum', 'liberis', 'liberos']),
  w('wolna', ['libera', 'liberae', 'liberae', 'liberam', 'libera'], ['liberae', 'liberarum', 'liberis', 'liberas']),
  w('wolne', ['liberum', 'liberi', 'libero'], ['libera', 'liberorum', 'liberis']),
  w('piękny', ['pulcher', 'pulchri', 'pulchro', 'pulchrum'], ['pulchri', 'pulchrorum', 'pulchris', 'pulchros']),
  w('piękna', ['pulchra', 'pulchrae', 'pulchrae', 'pulchram', 'pulchra'], ['pulchrae', 'pulchrarum', 'pulchris', 'pulchras']),
  w('piękne', ['pulchrum', 'pulchri', 'pulchro'], ['pulchra', 'pulchrorum', 'pulchris']),
  //III declinatio
  w('mocny/a', ['fortis', 'fortis', 'forti', 'fortem'], ['fortes', 'fortium', 'fortibus']),
  w('mocne', ['forte', 'fortis', 'forti'], ['fortia', 'fortium', 'fortibus']),
  w('ostry', ['acer', 'acris', 'acri', 'acrem'], ['acres', 'acrium', 'acribus']),
  w('ostra', ['acris', 'acris', 'acri', 'acrem'], ['acres', 'acrium', 'acribus']),
  w('ostre', ['acre', 'acris', 'acri'], ['acria', 'acrium', 'acribus']),
  w('możny/a', ['potens', 'potentis', 'potenti', 'potentem'], ['potentes', 'potentium', 'potentibus']),
  w('możne', ['potens', 'potentis', 'potenti'], ['potentia', 'potentium', 'potentibus']),
  //comparativus
  w('mocniejszy/a', ['fortior', 'fortioris', 'fortiori', 'fortiorem', 'fortiore'], ['fortiores', 'fortiorum', 'fortioribus']),
  w('mocniejsze', ['fortius', 'fortioris', 'fortiori', 'fortius', 'fortiore'], ['fortiora', 'fortiorum', 'fortioribus']),
  //pronomina
  w('ten (bliższy)', ['hic', 'huius', 'huic', 'hunc', 'hoc'], ['hi', 'horum', 'his', 'hos']),
  w('ta (bliższy)', ['haec', 'huius', 'huic', 'hanc', 'hac'], ['hae', 'harum', 'his', 'has']),
  w('to (bliższy)', ['hoc', 'huius', 'huic', 'hoc', 'hoc'], ['haec', 'horum', 'his']),
  w('ten (dalszy)', ['iste', 'istius', 'isti', 'istum', 'isto'], ['isti', 'istorum', 'istis', 'istos']),
  w('ta (dalszy)', ['ista', 'istius', 'isti', 'istam', 'ista'], ['istae', 'istarum', 'istis', 'istas']),
  w('to (dalszy)', ['istud', 'istius', 'isti', 'istud', 'isto'], ['ista', 'istorum', 'istis']),
  w('tamten', ['ille', 'illius', 'illi', 'illum', 'illo'], ['illi', 'illorum', 'illis', 'illos']),
  w('tamta', ['illa', 'illius', 'illi', 'illam', 'illa'], ['illae', 'illarum', 'illis', 'illas']),
  w('tamto', ['illud', 'illius', 'illi', 'illud', 'illo'], ['illa', 'illorum', 'illis']),
  w('sam', ['ipse', 'ipsius', 'ipsi', 'ipsum', 'ipso'], ['ipsi', 'ipsorum', 'ipsis', 'ipsos']),
  w('sama', ['ipsa', 'ipsius', 'ipsi', 'ipsam', 'ipsa'], ['ipsae', 'ipsarum', 'ipsis', 'ipsas']),
  w('samo', ['ipsum', 'ipsius', 'ipsi', 'ipsum', 'ipso'], ['ipsa', 'ipsorum', 'ipsis']),
  w('on', ['is', 'eius', 'ei', 'eum', 'eo'], ['ei', 'eorum', 'eis', 'eos']),
  w('ona', ['ea', 'eius', 'ei', 'eam', 'ea'], ['eae', 'earum', 'eis', 'eas']),
  w('ono', ['id', 'eius', 'ei', 'id', 'eo'], ['ea', 'eorum', 'eis']),
  w('ten sam', ['idem', 'eiusdem', 'eidem', 'eundem', 'eodem'], ['eidem', 'eorundem', 'eisdem', 'eosdem']),
  w('ta sama', ['eadem', 'eiusdem', 'eidem', 'eandem', 'eadem'], ['eaedem', 'earundem', 'eisdem', 'easdem']),
  w('to samo', ['idem', 'eiusdem', 'eidem', 'idem', 'eodem'], ['eadem', 'eorundem', 'eisdem']),
  w('który', ['qui', 'cuius', 'cui', 'quem', 'quo'], ['qui', 'quorum', 'quibus', 'quos']),
  w('która', ['quae', 'cuius', 'cui', 'quam', 'qua'], ['quae', 'quarum', 'quibus', 'quas']),
  w('które', ['quod', 'cuius', 'cui', 'quod', 'quo'], ['quae', 'quorum', 'quibus']),
  w('ja', ['ego', 'mei', 'mihi', 'me', 'me', ''], ['nos', 'nostrum', 'nobis', 'nos', 'nobis']),
  w('ty', ['tu', 'tui', 'tibi', 'te', 'te', ''], ['vos', 'vestrum', 'vobis', 'vos', 'vobis', '']),
  w('on (osobowe)', ['', 'sui', 'sibi', 'se', 'se', ''], ['', 'sui', 'sibi', 'se', 'se', '']),
  //verba irregulara
  w('sam', ['solus', 'solius', 'soli', 'solum', 'solo'], ['soli', 'solorum', 'solis', 'solos']),
  w('sam', ['sola', 'solius', 'soli', 'solam', 'sola'], ['solae', 'solarum', 'solis', 'solas']),
  w('samo', ['solum', 'solius', 'soli', 'solum', 'solo'], ['sola', 'solorum', 'solis']),
  w('cały', ['totus', 'totius', 'toti', 'totum', 'toto'], ['toti', 'totorum', 'totis', 'totos']),
  w('cała', ['tota', 'totius', 'toti', 'totam', 'tota'], ['totae', 'totarum', 'totis', 'totas']),
  w('całe', ['totum', 'totius', 'toti', 'totum', 'toto'], ['tota', 'totorum', 'totis']),

];

import { ITestView } from "..";
import DeclinationsSpeak from "./SpeakTest";
import DeclinationsWrite from "./WriteTest";

export default {
  write: DeclinationsWrite,
  speak: DeclinationsSpeak,
} as ITestView;
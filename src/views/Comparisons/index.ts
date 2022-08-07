import { ITestView } from "..";
import ComparisonSpeak from "./SpeakTest";
import ComparisonWrite from "./WriteTest";

export default {
  write: ComparisonWrite,
  speak: ComparisonSpeak,
} as ITestView;
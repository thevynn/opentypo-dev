import Link from "next/link";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export default function About() {
  return (
    <main className="flex-1">
      페이지 구축 중입니다 ㅎㅎ
    </main>
  );
}
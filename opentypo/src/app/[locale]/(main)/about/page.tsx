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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-6 md:space-y-10">
          <div className="w-full flex flex-col gap-2">
            {/* Hero Effector */}
            <svg width="0" height="0">
              <filter id="turbulence">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0 0.5"
                  numOctaves="1"
                  result="turbulence"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="4s"
                    values="0 0.7; 0 0.8"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="turbulence"
                  scale="5"
                />
              </filter>
            </svg>
            <h1
              className={cls(
                instrumentSerif.className,
                "text-8xl text-center tracking-tight",
              )}
              style={{ filter: "url(#turbulence)" }}
            >
              The{" "}
              <span className={cls(instrumentSerif.className, "italic")}>
                Venture
              </span>{" "}
              Calls!
            </h1>
            <h3 className="text-lg font-semibold text-center text-neutral-700 dark:text-neutral-400">
              디자이너를 위한, 디자이너에 의한 프로덕트를 만듭니다.
            </h3>
          </div>
          <p className="leading-7 text-md font-regular text-center text-neutral-900 dark:text-neutral-400">
            예쁜 폰트가 꼭 유료일 필요는 없습니다. <br />
            이 세상에는 예쁘면서도 무료로 사용 가능한 숨겨진 폰트들이 많습니다.{" "}
            <br />
            하지만 이러한 폰트들을 직접 찾아헤매는 건 어려운 일이죠. <br />
          </p>
          <p className="leading-7 text-md font-regular text-center text-neutral-900 dark:text-neutral-400">
            OpenTypo™는 사전에 큐레이팅한 <b>무료이지만 예쁜 폰트들</b>을
            제공합니다.
          </p>
          <h3 className="text-lg font-semibold text-center text-neutral-700 dark:text-neutral-400">
            폰트 제보 및 광고 문의
          </h3>
          <p className="leading-7 text-md font-regular text-center text-neutral-900 dark:text-neutral-400">
            폰트 제보, 광고 문의, 기타 문의 등은 아래 이메일 주소로 연락
            부탁드립니다. thevynn.studio@gmail.com
          </p>
        </div>
      </section>
    </main>
  );
}
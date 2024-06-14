import { Instrument_Serif } from "next/font/google";
import ShimmerButton from "@/components/ui/shimmer-button";
import { ChevronRight } from "lucide-react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export default function Landing() {
  return (
    <div className="p-8 flex flex-col gap-6 items-center">
      <div className="w-full flex flex-col gap-1">
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
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="5" />
          </filter>
        </svg>
        <h1
          className={cls(
            instrumentSerif.className,
            "text-8xl text-center tracking-tight"
          )}
          style={{ filter: "url(#turbulence)" }}
        >
          Free, but{" "}
          <span className={cls(instrumentSerif.className, "italic")}>
            Better.
          </span>
        </h1>
        <h3 className="text-md font-regular text-center text-neutral-800 dark:text-neutral-400">
          무료지만 퀄리티가 보장된, 감도높은 폰트들을 큐레이팅 해드립니다.
        </h3>
      </div>
      <ShimmerButton className="shadow-2xl">
        <span className="flex flex-row justify-center items-center whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-md">
          폰트 찾아보기 <ChevronRight className="w-5 h-5" />
        </span>
      </ShimmerButton>
    </div>
  );
}

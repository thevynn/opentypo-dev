import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { Laugh, Smile, Meh, Frown, Angry } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { CustomButton } from "./ui/custom-button";

export function FeedbackDialog() {
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [rating, setRating] = React.useState<number | undefined>(undefined);
  const [captchaVerified, setCaptchaVerified] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();
  const [lastSubmitted, setLastSubmitted] = React.useState<number | null>(null);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(Boolean(value)); // CAPTCHA가 성공적으로 완료되었는지 확인
  };

  const handleSubmit = async () => {
    if (!captchaVerified) {
      toast({
        title: "CAPTCHA를 완료해 주세요.",
        variant: "destructive",
        description: "제출 전에 CAPTCHA를 완료해 주세요.",
        duration: 5000,
      });
      return;
    }

    const now = Date.now();
    const timeSinceLastSubmit = lastSubmitted ? now - lastSubmitted : Infinity;
    const waitTime = 60000; // 제출 간격: 1분 (60,000ms)

    if (timeSinceLastSubmit < waitTime) {
      const remainingTime = Math.ceil((waitTime - timeSinceLastSubmit) / 1000);
      toast({
        title: "제출 간격이 너무 짧습니다.",
        variant: "destructive",
        description: `잠시 후 다시 시도해 주세요. ${remainingTime}초 후에 제출 가능합니다.`,
        duration: 5000,
      });
      return;
    }

    const feedbackData = {
      feedback,
      rating,
    };

    const { data, error } = await supabase
      .from("feedbacks")
      .insert([feedbackData]);

    if (error) {
      console.error("Error inserting feedback:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "There was an error submitting your feedback.",
        duration: 5000,
      });
    } else {
      console.log("Feedback submitted:", data);
      toast({
        title: "소중한 피드백 감사합니다!",
        variant: "primary",
        description: "자세히 검토하여 더 나은 서비스로 보답드리겠습니다.",
        duration: 5000,
      });
      setFeedback(""); // 입력한 내용 초기화
      setRating(undefined); // 평가 점수 초기화
      setCaptchaVerified(false); // CAPTCHA 초기화
      setLastSubmitted(now); // 제출 시간 업데이트
      setOpen(false); // 다이얼로그 닫기
    }
  };

  const handleRatingChange = (value: string) => {
    const ratingMap: { [key: string]: number } = {
      laugh: 5,
      smile: 4,
      meh: 3,
      frown: 2,
      angry: 1,
    };
    setRating(ratingMap[value]);
  };

  const feedbackForm = (
    <>
      <ToggleGroup type="single" onValueChange={handleRatingChange}>
        <ToggleGroupItem value="laugh" aria-label="rating-5">
          <Laugh className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="smile" aria-label="rating-4">
          <Smile className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="meh" aria-label="rating-3">
          <Meh className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="frown" aria-label="rating-2">
          <Frown className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="angry" aria-label="rating-1">
          <Angry className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <Textarea
        placeholder="이런 기능이 있으면 좋겠어요"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        maxLength={500} // 피드백 길이 제한
      />
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string} // 환경 변수에서 사이트 키 가져오기
        onChange={handleCaptchaChange}
      />
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <CustomButton variant={"circle"}>피드백 남기기</CustomButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>소중한 피드백을 남겨주세요</DialogTitle>
            <DialogDescription>
              OpenTypo™는 여러분들과 함께 만들어나가는 프로젝트입니다.
            </DialogDescription>
          </DialogHeader>
          {feedbackForm}
          <DialogFooter>
            <Button type="submit" size="default" onClick={handleSubmit}>
              보내기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <CustomButton variant={"circle"}>피드백 남기기</CustomButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>소중한 피드백을 남겨주세요</DrawerTitle>
          <DrawerDescription>
            OpenTypo™는 여러분들과 함께 만들어나가는 프로젝트입니다.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2 gap-4">
          {feedbackForm}
          <Button type="submit" size="default" onClick={handleSubmit}>
            보내기
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">취소하기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

import * as React from "react";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomButton } from "@/components/ui/custom-button";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

import { supabase } from "@/lib/supabaseClient";
import { Laugh, Smile, Meh, Frown, Angry } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function FeedbackDialog() {
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [rating, setRating] = React.useState<number | undefined>(undefined);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleSubmit = async () => {
    const feedbackData: { [key: string]: any } = {
      feedback,
      rating,
    };

    if (session) {
      feedbackData.user_id = session.user.id;
      feedbackData.user_name = session.user.name;
      feedbackData.email_address = session.user.email;
    }

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
      <AutosizeTextarea
        placeholder="이런 기능이 있으면 좋겠어요"
        minHeight={120}
        maxHeight={600}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
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
        <DrawerFooter className="pt-2">
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

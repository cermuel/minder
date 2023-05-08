import * as htmlToImage from "html-to-image";
import { PostType } from "../../types/components/pages/post";
import { toast } from "react-hot-toast";

export const handleSaveImage = (quoteCard: any, post: PostType) => {
  if (quoteCard.current) {
    htmlToImage.toPng(quoteCard?.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${post.quote.slice(0, 15)}.png`;
      link.href = dataUrl;
      link.click();
    });
  }
};

export const textToSpeech: void | any = (text: string, voice: number) => {
  const speech = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  speech.lang = "en-US";
  speech.rate = 0.9;
  speech.pitch = 1;
  speech.voice = voices[voice];
  window.speechSynthesis.speak(speech);
};

export const shareQuote = (quote: string) => {
  navigator.clipboard.writeText(quote);
  toast("Quote copied to clipboard");
};

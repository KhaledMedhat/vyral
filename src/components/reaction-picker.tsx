import { useState } from "react";
import { EmojiPicker, EmojiPickerContent, EmojiPickerFooter, EmojiPickerSearch } from "./ui/emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { EMOJI_RANDOMIZE_DATA } from "~/constants/constants";
import { InputGroupButton } from "./ui/input-group";
import { useToggleReactionMutation } from "~/redux/apis/channel.api";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const ReactionPicker: React.FC<{
  isMessageInput: boolean;
  currentEmoji?: string,
  selectedEmoji?: string | null;
  setCurrentEmoji?: (emoji: string) => void
  addEmojiToMessage?: (emoji: string) => void
  messageId?: string;
  isShortcut: boolean;
  currentUserId?: string;
}> = ({ currentEmoji, selectedEmoji, setCurrentEmoji, isMessageInput, addEmojiToMessage, messageId, currentUserId, isShortcut }) => {
  const [hoverEmoji, setHoverEmoji] = useState<string>("😊");
  const [isEmojiHovered, setIsEmojiHovered] = useState(false);
  const [makeReaction] = useToggleReactionMutation(); const getRandomEmoji = () => {
    const filtered = EMOJI_RANDOMIZE_DATA.filter((emoji) => emoji !== currentEmoji);

    return filtered[Math.floor(Math.random() * filtered.length)];
  };
  const handleMouseEnter = () => {
    setIsEmojiHovered(true);
    const newEmoji = getRandomEmoji();
    if (setCurrentEmoji) {
      setHoverEmoji(newEmoji);
      setCurrentEmoji(newEmoji);
    } else {
      setHoverEmoji("😊");
    }
  };

  const handleMouseLeave = () => {
    setIsEmojiHovered(false);
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <Popover>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              {isMessageInput ?
                <InputGroupButton onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} variant="ghost" size="icon-sm" type="button" className="hover:scale-110 transition-all duration-200 z-30">
                  {selectedEmoji ? (
                    <span className="transition-all duration-200 text-lg">{selectedEmoji}</span>
                  ) : (
                    <span className={`transition-all duration-200 text-lg ${isEmojiHovered ? "filter-none" : "grayscale"}`}>
                      {isEmojiHovered ? hoverEmoji : currentEmoji}
                    </span>
                  )}
                </InputGroupButton>
                :
                <Button
                  variant="ghost"
                  size="icon-sm"
                  type="button"
                  className="hover:scale-110 transition-all duration-200 z-30"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {selectedEmoji ? (
                    <span className="transition-all duration-200 text-lg">{selectedEmoji}</span>
                  ) : (
                    <span className={`transition-all duration-200 text-lg ${isEmojiHovered ? "filter-none" : "grayscale"}`}>
                      {isEmojiHovered ? hoverEmoji : currentEmoji}
                    </span>
                  )}
                </Button>
              }

            </PopoverTrigger>
          </TooltipTrigger>
          {isShortcut && <TooltipContent>Add Reaction</TooltipContent>}
          <PopoverContent
            forceMount
            className="will-change-transform transform-gpu w-fit p-0 data-[state=closed]:invisible data-[state=closed]:pointer-events-none"
          >
            <EmojiPicker
              className="h-[342px]"
              onEmojiSelect={({ emoji }) => {
                if (addEmojiToMessage) {
                  addEmojiToMessage(emoji);
                }

                if (messageId && currentUserId) {
                  makeReaction({
                    messageId: messageId,
                    reaction: {
                      emoji: emoji,
                      userId: currentUserId,
                    },
                  });
                }
                document.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "Escape" })
                );
              }}
            >
              <EmojiPickerSearch />
              <EmojiPickerContent />
              <EmojiPickerFooter />
            </EmojiPicker>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ReactionPicker;
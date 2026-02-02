import { useState } from "react";
import { EmojiPicker, EmojiPickerContent, EmojiPickerFooter, EmojiPickerSearch } from "./ui/emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const ReactionPicker: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        forceMount
        className="will-change-transform transform-gpu w-fit p-0 data-[state=closed]:invisible data-[state=closed]:pointer-events-none"
      >
        <EmojiPicker
          className="h-[342px]"
          onEmojiSelect={({ emoji }) => {
            console.log(emoji);
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
  );
};

export default ReactionPicker;
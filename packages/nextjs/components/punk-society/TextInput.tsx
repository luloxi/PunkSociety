import { ChangeEvent, FocusEvent, ReactNode, useCallback, useEffect, useRef } from "react";

interface TextInputProps {
  description: string;
  placeholder: string;
  setDescription: (desc: string) => void;
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  reFocus?: boolean;
  maxLength?: number; // Add maxLength prop
}

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  description,
  setDescription,
  error,
  prefix,
  suffix,
  reFocus,
  maxLength, // Add maxLength prop
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  let modifier = "";
  if (error) {
    modifier = "border-error";
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    [setDescription],
  );

  const onFocus = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
    if (reFocus !== undefined) {
      e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
    }
  };

  useEffect(() => {
    if (reFocus !== undefined && reFocus === true) textAreaRef.current?.focus();
  }, [reFocus]);

  return (
    <div className="text-left flex-1">
      <div className={`flex bg-base-200 rounded-lg text-accent ${modifier}`}>
        {prefix}
        <textarea
          className="textarea text-lg textarea-ghost border-base-300 focus:border-green-600 border-2 rounded-lg focus:outline-none focus:bg-transparent focus:text-gray-400 h-auto min-h-[3rem] px-4 w-full font-medium placeholder:text-accent/50 text-green-500 resize-none"
          placeholder={placeholder ? placeholder : "Enter text here"}
          name="description"
          value={description}
          onChange={handleChange}
          autoComplete="off"
          ref={textAreaRef}
          onFocus={onFocus}
          rows={3} // You can adjust the initial height as needed
          maxLength={maxLength} // Add maxLength prop
        />
        {suffix}
      </div>
    </div>
  );
};

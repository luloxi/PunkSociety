import { ChangeEvent, FocusEvent, ReactNode, useCallback, useEffect, useRef } from "react";
import { CommonInputProps } from "~~/components/scaffold-eth";

type TextAreaBaseProps<T> = CommonInputProps<T> & {
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  reFocus?: boolean;
};

export const TextAreaBase = <T extends { toString: () => string } | undefined = string>({
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  prefix,
  suffix,
  reFocus,
}: TextAreaBaseProps<T>) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  let modifier = "";
  if (error) {
    modifier = "border-error";
  } else if (disabled) {
    modifier = "border-disabled bg-base-300";
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value as unknown as T);
    },
    [onChange],
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
    <div className={`flex border-2 border-base-300 bg-base-200 rounded-lg text-accent ${modifier}`}>
      {prefix}
      <textarea
        className="textarea textarea-ghost focus:border-green-600 rounded-lg focus:outline-none focus:bg-transparent focus:text-gray-400 h-auto min-h-[3rem] px-4 border w-full font-medium placeholder:text-accent/50 text-green-500 resize-none"
        placeholder={placeholder}
        name={name}
        value={value?.toString()}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
        ref={textAreaRef}
        onFocus={onFocus}
        rows={3} // You can adjust the initial height as needed
      />
      {suffix}
    </div>
  );
};

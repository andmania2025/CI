import { Input } from "@/components/ui/input";
import React, { useState, useRef, useEffect, type KeyboardEvent } from "react";
import type { MailVariable } from "./MailVariableSettingsDialog";

interface MentionInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variables: MailVariable[];
  value: string;
  onValueChange: (value: string) => void;
}

export const MentionInput = React.forwardRef<HTMLInputElement, MentionInputProps>(
  ({ variables, value, onValueChange, ...props }, ref) => {
    const [showMentions, setShowMentions] = useState(false);
    const [mentionQuery, setMentionQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mentionStart, setMentionStart] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // フィルタリングされた変数リスト
    const filteredVariables = variables.filter(
      (variable) =>
        variable.displayName.toLowerCase().includes(mentionQuery.toLowerCase()) ||
        variable.variableName.toLowerCase().includes(mentionQuery.toLowerCase())
    );

    // "/"の検出とメンション候補の表示
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "/") {
        const cursorPos = e.currentTarget.selectionStart || 0;
        const textBeforeCursor = value.substring(0, cursorPos);

        // 直前が空白、行頭、または何もない場合に"/"でメンション開始
        if (
          cursorPos === 0 ||
          textBeforeCursor[cursorPos - 1] === " " ||
          textBeforeCursor[cursorPos - 1] === "\n"
        ) {
          setMentionStart(cursorPos);
          setMentionQuery("");
          setSelectedIndex(0);
          setShowMentions(true);
        }
      }

      if (showMentions) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filteredVariables.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredVariables[selectedIndex]) {
            insertMention(filteredVariables[selectedIndex]);
          }
        } else if (e.key === "Escape") {
          e.preventDefault();
          closeMentions();
        } else if (e.key === "Backspace") {
          // バックスペースで"/"を削除した場合、メンションを閉じる
          const cursorPos = e.currentTarget.selectionStart || 0;
          if (cursorPos <= mentionStart) {
            closeMentions();
          }
        }
      }
    };

    // メンションを閉じる
    const closeMentions = () => {
      setShowMentions(false);
      setMentionStart(-1);
      setMentionQuery("");
      setSelectedIndex(0);
    };

    // テキスト変更時の処理
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const cursorPos = e.target.selectionStart || 0;

      onValueChange(newValue);

      if (showMentions && mentionStart >= 0) {
        const textAfterSlash = newValue.substring(mentionStart + 1, cursorPos);

        // "/"の後に続くテキストをクエリとして使用
        if (textAfterSlash.includes(" ") || textAfterSlash.includes("\n")) {
          // 空白が含まれている場合はメンションを閉じる
          closeMentions();
        } else if (cursorPos <= mentionStart) {
          // カーソルが"/"より前になった場合は閉じる
          closeMentions();
        } else {
          setMentionQuery(textAfterSlash);
          setSelectedIndex(0);
        }
      }
    };

    // メンションの挿入
    const insertMention = (variable: MailVariable) => {
      if (!variable || mentionStart < 0) return;

      const beforeMention = value.substring(0, mentionStart);
      const afterMention = value.substring(mentionStart + 1 + mentionQuery.length, value.length);
      const mentionText = `@${variable.variableName.replace(/[\[\]]/g, "")}`;
      const newValue = beforeMention + mentionText + afterMention;

      onValueChange(newValue);
      closeMentions();

      // カーソル位置を調整
      setTimeout(() => {
        if (inputRef.current) {
          const newCursorPos = mentionStart + mentionText.length;
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
          inputRef.current.focus();
        }
      }, 0);
    };

    // refの統合
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(inputRef.current);
        } else {
          ref.current = inputRef.current;
        }
      }
    }, [ref]);

    // フォーカスが外れた場合にメンションを閉じる
    const handleBlur = (_e: React.FocusEvent<HTMLInputElement>) => {
      // ポップオーバー内のクリックは無視
      setTimeout(() => {
        if (!popoverRef.current?.contains(document.activeElement)) {
          closeMentions();
        }
      }, 200);
    };

    return (
      <div className="relative">
        <Input
          {...props}
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full"
        />
        {showMentions && filteredVariables.length > 0 && (
          <div
            ref={popoverRef}
            className="absolute z-50 w-80 mb-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
            style={{ bottom: "100%" }}
            onMouseDown={(e) => e.preventDefault()} // クリック時のフォーカス喪失を防ぐ
          >
            {filteredVariables.map((variable, index) => (
              <button
                type="button"
                key={variable.id}
                onClick={() => insertMention(variable)}
                className={`w-full text-left px-3 py-2 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? "bg-gray-100" : "bg-white"}`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-black">
                    @{variable.variableName.replace(/[\[\]]/g, "")}
                  </span>
                  <span className="text-sm text-gray-600">{variable.displayName}</span>
                </div>
                {variable.description && (
                  <div className="text-xs text-gray-500 mt-1">{variable.description}</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

MentionInput.displayName = "MentionInput";

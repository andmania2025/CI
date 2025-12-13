"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

// ============================================
// 型定義
// ============================================

export interface AudioSettingsState {
  formatStyle: string;
  hostVoice: string;
  guestVoice: string;
  voiceEngine: string;
  language: string;
  audioQuality: string;
}

export interface AudioSettingsProps {
  settings: AudioSettingsState;
  onSettingsChange: (key: keyof AudioSettingsState, value: string) => void;
}

// ============================================
// 定数
// ============================================

const FORMAT_OPTIONS = [
  { value: "default", label: "Interview Mode" },
  { value: "narrative", label: "Narrative Style" },
  { value: "discussion", label: "Panel Discussion" },
  { value: "monologue", label: "Solo Monologue" },
];

const VOICE_OPTIONS = {
  host: [
    { value: "alex", label: "Alex" },
    { value: "sarah", label: "Sarah" },
    { value: "mike", label: "Mike" },
    { value: "emma", label: "Emma" },
  ],
  guest: [
    { value: "morgan", label: "Morgan" },
    { value: "jordan", label: "Jordan" },
    { value: "taylor", label: "Taylor" },
    { value: "casey", label: "Casey" },
  ],
};

const ENGINE_OPTIONS = [
  { value: "eleven-v2", label: "Eleven AI v2" },
  { value: "eleven-v1", label: "Eleven AI v1" },
  { value: "openai", label: "OpenAI TTS" },
  { value: "azure", label: "Azure Speech" },
];

const LANGUAGE_OPTIONS = [
  { value: "auto", label: "Auto-detect" },
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
];

const QUALITY_OPTIONS = [
  { value: "studio", label: "Studio Quality" },
  { value: "high", label: "High Quality" },
  { value: "standard", label: "Standard Quality" },
  { value: "compressed", label: "Compressed" },
];

// ============================================
// AudioSettings コンポーネント
// ============================================

export function AudioSettings({ settings, onSettingsChange }: AudioSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Format Style */}
      <div>
        <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
          Format Style
        </Label>
        <Select defaultValue="default" onValueChange={(v) => onSettingsChange("formatStyle", v)}>
          <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {settings.formatStyle || "Interview Mode"}
              </span>
              <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-1 mr-2 rounded-md text-xs">
                Default
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            {FORMAT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Voice Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
            Host Voice
          </Label>
          <Select defaultValue="alex" onValueChange={(v) => onSettingsChange("hostVoice", v)}>
            <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
              <div className="flex items-center gap-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/voice1.png" alt="Host" />
                </Avatar>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {settings.hostVoice || "alex"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {VOICE_OPTIONS.host.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
            Guest Voice
          </Label>
          <Select defaultValue="morgan" onValueChange={(v) => onSettingsChange("guestVoice", v)}>
            <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
              <div className="flex items-center gap-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/voice2.png" alt="Guest" />
                </Avatar>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {settings.guestVoice}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {VOICE_OPTIONS.guest.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Engine & Language */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
            Voice Engine
          </Label>
          <Select
            defaultValue="eleven-v2"
            onValueChange={(v) => onSettingsChange("voiceEngine", v)}
          >
            <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {settings.voiceEngine || "Eleven AI v2"}
                </span>
                <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-1 mr-2 rounded-md text-xs">
                  Multilingual
                </div>
              </div>
            </SelectTrigger>
            <SelectContent>
              {ENGINE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
            Language
          </Label>
          <Select defaultValue="auto" onValueChange={(v) => onSettingsChange("language", v)}>
            <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {settings.language || "Auto-detect"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Audio Quality */}
      <div>
        <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
          Audio Quality
        </Label>
        <Select defaultValue="studio" onValueChange={(v) => onSettingsChange("audioQuality", v)}>
          <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {settings.audioQuality || "Studio Quality"}
            </span>
          </SelectTrigger>
          <SelectContent>
            {QUALITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownNarrowWide,
  ChevronDown,
  FolderOpen,
  Headphones,
  Link,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";

import { AudioSettings, type AudioSettingsState } from "./AudioSettings";
import { ExistingTab, type Project, UploadTab, UrlTab } from "./TabContents";

// ============================================
// モックデータ
// ============================================

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Future Thinking Talk.pdf",
    type: "pdf",
    size: "45.4 KB",
    createdAt: "2 hours ago",
    status: "completed",
  },
  {
    id: "2",
    name: "AI Revolution Article",
    type: "url",
    duration: "12:34",
    createdAt: "1 day ago",
    status: "completed",
  },
  {
    id: "3",
    name: "Tech Trends 2024",
    type: "audio",
    duration: "8:45",
    createdAt: "3 days ago",
    status: "processing",
  },
  {
    id: "4",
    name: "Climate Change Report",
    type: "pdf",
    size: "2.1 MB",
    createdAt: "1 week ago",
    status: "draft",
  },
];

// ============================================
// InputModal コンポーネント
// ============================================

export default function InputModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("upload");
  const [urlInput, setUrlInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [settings, setSettings] = useState<AudioSettingsState>({
    formatStyle: "",
    hostVoice: "alex",
    guestVoice: "morgan",
    voiceEngine: "",
    language: "",
    audioQuality: "",
  });

  const handleSettingsChange = (key: keyof AudioSettingsState, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Open Audio Show Creator</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <CardContent className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-3 sm:gap-4 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-800 dark:bg-neutral-700 rounded-2xl flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                  Create Your Audio Show
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-normal">
                  Drop a document or paste a link — GenFM will instantly turn it into a fully voiced
                  podcast you can preview, edit, and download.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 -mt-2 -mr-2 shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 sm:mb-8">
            <TabsList className="grid w-full grid-cols-3 rounded-xl p-1 bg-neutral-100 dark:bg-neutral-800">
              <TabsTrigger
                value="upload"
                className="rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-neutral-100"
              >
                <Upload className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Upload File</span>
                <span className="sm:hidden">Upload</span>
              </TabsTrigger>
              <TabsTrigger
                value="url"
                className="rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-neutral-100"
              >
                <Link className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Import via URL</span>
                <span className="sm:hidden">URL</span>
              </TabsTrigger>
              <TabsTrigger
                value="existing"
                className="rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-neutral-100"
              >
                <FolderOpen className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Choose Existing</span>
                <span className="sm:hidden">Existing</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-6">
              <UploadTab />
            </TabsContent>

            <TabsContent value="url" className="mt-6">
              <UrlTab urlInput={urlInput} onUrlChange={setUrlInput} />
            </TabsContent>

            <TabsContent value="existing" className="mt-6">
              <ExistingTab
                projects={mockProjects}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedProject={selectedProject}
                onSelectProject={setSelectedProject}
              />
            </TabsContent>
          </Tabs>

          {/* Settings */}
          <AudioSettings settings={settings} onSettingsChange={handleSettingsChange} />

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-5 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <Button
              variant="outline"
              className="rounded-xl px-4 sm:px-6 h-12 border-neutral-300 dark:border-neutral-700 bg-transparent text-sm flex items-center justify-center order-2 sm:order-1"
            >
              <ArrowDownNarrowWide className="h-4 w-4 mr-2" />
              Recent
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button className="bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 text-white rounded-xl px-6 sm:px-8 h-12 font-medium order-1 sm:order-2">
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Re-export components for direct access
export { AudioSettings } from "./AudioSettings";
export type { AudioSettingsState } from "./AudioSettings";
export { ExistingTab, UploadTab, UrlTab } from "./TabContents";
export type { Project } from "./TabContents";

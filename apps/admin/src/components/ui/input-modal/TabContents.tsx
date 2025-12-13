"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Clock,
  Copy,
  FileImage,
  FileText,
  Globe,
  Headphones,
  Play,
  Search,
  Star,
  Upload,
  Youtube,
} from "lucide-react";

// ============================================
// 型定義
// ============================================

export interface Project {
  id: string;
  name: string;
  type: "pdf" | "url" | "audio";
  size?: string;
  duration?: string;
  createdAt: string;
  thumbnail?: string;
  status: "completed" | "processing" | "draft";
}

// ============================================
// ユーティリティ関数
// ============================================

export function getProjectIcon(type: string) {
  switch (type) {
    case "pdf":
      return <FileText className="w-4 h-4" />;
    case "url":
      return <Globe className="w-4 h-4" />;
    case "audio":
      return <Headphones className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "processing":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "draft":
      return "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400";
    default:
      return "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400";
  }
}

// ============================================
// UploadTab
// ============================================

export function UploadTab() {
  return (
    <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 text-center bg-neutral-50 dark:bg-neutral-900/50">
      <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <Upload className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium mb-2 text-neutral-900 dark:text-neutral-100">
        Drop your file here
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
        Support for PDF, DOCX, TXT files up to 10MB
      </p>
      <Button
        variant="outline"
        className="border-neutral-300 dark:border-neutral-700 bg-transparent"
      >
        Browse Files
      </Button>
    </div>
  );
}

// ============================================
// UrlTab
// ============================================

interface UrlTabProps {
  urlInput: string;
  onUrlChange: (url: string) => void;
}

export function UrlTab({ urlInput, onUrlChange }: UrlTabProps) {
  const contentTypes = [
    { icon: Globe, label: "Articles" },
    { icon: Youtube, label: "YouTube" },
    { icon: FileText, label: "Blogs" },
    { icon: FileImage, label: "News" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <Label
          htmlFor="url-input"
          className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
        >
          Content URL
        </Label>
        <div className="mt-2">
          <Input
            id="url-input"
            type="url"
            placeholder="https://example.com/article or YouTube URL"
            value={urlInput}
            onChange={(e) => onUrlChange(e.target.value)}
            className="w-full h-12 rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {contentTypes.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50"
          >
            <Icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">{label}</span>
          </div>
        ))}
      </div>
      {urlInput && (
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                Ready to import content
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">{urlInput}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// ExistingTab
// ============================================

interface ExistingTabProps {
  projects: Project[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedProject: string | null;
  onSelectProject: (id: string) => void;
}

export function ExistingTab({
  projects,
  searchQuery,
  onSearchChange,
  selectedProject,
  onSelectProject,
}: ExistingTabProps) {
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
        />
      </div>
      <div className="max-h-64 overflow-y-auto space-y-2">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedProject === project.id
                ? "border-neutral-400 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800"
                : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                {getProjectIcon(project.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                    {project.name}
                  </p>
                  <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(project.status)}`}>
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {project.createdAt}
                  </span>
                  {project.size && <span>{project.size}</span>}
                  {project.duration && (
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {project.duration}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Copy className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Star className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

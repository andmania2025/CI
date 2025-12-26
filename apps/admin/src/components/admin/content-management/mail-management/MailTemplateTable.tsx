import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { memo } from "react";
import type { MailTemplate } from "./types";

interface MailTemplateTableProps {
  templates: MailTemplate[];
  selectedMails: string[];
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectMail: (mailId: string, checked: boolean) => void;
  onEditTemplate: (template: MailTemplate) => void;
}

/**
 * メールテンプレート一覧テーブル
 * memo化により不要な再レンダリングを防止
 */
export const MailTemplateTable = memo(function MailTemplateTable({
  templates,
  selectedMails,
  selectAll,
  onSelectAll,
  onSelectMail,
  onEditTemplate,
}: MailTemplateTableProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden flex-1 min-h-0">
      <div className="h-full max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-50">
              <TableHead className="w-12 text-center font-semibold text-gray-700 py-2 bg-gray-50">
                <Checkbox checked={selectAll} onCheckedChange={onSelectAll} />
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-700 py-2 bg-gray-50">
                テンプレート名
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-700 py-2 bg-gray-50">
                件名
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-700 py-2 bg-gray-50">
                配信設定
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-700 py-2 bg-gray-50" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <MailTemplateRow
                key={template.id}
                template={template}
                isSelected={selectedMails.includes(template.id)}
                onSelect={onSelectMail}
                onEdit={onEditTemplate}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

// 行コンポーネントをmemo化
interface MailTemplateRowProps {
  template: MailTemplate;
  isSelected: boolean;
  onSelect: (mailId: string, checked: boolean) => void;
  onEdit: (template: MailTemplate) => void;
}

const MailTemplateRow = memo(function MailTemplateRow({
  template,
  isSelected,
  onSelect,
  onEdit,
}: MailTemplateRowProps) {
  return (
    <TableRow className="border-b border-gray-100 hover:bg-gray-50">
      <TableCell className="text-center py-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked: boolean) => onSelect(template.id, checked)}
        />
      </TableCell>
      <TableCell className="text-left text-gray-700 py-2">
        {template.templateName}
      </TableCell>
      <TableCell className="text-left text-gray-600 py-2">
        {template.subject}
      </TableCell>
      <TableCell className="text-left text-gray-600 py-2">
        <Badge
          variant={template.templateType === "配信" ? "success" : "neutral"}
        >
          {template.templateType}
        </Badge>
      </TableCell>
      <TableCell className="text-center py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(template)}>
              編集
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});

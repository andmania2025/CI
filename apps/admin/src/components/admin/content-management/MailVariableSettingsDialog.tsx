import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, MoreVertical, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";

export interface MailVariable {
  id: string;
  variableName: string; // 例: "[name]"
  displayName: string; // 例: "会員名"
  description?: string; // 例: "会員の氏名を挿入します"
  category?: string; // 例: "user", "system", "property"
}

interface MailVariableSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  variables: MailVariable[];
  onVariablesChange: (variables: MailVariable[]) => void;
}

export const MailVariableSettingsDialog: React.FC<MailVariableSettingsDialogProps> = ({
  isOpen,
  onOpenChange,
  variables,
  onVariablesChange,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MailVariable>>({
    variableName: "",
    displayName: "",
  });

  const handleAdd = () => {
    if (!formData.variableName || !formData.displayName) {
      alert("変数名と表示名を入力してください");
      return;
    }

    // 変数名の形式チェック
    if (!formData.variableName.startsWith("[") || !formData.variableName.endsWith("]")) {
      alert("変数名は [変数名] の形式で入力してください（例: [name]）");
      return;
    }

    // 重複チェック
    if (
      variables.some((v) => v.variableName.toLowerCase() === formData.variableName?.toLowerCase())
    ) {
      alert("この変数名は既に存在します");
      return;
    }

    const newVariable: MailVariable = {
      id: `var_${Date.now()}`,
      variableName: formData.variableName,
      displayName: formData.displayName,
    };

    onVariablesChange([...variables, newVariable]);
    setFormData({
      variableName: "",
      displayName: "",
    });
  };

  const handleEdit = (variable: MailVariable) => {
    setEditingId(variable.id);
    setFormData({
      variableName: variable.variableName,
      displayName: variable.displayName,
    });
  };

  const handleUpdate = () => {
    if (!formData.variableName || !formData.displayName) {
      alert("変数名と表示名を入力してください");
      return;
    }

    if (!formData.variableName.startsWith("[") || !formData.variableName.endsWith("]")) {
      alert("変数名は [変数名] の形式で入力してください（例: [name]）");
      return;
    }

    if (editingId) {
      const updated = variables.map((v) =>
        v.id === editingId
          ? {
              ...v,
              variableName: formData.variableName!,
              displayName: formData.displayName!,
            }
          : v
      );
      onVariablesChange(updated);
      setEditingId(null);
      setFormData({
        variableName: "",
        displayName: "",
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("この変数を削除してもよろしいですか？")) {
      onVariablesChange(variables.filter((v) => v.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      variableName: "",
      displayName: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">メール変数設定</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 追加・編集フォーム */}
          <div className="border rounded-lg">
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-4">
                {editingId ? "変数を編集" : "変数追加"}
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="variableName" className="text-sm font-medium block mb-2">
                    変数名
                  </Label>
                  <Input
                    id="variableName"
                    value={formData.variableName}
                    onChange={(e) => setFormData({ ...formData, variableName: e.target.value })}
                    placeholder="[name]"
                    className="w-full"
                  />
                </div>

                <div className="flex-1">
                  <Label htmlFor="displayName" className="text-sm font-medium block mb-2">
                    表示名
                  </Label>
                  <Input
                    id="displayName"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    placeholder="会員名"
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2 items-end">
                  {editingId && (
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      キャンセル
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="bg-gray-700 hover:bg-gray-800 text-white"
                  >
                    {editingId ? (
                      <>
                        <Edit2 className="w-4 h-4 mr-2" />
                        更新
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        追加
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">[変数名] の形式で入力してください</p>
            </div>
          </div>

          {/* 変数一覧テーブル */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-gray-50">
                    <TableHead className="text-left font-semibold text-gray-700 py-2 px-4 bg-gray-50">
                      変数名
                    </TableHead>
                    <TableHead className="text-left font-semibold text-gray-700 py-2 px-4 bg-gray-50">
                      表示名
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700 py-2 px-4 bg-gray-50 w-32" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variables.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                        変数が登録されていません
                      </TableCell>
                    </TableRow>
                  ) : (
                    variables.map((variable) => (
                      <TableRow
                        key={variable.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <TableCell className="text-left text-gray-700 py-2 px-4 font-mono text-sm">
                          {variable.variableName}
                        </TableCell>
                        <TableCell className="text-left text-gray-700 py-2 px-4">
                          {variable.displayName}
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
                              <DropdownMenuItem onClick={() => handleEdit(variable)}>
                                <Edit2 className="w-4 h-4 mr-2" />
                                編集
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(variable.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                削除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

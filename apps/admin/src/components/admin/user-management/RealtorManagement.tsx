import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Building2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { RealtorListSection } from "./RealtorListSection";
import { RealtorSearchSection } from "./RealtorSearchSection";
import type { Realtor, RealtorFormData } from "./types";

const RealtorManagement: React.FC = () => {
  const [formData, setFormData] = useState<RealtorFormData>({
    freeword: "",
    companyPermission: {
      valid: false,
      invalid: false,
    },
    accountType: {
      free: false,
      paid: false,
    },
    accountStatus: {
      valid: false,
      invalid: false,
    },
    displayCount: "20",
  });

  const [selectedRealtors, setSelectedRealtors] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // サンプル不動産業者データ
  const realtors: Realtor[] = [
    {
      id: "r001",
      companyName: "株式会社エーゼットプランニング",
      representative: "田中太郎",
      licenseNumber: "東京都知事(1)第12345号",
      accountType: "有料アカウント",
      status: "有効",
      registrationDate: "2024/01/15",
      lastLogin: "2025/01/18",
      propertyCount: 45,
    },
    {
      id: "r002",
      companyName: "株式会社実営進不動産",
      representative: "佐藤花子",
      licenseNumber: "長野県知事(2)第67890号",
      accountType: "無料アカウント",
      status: "有効",
      registrationDate: "2024/03/22",
      lastLogin: "2025/01/17",
      propertyCount: 23,
    },
    {
      id: "r003",
      companyName: "有限会社山田不動産",
      representative: "山田次郎",
      licenseNumber: "大阪府知事(3)第11111号",
      accountType: "有料アカウント",
      status: "無効",
      registrationDate: "2023/11/08",
      lastLogin: "2024/12/25",
      propertyCount: 12,
    },
    {
      id: "r004",
      companyName: "鈴木不動産株式会社",
      representative: "鈴木三郎",
      licenseNumber: "神奈川県知事(1)第22222号",
      accountType: "無料アカウント",
      status: "有効",
      registrationDate: "2024/06/10",
      lastLogin: "2025/01/16",
      propertyCount: 8,
    },
    {
      id: "r005",
      companyName: "株式会社高橋ホーム",
      representative: "高橋美咲",
      licenseNumber: "愛知県知事(2)第33333号",
      accountType: "有料アカウント",
      status: "有効",
      registrationDate: "2024/02/28",
      lastLogin: "2025/01/18",
      propertyCount: 67,
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (
    category: keyof Pick<RealtorFormData, "companyPermission" | "accountType" | "accountStatus">,
    field: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: checked,
      },
    }));
  };

  const handleSearch = () => {
    // TODO: 検索処理を実装
  };

  const handleReset = () => {
    setFormData({
      freeword: "",
      companyPermission: {
        valid: false,
        invalid: false,
      },
      accountType: {
        free: false,
        paid: false,
      },
      accountStatus: {
        valid: false,
        invalid: false,
      },
      displayCount: "20",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedRealtors(realtors.map((r) => r.id));
    } else {
      setSelectedRealtors([]);
    }
  };

  const handleSelectRealtor = (realtorId: string, checked: boolean) => {
    if (checked) {
      setSelectedRealtors((prev) => [...prev, realtorId]);
    } else {
      setSelectedRealtors((prev) => prev.filter((id) => id !== realtorId));
      setSelectAll(false);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleDeleteSelected = () => {
    setConfirmOpen(true);
  };
  const executeDelete = () => {
    // TODO: 削除処理を実装
    setConfirmOpen(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-5 h-5" />
        <h2 className="text-xl font-semibold">不動産業者様管理</h2>
        <span className="text-gray-500">不動産業者様一覧</span>
      </div>

      <RealtorSearchSection
        formData={formData}
        isExpanded={isSearchExpanded}
        onToggleExpand={() => setIsSearchExpanded(!isSearchExpanded)}
        onInputChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <RealtorListSection
        realtors={realtors}
        selectedRealtors={selectedRealtors}
        selectAll={selectAll}
        onSelectAll={handleSelectAll}
        onSelectRealtor={handleSelectRealtor}
        onDeleteSelected={handleDeleteSelected}
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="選択削除の確認"
        description={`選択された ${selectedRealtors.length} 件を削除します。よろしいですか？`}
        confirmText="削除する"
        onConfirm={executeDelete}
      />
    </div>
  );
};

export default RealtorManagement;

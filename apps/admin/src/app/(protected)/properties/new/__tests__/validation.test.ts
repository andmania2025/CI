import { type PropertyFormData, propertySchema } from "@/schemas/propertySchema";
import { describe, expect, it } from "vitest";
import { z } from "zod";

describe("Property Registration Validation", () => {
  describe("必須項目のバリデーション", () => {
    it("基本情報タブ - 物件名が空の場合エラーになる", () => {
      const invalidData = {
        propertyName: "",
        saleOrRent: "sale",
        transactionType: "owner",
        propertyType: "mansion",
        propertyCondition: "new",
        prefecture: "tokyo",
        city: "shibuya",
        address: "1-1-1",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path[0]).toBe("propertyName");
        expect(result.error.issues[0].message).toBe("物件名を入力してください");
      }
    });

    it("基本情報タブ - 売賃・賃貸の選択が必須", () => {
      const invalidData = {
        propertyName: "テスト物件",
        saleOrRent: undefined,
        transactionType: "owner",
        propertyType: "mansion",
        propertyCondition: "new",
        prefecture: "tokyo",
        city: "shibuya",
        address: "1-1-1",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("物件詳細タブ - 間取りが必須", () => {
      const invalidData = {
        layoutNumber: "",
        layoutType: "ldk",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("物件詳細タブ - 建物面積が必須", () => {
      const invalidData = {
        buildingArea: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("物件詳細タブ - 建築年月が必須（Date型）", () => {
      const invalidData = {
        constructionDate: undefined,
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("物件詳細タブ - 販売価格が必須", () => {
      const invalidData = {
        salePrice: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("土地・建物タブ - 土地種類が必須", () => {
      const invalidData = {
        landType: undefined,
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("土地・建物タブ - 土地面積が必須", () => {
      const invalidData = {
        landAreaSqm: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("設備・特性タブ - 管理費・共益費が必須", () => {
      const invalidData = {
        managementFee: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("説明・環境タブ - 環境・周辺施設が必須", () => {
      const invalidData = {
        environment: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("説明・環境タブ - 諸費用等が必須", () => {
      const invalidData = {
        expenses: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("説明・環境タブ - その他費用等が必須", () => {
      const invalidData = {
        otherExpenses: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("説明・環境タブ - 法令上制限が必須", () => {
      const invalidData = {
        legalRestrictions: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("メディア・公開タブ - 公開設定が必須", () => {
      const invalidData = {
        publicationStatus: undefined,
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("メディア・公開タブ - 次回更新予定日が必須", () => {
      const invalidData = {
        nextUpdateDate: undefined,
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("その他タブ - 売主の名称または商号が必須", () => {
      const invalidData = {
        sellerName: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("その他タブ - 不動産業者様が必須", () => {
      const invalidData = {
        realEstateAgent: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("その他タブ - 備考が必須", () => {
      const invalidData = {
        remarks: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("その他タブ - 管理者用メモが必須", () => {
      const invalidData = {
        adminMemo: "",
      };

      const result = propertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("正常なデータの検証", () => {
    it("すべての必須項目が正しく入力されている場合、バリデーションを通過する", () => {
      const validData: Partial<PropertyFormData> = {
        propertyName: "テスト物件",
        saleOrRent: "sale",
        transactionType: "owner",
        propertyType: "mansion",
        propertyCondition: "new",
        prefecture: "tokyo",
        city: "渋谷区",
        address: "1-1-1",
        layoutNumber: "3",
        layoutType: "ldk",
        buildingArea: "80",
        constructionDate: new Date("2024-01-01"),
        salePrice: "5000",
        utilities: "complete",
        direction: "south",
        landType: "residential",
        landAreaSqm: "100",
        deliveryDate: new Date("2024-06-01"),
        cityPlanning: "urbanization",
        roadContact: "5",
        landCategory: "residential",
        useDistrict: "first-residential",
        managementFee: "10000",
        environment: "駅前の利便性の良い立地",
        expenses: "初期費用：100万円",
        parkingInfo: "駐車場完備",
        otherExpenses: "その他費用なし",
        legalRestrictions: "法令上の制限なし",
        otherConstructionInfo: "新築物件",
        publicationStatus: "published",
        nextUpdateDate: new Date("2024-12-31"),
        sellerName: "テスト開発商事",
        realEstateAgent: "テスト不動産",
        remarks: "テスト用物件です",
        adminMemo: "テスト用メモ",
      };

      const result = propertySchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("エラーメッセージの確認", () => {
    it("物件名が空の場合のエラーメッセージが正確", () => {
      const result = propertySchema.safeParse({ propertyName: "" });
      if (!result.success) {
        const error = result.error.issues[0];
        expect(error.message).toBe("物件名を入力してください");
      }
    });

    it("建築年月が無効な場合のエラーメッセージが正確", () => {
      const result = propertySchema.safeParse({
        propertyName: "テスト物件",
        constructionDate: "invalid",
      });
      if (!result.success) {
        const constructionDateError = result.error.issues.find(
          (issue) => issue.path[0] === "constructionDate"
        );
        expect(constructionDateError?.message).toBe("建築年月を選択してください");
      }
    });
  });
});

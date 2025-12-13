import { describe, expect, it } from "vitest";
import { realEstateAgentInputDefaultValues, realEstateAgentSchema } from "./realEstateAgentSchema";

describe("realEstateAgentSchema", () => {
  describe("正常系", () => {
    it("必須項目がすべて入力されている場合、バリデーションが成功する", () => {
      const validData = {
        companyName: "テスト会社",
        branchName: "東京支店",
        departmentName: "営業部",
        representativeName: "山田太郎",
        contactPersonName: "佐藤花子",
        phoneNumber: "03-1234-5678",
        email: "test@example.com",
        postalCode: "1234567",
        prefecture: "tokyo",
        city: "渋谷区",
        address: "渋谷1-2-3",
        propertyTypes: ["売買不動産"],
        handlingTypes: ["売主（不動産買取）"],
        realEstateTypes: ["一戸建て"],
        propertyFeatures: ["一般物件"],
        questionCategories: ["耐震"],
        appraisalMethods: ["売出し価格査定"],
        licenseNumber: "東京都知事(1)第12345号",
        associationMembership: "東京都宅建協会",
        fairTradeMembership: "首都圏不動産公正取引協議会",
        agreeToTerms: true,
      };

      const result = realEstateAgentSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("任意項目が空でもバリデーションが成功する", () => {
      const validData = {
        companyName: "テスト会社",
        branchName: "",
        departmentName: "",
        representativeName: "山田太郎",
        contactPersonName: "佐藤花子",
        phoneNumber: "03-1234-5678",
        email: "test@example.com",
        postalCode: "1234567",
        prefecture: "tokyo",
        city: "渋谷区",
        address: "渋谷1-2-3",
        propertyTypes: [],
        handlingTypes: ["売主（不動産買取）"],
        realEstateTypes: ["一戸建て"],
        propertyFeatures: ["一般物件"],
        questionCategories: ["耐震"],
        appraisalMethods: [],
        licenseNumber: "東京都知事(1)第12345号",
        associationMembership: "東京都宅建協会",
        fairTradeMembership: "首都圏不動産公正取引協議会",
        agreeToTerms: true,
      };

      const result = realEstateAgentSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("異常系", () => {
    it("会社名が空の場合、エラーになる", () => {
      const invalidData = {
        ...realEstateAgentInputDefaultValues,
        companyName: "",
        representativeName: "山田太郎",
        contactPersonName: "佐藤花子",
        phoneNumber: "03-1234-5678",
        email: "test@example.com",
        postalCode: "1234567",
        prefecture: "tokyo",
        city: "渋谷区",
        address: "渋谷1-2-3",
        handlingTypes: ["売主（不動産買取）"],
        realEstateTypes: ["一戸建て"],
        propertyFeatures: ["一般物件"],
        questionCategories: ["耐震"],
        licenseNumber: "東京都知事(1)第12345号",
        associationMembership: "東京都宅建協会",
        fairTradeMembership: "首都圏不動産公正取引協議会",
        agreeToTerms: true,
      };

      const result = realEstateAgentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("郵便番号が7桁でない場合、エラーになる", () => {
      const invalidData = {
        ...realEstateAgentInputDefaultValues,
        companyName: "テスト会社",
        representativeName: "山田太郎",
        contactPersonName: "佐藤花子",
        phoneNumber: "03-1234-5678",
        email: "test@example.com",
        postalCode: "123456", // 6桁
        prefecture: "tokyo",
        city: "渋谷区",
        address: "渋谷1-2-3",
        handlingTypes: ["売主（不動産買取）"],
        realEstateTypes: ["一戸建て"],
        propertyFeatures: ["一般物件"],
        questionCategories: ["耐震"],
        licenseNumber: "東京都知事(1)第12345号",
        associationMembership: "東京都宅建協会",
        fairTradeMembership: "首都圏不動産公正取引協議会",
        agreeToTerms: true,
      };

      const result = realEstateAgentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        const postalCodeError = result.error.issues.find((issue) => issue.path[0] === "postalCode");
        expect(postalCodeError?.message).toBe("7桁の数字で入力してください");
      }
    });

    it("メールアドレスの形式が不正な場合、エラーになる", () => {
      const invalidData = {
        ...realEstateAgentInputDefaultValues,
        companyName: "テスト会社",
        representativeName: "山田太郎",
        contactPersonName: "佐藤花子",
        phoneNumber: "03-1234-5678",
        email: "invalid-email",
        postalCode: "1234567",
        prefecture: "tokyo",
        city: "渋谷区",
        address: "渋谷1-2-3",
        handlingTypes: ["売主（不動産買取）"],
        realEstateTypes: ["一戸建て"],
        propertyFeatures: ["一般物件"],
        questionCategories: ["耐震"],
        licenseNumber: "東京都知事(1)第12345号",
        associationMembership: "東京都宅建協会",
        fairTradeMembership: "首都圏不動産公正取引協議会",
        agreeToTerms: true,
      };

      const result = realEstateAgentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("取扱形態が空の場合、エラーになる", () => {
      const invalidData = {
        ...realEstateAgentInputDefaultValues,
        companyName: "テスト会社",
        representativeName: "山田太郎",
        contactPersonName: "佐藤花子",
        phoneNumber: "03-1234-5678",
        email: "test@example.com",
        postalCode: "1234567",
        prefecture: "tokyo",
        city: "渋谷区",
        address: "渋谷1-2-3",
        handlingTypes: [], // 空
        realEstateTypes: ["一戸建て"],
        propertyFeatures: ["一般物件"],
        questionCategories: ["耐震"],
        licenseNumber: "東京都知事(1)第12345号",
        associationMembership: "東京都宅建協会",
        fairTradeMembership: "首都圏不動産公正取引協議会",
        agreeToTerms: true,
      };

      const result = realEstateAgentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("同意がfalseの場合、エラーになる", () => {
      const invalidData = {
        companyName: "テスト会社",
        branchName: "",
        departmentName: "",
        representativeName: "山田太郎",
        contactPersonName: "佐藤花子",
        phoneNumber: "03-1234-5678",
        email: "test@example.com",
        postalCode: "1234567",
        prefecture: "tokyo",
        city: "渋谷区",
        address: "渋谷1-2-3",
        propertyTypes: [],
        handlingTypes: ["売主（不動産買取）"],
        realEstateTypes: ["一戸建て"],
        propertyFeatures: ["一般物件"],
        questionCategories: ["耐震"],
        appraisalMethods: [],
        licenseNumber: "東京都知事(1)第12345号",
        associationMembership: "東京都宅建協会",
        fairTradeMembership: "首都圏不動産公正取引協議会",
        agreeToTerms: false, // 同意しない
      };

      const result = realEstateAgentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

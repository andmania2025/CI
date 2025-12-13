export interface FavoriteItem {
  id: string;
  type: "sale" | "rental";
  title: string;
  image: string;
  price?: string;
  rent?: string;
  description: string;
  details: {
    location: string;
    access: string;
    buildingType: string;
    floor?: string;
    rooms: string;
    area: string;
    year: string;
    // 追加フィールド
    landArea?: string;
    buildingArea?: string;
    structure?: string;
    yieldRate?: string;
    deposit?: string;
    keyMoney?: string;
  };
  addedAt: Date;
}

// LocalStorageに保存される形式（DateがISO文字列になる）
interface StoredFavoriteItem extends Omit<FavoriteItem, "addedAt"> {
  addedAt: string;
}

// お気に入り統計情報
export interface FavoriteStats {
  total: number;
  sale: number;
  rental: number;
}

// お気に入り操作の結果型
export interface FavoriteOperationResult {
  success: boolean;
  message?: string;
}

// 定数
const STORAGE_KEY = "uchikatu-favorites" as const;

// Supabase接続後の定数（コメントアウト）
// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ユーティリティ関数: LocalStorageからお気に入りを取得
const getStoredFavorites = (): FavoriteItem[] => {
  try {
    if (typeof window === "undefined") {
      return []; // SSR対応
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const favorites: StoredFavoriteItem[] = JSON.parse(stored);
    return favorites.map(
      (item: StoredFavoriteItem): FavoriteItem => ({
        ...item,
        addedAt: new Date(item.addedAt),
      })
    );
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
};

// Supabase接続後のデータ取得関数（コメントアウト）
// const getSupabaseFavorites = async (): Promise<FavoriteItem[]> => {
//   try {
//     // Supabaseクライアントの初期化
//     const { createClient } = await import('@supabase/supabase-js');
//     const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
//
//     // ユーザーセッションの取得
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       console.log("No user session found");
//       return [];
//     }
//
//     // お気に入りテーブルからデータを取得
//     const { data, error } = await supabase
//       .from('favorites')
//       .select('*')
//       .eq('user_id', user.id)
//       .order('created_at', { ascending: false });
//
//     if (error) {
//       console.error("Supabase query error:", error);
//       return [];
//     }
//
//     // Supabaseのデータ形式をFavoriteItem形式に変換
//     return data.map(item => ({
//       id: item.id.toString(),
//       type: item.property_type as "sale" | "rental",
//       title: item.title,
//       image: item.image_url,
//       price: item.price || undefined,
//       rent: item.rent || undefined,
//       description: item.description,
//       details: {
//         location: item.location,
//         access: item.access,
//         buildingType: item.building_type,
//         floor: item.floor || undefined,
//         rooms: item.rooms,
//         area: item.area,
//         year: item.year,
//         deposit: item.deposit || undefined,
//         keyMoney: item.key_money || undefined,
//       },
//       addedAt: new Date(item.created_at),
//     }));
//   } catch (error) {
//     console.error("Failed to load favorites from Supabase:", error);
//     return [];
//   }
// };

// ユーティリティ関数: LocalStorageにお気に入りを保存
const saveStoredFavorites = (favorites: FavoriteItem[]): boolean => {
  try {
    if (typeof window === "undefined") {
      return false; // SSR対応
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error("Failed to save favorites:", error);
    return false;
  }
};

// Supabase接続後のデータ保存関数（コメントアウト）
// const saveSupabaseFavorites = async (favorites: FavoriteItem[]): Promise<boolean> => {
//   try {
//     const { createClient } = await import('@supabase/supabase-js');
//     const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
//
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       console.log("No user session found");
//       return false;
//     }
//
//     // 既存のお気に入りを削除
//     await supabase
//       .from('favorites')
//       .delete()
//       .eq('user_id', user.id);
//
//     // 新しいお気に入りを一括挿入
//     const supabaseData = favorites.map(item => ({
//       user_id: user.id,
//       property_id: item.id,
//       property_type: item.type,
//       title: item.title,
//       image_url: item.image,
//       price: item.price,
//       rent: item.rent,
//       description: item.description,
//       location: item.details.location,
//       access: item.details.access,
//       building_type: item.details.buildingType,
//       floor: item.details.floor,
//       rooms: item.details.rooms,
//       area: item.details.area,
//       year: item.details.year,
//       deposit: item.details.deposit,
//       key_money: item.details.keyMoney,
//       created_at: item.addedAt.toISOString(),
//     }));
//
//     const { error } = await supabase
//       .from('favorites')
//       .insert(supabaseData);
//
//     if (error) {
//       console.error("Supabase insert error:", error);
//       return false;
//     }
//
//     return true;
//   } catch (error) {
//     console.error("Failed to save favorites to Supabase:", error);
//     return false;
//   }
// };

// データ検証関数
const validateFavoriteItem = (item: unknown): item is Omit<FavoriteItem, "addedAt"> => {
  if (!item || typeof item !== "object") return false;

  const candidate = item as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    (candidate.type === "sale" || candidate.type === "rental") &&
    typeof candidate.title === "string" &&
    typeof candidate.image === "string" &&
    typeof candidate.description === "string" &&
    typeof candidate.details === "object" &&
    candidate.details !== null
  );
};

// 公開API関数群

/**
 * お気に入り一覧を取得
 * Supabase接続後は環境変数で切り替え可能
 */
export const getFavorites = (): FavoriteItem[] => {
  // Supabase接続後の切り替えロジック（コメントアウト）
  // const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE === 'true';
  // if (useSupabase) {
  //   // Supabaseから非同期で取得する場合は、この関数をasyncにする必要がある
  //   // 現在の実装では同期的に動作するため、一時的にLocalStorageを使用
  //   console.log("Using Supabase for favorites (async implementation needed)");
  // }

  return getStoredFavorites();
};

/**
 * お気に入りに追加
 */
export const addToFavorites = (item: Omit<FavoriteItem, "addedAt">): FavoriteOperationResult => {
  try {
    if (!validateFavoriteItem(item)) {
      return { success: false, message: "Invalid item data" };
    }

    const favorites = getStoredFavorites();

    // 重複チェック
    if (favorites.some((fav) => fav.id === item.id && fav.type === item.type)) {
      return { success: false, message: "Item already exists in favorites" };
    }

    const newItem: FavoriteItem = {
      ...item,
      addedAt: new Date(),
    };

    favorites.unshift(newItem);
    const saved = saveStoredFavorites(favorites);

    // Supabase接続後の同期処理（コメントアウト）
    // if (saved && process.env.NEXT_PUBLIC_USE_SUPABASE === 'true') {
    //   // 非同期でSupabaseに同期
    //   saveSupabaseFavorites(favorites).catch(error => {
    //     console.error("Failed to sync with Supabase:", error);
    //   });
    // }

    return saved
      ? { success: true, message: "Item added to favorites" }
      : { success: false, message: "Failed to save to storage" };
  } catch (error) {
    console.error("Failed to add favorite:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
};

/**
 * お気に入りから削除
 */
export const removeFromFavorites = (
  id: string,
  type: "sale" | "rental"
): FavoriteOperationResult => {
  try {
    const favorites = getStoredFavorites();
    const initialLength = favorites.length;
    const filtered = favorites.filter((item) => !(item.id === id && item.type === type));

    if (filtered.length === initialLength) {
      return { success: false, message: "Item not found in favorites" };
    }

    const saved = saveStoredFavorites(filtered);

    // Supabase接続後の同期処理（コメントアウト）
    // if (saved && process.env.NEXT_PUBLIC_USE_SUPABASE === 'true') {
    //   saveSupabaseFavorites(filtered).catch(error => {
    //     console.error("Failed to sync with Supabase:", error);
    //   });
    // }

    return saved
      ? { success: true, message: "Item removed from favorites" }
      : { success: false, message: "Failed to save to storage" };
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
};

/**
 * お気に入りかどうかを確認
 */
export const isFavorite = (id: string, type: "sale" | "rental"): boolean => {
  try {
    const favorites = getStoredFavorites();
    return favorites.some((item) => item.id === id && item.type === type);
  } catch (error) {
    console.error("Failed to check favorite:", error);
    return false;
  }
};

/**
 * すべてのお気に入りをクリア
 */
export const clearFavorites = (): FavoriteOperationResult => {
  try {
    if (typeof window === "undefined") {
      return { success: false, message: "Not available in server environment" };
    }

    localStorage.removeItem(STORAGE_KEY);

    // Supabase接続後の同期処理（コメントアウト）
    // if (process.env.NEXT_PUBLIC_USE_SUPABASE === 'true') {
    //   saveSupabaseFavorites([]).catch(error => {
    //     console.error("Failed to sync with Supabase:", error);
    //   });
    // }

    return { success: true, message: "All favorites cleared" };
  } catch (error) {
    console.error("Failed to clear favorites:", error);
    return { success: false, message: "Failed to clear favorites" };
  }
};

/**
 * お気に入りの統計情報を取得
 */
export const getFavoriteStats = (): FavoriteStats => {
  const favorites = getStoredFavorites();
  return {
    total: favorites.length,
    sale: favorites.filter((f) => f.type === "sale").length,
    rental: favorites.filter((f) => f.type === "rental").length,
  };
};

/**
 * お気に入りをJSON形式でエクスポート
 */
export const exportFavorites = (): string => {
  try {
    const favorites = getStoredFavorites();
    return JSON.stringify(favorites, null, 2);
  } catch (error) {
    console.error("Failed to export favorites:", error);
    return "[]";
  }
};

/**
 * お気に入りをJSONからインポート
 */
export const importFavorites = (data: string): FavoriteOperationResult => {
  try {
    const importedFavorites: FavoriteItem[] = JSON.parse(data);

    // データ検証
    if (!Array.isArray(importedFavorites)) {
      return { success: false, message: "Invalid data format: expected array" };
    }

    // 各アイテムの検証
    for (const item of importedFavorites) {
      if (!validateFavoriteItem(item)) {
        return { success: false, message: "Invalid item data in import" };
      }
    }

    const saved = saveStoredFavorites(importedFavorites);

    // Supabase接続後の同期処理（コメントアウト）
    // if (saved && process.env.NEXT_PUBLIC_USE_SUPABASE === 'true') {
    //   saveSupabaseFavorites(importedFavorites).catch(error => {
    //     console.error("Failed to sync with Supabase:", error);
    //   });
    // }

    return saved
      ? {
          success: true,
          message: `Successfully imported ${importedFavorites.length} favorites`,
        }
      : { success: false, message: "Failed to save imported data" };
  } catch (error) {
    console.error("Failed to import favorites:", error);
    return { success: false, message: "Failed to parse import data" };
  }
};

/**
 * お気に入りをタイプでフィルタリング
 */
export const getFavoritesByType = (type: "sale" | "rental"): FavoriteItem[] => {
  return getStoredFavorites().filter((item) => item.type === type);
};

/**
 * お気に入りを日付でソート
 */
export const getSortedFavorites = (order: "asc" | "desc" = "desc"): FavoriteItem[] => {
  const favorites = getStoredFavorites();
  return favorites.sort((a, b) => {
    const dateA = a.addedAt.getTime();
    const dateB = b.addedAt.getTime();
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
};

/**
 * お気に入りを検索
 */
export const searchFavorites = (query: string): FavoriteItem[] => {
  if (!query.trim()) return getStoredFavorites();

  const favorites = getStoredFavorites();
  const searchTerm = query.toLowerCase();

  return favorites.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.details.location.toLowerCase().includes(searchTerm)
  );
};

// 後方互換性のためのレガシーエクスポート（非推奨）
/** @deprecated Use individual functions instead */
export const favoritesManager = {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  clearFavorites,
  getStats: getFavoriteStats,
  exportFavorites,
  importFavorites,
};

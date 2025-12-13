import { mansionProperties } from "@/features/properties/constants/mansion-data";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const priceRange = searchParams.get("priceRange");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "8");

    let filteredProperties = mansionProperties;

    // 地域でフィルタリング
    if (location) {
      filteredProperties = filteredProperties.filter((property) =>
        property.details.location.includes(location)
      );
    }

    // 価格帯でフィルタリング
    if (priceRange) {
      filteredProperties = filteredProperties.filter((property) => {
        const price = Number.parseInt(property.price.replace(/,/g, ""));
        const [min, max] = priceRange
          .split("-")
          .map((p) => (p === "+" ? Number.POSITIVE_INFINITY : Number.parseInt(p)));

        return price >= min && price <= max;
      });
    }

    // ページネーション
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

    return NextResponse.json({
      properties: paginatedProperties,
      total: filteredProperties.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProperties.length / limit),
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

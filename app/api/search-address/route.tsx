import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //vào api này để lấy textSearch rồi truyền text search cho api của mapbox lại
  //sau đó qua bên trang nhập vị trí và fetch api này để lấy mảng các tọa độ liên quan vị trí đó
  //api này trả về mảng các thông tin tọa độ liên quan đến vị trí textSearch
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");
  const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

  const res = await fetch(
    BASE_URL +
      "?q=" +
      searchText +
      "&language=en&country=vn&session_token=09e03936-d506-4311-88a7-ad6adf20d6ed" +
      "&access_token=" +
      process.env.MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await res.json();
  return NextResponse.json({ data: result });
}

export async function GET(request: Request) {
  const response = await fetch("http://localhost:7071/api/getImages", {
    cache: "no-store",
  });

  const blob = await response.blob();
  const textData = await blob.text();

  const data = await JSON.parse(textData);

  return new Response(JSON.stringify(data), { status: 200 });
}

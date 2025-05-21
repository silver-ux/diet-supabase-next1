import { promises as fs } from "fs";
import path from "path";

//２日に一回JSONの動画を更新するための関数
export async function GET(request) {
    const now = new Date();

    const filePath = path.join(process.cwd(), 'src/json/data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    const baseDate = new Date("2025-05-16");

    const diffTime = now.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const index = Math.floor(diffDays / 2) % data.items.length;
    const item = data.items[index];

    const seed = index + diffDays;
    const urlIndex = seed % item.video.url.length;
    const selectedUrl = item.video.url[urlIndex];

    return Response.json({ url: selectedUrl });
}

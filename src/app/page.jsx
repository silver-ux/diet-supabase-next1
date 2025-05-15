import { promises as fs } from "fs"
import path from "path"

export default async function Home() {

  const filePath = path.join(process.cwd(), "src/json/data.json")

  // ファイルを読み込む
  const fileContents = await fs.readFile(filePath, "utf8")

  // JSONとしてパース
  const data = JSON.parse(fileContents)

  return (
    <div>
      <h1>筋トレ</h1>
    </div>
  );
}

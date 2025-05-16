import { promises as fs } from "fs"
import path from "path"

const getData = async () => {
    const filePath = path.join(process.cwd(), "src/json/data.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data
}

export default getData
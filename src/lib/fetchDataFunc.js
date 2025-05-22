import { Fetch } from "@/supabase/Fetch";

//取得
export const fetchDataFunc = async (setLabels, setWeights, setWalkArr) => {
    const items = await Fetch();

    //月日だけ取得
    const monthDays = items.map(row => {
        const date = new Date(row.created_at);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
    });

    //体重
    const weightsNum = items.map((item) => {
        return item.weight
    });

    //歩数
    const walkNum = items.map((item) => {
        return item.walk
    })

    //チャートに表示するため
    setLabels(monthDays);
    setWeights(weightsNum);
    setWalkArr(walkNum)
}
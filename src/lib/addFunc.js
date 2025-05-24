import { FetchMonth, getUser } from '@/supabase/Fetch';
import supabase from '@/supabase/init';

//１日一回に投稿を制限する 
export const addFunc = async (walk, num, setMonths, selectedValue, setLabels, setWeights, setWalkArr) => {
    if (num === '' || walk === '') {
        alert('入力してください');
        return;
    }

    const { data: body_data, error } = await supabase
        .from('body_data')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error('取得エラー:', error.message);
        alert('エラーが発生しました');
        return;
    }

    const lastPost = body_data[0];
    if (lastPost) {
        const lastDate = new Date(lastPost.created_at);
        const today = new Date();
        const sameDay =
            lastDate.getFullYear() === today.getFullYear() &&
            lastDate.getMonth() === today.getMonth() &&
            lastDate.getDate() === today.getDate();

        if (sameDay) {
            alert('今日はすでに投稿しています');
            return false;
        }
    }

    const user = await getUser();

    const { data: insertedData } = await supabase
        .from('body_data')
        .insert({ weight: num, walk: walk, user_id: user.id })
        .select();

    const inserted = insertedData[0];

    // 追加したデータを即画面に反映
    const date = new Date(inserted.created_at);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const newLabel = `${year}-${month}-${day}`;

    setLabels(prev => [...prev, newLabel]);
    setWeights(prev => [...prev, inserted.weight]);
    setWalkArr(prev => [...prev, inserted.walk]);
    // await new Promise(r => setTimeout(r, 300));

    await FetchMonth(setMonths, selectedValue, setLabels, setWeights, setWalkArr);


    alert('データが追加されました');
    return true;
}
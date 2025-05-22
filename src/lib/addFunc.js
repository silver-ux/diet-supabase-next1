import { getUser } from '@/supabase/Fetch';
import supabase from '@/supabase/init';
import { fetchDataFunc } from './fetchDataFunc';

//１日一回に投稿を制限する 
export const addFunc = async (walk, num, setLabels, setWeights, setWalkArr) => {
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

    await supabase
        .from('body_data')
        .insert({ weight: num, walk: walk, user_id: user.id });

    fetchDataFunc(setLabels, setWeights, setWalkArr);
    alert('データが追加されました');
}
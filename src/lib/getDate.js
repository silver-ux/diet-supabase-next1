import getData from '@/lib/getData'

const getDate = async () => {
    const now = new Date();
    const data = await getData();

    const baseDate = new Date("2025-05-16");

    const diffTime = now.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const index = Math.floor(diffDays / 2) % data.items.length;
    const item = data.items[index];

    const seed = index + diffDays;
    const urlIndex = seed % item.video.url.length;
    const selectedUrl = item.video.url[urlIndex];

    return selectedUrl;
}

export default getDate
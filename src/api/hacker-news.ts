import { HNStory } from '@/types/hacker-news';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export async function fetchTopStoryIds(): Promise<number[]> {
  const response = await fetch(`${BASE_URL}/topstories.json`);
  return response.json();
}

export async function fetchStory(id: number): Promise<HNStory> {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  return response.json();
}

export async function fetchTopStories(limit: number = 20): Promise<HNStory[]> {
  const ids = await fetchTopStoryIds();
  const topIds = ids.slice(0, limit);

  const stories = await Promise.all(
    topIds.map((id) => fetchStory(id).catch(() => null))
  );

  return stories.filter((story): story is HNStory => story !== null);
}

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export async function fetchOgImage(url: string): Promise<string | null> {
  if (!url) {
    return null;
  }

  try {
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    const ogImageMatch = html.match(
      /<meta\s+property="og:image"\s+content="([^"]+)"/i
    );
    const twitterImageMatch = html.match(
      /<meta\s+name="twitter:image"\s+content="([^"]+)"/i
    );

    const imageUrl = ogImageMatch?.[1] || twitterImageMatch?.[1] || null;
    return imageUrl;
  } catch {
    return null;
  }
}

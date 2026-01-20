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
    topIds.map(id => fetchStory(id).catch(() => null))
  );

  return stories.filter((story): story is HNStory => story !== null);
}

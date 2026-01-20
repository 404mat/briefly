import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchTopStories } from '@/api/hacker-news';

export default function Settings() {
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: () => fetchTopStories(20),
  });

  useEffect(() => {
    if (stories) {
      console.log('Hacker News Top Stories:', stories);
    }
    if (error) {
      console.error('Error fetching stories:', error);
    }
  }, [stories, error]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-text">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold text-text">Profile</Text>
      <Text className="text-text-secondary mt-2">Check console for HN stories</Text>
    </View>
  );
}

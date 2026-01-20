import { FlatList, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { NewsCard } from '@/components/news-card';
import { fetchTopStories } from '@/api/hacker-news';
import { formatTimeAgo } from '@/utils/time-format';

interface FeedStory {
  id: number;
  title: string;
  author: string;
  points: number;
  commentCount: number;
  timeAgo: string;
}

export default function Index() {
  const { data: stories, isLoading } = useQuery({
    queryKey: ['topStories'],
    queryFn: () => fetchTopStories(20),
  });

  const feedStories: FeedStory[] = stories?.map(story => ({
    id: story.id,
    title: story.title,
    author: story.by,
    points: story.score,
    commentCount: story.descendants || 0,
    timeAgo: formatTimeAgo(story.time * 1000),
  })) || [];

  const renderHeader = () => (
    <View
      className="px-4 pb-4 items-center justify-center"
      style={{ paddingTop: 16 }}
    >
      <Text
        className="text-4xl text-text"
        style={{
          fontFamily: 'InstrumentSerif_400Regular',
          lineHeight: 44,
          letterSpacing: 0.5,
          textShadowColor: 'rgba(0, 0, 0, 0.2)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}
      >
        Brief<Text
          className="italic"
          style={{ fontFamily: 'InstrumentSerif_400Regular_Italic' }}
        >ly</Text>
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-text">Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={feedStories}
      renderItem={({ item }) => (
        <NewsCard
          title={item.title}
          author={item.author}
          points={item.points}
          commentCount={item.commentCount}
          timeAgo={item.timeAgo}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-background pt-safe"
    />
  );
}

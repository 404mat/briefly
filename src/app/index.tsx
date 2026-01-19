import { FlatList, Text, View } from 'react-native';

import { NewsCard } from '@/components/news-card';
import { mockStories } from '@/data/mock-stories';

export default function Index() {
  const renderHeader = () => (
    <View
      className="px-4 pb-4 items-center justify-center"
      style={{ paddingTop: 16 }}
    >
      <Text
        className="text-4xl italic text-text"
        style={{
          fontFamily: 'InstrumentSerif_400Regular_Italic',
          lineHeight: 44,
          letterSpacing: 0.5,
          textShadowColor: 'rgba(0, 0, 0, 0.2)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}
      >
        Briefly
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-background p-safe">
      <FlatList
        data={mockStories}
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            author={item.author}
            points={item.points}
            commentCount={item.commentCount}
            timeAgo={item.timeAgo}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

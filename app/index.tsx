import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NewsCard } from '@/components/news-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { mockStories } from '@/data/mock-stories';

export default function Index() {
  const insets = useSafeAreaInsets();

  const renderHeader = () => (
    <ThemedView
        style={[
          styles.header,
          {
            paddingTop: insets.top + 16,
          },
        ]}
    >
      <ThemedText type="title" style={styles.headerTitle}>
        Briefly
      </ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
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
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 36,
    fontFamily: 'InstrumentSerif_400Regular_Italic',
    lineHeight: 44,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  listContent: {
    paddingBottom: 8,
  },
});

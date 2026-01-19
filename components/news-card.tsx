import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export interface NewsCardProps {
  title: string;
  author: string;
  points: number;
  commentCount: number;
  timeAgo: string;
  imageUrl?: string;
}

export function NewsCard({
  title,
  author,
  points,
  commentCount,
  timeAgo,
  imageUrl,
}: NewsCardProps) {
  const placeholderBg = useThemeColor(
    { light: '#E0E0E0', dark: '#2A2A2A' },
    'background'
  );
  const iconColor = useThemeColor({}, 'text');

  // Create a simple placeholder using a colored view
  const PlaceholderImage = () => (
    <View style={[styles.placeholderImage, { backgroundColor: placeholderBg }]} />
  );

  return (
    <ThemedView style={styles.card}>
      {imageUrl ? (
        <Image
          source={imageUrl}
          style={styles.image}
          contentFit="cover"
          placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
        />
      ) : (
        <PlaceholderImage />
      )}
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
        <View style={styles.metadata}>
          <ThemedText style={styles.source}>HackerNews</ThemedText>
          <View style={styles.metaRow}>
            <View style={styles.pointsContainer}>
              <IconSymbol
                name="triangle.fill"
                size={12}
                color={iconColor}
                style={styles.pointsIcon}
              />
              <ThemedText style={styles.metaText}>{points}</ThemedText>
            </View>
            <ThemedText style={styles.metaText}>•</ThemedText>
            <ThemedText style={styles.metaText}>{author}</ThemedText>
            <ThemedText style={styles.metaText}>•</ThemedText>
            <ThemedText style={styles.metaText}>
              {commentCount} comment{commentCount !== 1 ? 's' : ''}
            </ThemedText>
            <ThemedText style={styles.metaText}>•</ThemedText>
            <ThemedText style={styles.metaText}>{timeAgo}</ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: 90,
  },
  placeholderImage: {
    width: '100%',
    height: 90,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 6,
  },
  metadata: {
    marginTop: 2,
  },
  source: {
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  pointsIcon: {
    opacity: 0.7,
  },
  metaText: {
    fontSize: 12,
    opacity: 0.7,
  },
});

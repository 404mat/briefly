import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

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
  const PlaceholderImage = () => (
    <View className="w-full h-[90px] bg-placeholder" />
  );

  return (
    <View className="mx-4 my-1.5 rounded-xl overflow-hidden bg-transparent shadow-md">
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
      <View className="p-2.5">
        <Text className="text-base leading-[22px] mb-1.5 font-semibold text-text">
          {title}
        </Text>
        <View className="mt-0.5">
          <Text className="text-sm opacity-80 mb-1 text-text">HackerNews</Text>
          <View className="flex-row flex-wrap items-center gap-1.5">
            <View className="flex-row items-center gap-0.5">
              <IconSymbol
                name="triangle.fill"
                size={12}
                color="#687076"
                style={{ opacity: 0.7 }}
              />
              <Text className="text-xs opacity-70 text-text">{points}</Text>
            </View>
            <Text className="text-xs opacity-70 text-text">•</Text>
            <Text className="text-xs opacity-70 text-text">{author}</Text>
            <Text className="text-xs opacity-70 text-text">•</Text>
            <Text className="text-xs opacity-70 text-text">
              {commentCount} comment{commentCount !== 1 ? 's' : ''}
            </Text>
            <Text className="text-xs opacity-70 text-text">•</Text>
            <Text className="text-xs opacity-70 text-text">{timeAgo}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 90,
  },
});

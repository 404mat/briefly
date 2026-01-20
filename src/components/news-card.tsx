import { useEffect, useState, useRef } from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { fetchOgImage } from '@/api/hacker-news';

export interface NewsCardProps {
  title: string;
  author: string;
  points: number;
  commentCount: number;
  timeAgo: string;
  url?: string;
}

export function NewsCard({
  title,
  author,
  points,
  commentCount,
  timeAgo,
  url,
}: NewsCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const hasImageLoaded = useRef(false);

  useEffect(() => {
    if (!url) {
      setImageUrl(null);
      setShowPlaceholder(false);
      hasImageLoaded.current = false;
      return;
    }

    const mounted = { current: true };
    let timeoutId: ReturnType<typeof setTimeout>;

    async function loadImage() {
      const ogImage = await fetchOgImage(url!);
      if (mounted.current) {
        if (ogImage) {
          setImageUrl(ogImage);
          setShowPlaceholder(true);
          hasImageLoaded.current = true;
        } else {
          setShowPlaceholder(false);
        }
      }
    }

    loadImage();

    timeoutId = setTimeout(async () => {
      if (mounted.current && !hasImageLoaded.current) {
        const ogImage = await fetchOgImage(url!);
        if (mounted.current && ogImage) {
          setImageUrl(ogImage);
          setShowPlaceholder(true);
          hasImageLoaded.current = true;
        }
      }
    }, 2000);

    return () => {
      mounted.current = false;
      clearTimeout(timeoutId);
    };
  }, [url]);

  return (
    <View className="mx-4 my-1.5 rounded-xl overflow-hidden bg-card shadow-md">
      {imageUrl ? (
        <Image
          source={imageUrl}
          style={styles.image}
          contentFit="cover"
          placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
        />
      ) : showPlaceholder ? (
        <View className="w-full h-[90px] bg-placeholder" />
      ) : null}
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

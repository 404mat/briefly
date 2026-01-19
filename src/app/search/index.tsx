import { ScrollView, Text, View } from 'react-native';

export default function SearchIndex() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-xl font-semibold text-text">Search</Text>
      </View>
    </ScrollView>
  );
}

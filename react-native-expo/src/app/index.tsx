import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTestStore } from "@stores/test-store";

export default function Home() {
  const { count, increment, decrement } = useTestStore(store => {
    return {
      count: store.count,
      increment: store.increment,
      decrement: store.decrement,
    }
  })

  return (
    <View className="flex-1 items-center justify-start gap-6">
      <Text className="items-center text-white text-2xl font-heading">
        Test with Zustand
      </Text>

      <View className="flex-1 items-center justify-center gap-6">
        <View className="flex-col items-center text-2xl font-subtitle gap-2">
          <Text className="items-center text-blue-500 text-2xl font-heading">
            Last interaction 
          </Text>

          <Text className="items-center text-blue-500 text-2xl font-heading">
            {new Date().toLocaleString('pt-br')}
          </Text>
        </View>

        <Text className="items-center text-white text-2xl font-heading">
          Count: {count}
        </Text>

        <TouchableOpacity className="items-center bg-lime-600 rounded-full p-4 w-40">
          <Text 
            className="items-center text-white text-xl font-body" 
            onPress={increment}
          >
            Increment
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center bg-red-900 rounded-full p-4 w-40">
          <Text 
            className="items-center text-white text-xl font-body" 
            onPress={decrement}
          >
            Decrement
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
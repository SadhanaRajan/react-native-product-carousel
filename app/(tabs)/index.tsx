import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Carousel from "./components/Carousel";

export default function App() {
  return (
    <SafeAreaProvider>
      <Carousel />
    </SafeAreaProvider>
  );
}

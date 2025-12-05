import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardContent from "./CardContent";
import useProducts from "../data/useProducts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Carousel() {
  const { products, loading, error, retry } = useProducts();
  const [index, setIndex] = useState(0);
  const [favorites, setFavorites] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionIndex, setTransitionIndex] = useState(null);

  // animations
  const mainCardX = useRef(new Animated.Value(0)).current;
  const nextCardX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  /* ------------------------------
     TRANSITIONS
  ------------------------------ */
  const triggerTransition = (direction, newIndex) => {
    setTransitionIndex(newIndex);
    setIsTransitioning(true);

    nextCardX.setValue(direction === "next" ? SCREEN_WIDTH : -SCREEN_WIDTH);
    mainCardX.setValue(0);
    fadeAnim.setValue(0);

    Animated.parallel([
      Animated.timing(mainCardX, {
        toValue: direction === "next" ? -SCREEN_WIDTH : SCREEN_WIDTH,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(nextCardX, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndex(newIndex);
      setTransitionIndex(null);
      setIsTransitioning(false);
      mainCardX.setValue(0);
    });
  };

  const goNext = () => {
    if (index < products.length - 1) {
      triggerTransition("next", index + 1);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      triggerTransition("prev", index - 1);
    }
  };

  /* ------------------------------
     FAVORITES HEART ANIMATION
  ------------------------------ */
  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

    heartScale.setValue(0.65);
    Animated.spring(heartScale, {
      toValue: 1,
      friction: 5,
      tension: 160,
      useNativeDriver: true,
    }).start();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  if (!products.length) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No products available</Text>
          <Text style={styles.emptyMessage}>
            {error || "We couldn't load products right now. Try again shortly."}
          </Text>
          <TouchableOpacity onPress={retry} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const product = products[index];
  const incoming =
    transitionIndex !== null ? products[transitionIndex] : null;
  const isFavorite = favorites[product.id];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>

        {/* CARD AREA */}
        <View style={styles.cardArea}>

          {/* Incoming card */}
          {isTransitioning && incoming && (
            <Animated.View
              style={[
                styles.card,
                {
                  position: "absolute",
                  opacity: fadeAnim,
                  transform: [{ translateX: nextCardX }],
                },
              ]}
            >
              <CardContent product={incoming} />
            </Animated.View>
          )}

          {/* Main card */}
          <Animated.View
            style={[
              styles.card,
              { transform: [{ translateX: mainCardX }] },
            ]}
          >
            <CardContent
              product={product}
              isFavorite={isFavorite}
              onToggleFavorite={() => toggleFavorite(product.id)}
              heartScale={heartScale}
            />
          </Animated.View>
        </View>

        {/* BUTTONS */}
        <View style={styles.controls}>
          <TouchableOpacity
            disabled={index === 0 || isTransitioning}
            onPress={goPrev}
            style={[
              styles.button,
              (index === 0 || isTransitioning) && styles.disabled,
            ]}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={index === products.length - 1 || isTransitioning}
            onPress={goNext}
            style={[
              styles.button,
              (index === products.length - 1 || isTransitioning) &&
                styles.disabled,
            ]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* COUNTER */}
        <View style={styles.counterBox}>
          <Text style={styles.counter}>
            {index + 1} / {products.length}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ------------------------------
   STYLES
------------------------------ */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F2F2F7" },

  root: { flex: 1 },

  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: "90%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  controls: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 8,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },

  disabled: { backgroundColor: "#C7C7CC" },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  counterBox: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  counter: { fontSize: 16, color: "#444" },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 12,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  emptyMessage: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    lineHeight: 22,
  },

  retryButton: {
    marginTop: 4,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },

  retryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

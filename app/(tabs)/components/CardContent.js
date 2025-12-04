import { MaterialIcons } from "@expo/vector-icons";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CardContent({
  product,
  isFavorite,
  onToggleFavorite,
  heartScale,
}) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.titleRow}>
        <Text style={styles.title}>{product.title}</Text>

        {onToggleFavorite && (
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <TouchableOpacity onPress={onToggleFavorite}>
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={32}
                color={isFavorite ? "#FF3B30" : "#8E8E93"}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      <Text style={styles.brand}>{product.brand}</Text>

      <Text numberOfLines={5} style={styles.description}>
        {product.description}
      </Text>

      <Text style={styles.price}>
        ${product.price}
        <Text style={styles.discount}> ({product.discountPercentage}% OFF)</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    gap: 10,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
  },

  titleRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111",
    flex: 1,
    marginRight: 12,
  },

  brand: {
    fontSize: 16,
    color: "#8E8E93",
  },

  description: {
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    color: "#6E6E73",
    lineHeight: 20,

    // Ensuring 4 lines exact height
    minHeight: 20 * 4,
    maxHeight: 20 * 4,
  },

  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#34C759",
  },

  discount: {
    fontSize: 16,
    color: "#FF3B30",
  },
});

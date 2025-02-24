import {
  Pressable,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootDrawerParamList } from "../types"; // Import the type
import { useSession } from "../../../ctx";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  Avatar,
  Divider,
  IconButton,
  useTheme,
  Button,
} from "react-native-paper";
import { FlatList } from "react-native";
import { useEffect, useState } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Helper function to format timestamp (e.g., "2h ago")
const formatTimestamp = (createdAt: string) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const diffMs = now.getTime() - postDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return `${Math.floor(diffMs / (1000 * 60))}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${Math.floor(diffHours / 24)}d`;
};

function TweetCard({ tweet }: { tweet: any }) {
  const theme = useTheme();

  return (
    <View style={styles.tweetContainer}>
      <Avatar.Image
        size={40}
        source={{
          uri: tweet.user.profilePicture
            ? tweet.user.profilePicture
            : "https://picsum.photos/200",
        }}
      />
      <View style={styles.tweetContent}>
        <View style={styles.tweetHeader}>
          <Text style={styles.userName}>{tweet.user.username}</Text>
          <Text style={styles.userHandle}>@{tweet.user.displayName}</Text>
          <Text style={styles.timestamp}>
            · {formatTimestamp(tweet.createdAt)}
          </Text>
        </View>
        <Text style={styles.tweetText}>{tweet.content}</Text>
        <View style={styles.tweetActions}>
          <View style={styles.actionItem}>
            <IconButton
              icon="comment-outline"
              size={20}
              onPress={() => {}}
              iconColor={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.actionText}>{tweet.comments}</Text>
          </View>
          <View style={styles.actionItem}>
            <IconButton
              icon="repeat"
              size={20}
              onPress={() => {}}
              iconColor={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.actionText}>0</Text>
          </View>
          <View style={styles.actionItem}>
            <IconButton
              icon="heart-outline"
              size={20}
              onPress={() => {}}
              iconColor={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.actionText}>{tweet.likes}</Text>
          </View>
          <IconButton
            icon="share-outline"
            size={20}
            onPress={() => {}}
            iconColor={theme.colors.onSurfaceVariant}
          />
        </View>
      </View>
    </View>
  );
}

export default function Index() {
  const [tweets, setTweets] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh
  const [loading, setLoading] = useState(true); // For initial load
  const [error, setError] = useState<string | null>(null); // For error state
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const { signOut } = useSession();
  const theme = useTheme();

  // Function to fetch tweets from API
  const fetchTweets = async () => {
    try {
      setError(null); // Clear any previous error
      const response = await fetch(`${API_URL}/api/posts`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setTweets(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
      setRefreshing(false); // Stop refreshing if triggered by pull-to-refresh
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchTweets();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTweets();
  };

  // Render loading, error, or content
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  if (error && !refreshing) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
          mode="contained"
          onPress={fetchTweets}
          style={styles.retryButton}
          buttonColor={theme.colors.primary}
        >
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TweetCard tweet={item} />}
        ItemSeparatorComponent={() => <Divider />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      />
      <Text
        onPress={() => {
          signOut();
        }}
        style={{ padding: 10, color: theme.colors.primary }}
      >
        Sign Out
      </Text>
      <Pressable
        onPress={() => navigation.openDrawer()}
        style={{
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Open Drawer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#536471",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff3333",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    borderRadius: 5,
  },
  tweetContainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 4,
    gap: 12,
  },
  tweetContent: {
    flex: 1,
  },
  tweetHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  userHandle: {
    color: "#536471",
    fontSize: 14,
  },
  timestamp: {
    color: "#536471",
    fontSize: 14,
  },
  tweetText: {
    marginTop: 4,
    lineHeight: 20,
    fontSize: 15,
  },
  tweetActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: -12,
    marginTop: 8,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    color: "#536471",
    marginLeft: 4,
    fontSize: 13,
  },
});

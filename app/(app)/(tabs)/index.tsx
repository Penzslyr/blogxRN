import { Button, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { RootDrawerParamList } from "../types"; // Import the type

import { useSession } from "../../../ctx";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Avatar, Divider, IconButton, useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

interface Tweet {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  stats: {
    replies: number;
    retweets: number;
    likes: number;
  };
}

const mockTweets: Tweet[] = [
  {
    id: "1",
    user: {
      name: "Martha Craig",
      handle: "craig_love",
      avatar: "https://picsum.photos/200",
    },
    content:
      "UXR/UX: You can only bring one item to a remote island to assist your research of native use of tools and usability. What do you bring? #TellMeAboutYou",
    timestamp: "12h",
    stats: {
      replies: 28,
      retweets: 5,
      likes: 21,
    },
  },
  {
    id: "2",
    user: {
      name: "Maximmilian",
      handle: "maxjacobson",
      avatar: "https://picsum.photos/201",
    },
    content: "Y'all ready for this next post?",
    timestamp: "3h",
    stats: {
      replies: 46,
      retweets: 18,
      likes: 363,
    },
  },
  {
    id: "3",
    user: {
      name: "Tabitha Potter",
      handle: "mis_potter",
      avatar: "https://picsum.photos/202",
    },
    content: "Kobe's passing really changed me in a way I didn't expect.",
    timestamp: "14h",
    stats: {
      replies: 7,
      retweets: 1,
      likes: 11,
    },
  },
];

function TweetCard({ tweet }: { tweet: Tweet }) {
  const theme = useTheme();

  return (
    <View style={styles.tweetContainer}>
      <Avatar.Image size={40} source={{ uri: tweet.user.avatar }} />
      <View style={styles.tweetContent}>
        <View style={styles.tweetHeader}>
          <Text style={styles.userName}>{tweet.user.name}</Text>
          <Text style={styles.userHandle}>@{tweet.user.handle}</Text>
          <Text style={styles.timestamp}>· {tweet.timestamp}</Text>
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
            <Text style={styles.actionText}>{tweet.stats.replies}</Text>
          </View>
          <View style={styles.actionItem}>
            <IconButton
              icon="repeat"
              size={20}
              onPress={() => {}}
              iconColor={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.actionText}>{tweet.stats.retweets}</Text>
          </View>
          <View style={styles.actionItem}>
            <IconButton
              icon="heart-outline"
              size={20}
              onPress={() => {}}
              iconColor={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.actionText}>{tweet.stats.likes}</Text>
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
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const { signOut } = useSession();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <FlatList
        data={mockTweets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TweetCard tweet={item} />}
        ItemSeparatorComponent={() => <Divider />}
      />
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
      <Pressable
        onPress={() => navigation.openDrawer()} // Open the Drawer
        style={{
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white" }}>Open Drawer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  headerAvatar: {
    marginRight: 16,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
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
  },
  userHandle: {
    color: "#536471",
  },
  timestamp: {
    color: "#536471",
  },
  tweetText: {
    marginTop: 4,
    lineHeight: 20,
  },
  tweetActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: -12, // Adjust this value as needed
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    color: "#536471",
    marginLeft: 4,
  },
});

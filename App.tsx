import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NewsFeed from "./src/bai09/NewsFeed";
import UserProfileDetail from "./src/bai10/UserProfileDetail";
import ProductSearch from "./src/bai11/ProductSearch";
import APIErrorHandling from "./src/bai12/APIErrorHandling";
import FilteredListGeneric from "./src/bai13/FilteredListGeneric";
import PaginationResponse from "./src/bai14/PaginationResponse";
import PullToRefreshState from "./src/bai15/PullToRefreshState";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Bai 9 */}
      {/* <NewsFeed /> */}

      {/* Bai 10 */}
      {/* <UserProfileDetail /> */}

      {/* Bai 11 */}
      {/* <ProductSearch /> */}

      {/* Bai 12 */}
      {/* <APIErrorHandling /> */}

      {/* Bai 13 */}
      {/* <FilteredListGeneric /> */}

      {/* Bai 14 */}
      {/* <PaginationResponse /> */}

      {/* Bai 15 */}
      <PullToRefreshState />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Link, useNavigation } from "expo-router";

import { useAuth } from "../context/auth";
import sleep from "../utils/sleep";
import colors from "../utils/colors";

export default function Index() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  React.useEffect(() => {
    const handleSigInModal = async () => {
      await sleep(100);

      if (!user) {
        navigation.navigate("(auth)/sign-in-modal");
      } else {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }

      setIsLoading(false);
    };

    handleSigInModal();
  }, [user, navigation]);

  function handleSignOut() {
    setIsLoading(true);
    signOut();
  }

  return (
    <View testID="HomeScreen" style={styles.container}>
      {isLoading && <ActivityIndicator size="large" />}

      {user && (
        <>
          <View>
            <Text testID="GreetingsText" style={styles.userInfos}>
              Hello <Text style={styles.name}>{user.name}</Text>
            </Text>
            <Text style={styles.userInfos}>{user.email}</Text>
          </View>
          <Link testID="DetailsScreenLink" href="/details" style={styles.link}>
            Go to Details screen
          </Link>
          <Text
            testID="SignOutButton"
            style={styles.signOut}
            onPress={handleSignOut}
          >
            Sign Out
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.BLACK_II,
  },
  userInfos: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: 18,
  },
  name: {
    color: colors.GREEN,
    fontSize: 22,
  },
  signOut: {
    backgroundColor: colors.RED,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: 20,
  },
  link: {
    color: colors.BLUE,
    fontWeight: "bold",
    marginVertical: 50,
    fontSize: 20,
  },
});

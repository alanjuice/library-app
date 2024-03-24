import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const BoxComponent = ({ text, imageSource }) => (
  <View style={styles.box}>
    <Image source={imageSource} style={styles.boxImage} />
    <Text>{text}</Text>
  </View>
);

function Menu() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.columnContainer}>
            <TouchableOpacity
              style={styles.columnContainer}
              onPress={() => {
                navigation.navigate("Students");
              }}
            >
              <BoxComponent
                text="Students"
                imageSource={require("../../../../../assets/favicon.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.columnContainer}
              onPress={() => navigation.navigate("Allocate")}
            >
              <BoxComponent
                text="Allocate"
                imageSource={require("../../../../../assets/favicon.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.columnContainer}>
            <TouchableOpacity
              style={styles.columnContainer}
              onPress={() => {
                navigation.navigate("Books");
              }}
            >
              <BoxComponent
                text="Books"
                imageSource={require("../../../../../assets/favicon.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.columnContainer}>
              <BoxComponent
                text="Analytics"
                imageSource={require("../../../../../assets/favicon.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Appbar style={styles.appbar}>
          <Text style={styles.appbarText}>St Marys Library</Text>
          <Avatar.Image
            size={50}
            source={require("../../../../../assets/favicon.png")}
            style={styles.avatar}
          />
        </Appbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "#0D08F3",
    height: 64,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
    top: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  appbarText: {
    color: "white",
    fontSize: 25,
    fontWeight: "700",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#0D08F3",
  },
  main: {
    flex: 1,
    backgroundColor: "#0D08F3",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    height: "75%",
    width: "100%",
    borderRadius: 20,
    borderColor: "#e6e6e6",
    marginBottom: 70,
  },
  boxImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  bottombar: {
    position: "absolute",
    backgroundColor: "#0D08F3",
    justifyContent: "space-around",
    height: "12%",
    top: "100%",
    left: 0,
    right: 0,
    bottom: 0,
  },
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
    margin: 20,
    borderRadius: 10,
  },
  columnContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  avatar: {
    marginRight: 10,
  },
});

export default Menu;

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
import * as Animatable from "react-native-animatable";

const BoxComponent = ({ text, imageSource, backgroundColor }) => (
  <Animatable.View animation="fadeIn" duration={10000} style={[styles.box, { backgroundColor }]}>
    <Image source={imageSource} style={styles.boxImage} />
    <Text>{text}</Text>
  </Animatable.View>
);

function Menu() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Appbar style={styles.appbar}>
          <Text style={styles.appbarText}>welcome teacher name</Text>
          <Avatar.Image
            size={50}
            source={require("../../../../../assets/pfp.png")}
            style={styles.avatar}
          />
        </Appbar>   
        
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
                imageSource={require("../../../../../assets/students.png")}
                backgroundColor="#AACCFF" // Specify color for the box
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.columnContainer}
              onPress={() => navigation.navigate("Allocate")}
            >
              <BoxComponent
                text="Allocate"
                imageSource={require("../../../../../assets/allocate.png")}
                backgroundColor="#00B3FF" // Specify color for the box
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
                imageSource={require("../../../../../assets/books.png")}
                backgroundColor="#6FD6FF"
                 // Specify color for the box
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.columnContainer}>
              <BoxComponent
                text="Analytics"
                imageSource={require("../../../../../assets/analytics.png")}
                backgroundColor="#8AC8FF" // Specify color for the box
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: {
   backgroundColor: "#0086D1",
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
    alignItems: "center",
    backgroundColor: "#0086D1",
    justifyContent: "flex-end", // Align content to the bottom
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    height: "80%", // Adjust height as needed
    width: "100%",
    borderTopLeftRadius: 20, // Border radius at the top left
    borderTopRightRadius: 20, // Border radius at the top right
    borderBottomLeftRadius: 0, // No border radius at the bottom left
    borderBottomRightRadius: 0, // No border radius at the bottom right
   
    borderColor: "#e6e6e6",
    bottom:-1
    
  },
  
  main: {
    flex: 1,
    backgroundColor: "#0D08F3",
    alignItems: "center",
    justifyContent: "center",
  },
  
  boxImage: {
    width: 70,
    height: 70,
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
    elevation: 5, // Add elevation for drop shadow effect
    shadowColor: "#000", // Set shadow color
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1, // Set shadow opacity
    shadowRadius: 5, // Set shadow radius
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

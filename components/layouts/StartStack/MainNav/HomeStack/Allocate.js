import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Appbar, Avatar, Button } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const BoxComponent = ({ text, imageSource }) => {
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "gladson", value: "5" },
  ];
  const [value, setValue] = useState(null);
  return (
    <View style={styles.box}>
      <View style={styles.boxContent}>
        {imageSource && (
          <Avatar.Image size={40} source={imageSource} style={styles.avatar} />
        )}
        <Text style={styles.boxText}>{text}</Text>
      </View>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
        />
      </View>
    </View>
  );
};

export default function Allocate() {
  return (
    <>
      <View style={styles.main}>
        <Text>hello world</Text>
        <StatusBar style="auto" />
      </View>

      <View style={styles.container}>
        <Button
          icon=""
          mode="contained"
          onPress={() => console.log("Pressed archive")}
          style={[styles.addButton, { margin: 10, backgroundColor: "#F20C0C" }]}
        >
          SAVE ALLOCATED BOOKS
        </Button>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.boxRow}>
            <BoxComponent
              text="Box "
              imageSource={require("../../../../../assets/favicon.png")}
            />
          </View>
          <View style={styles.boxRow}>
            <BoxComponent
              text="Box "
              imageSource={require("../../../../../assets/favicon.png")}
            />
          </View>
        </ScrollView>
      </View>

      <Appbar style={styles.appbar}>
        <Text style={styles.appbarText}>Students List</Text>
        <Avatar.Image
          size={40}
          source={require("../../../../../assets/favicon.png")}
          style={styles.avatar}
        />
      </Appbar>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "",
    justifyContent: "center", // Changed to flex-start to position at top
    position: "absolute",
    bottom: 0,
    height: "75%",
    width: "100%",
    borderRadius: 20,
    borderColor: "#e6e6e6",
    overflow: "hidden",
  },
  main: {
    flex: 1,
    backgroundColor: "#0D08F3",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.66,
  },
  bottom: {
    position: "absolute",
    backgroundColor: "#0D08F3",
    justifyContent: "space-around",
    height: "10%",
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.66,
    borderRadius: 20,
  },
  boxContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxText: {
    marginLeft: 10,
    flex: 1, // Adjusted to take remaining space
    flexWrap: "wrap", // Allow text to wrap if exceeding width
  },
  box: {
    flex: 1, // This line makes the width 100%
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    marginBottom: 0,
    height: 60,
    width: "90%", // Set width to 90%
  },

  boxRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    alignItems: "center", // Added to center boxes horizontally
  },
  avatar: {
    marginRight: 10,
  },
  appbarText: {
    color: "white",
    fontSize: 25,
    fontWeight: "700",
  },
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
  dropdownContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  dropdown: {
    justifyContent: "flex-end",
    height: 40,
    width: 100,
    marginRight: 0,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

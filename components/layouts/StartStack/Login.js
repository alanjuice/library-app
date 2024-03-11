import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const logo = require("../../../assets/logo.png");

export default function LoginForm() {
  const navigation = useNavigation();
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      navigation.navigate("Main");
    }
  };

  const handleForgot = () => {
    -navigation.navigate("Forgot");
  };

  const handleLogin = () => {
    fetch("http://192.168.0.177:3000" + "/teacher/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: teacherId,
        password: password,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          setPassword("");
          setTeacherId("");
          const token = response.headers.get("x-authtoken");
          await SecureStore.setItemAsync("token", token);

          navigation.navigate("Main");
        } else {
          alert("Invalid credentials. Please try again.");
        }
      })
      .catch(() => {
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.inputView}>
        <TextInput
          value={teacherId}
          style={styles.inputText}
          placeholder="Teacher ID"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setTeacherId(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          value={password}
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.forgot} onPress={handleForgot}>
        Forgot Password?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#FAF3F0",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#003f5c",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  loginBtn: {
    width: "30%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  forgot: {
    margin: 15,
    color: "blue",
  },
});

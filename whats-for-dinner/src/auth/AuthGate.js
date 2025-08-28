import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function AuthGate({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mode, setMode] = useState("login");

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (u) => {
      if (u) navigation.reset({ index: 0, routes: [{ name: "Planner" }] });
    });
    return () => sub();
  }, [navigation]);

  async function submit() {
    if (!email || !pass) return;
    try {
      if (mode === "login") await signInWithEmailAndPassword(auth, email, pass);
      else await createUserWithEmailAndPassword(auth, email, pass);
    } catch (e) {
      Alert.alert("Auth error", e.message);
    }
  }

  return (
    <View style={s.wrap}>
      <Text style={s.title}>What’s for Dinner</Text>
      <TextInput style={s.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={s.input} placeholder="Password" value={pass} onChangeText={setPass} secureTextEntry />
      <Button title={mode === "login" ? "Log in" : "Create account"} onPress={submit} />
      <View style={{ height: 10 }} />
      <Button
        title={mode === "login" ? "Need an account?" : "Have an account?"}
        onPress={() => setMode(mode === "login" ? "signup" : "login")}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  input: { width: "100%", padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 10 }
});
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AuthGate from "./src/auth/AuthGate";
import PlannerScreen from "./src/screens/PlannerScreen";
import WheelScreen from "./src/screens/WheelScreen";
import RecipesScreen from "./src/screens/RecipesScreen";
import GroceryScreen from "./src/screens/GroceryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={AuthGate} options={{ headerShown: false }} />
          <Stack.Screen name="Planner" component={PlannerScreen} options={{ title: "Meal Planner" }} />
          <Stack.Screen name="Wheel" component={WheelScreen} options={{ title: "Meal Wheel" }} />
          <Stack.Screen name="Recipes" component={RecipesScreen} options={{ title: "Recipes" }} />
          <Stack.Screen name="Grocery" component={GroceryScreen} options={{ title: "Smart Grocery List" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
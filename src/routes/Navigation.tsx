import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen"
import DetailsScreen from "../screens/DetailsScreen"

type RootStackParamList = {
	Home: undefined
	Details: {title: string}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

// type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">

export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "Details">

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

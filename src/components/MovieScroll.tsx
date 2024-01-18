import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { width } from "../constants"

export default function MovieScroll({	movies,}: {	movies: { Title: string; Poster: string }[]}) {
	const navigation = useNavigation()

	return (
		<View className="flex-row flex-wrap justify-center">
			{movies.map((movie, index) => {
				return (
					<TouchableOpacity
						className="m-4"
						key={index}
						onPress={() =>
							navigation.navigate("Details", { title: movie.Title })
						}
					>
						<View>
							<Image
								source={
									movie.Poster === "N/A"
										? require("../../assets/placeholder.jpg")
										: { uri: movie.Poster }
								}
								style={{ height: width * 0.6, width: width * 0.4 }}
								className="rounded-lg"
							/>
							<LinearGradient
								colors={["transparent", "transparent", "rgba(10,10,10,0.8)"]}
								style={{ width: width * 0.4, height: width * 0.6 }}
								className="absolute top-0 bottom-0 rounded-lg justify-end"
							>
								<View className="p-4">
									<Text className="text-white text-center">
										{movie.Title}
									</Text>
								</View>
							</LinearGradient>
						</View>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

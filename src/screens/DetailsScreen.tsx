import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Card, Chip, DataTable } from "react-native-paper"
import { fetchMovieDetails } from "../server/MovieApi"
import { DetailsScreenProps } from "../routes/Navigation"
import { height } from "../constants"
import { StatusBar } from "expo-status-bar"

export default function Details({ route }: DetailsScreenProps) {
	const { title } = route.params

	const [details, setDetails] = useState<any>([])

	useEffect(() => {
		getMovieDetails()
	}, [])

	const getMovieDetails = async () => {
		const data = await fetchMovieDetails(title)
		data && setDetails(data)
	}

	return (
		<View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<StatusBar style="auto" />
				<Card>
					<Card.Cover
						source={
							details.Poster === "N/A"
								? require("../../assets/placeholder.jpg")
								: { uri: details.Poster }
						}
						className="rounded-b-3xl"
						style={{ height: height * 0.5 }}
					/>
					<Card.Title
						className="py-4 font-bold"
						title={details.Title}
						titleVariant="headlineLarge"
						titleNumberOfLines={3}
					/>
					<Card.Content className=" py-2 flex-row justify-between">
						<Text>{details.Year}</Text>
						<Text>{details.Rated} Rating</Text>
						<Text>{details.Runtime}</Text>
					</Card.Content>

					<Card.Content>
						{details.Genre ? (
							<View className="flex-wrap flex-row py-2">
								{details.Genre.split(", ").map((genre: string) => (
									<Chip
										key={genre}
										compact
										mode="outlined"
										className="mr-1 mb-1"
									>
										{genre}
									</Chip>
								))}
							</View>
						) : null}

						<Text>{details.Plot}</Text>
					</Card.Content>
				</Card>

				{[
					{ label: "Director", value: details.Director },
					{ label: "Writer", value: details.Writer },
					{ label: "Cast", value: details.Actors },
				].map((row) => (
					<DataTable.Row key={row.label}>
						<DataTable.Cell>
							<Text>{row.label}</Text>
						</DataTable.Cell>
						<DataTable.Cell>
							<Text>{row.value}</Text>
						</DataTable.Cell>
					</DataTable.Row>
				))}
			</ScrollView>
		</View>
	)
}

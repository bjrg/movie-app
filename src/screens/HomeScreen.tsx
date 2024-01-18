import {View,	SafeAreaView, ScrollView } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { StatusBar } from "expo-status-bar"
import MovieScroll from "../components/MovieScroll"
import { Searchbar } from "react-native-paper"
import { fetchHomeMovies, fetchSearchQuery } from "../server/MovieApi"

export default function Homescreen() {
	const [movies, setMovies] = useState([])

	useEffect(() => {
		getHomeMovies()
	}, [])

	const getHomeMovies = async () => {
		const data = await fetchHomeMovies()
		if (data && data.Search) setMovies(data.Search)
	}

	const [searchQuery, setSearchQuery] = useState("")

	const search = (query: string) => {
		setSearchQuery(query)

		if (query && query.length > 1) {
			fetchSearchQuery(query).then((data) => {
				if (data && data.Search) {
					setMovies(data.Search)
					console.log(query)
				}
			})
		} else {
			getHomeMovies()
		}
	}

	return (
		<View className="flex-1 bg-stone-200">
			<SafeAreaView className=" mt-8 mb-4">
				<StatusBar style="dark" />
				<Searchbar
					mode="view"
					className=" bg-stone-200"
					placeholder="Search Cyber Cinema"
					onChangeText={search}
					value={searchQuery}
				/>
			</SafeAreaView>
			<ScrollView showsVerticalScrollIndicator={false}>
				<MovieScroll movies={movies} />
			</ScrollView>
		</View>
	)
}

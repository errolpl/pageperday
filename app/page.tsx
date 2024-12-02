"use client"

import { useState, useEffect } from "react"
import supabase from "@/lib/supabaseClient"
import BookInfo from "./components/BookInfo"
import PageCalc from "./components/PageCalc"

export default function Home() {
	const [totalPages, setTotalPages] = useState<number | null>(null)
	const [endDate, setEndDate] = useState<string | null>(null)

	const fetchBookInfo = async () => {
		try {
			const { data, error } = await supabase.from("books").select("total_pages, end_date").single()

			if (error) {
				console.error("Error fetching book info:", error.message)
			} else if (data) {
				setTotalPages(data.total_pages)
				setEndDate(data.end_date)
			}
		} catch (err) {
			console.error("Unhandled error during fetch:", err)
		}
	}

	useEffect(() => {
		fetchBookInfo() // Fetch data on initial render
	}, [])

	return (
		<div>
			<BookInfo fetchBookInfo={fetchBookInfo} totalPages={totalPages} endDate={endDate} />
			<PageCalc totalPages={totalPages} endDate={endDate} />
		</div>
	)
}

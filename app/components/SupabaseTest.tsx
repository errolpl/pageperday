"use client"

import supabase from "@/lib/supabaseClient"

export default function SupabaseTest() {
	const testSupabaseConnection = async () => {
		try {
			// Fetch only the columns needed
			const { data, error } = await supabase.from("books").select("total_pages, end_date")

			if (error) {
				console.error("Error fetching data from Supabase:", error.message)
				return
			}

			if (!data || data.length === 0) {
				console.log("No rows found in the books table.")
				return
			}

			// Log each row explicitly
			data.forEach((row, index) => {
				console.log(`Row ${index + 1}:`)
				console.log("Total Pages:", row.total_pages)
				console.log("End Date:", row.end_date)
			})
		} catch (err) {
			console.error("Unhandled error:", err)
		}
	}

	return (
		<div>
			<button onClick={testSupabaseConnection} className="bg-blue-500 text-white px-4 py-2 rounded-md">
				Test Supabase Connection
			</button>
		</div>
	)
}

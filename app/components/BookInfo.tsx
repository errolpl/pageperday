"use client"

import { useState } from "react"
import supabase from "@/lib/supabaseClient"

interface BookInfoProps {
	fetchBookInfo: () => Promise<void>
	totalPages: number | null
	endDate: string | null
}

export default function BookInfo({ fetchBookInfo, totalPages, endDate }: BookInfoProps) {
	const [bookId, setBookId] = useState<string | null>(null) // Store the book ID
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [newTotalPages, setNewTotalPages] = useState<number | "">(totalPages || "")
	const [newEndDate, setNewEndDate] = useState<string | "">(endDate || "")
	const [message, setMessage] = useState<string | null>(null)

	// Fetch book ID when modal opens (if not already fetched)
	const openModal = async () => {
		if (!bookId) {
			try {
				const { data, error } = await supabase
					.from("books")
					.select("id") // Fetch the book ID
					.single()

				if (error) {
					console.error("Error fetching book ID:", error.message)
					setMessage("Failed to fetch book ID.")
					return
				}

				setBookId(data.id) // Store the fetched book ID
			} catch (err) {
				console.error("Unhandled error while fetching book ID:", err)
				setMessage("Unexpected error occurred.")
				return
			}
		}

		setNewTotalPages(totalPages || "")
		setNewEndDate(endDate || "")
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setMessage(null)
	}

	const updateBookInfo = async (event: React.FormEvent) => {
		event.preventDefault()

		if (!bookId) {
			setMessage("Error: Book ID not available.")
			return
		}

		try {
			const { error } = await supabase.from("books").update({ total_pages: newTotalPages, end_date: newEndDate }).eq("id", bookId) // Use the fetched book ID

			if (error) {
				console.error("Error updating book info:", error.message)
				setMessage("Failed to update book information.")
			} else {
				setMessage("Book information updated successfully!")
				await fetchBookInfo() // Refetch updated data
				closeModal() // Close modal after successful update
			}
		} catch (err) {
			console.error("Unhandled error during update:", err)
			setMessage("Unexpected error occurred.")
		}
	}

	return (
		<div className="max-w-md mx-auto mt-10 p-5 bg-gray-800 text-white rounded-md shadow-lg">
			<h2 className="text-2xl font-bold mb-4">Book Info</h2>
			<p className="text-lg mb-2">Total Pages: {totalPages || "Loading..."}</p>
			<p className="text-lg mb-4">End Date: {endDate || "Loading..."}</p>

			<button onClick={openModal} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
				Update Book Info
			</button>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg max-w-md w-full">
						<h2 className="text-xl font-bold mb-4">Update Book Info</h2>

						<form onSubmit={updateBookInfo}>
							<div className="mb-4">
								<label htmlFor="totalPages" className="block text-sm font-medium text-gray-200 mb-1">
									Total Pages
								</label>
								<input
									type="number"
									id="totalPages"
									value={newTotalPages}
									onChange={e => setNewTotalPages(e.target.value ? parseInt(e.target.value, 10) : "")}
									className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<div className="mb-4">
								<label htmlFor="endDate" className="block text-sm font-medium text-gray-200 mb-1">
									End Date
								</label>
								<input
									type="date"
									id="endDate"
									value={newEndDate}
									onChange={e => setNewEndDate(e.target.value)}
									className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<div className="flex justify-end">
								<button type="button" onClick={closeModal} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md mr-2">
									Cancel
								</button>
								<button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">
									Submit
								</button>
							</div>
						</form>

						{message && <p className="text-sm mt-4 text-center">{message}</p>}
					</div>
				</div>
			)}
		</div>
	)
}

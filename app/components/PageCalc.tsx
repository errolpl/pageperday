"use client"

import { useState, useEffect } from "react"

interface PageCalcProps {
	totalPages: number | null
	endDate: string | null
}

export default function PageCalc({ totalPages, endDate }: PageCalcProps) {
	const [currentPage, setCurrentPage] = useState<number | "">("")
	const [pagesPerDay, setPagesPerDay] = useState<number | string | null>(null)
	const [pagesLeft, setPagesLeft] = useState<number | null>(null)

	const calculatePagesPerDay = (event: React.FormEvent) => {
		event.preventDefault()

		if (typeof totalPages !== "number" || !endDate) {
			setPagesPerDay("Book information not available.")
			setPagesLeft(null)
			return
		}

		const today = new Date()
		const targetDate = new Date(endDate)

		if (isNaN(targetDate.getTime()) || targetDate <= today) {
			setPagesPerDay("Invalid or past end date.")
			setPagesLeft(null)
			return
		}

		const daysRemaining = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
		const remainingPages = totalPages - (currentPage || 0)

		if (remainingPages <= 0) {
			setPagesPerDay("No pages left to read!")
			setPagesLeft(0)
		} else {
			setPagesPerDay(Math.ceil(remainingPages / daysRemaining))
			setPagesLeft(remainingPages)
		}
	}

	// Reset data when totalPages or endDate changes
	useEffect(() => {
		setCurrentPage("") // Clear current page
		setPagesPerDay(null) // Clear previous calculation
		setPagesLeft(null) // Reset total pages left
	}, [totalPages, endDate])

	return (
		<div className="max-w-md mx-auto mt-10 p-5 bg-gray-800 text-white rounded-md shadow-lg">
			<h2 className="text-2xl font-bold mb-4">Pages Per Day:</h2>
			<p className="text-lg">{pagesPerDay !== null ? pagesPerDay : "Enter current page to calculate."}</p>

			<h2 className="text-xl font-bold mt-4">Total Pages Left:</h2>
			<p className="text-lg">{pagesLeft !== null ? pagesLeft : "Enter current page to calculate."}</p>

			<form onSubmit={calculatePagesPerDay} className="mt-4">
				<div className="mb-4">
					<label htmlFor="currentPage" className="block text-sm font-medium text-gray-200 mb-1">
						Current Page
					</label>
					<input
						type="number"
						id="currentPage"
						value={currentPage}
						onChange={e => setCurrentPage(e.target.value ? parseInt(e.target.value, 10) : "")}
						className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter the page number you're on"
						required
					/>
				</div>

				<button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
					Calculate Pages Per Day
				</button>
			</form>
		</div>
	)
}

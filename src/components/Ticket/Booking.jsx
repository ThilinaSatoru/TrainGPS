import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useFetch from '../../Hooks/Firebase/useFetch';
import './booking.scss';
import TripCard from './TripCard';

function Booking() {
	var result = useFetch('Stations/');
	var schedules = useFetch('Schedules/');
	var id = 1;
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [date, setDate] = useState('');
	const [count, setCount] = useState(0);
	const [isClicked, setClicked] = useState('');

	let i = 0;

	const handleSearch = (e) => {
		e.preventDefault();
		setClicked(true);
	};
	const handleReset = (e) => {
		setClicked(false);
	};

	useEffect(() => {
		var box = document.getElementById('result-box');

		if (isClicked === true) {
			box.style.display = 'flex';
			window.location.href = '#result-box';
		}

		if (isClicked === false) {
			setFrom('');
			setTo('');
			setDate('');
			setCount('');
			box.style.display = 'none';
			window.location.href = '#primary-header';
		}
	}, [isClicked]);

	function getPrice(distance) {
		return (distance * 2).toFixed(0);
	}
	function getDuration(avgSpeed, distance) {
		const SECONDS = ((distance / avgSpeed) * 3600).toFixed(2);
		let time = '';
		if (SECONDS < 3600) {
			time = new Date(SECONDS * 1000).toISOString().substr(14, 5);
		} else {
			time = new Date(SECONDS * 1000).toISOString().substr(11, 8);
		}
		return time;
	}
	function getArrival(arrival, duration) {
		const result = moment(arrival, 'HHmm')
			.add(duration, 'minute')
			.format('HH:mm A');
		return result;
	}
	function getLongDate(date) {
		var newDate;
		newDate = moment(date).format('DD MMMM YYYY');
		// newDate = date.toString("MMMM yyyy");
		return newDate;
	}
	const goTop = (e) => {
		window.location.href = '#primary-header';
	};

	return (
		<div className='booking' id='booking'>
			<h1>Travel by Train</h1>

			<form className='book-form'>
				<div className='box-left'>
					<h2>Book</h2>
					<h2 id='subH2'>Your Seats {isClicked.toString()}</h2>
				</div>
				<div className='box-right'>
					<div className='right-col1 flex1'>
						<div className='col1'>
							<label>From</label>
							<select
								onChange={(e) => setFrom(e.target.value)}
								value={from}
							>
								{result &&
									result.map((station) => (
										<option key={id++}>{station.name}</option>
									))}
							</select>
						</div>
						<div className='col1'>
							<label>To</label>
							<select onChange={(e) => setTo(e.target.value)} value={to}>
								{result &&
									result.map((station) => (
										<option key={id++}>{station.name}</option>
									))}
							</select>
						</div>
						<div className='col1'>
							<label>Date</label>
							<input
								type='date'
								onChange={(e) => setDate(e.target.value)}
								value={date}
							></input>
						</div>
					</div>

					<div className='right-col2 flex1'>
						<div className='col1'>
							<label>No. of Passengers</label>
							<input
								type='number'
								onChange={(e) => setCount(e.target.value)}
								value={count}
							></input>
						</div>
						<div className='col1'>
							<button
								id='btn-high'
								onClick={(e) => {
									handleSearch(e);
								}}
							>
								Search
							</button>
						</div>
						<div className='col1'>
							<button
								id='btn-low'
								onClick={(e) => {
									handleReset(e);
								}}
							>
								{'Reset'}
							</button>
						</div>
					</div>
				</div>
			</form>

			<div className='SResultBox' id='result-box'>
				{from !== '' && to !== ''
					? schedules.map(
							(schedule) =>
								schedule.from === from &&
								schedule.to === to && (
									<TripCard
										id={i++}
										date={getLongDate(schedule.date)}
										name={schedule.name}
										price={getPrice(schedule.distance)}
										stationFrom={schedule.from + ' Station'}
										stationTo={schedule.to + ' Station'}
										timeFrom={schedule.depart}
										timeTo={getArrival(
											schedule.depart,
											getDuration(
												schedule.avgSpeed,
												schedule.distance
											)
										)}
										cityFrom={from}
										cityTo={to}
										duration={getDuration(
											schedule.avgSpeed,
											schedule.distance
										)}
										distance={schedule.distance}
										available={5}
										avgSpeed={schedule.avgSpeed}
									/>
								)
					  )
					: 'no records'}
			</div>
			<div className='move-top' onClick={(e) => goTop(e)}>
				<svg
					width='48px'
					height='48px'
					viewBox='0 0 48 48'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<rect width='48' height='48' fill='white' fillOpacity='0.01' />
					<path
						d='M13 30L25 18L37 30'
						stroke='black'
						strokeWidth='4'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</div>
		</div>
	);
}

export default Booking;

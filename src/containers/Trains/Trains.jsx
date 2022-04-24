import React from 'react';
import useFetch from '../../Hooks/Firebase/useFetch';
import './trains.scss';

function Trains() {
	var trains = useFetch('Trains/');
	var stations = useFetch('Stations/');
	var schedules = useFetch('Schedules/');
	// console.log('😍',stations)
	var c = 1;
	return (
		<div className='flexy'>
			<div className='left-tab'>
				<h2>Trains</h2>
				<table className='-table'>
					<thead>
						<tr>
							<th>No.</th>
							<th>Train</th>
						</tr>
					</thead>
					<tbody>
						{trains &&
							trains.map((train) => {
								return (
									<tr key={train.no} className='td-row'>
										<td className='td-1'>{train.no}</td>
										<td className='td-4'>{train.name}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>

			<div className='r'>
				<h2>Stations</h2>
				<table className='-table'>
					<thead>
						<tr>
							<th>No.</th>
							<th>Train</th>
						</tr>
					</thead>
					<tbody>
						{stations &&
							stations.map((stations) => {
								return (
									<tr key={c++} className='td-row'>
										<td className='td-1'>{c}</td>
										<td className='td-4'>{stations.name}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>

			<div className='right-tab'>
				<h2>Stations</h2>
				<table className='-table'>
					<thead>
						<tr>
							<th>No.</th>
							<th>Train</th>
							<th>Train</th>
							<th>Train</th>
							<th>Train</th>
						</tr>
					</thead>
					<tbody>
						{schedules &&
							schedules.map((schedule) => {
								return (
									<tr key={c++} className='td-row'>
										<td className='td-1'>{c}</td>
										<td className='td-4'>{schedule.name}</td>
										<td className='td-4'>{schedule.from}</td>
										<td className='td-4'>{schedule.to}</td>
										<td className='td-4'>{schedule.avgSpeed}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Trains;

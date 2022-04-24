import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import bar from '../../assets/fontawesome/bars-solid.svg';
import xmark from '../../assets/fontawesome/xmark-solid.svg';
import { DataTable } from '../../components';
import { child, database, get, ref } from '../../firebase-config';
import useListen from '../../Hooks/Firebase/useListen';
import './trackermap.scss';

var fetchResult = [];
var focused = '';
var MarkersArray = [];

export default function TrackerMap() {
	//===========================================================//
	mapboxgl.accessToken =
		'pk.eyJ1Ijoic2F0NjQiLCJhIjoiY2wwYjRxa29iMDU3aTNqbWliM2hpaTA4biJ9.xGf5hWnr-Thw929qo76HxQ';
	const mapContainer = useRef(null);
	var map = useRef(null);
	var marker = useRef(null);
	// var station_markers = useRef(null);
	//==================================//
	fetchResult = useListen('Trains/');
	//==================================//
	const [focalTrain, setFocalTrain] = useState('');
	// Locaion Colombo Srilanka
	const lng = 80.63454809991353;
	const lati = 7.703247711340884;
	const zoom = 6.5;
	//================================//

	// stations = Stations;
	const setStations = async () => {
		const dbRef1 = ref(database);
		await get(child(dbRef1, 'Stations/')).then((snapshot) => {
			if (snapshot.exists()) {
				let stationList = [];
				snapshot.forEach((snap) => {
					stationList.push(snap.val());
				});
				// console.log(stationList);
				stationList.forEach((stations) => {
					// console.log(stations.lat + " & " + stations.lang);
					var station_markers = new mapboxgl.Marker()
						.setLngLat([stations.lat, stations.lang])
						.setPopup(
							new mapboxgl.Popup().setHTML(
								'<h3>' + stations.name + '</h3>'
							)
						) // add popup
						.addTo(map.current);
				});
			}
		});
	};

	const setMarkers = (markers, long, lat, name, no, status) => {
		var marker_pop = document.createElement('span');
		marker_pop.className = 'marker ' + status;
		marker_pop.setAttribute('id', 'pop-' + no);

		var p = document.createElement('p');
		marker_pop.appendChild(p);
		p.innerText = no;

		markers = new mapboxgl.Marker(marker_pop)
			.setLngLat([long, lat])
			.setPopup(new mapboxgl.Popup().setHTML('<h3>' + name + '</h3>')) // add popup
			.addTo(map.current);
		MarkersArray.push(markers);
	};

	const upMarkers = (i, long, lat) => {
		MarkersArray[i].setLngLat([long, lat]);
	};

	//TODO: Mapbox load map
	useEffect(() => {
		setStations();
		try {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/sat64/cl0bdrafw007c16mqpdy0qz6o',
				center: [lng, lati],
				zoom: zoom,
				// cooperativeGestures: true,
			});

			map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
			map.current.addControl(
				new mapboxgl.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true,
					},
					trackUserLocation: true,
					showUserHeading: true,
				})
			);
		} catch (err) {
			console.log('😥');
		}
	}, []);

	const flyBack = () => {
		// console.log(Stations());
		focused = '';
		setFocalTrain('');
		map.current.flyTo({
			bearing: 0,
			center: [lng, lati],
			zoom: zoom,
			pitch: 0,
		});
	};
	const unfollow = () => {
		// console.log(Stations());
		focused = '';
		setFocalTrain('');
	};

	//TODO: Reset flight
	useEffect(() => {
		flyBack();
		MarkersArray = [];
		[...fetchResult].forEach((item) => {
			setMarkers(
				marker.current,
				item['long'],
				item['lat'],
				item['name'],
				item['no'],
				item['status']
			);
		});
		console.log('set 👁');
	}, [map.current]);

	//TODO: focus flight
	const flyToTrainClick = (rowData) => {
		map.current.flyTo({
			bearing: 0,
			center: [rowData['long'], rowData['lat']],
			zoom: 16.5,
			pitch: 30,
		});
		focused = rowData['name'];
	};

	//TODO: update each markers
	useEffect(() => {
		setInterval(() => {
			if (fetchResult && MarkersArray !== undefined) {
				for (var i = 0; i < fetchResult.length; i++) {
					const name = fetchResult[i].name;
					var long = fetchResult[i].long;
					var lat = fetchResult[i].lat;
					var stat = fetchResult[i].status;
					var no = fetchResult[i].no;
					var spd = fetchResult[i].speed;

					if (name === focused) {
						setFocalTrain(
							'You are watching : ' +
								no +
								'  |  ' +
								name +
								'  |  ' +
								long +
								' ,  ' +
								lat +
								'  | Speed : ' +
								spd
						);
						map.current.flyTo({
							bearing: 0,
							center: [long, lat],
							zoom: 16.5,
							pitch: 30,
						});
					}
					if (!long && !lat) {
						long = lng;
						lat = lati;
					} else if (long && lat) {
						upMarkers(i, long, lat, no, stat);
					}
					if (stat === 'online') {
						// console.log(document.getElementById("pop-" + no));
						document.getElementById('pop-' + no).className =
							'marker online mapboxgl-marker mapboxgl-marker-anchor-center';
					}
					if (stat === 'offline') {
						// console.log(document.getElementById("pop-" + no));
						document.getElementById('pop-' + no).className =
							'marker offline mapboxgl-marker mapboxgl-marker-anchor-center';
					}
				}
			}
			// console.log("tick ⌚");
		}, 1000);
	}, []);

	const [isVisible, setVisible] = useState(true);
	const [isExpanded, setExpand] = useState(false);
	const [filter, setFilter] = useState('filter-white');
	const [icon, setIcon] = useState(bar);

	const change = () => {
		if (isVisible === false) {
			setVisible(true);
			setExpand(true);
			setIcon(bar);
		}

		if (isVisible === true) {
			setVisible(false);
			setExpand(false);
			setIcon(xmark);
			setFilter('filter-white');
		}
	};

	// FIXME:
	return (
		<div className='Read'>
			<div id='statusBar'>
				{focalTrain}
				<button id='resetZoom' onClick={flyBack}>
					see Full Map
				</button>
				{focalTrain !== '' && (
					<button id='unfollowZoom' onClick={unfollow}>
						remove Magnet
					</button>
				)}
			</div>

			<div className='table-panel' data-visible={isVisible}>
				<button
					className='map-table-toggle'
					aria-controls='primary-navigation'
					onClick={change}
					aria-expanded={isExpanded}
				>
					<img src={icon} className={filter} alt='bar' />
					<span className='sr-only'></span>
					<h1 className='v-text'>
						T<br />
						r<br />
						a<br />
						i<br />
						n<br />s
					</h1>
				</button>

				<div className='table'>
					<DataTable flyToTrainClick={flyToTrainClick} />
				</div>
			</div>
			<div ref={mapContainer} className='map-container'></div>
			<div className='fake'></div>
		</div>
	);
}

import React, { useEffect } from 'react';
import './booking.scss';
import { Link } from 'react-router-dom';

function TripCard(props) {
  const toggleDetails = (event) => {
    const { id } = event.target;
    const Btn = document.getElementById(id);
    const c13 = document.getElementById(`c13 hiddenRow${id}`);
    const c14 = document.getElementById(`c14 hiddenRow${id}`);
    const c15 = document.getElementById(`c15 hiddenRow${id}`);
    const c16 = document.getElementById(`c16 hiddenRow${id}`);

    if (event.target.dataset.test === 'true') {
      c13.style.display = 'flex';
      c14.style.display = 'flex';
      c15.style.display = 'block';
      c16.style.display = 'block';
      Btn.setAttribute('data-test', 'false');
      console.log('open');
    } else {
      c13.style.display = 'none';
      c14.style.display = 'none';
      c15.style.display = 'none';
      c16.style.display = 'none';
      Btn.setAttribute('data-test', 'true');
      console.log('close');
    }
  };
  function getSeats(available) {
    if (available < 1) {
      const btn = document.getElementById(`seatbtn${props.id}`);
      btn.classList.remove('seatbtn');
    }
    if (available > 1) {
      // btn.classList.add('seatbtn'+props.id);
    }
  }
  useEffect(() => {
    getSeats(props.available);
  }, [props]);

  const handleSubmit = (e) => {
    const val = e.target.id;
    console.log(val);
    localStorage.setItem('name', JSON.stringify(val));
    // <Link to="/order" target="_blank">Select</Link>
  };

  return (
    <>
      {}
      <div className="train-trip-info grid" key={props.id}>
        <div className="column hrow1" id="c1">
          <span id="icon">
            <svg viewBox="0 0 16 20" height="20" width="16">
              <path d="M15.85 19.15L12.57 15.87C14.34 15.39 15.55 13.62 15.19 11.71L13.63 3.35C13.31 1.64 11.92 0.29 10.18 0.12C9.47003 0.04 8.74003 0 8.00003 0C7.26003 0 6.53003 0.04 5.82003 0.11C4.08003 0.28 2.69003 1.63 2.37003 3.34L0.810029 11.7C0.770029 11.93 0.750029 12.16 0.750029 12.38C0.750029 14.02 1.87003 15.44 3.43003 15.86L0.140029 19.15C-0.169971 19.46 0.0600286 20 0.500029 20H1.72003C1.99003 20 2.24003 19.89 2.43003 19.71L6.13003 16H9.86003L13.57 19.71C13.76 19.9 14.01 20 14.28 20H15.5C15.94 20 16.17 19.46 15.85 19.15ZM13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12ZM4.14003 4.82C4.23003 4.34 4.64003 4 5.12003 4H10.88C11.36 4 11.77 4.34 11.86 4.82L12.24 6.82C12.35 7.43 11.88 8 11.26 8H4.74003C4.11003 8 3.64003 7.43 3.76003 6.82L4.14003 4.82ZM3.00003 12C3.00003 11.45 3.45003 11 4.00003 11C4.55003 11 5.00003 11.45 5.00003 12C5.00003 12.55 4.55003 13 4.00003 13C3.45003 13 3.00003 12.55 3.00003 12Z" />
            </svg>
          </span>
          <span id="name">
            <span className="name">{props.name}</span>
            <span className="des">avg. speed: </span>
            <span className="val">{props.avgSpeed}</span>
            <span className="unit"> kmph</span>
          </span>
        </div>
        <div className="column hrow1" id="c2">
          {/* <span className="des">avg. speed: </span>
        <span className="val">{props.avgSpeed}</span>
        <span className="unit"> kmph</span> */}
        </div>
        <div className="column hrow1" id="c3">
          <span>{props.date}</span>
        </div>
        <div className="column hrow1" id="c4">
          <span>
            Rs.
            {props.price}
          </span>
        </div>

        <div className="column hrow2" id="c5" />
        <div className="column hrow2" id="c6">
          <div className="col-from">
            <div className="frow1">
              <span>{props.timeFrom}</span>
            </div>
            <div className="frow2">
              <span>
                {' '}
                {props.stationFrom}
                {' '}
              </span>
            </div>
          </div>

          <span className="arrow-duration">
            <span className="hr">
              <span className="duration">{props.duration}</span>
            </span>
            <svg className="arrow" viewBox="0 0 6 10" width="1em" height="1em">
              <path d="M1 1L5 5L1 9V1Z" />
            </svg>
          </span>
        </div>
        <div className="column hrow2" id="c7">
          <div className="col-to">
            <div className="frow1">
              <span>{props.timeTo}</span>
            </div>
            <div className="frow2">
              <span>
                {' '}
                {props.stationTo}
                {' '}
              </span>
            </div>
          </div>
        </div>
        <div className="column hrow2" id="c8">
          <button>
            <Link to="/order" target="_blank" id={`submit: ${props.id}`} onClick={(e) => { handleSubmit(e); }}>Select</Link>
          </button>
        </div>

        <div className="column hrow3" id="c9">
          <button data-test="true" onClick={(event) => { toggleDetails(event); }} id={props.id}>
            Details
          </button>
          <button id={`seatbtn${props.id}`} className={`seatbtn${props.id} seatbtn`}>
            <svg className="icon-seat" width="1em" height="1em">
              <g>
                <path d="M12.68,12h0l-2-5h-4L4.93,2.63a1,1,0,1,0-1.86.74L5.32,9h4l1.2,3h0l.55,1.36A1,1,0,0,0,12,14h3V13Z" />
                <path d="M8.5,10H4.59L2.09,3.9l-.93.38,2.58,6.28a.7.7,0,0,0,.64.43H9V10Z" />
              </g>
            </svg>
            <span>
              {' '}
              {props.available}
              {' '}
              available
            </span>
          </button>
        </div>
        <div className="column hrow3" id="c10" />
        <div className="column hrow3" id="c11" />
        <div className="column hrow3" id="c12" />

        <div className="column hrow4 c13" id={`c13 hiddenRow${props.id}`}>
          <span className="time1">{props.timeFrom}</span>
          <span className="timeicon">
            <svg viewBox="0 0 16 20" height="20" width="16">
              <path d="M15.85 19.15L12.57 15.87C14.34 15.39 15.55 13.62 15.19 11.71L13.63 3.35C13.31 1.64 11.92 0.29 10.18 0.12C9.47003 0.04 8.74003 0 8.00003 0C7.26003 0 6.53003 0.04 5.82003 0.11C4.08003 0.28 2.69003 1.63 2.37003 3.34L0.810029 11.7C0.770029 11.93 0.750029 12.16 0.750029 12.38C0.750029 14.02 1.87003 15.44 3.43003 15.86L0.140029 19.15C-0.169971 19.46 0.0600286 20 0.500029 20H1.72003C1.99003 20 2.24003 19.89 2.43003 19.71L6.13003 16H9.86003L13.57 19.71C13.76 19.9 14.01 20 14.28 20H15.5C15.94 20 16.17 19.46 15.85 19.15ZM13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12ZM4.14003 4.82C4.23003 4.34 4.64003 4 5.12003 4H10.88C11.36 4 11.77 4.34 11.86 4.82L12.24 6.82C12.35 7.43 11.88 8 11.26 8H4.74003C4.11003 8 3.64003 7.43 3.76003 6.82L4.14003 4.82ZM3.00003 12C3.00003 11.45 3.45003 11 4.00003 11C4.55003 11 5.00003 11.45 5.00003 12C5.00003 12.55 4.55003 13 4.00003 13C3.45003 13 3.00003 12.55 3.00003 12Z" />
            </svg>
          </span>
          <span className="time2">{props.timeTo}</span>
        </div>
        <div className="column hrow4 c14" id={`c14 hiddenRow${props.id}`}>
          <div className="col1">
            <span className="circletop" />
            <span className="line" />
            <span className="circlebott" />
          </div>
          <div className="col2">
            <span className="citytop">{props.cityFrom}</span>
            <span className="stationtop">{props.stationFrom}</span>
            <span className="duration">
              {props.distance}
              {' '}
              km
            </span>
            <span className="citybott">{props.cityTo}</span>
            <span className="stationbott">{props.stationTo}</span>
          </div>
        </div>
        <div className="column hrow4 c15" id={`c15 hiddenRow${props.id}`} />
        <div className="column hrow4 c16" id={`c16 hiddenRow${props.id}`} />

        <div className="column hrow5 norow" id="c17" />
        <div className="column hrow5 norow" id="c18" />
        <div className="column hrow5 norow" id="c19" />
        <div className="column hrow5 norow" id="c20" />
      </div>
    </>
  );
}

export default TripCard;

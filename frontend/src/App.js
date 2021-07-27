import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from '@material-ui/icons';
import './app.css';
import axios from 'axios'

function App() {
	const [pins, setPins] = useState([])
  	const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4
  });

  useEffect(() =>{
	const getPins = async () =>{
		try{
			const allPins = await axios.get('/pins')
			setPins(allPins.data)
		} catch(err){
			console.log(err)
		}
	}
	getPins()
  }, [])

  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
	  mapStyle="mapbox://styles/mariofromhell/ckrm7i5se0nhm18ly33izm5ar"
      >
		  {pins.map((p)=>(
			<>
			  <Marker
			  latitude={p.lat} 
			  longitude={p.long} 
			  offsetLeft={-20} 
			  offsetTop={-10}
			  >

          <Room style={{fontSize: viewport.zoom * 7, color: 'slateblue'}}/>
        </Marker>
		<Popup
			latitude={p.lat}
			longitude={p.long}
			closeButton={true}
			closeOnClick={false}
			anchor="left" >
			<div className="card">
			<label>Place</label>
			<h4 className="place">{p.title}</h4>
			<label>Review</label>
			<p className="desc">{p.desc}</p>
			<label>Rating</label>
			<div className="stars">
			<Star className="star" />
			<Star className="star" />
			<Star className="star" />
			<Star className="star" />
			<Star className="star" />
			</div>
			<label>Information</label>
			<span className="username">Created by <b>{p.username}</b> </span>
			<span className="date">1 Hour ago</span>
			
			</div>
        </Popup> </>
		  ))}
		</ReactMapGL>
    </div>
  );
}

export default App;

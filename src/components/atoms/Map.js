import React, { useEffect } from 'react'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'
import { addressPoints } from '../../data/addressPoints'

export default function Map () {
  useEffect(() => {
    const map = Leaflet.map('map').setView([-37.87, 175.475], 12)

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    const points = addressPoints.map(([lat, long]) => [lat, long])

    Leaflet.heatLayer(points).addTo(map)
  }, [])

  return <section id="map"></section>
}

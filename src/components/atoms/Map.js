import React, { useEffect } from 'react'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'

export default function Map ({ addresses }) {
  useEffect(() => {
    const container = Leaflet.DomUtil.get('map')
    if (container != null) {
      container._leaflet_id = null
    }

    const points = addresses.map(({ latitude, longitude }) => [latitude, longitude])
    const initialView = [-27.59022, -48.543542]
    const map = Leaflet.map('map').setView(initialView, 12)

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    Leaflet.heatLayer(points).addTo(map)
  }, [addresses])

  return <section id="map"></section>
}

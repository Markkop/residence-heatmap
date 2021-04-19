import React from 'react'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      map: null,
      heatLayer: null
    }
  }

  mapAddressesToPoints (addresses) {
    return addresses.reduce((points, { latitude, longitude, residents }) => {
      const point = [latitude, longitude]
      const samePoints = []
      for (let resident = 1; resident <= residents; resident++) {
        samePoints.push(point)
      }
      return [...points, ...samePoints]
    }, [])
  }

  addHeatLayerPointsToMap (points, map) {
    const heatLayer = Leaflet.heatLayer(points)
    heatLayer.addTo(map)
    this.setState({ heatLayer })
  }

  addAttributionLayerToMap (map) {
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    Leaflet.tileLayer(url, { attribution }).addTo(map)
  }

  componentDidMount () {
    const points = this.mapAddressesToPoints(this.props.addresses)
    const initialView = [-27.59022, -48.543542]
    const map = Leaflet.map('map').setView(initialView, 12)
    this.setState({ map })
    this.addAttributionLayerToMap(map)
    this.addHeatLayerPointsToMap(points, map)
  }

  componentDidUpdate (previousProps) {
    const map = this.state.map
    const points = this.mapAddressesToPoints(this.props.addresses)
    const lastPoint = points[points.length - 1]
    if (lastPoint) {
      const currentZoom = map.getZoom()
      map.setView(lastPoint, currentZoom)
    }

    if (previousProps.addresses !== this.props.addresses) {
      this.state.heatLayer.remove()
      this.addHeatLayerPointsToMap(points, map)
    }
  }

  render () {
    return <section id="map"></section>
  }
}

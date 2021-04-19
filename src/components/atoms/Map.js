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
    return addresses.map(({ latitude, longitude }) => [latitude, longitude])
  }

  addHeatLayerPointsToMap (points, map) {
    const heatLayer = Leaflet.heatLayer(points)
    heatLayer.addTo(map)
    this.setState({ heatLayer })
  }

  addAttributionLayerToMap (map) {
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution }).addTo(map)
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

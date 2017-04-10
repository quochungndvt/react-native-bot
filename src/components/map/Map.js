
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 10.768995,
        longitude: 106.692970,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      coordinate: {
        latitude: 10.768995,
        longitude: 106.692970
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this);
  }
  watchID : ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
      this.setState({coordinate: position.coords})
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  render() {
    //10.768995, 106.692970
    const marker = {title: "Current location", description: "Current location"}
    //console.log(this.state.lastPosition,this.state.coordinate,"_____________")
      return (
        <View style={styles.container}>
          <View style ={styles.containerMap}>
            <MapView
              style={styles.map}              
              region={this.state.region}
              onRegionChange={this.onRegionChange}
            >
            <MapView.Marker
              coordinate={this.state.coordinate}
              title={marker.title}
              description={marker.description}
            />
            </MapView>
            
          </View>
          <View style={styles.textContainer}>
              <Text>{JSON.stringify(this.state.region)}</Text>
            </View>
            <View>
            <Text>
              <Text style={styles.title}>Initial position: </Text>
              {this.state.initialPosition}
            </Text>
            <Text>
              <Text style={styles.title}>Current position: </Text>
              {this.state.lastPosition}
            </Text>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
 container: {  
   justifyContent: 'center',
   alignItems: 'center',
   flex: 1,
   flexDirection: 'column'
 },
 containerMap: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
   flex: 1
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 textContainer: {
   flex: 1
 },
  title: {
    fontWeight: '500',
  },
});

export default Map;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, SafeAreaView } from 'react-native';
import Sphere from 'sphere-react-native';

export default function App() {
  Sphere.apiKey = 'CHANGE_THIS_TO_YOUR_OWN_KEY';
  let map;
  let loc = { lon: 100.5, lat: 13.7 };
  let home = Sphere.object('Marker', loc, { detail: 'Home' });

  function onReady() {
    console.log('ready ' + new Date());
    map.call('Overlays.load', Sphere.object('Overlays.Object', 'P00313538'));
  }

  function onOverlayClick(data) {
    if (Sphere.isSameObject(data, home)) {
      console.log('At Home');
    }
    map.call('Overlays.list').then(console.log);
  }

  function onPressTest1() {
    map.call('Overlays.add', home);
    map.objectCall(home, 'pop', true);
    map.call('location', loc);
  }

  async function onPressTest2() {
    let zoom = await map.call('zoom');
    let location = await map.call('location');
    alert(location.lon + '\n' + location.lat + '\n' + zoom);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Sphere.MapView
        ref={r => (map = r)}
        // layer={Sphere.static('Layers', 'STREETS')}
        zoom={15}
        zoomRange={{min: 14, max: 16}}
        location={{lon: 100.5382, lat: 13.7649}}
        // ui={Sphere.static('UiComponent', 'None')}
        lastView={false}
        // language={'en'}
        onReady={onReady}
        onOverlayClick={onOverlayClick}
      />
      <Button
        onPress={onPressTest1}
        title="Home"
      />
      <Button
        onPress={onPressTest2}
        title="Where am I"
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center', // center not working, use stretch (default value)
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

import { createStackNavigator } from '@react-navigation/stack';
import { CameraScreen, LocationScreen, FinishScreen } from '../screens'

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="FinishScreen" component={FinishScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator
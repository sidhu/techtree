import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

import Navigator from "./src/Navigator"

export default function App() {

	const [loaded] = useFonts({
		GentiumBookPlus: require('./assets/GentiumBookPlus.ttf')
	})

	if (!loaded) {
		return null
	}

	return (
		<>
			<StatusBar style="light" />
			<Navigator />
		</>
  	)
}
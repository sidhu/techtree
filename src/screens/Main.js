import React, { useLayoutEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'

import CivData from '../../data/civs.json'
import { Civilizations as CivImages } from '../../data/images'

import styles from '../styling/General'
const { backgroundColor, color1, fontFamily, holder, styledBorderH, text1, textL, textS, rcc, cc } = styles

const civNames = Object.keys(CivData)

const Main = props => {
   
    const { navigation } = props

    useLayoutEffect(() => {
		navigation.setOptions({
			title: 'AOE II Tech Tree',
            headerStyle: {backgroundColor},
            headerTintColor: color1,
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontFamily,
                color: color1
            }
		})
	}, [navigation])

    return (

        <View style={holder}>
            
            <View style={{padding: 16}}>
                <Text style={[text1, textL]}>Civilizations</Text>
                <View style={styledBorderH}></View>
            </View>
            
            <ScrollView>
                <View style={[rcc, {flexWrap: 'wrap'}]}>
                    {civNames.map(name => (
                        <TouchableOpacity 
                            style={cc}
                            onPress={() => {
                                navigation.navigate('Info', {name})
                            }}
                            key={name}
                        >
                            <Image source={CivImages[name]}/>
                            <Text style={[text1, textS, {textTransform: 'capitalize'}]}>{name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default Main
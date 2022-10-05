import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import BuildingsInfo from '../../data/buildings.json'
import UnitsInfo from '../../data/units.json'
import TechnologiesInfo from '../../data/tech.json'
import { Buildings, Units, Technologies, General } from '../../data/images'

import Icon from "react-native-vector-icons/FontAwesome"
import styles from '../styling/General'

const { 
    color1, imgS,
    holder, styledBorderH, 
    text1, text2, textL, textS, 
    r, rcs, rcc,
    p16, ph16, pl8, pb8
} = styles

const Stats = props => {

	const { navigation, route } = props
    const { type, id } = route.params

    let item, imgSrc
    switch (type) {
        case "buildings" :
            item = BuildingsInfo[id]
            imgSrc = Buildings[id]
            break
        case "units" : 
            item = UnitsInfo[id]
            imgSrc = Units[id]
            break
        case "tech" :
            item = TechnologiesInfo[id]
            imgSrc = Technologies[id]
            break
    }
    const { name, info, cost } = item

    const getCost = type => {
        return (
            <View style={[rcc]}>
                <Text style={[text2, textS]}>{cost[type]}</Text>
                { type!= "other" && 
                    <View style={[pl8, {paddingTop: 4}]}><Image style={imgS} source={General[type]}/></View>
                }
            </View>
        )
    }

	return (
		<SafeAreaView style={holder}>
            <View>
                <TouchableOpacity
                    style={{alignSelf: 'flex-end', padding: 24}}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name={"close"} size={24} color={color1}/>
                </TouchableOpacity>
			</View>
            <View style={[rcs, p16]}>
                <View>
                    <Text style={[text1, textL]}>{name}</Text>
                    <View style={styledBorderH}></View>
                </View>
            </View>
            <View style={[pb8, {alignSelf: 'center'}]}> 
                <Image source={imgSrc}/>
            </View>
            <View style={p16}>
                <Text style={[text2, textS]}>{info}</Text>
            </View>
            <View style={ph16}>
                <Text style={[text1, textS]}>Cost</Text>
                <View style={r}>
                    { !!cost.wood && 
                        getCost("wood")
                    }
                    { !!cost.food && 
                        getCost("food")
                    }
                    { !!cost.gold && 
                        getCost("gold")
                    }
                    { !!cost.stone && 
                        getCost("stone")
                    }
                    { !!cost.other && 
                        getCost("other")
                    }
                </View>
            </View>
		</SafeAreaView>
	)
}

export default Stats
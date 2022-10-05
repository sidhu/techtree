import React, { useLayoutEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'

import CivsInfo from '../../data/civs.json'
import { Civilizations, Buildings, Units, Technologies, General } from '../../data/images'

import Icon from "react-native-vector-icons/FontAwesome"
import styles from '../styling/General'

const { 
    backgroundColor, color1, fontFamily, img,
    holder, styledBorderH, styledBorderV, 
    text1, text2, textL, textS, 
    r, cc, rcs,
    ph16, pv8, pt8, pr8, pl8
} = styles

const Info = props => {

    const { navigation, route } = props
    const { name } = route.params

    const [isTree, setIsTree] = useState(false)

    useLayoutEffect(() => {
		navigation.setOptions({
			title: 'AOE II Tech Tree',
            headerStyle: {backgroundColor},
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name={"chevron-left"} size={20} color={color1}/>
                </TouchableOpacity>
            ),
			headerRight: () => (
                <TouchableOpacity onPress={() => setIsTree(!isTree)}>
                    <Icon name={!isTree ? "list" : "align-justify"} size={20} color={color1}/>
                </TouchableOpacity>
            ),
            headerTintColor: color1,
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontFamily,
                color: color1
            }
		})
	}, [navigation, isTree])

    return (

        <View style={holder}>
            
            <View style={[rcs, {padding: 16}]}>
                <View>
                    <Text style={[text1, textL, {textTransform: 'capitalize'}]}>{name}</Text>
                    <View style={styledBorderH}></View>
                </View>
                <View>
                    <Image style={img} source={Civilizations[name]}/>
                </View>
            </View>

            { !isTree && 
                <ScrollView>
                    <View style={[ph16, pt8]}>
                        <Text style={[text1, textS]}>{CivsInfo[name].title}</Text>
                    </View>
                    <View style={[ph16, pv8]}>
                        {CivsInfo[name].advantages.map(a => <Text style={[text2, textS]} key={a}>{a}</Text>)}
                    </View>
                    <View style={[ph16, pv8]}>
                        <Text style={[text1, textS]}>Unique Units</Text>
                        {CivsInfo[name].unique_units.map(a => <Text style={[text2, textS]} key={a}>{a}</Text>)}
                    </View>
                    <View style={[ph16, pv8]}>
                        <Text style={[text1, textS]}>Unique Techs</Text>
                        {CivsInfo[name].unique_techs.map(a => <Text style={[text2, textS]} key={a}>{a}</Text>)}
                    </View>
                    <View style={[ph16, pv8]}>
                        <Text style={[text1, textS]}>Team Bonus</Text>
                        <Text style={[text2, textS]}>{CivsInfo[name].team_bonus}</Text>
                    </View>
                </ScrollView>
            }

            { isTree &&
                <ScrollView>
                    {["dark", "feudal", "castle", "imperial"].map((age, i) => (
                        <AgeInfo name={name} age={age} navigation={navigation} key={i} />
                    ))}
                </ScrollView>
            }

        </View>
    )
}

const getImgSrc = (type, i) => {
    let imgSrc
    switch (type) {
        case "buildings" :
            imgSrc = Buildings[i]
            break
        case "units" : 
            imgSrc = Units[i]
            break
        case "tech" :
            imgSrc = Technologies[i]
            break
    }
    return imgSrc
}

const AgeInfo = props => {
    
    const { name, age, navigation } = props

    const getBuildings = age => {
        let buildX = []
        for (const b in CivsInfo[name].tree[age]) {
            if (b != "build")
                buildX = [...buildX, b]
        }
        return buildX
    }

    const getItemsInfo = (parentBuilding, type) => {
        return (
            CivsInfo[name].tree[age][parentBuilding][type].map(i => (
                <TouchableOpacity 
                    style={pl8}
                    onPress={() => {
                        navigation.navigate('Stats', {
                            type,
                            id: i
                        })
                    }}
                    key={i}
                >
                    <Image style={img} source={getImgSrc(type, i)}/>
                </TouchableOpacity>
            ))
        )
    }

    return (
        <>
            <View style={ph16}>
                
                <View style={[cc, pv8]}>
                    <View style={r}>
                        <View style={pr8}><Image style={img} source={General[`age_${age}`]}/></View>
                        <Text style={[text1, textS]}>{age.charAt(0).toUpperCase() + age.slice(1)} Age</Text>
                    </View>
                </View>

                <View style={styledBorderH}></View>
                
                <ScrollView horizontal style={pt8}>
                    {CivsInfo[name].tree[age].build.map(b => (
                        <View style={pr8} key={b}>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Stats', {
                                    type: "buildings",
                                    id: b
                                })}
                            >
                                <Image style={img} source={Buildings[b]}/>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <View style={styledBorderH}></View>
                
                {getBuildings(age).map(b => (
                    <View style={[r, pt8]} key={b}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Stats', {
                                type: "buildings",
                                id: b
                            })}
                        >
                            <Image style={img} source={Buildings[b]}/>
                        </TouchableOpacity>
                        <View style={styledBorderV}></View>
                        <ScrollView horizontal>
                            { !!CivsInfo[name].tree[age][b].buildings &&
                                getItemsInfo(b, "buildings")
                            }
                            { !!CivsInfo[name].tree[age][b].units &&
                                getItemsInfo(b, "units")
                            }
                            { !!CivsInfo[name].tree[age][b].tech &&
                                getItemsInfo(b, "tech")
                            }
                        </ScrollView>
                    </View>
                ))}

                <View style={[styledBorderH, {marginBottom: 16}]}></View>
                
            </View>
        </>
    )
}

export default Info
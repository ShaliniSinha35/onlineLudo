import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, LogBox, ImageBackground } from 'react-native';
import { colors } from '../../util/Colors';
import { HOME } from '../../util/Constants';
import RedGoti from '../Goti/RedGoti';
import BlueGoti from '../Goti/BlueGoti';
import YellowGoti from '../Goti/YellowGoti';
import GreenGoti from '../Goti/GreenGoti';
import ReadyRed from '../../../components/Svg/ReadyRed';
import ReadyGreen from '../../../components/Svg/ReadyGreen';
import ReadyYellow from '../../../components/Svg/ReadyYellow';
import ReadyBlue from '../../../components/Svg/ReadyBlue';
import { Entypo } from '@expo/vector-icons';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import BlinkView from 'react-native-blink-view'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
export default PlayerBox = ({ color, customStyle, lifeline, one, two, three, four, onPieceSelection, animateForSelection, playerName, playerScore, timer, diceNumber, isRolling }) => {


    {
        // console.log("timer", timer)
    }
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [backgroundColor, setBackgroundColor] = React.useState(color);
    const [intervalId, setIntervalId] = React.useState(undefined);
    const [totalScore, setScore] = useState(0)
    const [oneScore, setOneScore] = useState(0)
    const [twoScore, setTwoScore] = useState(0)
    const [threeScore, setThreeScore] = useState(0)
    const [fourScore, setFourScore] = useState(0)

    const [isBlinking, setBlinking] = useState(true)

    const [showTimer, setShowTimer] = useState(true)

    useEffect(() => {
        let sum = 0
        let onePoint = 0
        let twoPoint = 0
        let threePoint = 0
        let fourPoint = 0
        // for (let i = 0; i < playerScore.length; i++) {

        //     sum = playerScore[i] + sum

        // }
        for (let i = 0; i < one.oneCount.length; i++) {
            onePoint = one.oneCount[i] + onePoint
        }
        for (let i = 0; i < two.twoCount.length; i++) {
            twoPoint = two.twoCount[i] + twoPoint
        }
        for (let i = 0; i < three.threeCount.length; i++) {
            threePoint = three.threeCount[i] + threePoint
        }
        for (let i = 0; i < four.fourCount.length; i++) {
            fourPoint = four.fourCount[i] + fourPoint
        }

        sum = onePoint + twoPoint + threePoint + fourPoint
        // console.log("sum", sum)
        // console.log(onePoint, "onepoint", twoPoint, "twoPoint", threePoint, "threePoint", fourPoint, "fourPoint")
        setScore(sum)
        setOneScore(onePoint)
        setTwoScore(twoPoint)
        setThreeScore(threePoint)
        setFourScore(fourPoint)
        storeData(sum)


    })


    const storeData = async (total) => {

        if (color == "#ec1d27") {
            try {
                await AsyncStorage.setItem('red', JSON.stringify(total));
                // console.log("red", total)
            } catch (error) {
                console.log("error", error)
                // Error saving data
            }
        }
        if (color == "#01A147") {
            try {
                await AsyncStorage.setItem('green', JSON.stringify(total));
                // console.log("green", total)
            } catch (error) {
                // Error saving data
                console.log("error", error)
            }
        }
        if (color == "#29b6f6") {
            try {
                await AsyncStorage.setItem('blue', JSON.stringify(total));
                // console.log("blue", total)
            } catch (error) {
                // Error saving data
                console.log("error", error)
            }
        }
        if (color == "#ffe01b") {
            try {
                await AsyncStorage.setItem('yellow', JSON.stringify(total));
                // console.log("yellow", total)
            } catch (error) {
                // Error saving data
                console.log("error", error)
            }
        }

    };



    const renderDiceIcons = () => {


        if (diceNumber === 1) {
            return <FontAwesome5 name="dice-one" size={30} color="#fdfffc" />;
        } else if (diceNumber === 2) {
            return <FontAwesome5 name="dice-two" size={30} color="#fdfffc" />;
        } else if (diceNumber === 3) {
            return <FontAwesome5 name="dice-three" size={30} color="#fdfffc" />;
        } else if (diceNumber === 4) {
            return <FontAwesome5 name="dice-four" size={30} color="#fdfffc" />;
        } else if (diceNumber === 5) {
            return <FontAwesome5 name="dice-five" size={30} color="#fdfffc" />;
        } else if (diceNumber === 6) {
            return <FontAwesome5 name="dice-six" size={30} color="#fdfffc" />;
        }


        return null; // Return null if the diceValue is not 1-6
    }

    const defaultDiceIcons = () => {
        return <FontAwesome5 name="dice-one" size={30} color="white" />;

    }


    let shouldRenderBackgroundColor = 1;
    const applyAnimationIfNeeded = () => {
        if (animateForSelection) {
            if (!isAnimating) {
                setIsAnimating(true);
                setIntervalId(setInterval(() => {
                    shouldRenderBackgroundColor++;
                    shouldRenderBackgroundColor % 2 == 0 ? setBackgroundColor(color) : setBackgroundColor(color);
                }, 400));
            }
        } else {
            clearInterval(intervalId);
            if (isAnimating) {
                setIsAnimating(false);
                setBackgroundColor(color);
            }
        }

    }
    const renderPiece = (piece) => {
        if (piece.position == HOME) {

            return (
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { onPieceSelection(piece) }}>
                    {/* <View style={[styles.circle, { backgroundColor: color, borderRadius: 20 }]}>

                     


                        {console.log(isAnimating)}


                        { playerName !== "" ? backgroundColor == "#ec1d27"  ? isAnimating ? <ReadyRed></ReadyRed> : <RedGoti></RedGoti> : null:null}

                       
                        {playerName !== "" ?backgroundColor == "#01A147"  ? isAnimating ? <ReadyGreen></ReadyGreen> : <GreenGoti></GreenGoti> : null : null}
                        {playerName !== "" ? backgroundColor == "#ffe01b" ? isAnimating ? <ReadyYellow></ReadyYellow> : <YellowGoti></YellowGoti> : null:null}
                        {playerName !== "" ?backgroundColor == "#29b6f6" ? isAnimating ? <ReadyBlue></ReadyBlue> : <BlueGoti></BlueGoti> : null:null}
                    </View> */}
                </TouchableOpacity>



            );
        }
        return (
            <TouchableOpacity style={{ flex: 1 }}>
                {/* <View style={[styles.circle, { backgroundColor: backgroundColor, borderRadius: 20 }]}>

                </View> */}
            </TouchableOpacity>
        );
    }
    applyAnimationIfNeeded();
    return (


        <View style={[{ backgroundColor: color, flex: 4, borderRadius: 20 }]}>



            <LinearGradient colors={color == "#ec1d27" ? ['#ec1d27', '#c1121f', '#9d0208'] : color == "#ffe01b" ? ['#ffe01b', '#ffd500', '#ffbd00'] : color == "#01A147" ? ['#01A147', '#27a300', '#005e0c'] : color == "#29b6f6" ? ['#29b6f6', '#00a6fb', '#0582ca'] : ['#4c669f', '#3b5998', '#192f6a']} style={[styles.innerContainer, {}]}>


                {
                    playerName &&

                    <>


                        <View style={{ alignItems: "flex-end", padding: 10, flex: 1 }}>


                            {
                                timer ?

                                    <>

                                        <CountdownCircleTimer
                                            isPlaying
                                            duration={15}
                                            // colors={[color == '#ec1d27' ? "#780000" : color == '#29b6f6' ? '#0582ca' : color == '#01A147' ? '#004b23' : color == '#ffe01b' ? '#fdc500' : null]}

                                            colors={['#008000', '#F7B801', '#A30000', '#A30000']}
                                            // colors={color == '#ec1d27'?['#780000', '#780000']: color == '#29b6f6'?['#0582ca', '#0582ca']: color == '#01A147'?['#004b23', '#004b23']:color == '#ffe01b'?['#fdc500', '#fdc500']:null }
                                            colorsTime={[7, 5, 2, 0]}
                                            size={45}
                                            strokeWidth={3}
                                            strokeLinecap='square'

                                        >
                                            {({ remainingTime }) =>

                                                <Text allowFontScaling={false} style={{ color: "white" }}>{renderDiceIcons()}</Text>}

                                        </CountdownCircleTimer>
                                    </>
                                    :

                                    <View style={{ opacity: 0.5 }}>
                                        <CountdownCircleTimer
                                            isPlaying
                                            duration={0}
                                            // colors={[color == '#ec1d27' ? "#780000" : color == '#29b6f6' ? '#0582ca' : color == '#01A147' ? '#004b23' : color == '#ffe01b' ? '#fdc500' : null]}

                                            colors={['#008000', '#F7B801', '#A30000', '#A30000']}
                                            // colors={color == '#ec1d27'?['#780000', '#780000']: color == '#29b6f6'?['#0582ca', '#0582ca']: color == '#01A147'?['#004b23', '#004b23']:color == '#ffe01b'?['#fdc500', '#fdc500']:null }
                                            colorsTime={[7, 5, 2, 0]}
                                            size={45}
                                            strokeWidth={3}
                                            strokeLinecap='square'


                                        >
                                            {({ remainingTime }) =>

                                                <Text style={{ color: "white" }}>{defaultDiceIcons()}</Text>}

                                        </CountdownCircleTimer>
                                    </View>


                            }



                        </View>

                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>


                            {
                                timer ?
                                    <>
                                        <Image style={{ position: "absolute", opacity: 0.2, height: 90, width: 110,top:-40, left:-10 }} source={require("../../../assets/gif1.gif")} ></Image>


                                        <Image source={require("../../../assets/player2.png")} style={{ height: 80, width: 90, resizeMode: "contain" }}></Image>
                                    </>
                                 
                                    : <Image source={require("../../../assets/player2.png")} style={{ height: 80, width: 95, resizeMode: "contain" }}></Image>

                            }

                            <View style={{}}>
                                <Text allowFontScaling={false} style={{ fontSize: 18, color: "white", textAlign: "center" }}>Score</Text>
                                <Text allowFontScaling={false} style={{ fontSize: 30, color: "white", textAlign: "center", fontWeight: 500 }}>{totalScore}</Text>
                            </View>

                        </View>


                        <View style={{ backgroundColor: color == '#ec1d27' ? "#780000" : color == '#29b6f6' ? '#0582ca' : color == '#01A147' ? '#004b23' : color == '#ffe01b' ? '#faa307' : null, flexDirection: "row", borderTopLeftRadius: 5, borderTopRightRadius: 5, justifyContent: "space-between", alignItems: "center" }}>
                            <Text allowFontScaling={false} style={{ color: "white", fontSize: 10, margin: 4 }}>+91{playerName}</Text>
                            <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "center" }}>

                                {
                                    lifeline == 3 ? <>
                                        <Entypo name="heart" size={15} color="white" />
                                        <Entypo name="heart" size={15} color="white" />
                                        <Entypo name="heart" size={15} color="white" />
                                    </> : lifeline == 2 ? <>
                                        <Entypo name="heart" size={15} color="white" />
                                        <Entypo name="heart" size={15} color="white" />
                                        <Entypo name="heart-outlined" size={15} color="white" />
                                    </> :

                                        lifeline == 1 ? <>
                                            <Entypo name="heart" size={15} color="white" />
                                            <Entypo name="heart-outlined" size={15} color="white" />
                                            <Entypo name="heart-outlined" size={15} color="white" />
                                        </> : null

                                }


                            </View>
                        </View>


                    


                   </>
                }

            </LinearGradient>


            {/* {
                    playerName &&
                    <>

                        <View style={{ flex: 1, padding: 8 }}>

                            {
                                timer ?
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={15}
                                    // colors={[color == '#ec1d27' ? "#780000" : color == '#29b6f6' ? '#0582ca' : color == '#01A147' ? '#004b23' : color == '#ffe01b' ? '#fdc500' : null]}

                                    colors={['#008000', '#F7B801', '#A30000', '#A30000']}
                                    // colors={color == '#ec1d27'?['#780000', '#780000']: color == '#29b6f6'?['#0582ca', '#0582ca']: color == '#01A147'?['#004b23', '#004b23']:color == '#ffe01b'?['#fdc500', '#fdc500']:null }
                                    colorsTime={[7, 5, 2, 0]}
                                    size={45}
                                    strokeWidth={3}
                                    strokeLinecap='square'

                                >
                                    {({ remainingTime }) =>

                                        <Text style={{ color: "white" }}>{renderDiceIcons()}</Text>}

                                </CountdownCircleTimer>
                                :
                                <CountdownCircleTimer
                                isPlaying
                                duration={0}
                                // colors={[color == '#ec1d27' ? "#780000" : color == '#29b6f6' ? '#0582ca' : color == '#01A147' ? '#004b23' : color == '#ffe01b' ? '#fdc500' : null]}

                                colors={['#008000', '#F7B801', '#A30000', '#A30000']}
                                // colors={color == '#ec1d27'?['#780000', '#780000']: color == '#29b6f6'?['#0582ca', '#0582ca']: color == '#01A147'?['#004b23', '#004b23']:color == '#ffe01b'?['#fdc500', '#fdc500']:null }
                                colorsTime={[7, 5, 2, 0]}
                                size={45}
                                strokeWidth={3}
                                strokeLinecap='square'

                            >
                                {({ remainingTime }) =>

                                    <Text style={{ color: "white" }}>{defaultDiceIcons()}</Text>}

                            </CountdownCircleTimer>
                            }



                        </View>

                        <View style={{ flex: 1, position: "absolute", top: 10, right: 10 }}>
                            <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>Score</Text>
                            <Text style={{ fontSize: 30, color: "white", textAlign: "center" }}>{totalScore}</Text>
                        </View>

                        <View style={{ flex: 3, alignItems: "flex-start", marginTop: 25 }}>

                            
                            {
                                timer ?    <BlinkView style={{ flex: 1,width:"100%",flexDirection:"row"  }} blinking={isBlinking ? true : false} delay={200}>
                                    <Image source={require("../../../assets/user2.png")} style={{ height: 90, width: 95, resizeMode: "contain" }}></Image>


                                </View> :
                                    <View style={{ flex: 1,width:"100%",flexDirection:"row"  }} blinking={isBlinking ? true : false} delay={200}>
                                        <Image source={require("../../../assets/user2.png")} style={{ height: 90, width: 95, resizeMode: "contain" }}></Image>
                                        <Text style={{color:"white",marginTop:20}}>{playerName}</Text>
                                    </View>
                              
                            }
                        </View>

                        <View style={{ flex: 1, height: 5, backgroundColor: color == '#ec1d27' ? "#780000" : color == '#29b6f6' ? '#0582ca' : color == '#01A147' ? '#004b23' : color == '#ffe01b' ? '#faa307' : null, flexDirection: "row", borderTopLeftRadius: 5, borderTopRightRadius: 5, justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 10, margin: 4 }}>+91 99***999</Text>
                            <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "center" }}>

                                {
                                    lifeline == 3 ? <>
                                        <Entypo name="heart" size={15} color="white" />
                                        <Entypo name="heart" size={15} color="white" />
                                        <Entypo name="heart" size={15} color="white" />
                                    </> : lifeline == 2 ? <>
                                        <Entypo name="heart" size={15} color="white" />
                                        <Entypo name="heart" size={15} color="white" />
                                        <Entypo name="heart-outlined" size={15} color="white" />
                                    </> :

                                        lifeline == 1 ? <>
                                            <Entypo name="heart" size={15} color="white" />
                                            <Entypo name="heart-outlined" size={15} color="white" />
                                            <Entypo name="heart-outlined" size={15} color="white" />
                                        </> : null

                                }

                            
                            </View>
                        </View>
                    </>
                } */}

        </View>
    )
}



const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 0
        // margin: 30,
        // borderRadius:20
    },
    piecesContainer: {
        flexDirection: 'row',
        flex: 1
    },
    pieceStyle: {
        flex: 1,
        margin: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#000"
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 14,
        backgroundColor: '#ec1d27', // Change the color as needed
        position: 'absolute',
        top: 15,
        left: 10,
        // marginTop: 1,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
})


{/* <View style={[styles.piecesContainer]}>

                    {renderPiece(one)}
                    {renderPiece(two)}

                </View>
                <View style={styles.piecesContainer}>
                    {renderPiece(three)}
                    {renderPiece(four)}
                </View> */}

{/* {
                color == "#ec1d27"  &&
                 <> 

                  <View style={{flex:3, alignItems:"flex-start"}}>
                <Image source={require("../../../assets/user2.png")} style={{height:68, width:70, resizeMode:"contain", elevation:5}}></Image>
                </View>
                <View style={{flex:1, height:5, borderColor:"white", borderWidth:1,borderRadius:8, backgroundColor:"#780000"}}>

                </View></>
              
             } */}

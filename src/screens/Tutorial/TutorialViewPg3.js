import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  SectionList,
  Button,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";
import axios from "axios";
import { SERVER_URL } from "../../components/ServerAddress";
import { UserContext } from "../../components/UserProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TutorialViewPg3({ navigation }) {
  const [dbdata, setDbData] = useState([]);
  const { userDataP, setUserDataP } = useContext(UserContext);
  const [styleChange, setStyleChange] = useState([]);
  const [fontLoaded, setFontLoaded] = useState(false);
  const dbControl = (pgname) => {
    const userPlusChange = {
      user_id: userDataP.id,
      user_checkData: styleChange,
    };
    axios
      .post(`${SERVER_URL}/user_T3/insert`, userPlusChange)
      .then((response) => {
        navigation.navigate(pgname);
      })
      .catch((error) => {
        console.error("잘못됐어요 ? : ", error);
      });
  };

  console.log(styleChange);
  const nextBtn = () => {
    dbControl("TVP4");
  };

  const backBtn = () => {
    dbControl("TVP3");
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/ch3`)
      .then((response) => {
        //console.log(response.data);
        const dbdata = response.data;
        setDbData(dbdata);
        setStyleChange(dbdata.map((item) => item.value));
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      });
  }, []); // DB 불러오기

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/user_T3/select`, {
        user_id: userDataP ? userDataP.id : null,
      })
      .then((response) => {
        const userdata = response.data.map((item) => item.user_checkData);
        if (userdata.length > 0) {
          setStyleChange(userdata);
        }
      });
  }, [userDataP]);

  useEffect(() => {
    const checkItemData = async () => {
      try {
        const savedStyleChange = await AsyncStorage.getItem("styleChangePg3");
        if (savedStyleChange !== null) {
          setStyleChange(JSON.parse(savedStyleChange));
        }
      } catch (error) {
        console.error("로컬 데이터 불러오기 오류:", error);
      }
    };

    checkItemData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          "styleChangePg3",
          JSON.stringify(styleChange)
        );
      } catch (error) {
        console.error("로컬 데이터 저장 오류:", error);
      }
    };
    saveData();
  }, [styleChange]);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        M: require("../../../assets/fonts/AppleSDGothicNeoM.ttf"),
        B: require("../../../assets/fonts/AppleSDGothicNeoB.ttf"),
        SB: require("../../../assets/fonts/AppleSDGothicNeoSB.ttf"),
        R: require("../../../assets/fonts/AppleSDGothicNeoR.ttf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // or render a loading indicator
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "white",
          paddingTop: 70,
          marginBottom: 1,
          shadowColor: "rgba(180,180,180,0.4)",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 10,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleCancel}>
            <Image
              style={{
                width: 20,
                height: 20,
                marginTop: 7,
                marginLeft: 14,
                marginBottom: 20,
              }}
              source={require("../../../assets/images/arrowLeft.png")}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "M",
              marginTop: 4,
              marginLeft: 15,
            }}
          >
            전세 계약 튜토리얼
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ margin: 15, marginTop: 20, marginBottom: 0 }}>
          <View
            style={{
              backgroundColor: "rgba(45,75,145,1.0)",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              width: "18%",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "SB",
                color: "white",
                fontSize: 15,
              }}
            >
              STEP 3
            </Text>
          </View>
        </View>
        <View style={{ margin: 15, marginBottom: 10, marginTop: 5 }}>
          <Text
            style={{
              fontFamily: "B",
              fontSize: 20,
            }}
          >
            매물 방문하기
          </Text>
        </View>

        <View style={{ width: "80%" }}>
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontFamily: "M",
              margin: 5,
              marginLeft: 15,
            }}
          >
            매물을 공인중개사와 함께 방문해서 내부, 외부를 직접 살펴보는
            시간이에요.
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontFamily: "M",
              margin: 5,
              marginLeft: 15,
            }}
          >
            매물의 사진을 찍어서 기록하세요!
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontFamily: "M",
              margin: 5,
              marginLeft: 15,
            }}
          >
            방문하는 매물의 호수까지 주소를 적어오세요!
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            marginRight: 10,
            marginLeft: 10,
            height: 1,
            backgroundColor: "rgba(237,237,237,1.0)",
          }}
        ></View>

        {[...new Set(dbdata.map((data) => data.title))].map(
          (title, index) =>
            title && (
              <View
                key={index}
                style={{
                  backgroundColor: "white",
                  margin: 15,
                  marginTop: 20,
                  marginBottom: title === "집 주변 Check List" ? 150 : -5,
                  borderRadius: 5,
                  shadowColor: "rgba(45, 75, 142,0.3)",
                  shadowOffset: {
                    width: 1,
                    height: 0,
                  },
                  shadowOpacity: 5,
                  shadowRadius: 3,
                  elevation: 5,
                }}
              >
                <View style={{ margin: 20, marginBottom: 28 }}>
                  <Text
                    style={{
                      fontFamily: "SB",
                      fontSize: 20,
                    }}
                  >
                    {title}
                  </Text>
                  <View
                    style={{
                      height: 0.9,
                      backgroundColor: "rgba(238,238,238,1.0)",
                      marginTop: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      marginTop: 20,
                      marginRight: 20,
                      marginBottom: -20,
                    }}
                  >
                    {dbdata
                      .filter((data) => data.title.includes(title))
                      .map((data, idx) => (
                        <TouchableOpacity
                          key={idx}
                          onPress={() => {
                            setStyleChange((prevState) => {
                              // 아이콘을 누른 데이터가 이미 styleChange에 있는 경우 제거
                              if (prevState.includes(data.value)) {
                                return prevState.filter(
                                  (item) => item !== data.value
                                );
                              } else {
                                return [...prevState, data.value];
                              }
                            });
                          }}
                          style={{ flexDirection: "row", paddingBottom: 20 }}
                        >
                          <Icon
                            name={
                              styleChange.includes(data.value)
                                ? "check-box-outline-blank"
                                : "check-box"
                            }
                            size={18}
                            color={
                              styleChange.includes(data.value)
                                ? "gray"
                                : "#2D4B8E"
                            }
                            style={{ marginTop: 3, marginRight: 5 }}
                          />

                          <Text
                            style={{
                              marginTop: 1,
                              fontSize: 17,
                              fontFamily: "M",
                            }}
                          >
                            {data.value}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    {/* {checkListAdd == true && (
                      <View>
                        <TextInput
                          style={{ padding: 10 }}
                          placeholder="내용 입력"
                          onChangeText={(text) => setInputCheckList(text)}
                          value={inputCheckList} //이거 하고 나서 초기화 시켜야함
                          returnKeyType="done"
                          onSubmitEditing={onSubmit}
                        ></TextInput>
                      </View>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        setCheckListAdd((prev) => !prev);
                      }}
                    >
                      <Text style={{ color: "#2D4B8E" }}>
                        + Check List 추가하기
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            )
        )}
        <View
          style={{
            position: "absolute",
            padding: 10,
            bottom: 50,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "45%",
              marginRight: 14,
              height: 55,
              padding: 15,
              backgroundColor: "#DEDEDE",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              backBtn();
            }}
          >
            <Text
              style={{
                color: "rgba(112,112,112,1.0)",
                fontSize: 20,
                fontFamily: "B",
              }}
            >
              이전
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "45%",
              height: 55,
              marginLeft: 14,
              padding: 15,
              backgroundColor: "#2D4B8E",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              nextBtn();
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "B", color: "white" }}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default TutorialViewPg3;

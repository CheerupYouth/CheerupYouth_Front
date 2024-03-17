import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  SectionList,
  TouchableWithoutFeedback,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import LawWordListData from "../components/LawWordListData";
import * as S from "../../style/LawWordListStyle";

const LawListSearch = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [expandedItem, setExpandedItem] = useState("");
  const [expandedIcon, setExpandedIcon] = useState({});
  handleCancel = () => {
    navigation.goBack();
  };
  const storeIconState = async (value) => {
    try {
      await AsyncStorage.setItem("@iconState", JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };
  const loadIconState = async () => {
    try {
      const value = await AsyncStorage.getItem("@iconState");
      if (value !== null) {
        setExpandedIcon(JSON.parse(value));
      }
    } catch (e) {
      // loading error
    }
  };
  const filteredData = search
    ? LawWordListData.map((section) => {
        const filteredSection = {
          ...section,
          data: section.data.filter((item) =>
            item.name
              .normalize("NFD")
              .toLowerCase()
              .includes(search.normalize("NFD").toLowerCase())
          ),
        };
        if (filteredSection.data.length > 0) {
          return filteredSection;
        }
        return null;
      }).filter((section) => section !== null)
    : [];

  return (
    <S.SearchPage>
      <S.SearchbarContainer>
        <Searchbar
          theme={{ colors: { primary: "rgba(45,75,142,1.0)" } }}
          style={styles.searchbar}
          placeholder="검색어를 입력하세요."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <TouchableOpacity onPress={handleCancel}>
          <S.CancelBtn>cancel</S.CancelBtn>
        </TouchableOpacity>
      </S.SearchbarContainer>

      {search ? (
        <S.SearchContainer>
          <SectionList
            sections={filteredData}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setExpandedItem(
                      item.name === expandedItem ? null : item.name
                    );
                  }}
                >
                  <S.ItemContainer>
                    <View>
                      <Text
                        style={
                          expandedItem === item.name
                            ? styles.expandedItem
                            : styles.item
                        }
                      >
                        {item.name}
                      </Text>
                      {expandedItem === item.name && (
                        <Text style={styles.listvalue}>{item.value}</Text>
                      )}
                    </View>
                    <Icon
                      name={
                        expandedItem === item.name
                          ? "expand-less"
                          : "expand-more"
                      }
                      size={25}
                      color={"rgba(45,75,142,1.0)"}
                    />
                  </S.ItemContainer>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => `basicListEntry-${item.name}`}
          />
        </S.SearchContainer>
      ) : (
        <View>
          <S.SearchCurrent>자주 검색하는 단어</S.SearchCurrent>
          <S.SearchItem>
            <S.CurrentItem onPress={() => setSearch("임차인")}>
              <Text style={{ color: "white" }}>임차인</Text>
            </S.CurrentItem>
            <S.CurrentItem onPress={() => setSearch("중도금")}>
              <Text style={{ color: "white" }}>중도금</Text>
            </S.CurrentItem>
            <S.CurrentItem onPress={() => setSearch("확정일자")}>
              <Text style={{ color: "white" }}>확정일자</Text>
            </S.CurrentItem>
            <S.CurrentItem onPress={() => setSearch("가계약")}>
              <Text style={{ color: "white" }}>가계약</Text>
            </S.CurrentItem>
          </S.SearchItem>
        </View>
      )}
    </S.SearchPage>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    flex: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(247,247,247,1.0)",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30,
  },

  item: {
    marginTop: 5,
    padding: 10,
    fontSize: 18,
    height: 44,
    width: 330,
    marginLeft: 10,
  },
  expandedItem: {
    padding: 10,
    fontSize: 18,
    height: 33,
    width: 330,
    marginLeft: 10,
  },
  listvalue: {
    margin: 10,
    color: "black",
    fontSize: 15,
    marginLeft: 18,
    width: 300,
  },
  searchIcon: {
    margin: 10,
    alignItems: "flex-end",
  },
  icon: {
    width: 40,
    marginLeft: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    marginTop: 10,
    borderRadius: 20,

    backgroundColor: "rgba(45,75,142,0.2)",
  },
});

LawListSearch.navigationOptions = {
  headerShown: false,
};

export default LawListSearch;

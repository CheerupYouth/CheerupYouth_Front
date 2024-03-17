import React, { useState, useEffect } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LawWordListData from "../components/LawWordListData";
import { useNavigation } from "@react-navigation/native";
import * as S from "../../style/LawWordListStyle";
//import Component from "react-native-paper/lib/typescript/components/List/ListItem";

const LawWordList = () => {
  const [expandedItem, setExpandedItem] = useState("");
  const navigation = useNavigation();

  return (
    <S.Page>
      <S.SearchIcon>
        <Icon
          name="search"
          size={25}
          color={"rgba(45,75,142,1.0)"}
          onPress={() => navigation.navigate("LawListSearch")}
        />
      </S.SearchIcon>
      <SectionList
        sections={LawWordListData}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                setExpandedItem(item.name === expandedItem ? null : item.name);
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

                  {expandedItem === item.name && <Item>{item.value}</Item>}
                </View>
                <Icon
                  name={
                    expandedItem === item.name ? "expand-less" : "expand-more"
                  }
                  size={25}
                  color={"rgba(45,75,142,1.0)"}
                />
              </S.ItemContainer>
            </TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <S.SectionView>
            <S.SectionHeader>{section.title}</S.SectionHeader>
          </S.SectionView>
        )}
        keyExtractor={(item) => `basicListEntry-${item.name}`}
      />
    </S.Page>
  );
};

const styles = StyleSheet.create({
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
});
export default LawWordList;

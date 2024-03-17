import styled from "styled-components";

export const Page = styled.SafeAreaView`
  flex: 1;
  margintop: 1;
  backgroundcolor: "rgba(242,243,248,1.0)";
`;

export const SearchIcon = styled.View`
  margin: 10px;
  align-items: flex-end;
`;

export const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  background-color: rgba(45, 75, 142, 0.2);
`;

export const Item = styled.Text`
  margin: 10px;
  color: black;
  font-size: 15px;
  margin-left: 18px;
  width: 300px;
`;

export const SectionView = styled.View`
  border-radius: 12px;
  margin: 4px;
`;

export const SectionHeader = styled.Text`
  padding-top: 2px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 2px;
  margin: 4px;
  font-size: 18px;
  font-weight: bold;
  color: black;
`;
export const SearchPage = styled.View`
  flex: 1;
  margin-top: 1px;
`;

export const SearchbarContainer = styled.View`
  flex-direction: row;
  background-color: white;
  padding-top: 70px;
  padding-bottom: 10px;
`;

export const CancelBtn = styled.Text`
  flex-direction: row;
  padding: 15px;
  align-items: center;
  margin-right: 10px;
  font-size: 18px;
`;

export const SearchContainer = styled.SafeAreaView`
  flex: 1;
  margin-top: 1px;
  background-color: white;
`;

export const SearchCurrent = styled.Text`
  margin-top: 5px;
  padding-top: 17px;
  padding-left: 17px;
  font-weight: bold;
  font-size: 18px;
  background-color: white;
`;

export const SearchItem = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
  background-color: white;
  padding-bottom: 10px;
`;

export const CurrentItem = styled.TouchableOpacity`
  align-items: center;
  margin: 15px;
  margin-top: 30px;
  padding: 17px;
  background-color: rgba(45, 75, 142, 0.9);
  border-radius: 30px;
  color: white;
`;

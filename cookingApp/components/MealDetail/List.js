import { StyleSheet, Text, View } from "react-native";

const List = ({ data }) => {
  return data.map((data, idx) => (
    <View style={styles.listItem} key={`${data}-${idx}`}>
      <Text style={styles.itemText}>{data}</Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});

export default List;

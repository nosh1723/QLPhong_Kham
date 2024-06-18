import * as React from "react";
import { SearchBar } from "@rneui/base";
import { IconSearch } from "../Icon/Icon";

export default function InputSearch ({
  placeHolder = "Tìm kiếm... ",
  icon = <IconSearch color="#888"/>,
  value = "",
  onChange = () => {},
  inputStyle = {},
  style = {}
}) {
  return (
    <SearchBar
      platform="default"
      containerStyle={{ width: "100%", backgroundColor: "transparent", borderWidth: 0, borderBlockColor: "transparent", paddingVertical: 5, ...style,}}
      inputContainerStyle={{...inputStyle, width: "100%", backgroundColor: "#fff", borderRadius: 50, paddingHorizontal: 10, paddingVertical: 1}}
      inputStyle={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      loadingProps={{}}
      onChangeText={onChange}
      searchIcon={icon}
      // onClearText={() => console.log(onClearText())}
      placeholder={placeHolder}
      placeholderTextColor="#888"
      // cancelButtonTitle="Cancel"
      // cancelButtonProps={{}}
      // onCancel={() => console.log(onCancel())}
      value={value}
      numberOfLines={1}
    />
  );
}


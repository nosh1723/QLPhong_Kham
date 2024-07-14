import * as React from "react";
import { Button } from "@rneui/base";
import { colors } from "../constants/Colors";


export default ({
    color = "#006778",
    title = "",
    style = {},
    titleStyle = {},
    onPress = () => {},
    icon = <></>,
    disabled = false,
    ...props
}) => {
  return (
    <Button
      buttonStyle={{ width: "auto", backgroundColor: color, borderRadius: 8, ...style }}
      // containerStyle={{ margin: 5 }}
      disabledStyle={{
        borderColor: colors.gray,
        backgroundColor: colors.bgGray
      }}
      disabledTitleStyle={{ color: "#fff" }}
      icon={icon}
    //   iconContainerStyle={{ marginRight: 2 }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={onPress}
      title={title}
      disabled={disabled}
      titleStyle={{...titleStyle, marginHorizontal: 5, fontWeight: 500, fontSize: 16 }}
      {...props}
    />
  );
}

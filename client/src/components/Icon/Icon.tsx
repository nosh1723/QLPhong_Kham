import { FontAwesome5, Ionicons } from "@expo/vector-icons"
import { Icon } from "@rneui/themed"

export const IconHome = ({color = "#006778", size = 23, ...props}) => (<Icon name='home' color={color} size={size} {...props}/>)

export const IconCalendar = ({color = "#006778", size = 23, ...props}) => <Icon name='calendar' size={size} type='antdesign' color={color} {...props}/>

export const IconMessage = ({color = "#006778", size = 23, ...props}) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />

export const IconUser = ({color = "#006778", size = 23, ...props}) => <Icon name='user' size={size} type='antdesign' color={color} {...props}/>

export const IconSearch = ({color = "#006778", size = 23, ...props}) => <Icon name='search1' size={size} type='antdesign' color={color} {...props}/>

export const IconStethoscope = ({color = "#006778", size = 23, ...props}) => <Icon name='stethoscope' size={size} type='fontisto' color={color} {...props}/>

export const IconList = ({color = "#006778", size = 23, ...props}) => <Icon name='list' size={size} type='Feather' color={color} {...props}/>

export const IconMediBag = ({color = "#006778", size = 23, ...props}) => <FontAwesome5 name="briefcase-medical" size={24} color={color} />

export const IconSetting = ({color = "#006778", size = 23, ...props}) => <Ionicons name="settings-sharp" size={24} color={color} />

export const IconDrug = ({color = "#006778", size = 23, ...props}) => <Icon name='healing' size={size} type='MaterialIcons' color={color} {...props}/>

export const IconRight = ({color = "#006778", size = 23, ...props}) => <Icon name='chevron-right' size={size} type='Entypo' color={color} {...props}/>

export const IconLeft = ({color = "#006778", size = 23, ...props}) => <Icon name='chevron-left' size={size} type='Entypo' color={color} {...props}/>
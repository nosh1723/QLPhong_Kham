import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/Home';
import { IconCalendar, IconHome, IconMessage, IconUser } from '../components/Icon/Icon';
import { Header } from '@rneui/base';
import HomeHeader from '../views/Home/HomeHeader';
import { colors } from '../constants/Colors';
import ScheduleExamIndex from '../views/ScheduleExam';
import Message from '../views/Message';
import User from '../views/User';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarIcon: (props) => <IconHome color={props.color}/>, tabBarIconStyle: {marginBottom: -10}, tabBarLabelStyle: {marginBottom: 5}, tabBarActiveTintColor: colors.green, tabBarLabel: "Trang chủ" }} />
      <Tab.Screen name="ScheduleExam" component={ScheduleExamIndex} options={{headerShown: false, tabBarIcon: (props) => <IconCalendar size={20} color={props.color}/>, tabBarIconStyle: {marginBottom: -10}, tabBarLabelStyle: {marginBottom: 5}, tabBarActiveTintColor: colors.green, tabBarLabel: "Lịch khám" }} />
      <Tab.Screen name="Message" component={Message} options={{headerShown: false, tabBarIcon: (props) => <IconMessage size={20} color={props.color}/>, tabBarIconStyle: {marginBottom: -10}, tabBarLabelStyle: {marginBottom: 5}, tabBarActiveTintColor: colors.green, tabBarLabel: "Tin nhắn" }} />
      <Tab.Screen name="User" component={User} options={{headerShown: false, tabBarIcon: (props) => <IconUser size={20} color={props.color}/>, tabBarIconStyle: {marginBottom: -10}, tabBarLabelStyle: {marginBottom: 5}, tabBarActiveTintColor: colors.green, tabBarLabel: "Tài khoản" }} />
    </Tab.Navigator>
  );
}
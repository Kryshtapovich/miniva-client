import { AppRegistry } from 'react-native';
import { name } from '../app.json';
import { App } from '../src/App';

import AntDesign from 'react-native-vector-icons/Fonts/AntDesign.ttf';
import Feather from 'react-native-vector-icons/Fonts/Feather.ttf';
import FontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import FontAwesome5_Regular from 'react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf';
import FontAwesome5_Solid from 'react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf';
import MaterialCommunity from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import Material from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import Ionicons from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import Entypo from 'react-native-vector-icons/Fonts/Entypo.ttf';

import GilroyBold from 'assets/fonts/Gilroy/Gilroy-Bold.ttf';
import GilroyMedium from 'assets/fonts/Gilroy/Gilroy-Medium.ttf';
import GilroySemiBold from 'assets/fonts/Gilroy/Gilroy-SemiBold.ttf';

const fontStyle = `
@font-face {
  src: url(${GilroyBold});
  font-family: Gilroy-Bold;
}

@font-face {
  src: url(${GilroyMedium});
  font-family: Gilroy-Medium;
}

@font-face {
  src: url(${GilroySemiBold});
  font-family: Gilroy-SemiBold;
}

@font-face {
  src: url(${AntDesign});
  font-family: AntDesign;
}

@font-face {
  src: url(${Feather});
  font-family: Feather;
}

@font-face {
  src: url(${MaterialCommunity});
  font-family: MaterialCommunity;
}

@font-face {
  src: url(${Material});
  font-family: Material;
}

@font-face {
  src: url(${FontAwesome});
  font-family: FontAwesome;
}

@font-face {
  src: url(${FontAwesome5_Regular});
  font-family: FontAwesome5_Regular;
}

@font-face {
  src: url(${FontAwesome5_Solid});
  font-family: FontAwesome5_Solid;
}

@font-face {
  src: url(${Ionicons});
  font-family: Ionicons;
}

@font-face {
  src: url(${Entypo});
  font-family: Entypo;
}

html {
  min-height: 100%;
  display: flex;
}

body {
  flex-grow: 1;
  margin: 0;
}

#root {
  min-height: 100%;
  display: flex;
}

* {
  box-sizing: border-box;
  transition: gap 0.3s, padding 0.3s, width 0.3s, font-size 0.3s, transform 0.3s;
}
`;

const style = document.createElement('style');
style.appendChild(document.createTextNode(fontStyle));
document.head.appendChild(style);

AppRegistry.registerComponent(name, () => App);

AppRegistry.runApplication(name, {
  rootTag: document.getElementById('root'),
});

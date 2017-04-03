import React, { Component } from 'react';
import { View, Text, ScrollView, Navigator, TouchableOpacity } from 'react-native';
import { ListMenu } from './ListMenu';
import FDButton from './FDButton';
import FDIcon from './FDIcon';
import { iconStyle } from '../utils/common';

class MenuContents extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentMenu: 'homepage'
    };
    this.onPress = this.onPress.bind(this);
    this.renderItemMenu = this.renderItemMenu.bind(this);

  }

  onPress(name) {
    if (name !== '') {
      this.setState({currentMenu: name})
      this.props.navigate({ name });
    }
  }
  renderItemMenu(data, i) {
    const { iconStyle, menuStyle, subMenuStyle, isActive, temp } = styles;
    let addStyle = {};
    if(this.state.currentMenu === data.name) addStyle = isActive;
    return (
      <TouchableOpacity
        style={[styles.itemsMenu, addStyle]}
        key={`${data.name}_${i}`}
        onPress={() => this.onPress(data.name)} 
        >
        <FDIcon name={data.icon} {...iconStyle.style4} />
        <Text style={styles.itemsLabel}>{data.label}</Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.containerMenu}>
        <ScrollView>
        <View style={styles.toolWrapper}>
          <View style={{ alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity            
            onPress={() => this.props.closeDrawer()} 
            >
            <FDIcon name='ios-close-outline'  {...iconStyle.style4}  />
          </TouchableOpacity>
         </View>
         <View style={{ alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity            
            onPress={() => this.props.closeDrawer()} 
            >
            <FDIcon name='ios-settings-outline'  {...iconStyle.style4} />
          </TouchableOpacity>
         </View>
        </View>           
        <View style={styles.itemsWapper}>
          {
            ListMenu.map((row ,i) => (
              this.renderItemMenu(row, i)
            ))
          }         
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerMenu: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'row',
  },
  toolWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 35,
    marginHorizontal: 20,
    flexDirection: 'row'
  },
  itemsWapper: {
    flex: 4,
    flexDirection: 'row', 
    flexWrap:'wrap'
  },
  itemsMenu: {
    width: 180,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsLabel: {
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Karla-Bold',
    color: 'rgb(0, 0, 0)'
  },
  iconStyle: {
    color: '#000',
    backgroundColor: '#000',
    fontSize: 26
  },
  iconBasket: {
    fontSize: 24
  },
  menuStyle: {
    marginLeft: 25,
    borderWidth: 2,
    borderColor: '#000'
  },
  subMenuStyle: {
    marginLeft: 25,
  },
  isActive: {
    backgroundColor: 'rgb(184, 166, 228)'
  },
  iconSub: {
    color: '#666',
    fontSize: 22
  },
  textSub: {
    color: '#777'
  }

};

export default MenuContents;

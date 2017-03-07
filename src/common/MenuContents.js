import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListMenu } from './ListMenu';
import Button from './Button';
import Icon from './Icon';


class MenuContents extends Component {
  constructor(props, context) {
    super(props, context);
    this.onClickLink = this.onClickLink.bind(this);
  }

  onClickLink(name) {
    if (name !== '') {
      this.props.navigate({ name });
    }
  }
  renderSubMenu(data) {
    const { iconStyle, textSub } = styles;
    return (
      <View key={`${data.name}`} icon block onPress={() => this.onClickLink(data.name)}>
          <Text name={data.icon} style={iconStyle} />
          <Icon name={data.icon} style={iconStyle} />
          <Text style={textSub}>{data.label}</Text>
      </View>
    );
  }
  renderItemMenu(data, i) {
    const { iconStyle, menuStyle, subMenuStyle, isActive, temp } = styles;

    return (
      <View key={`${data.name}_${i}`} style={menuStyle}>
        <View
        icon
        onPress={() => this.onClickLink(data.name)}
        >
            <Icon name={data.icon} style={iconStyle} />
            <Text >{data.label}</Text>
            <Icon name='ios-arrow-down'style={iconStyle} />
        </View>
      </View>
    );
  }
  render() {
    const { containerMenu } = styles;
    return (
      <View style={containerMenu}>     
          <Button
          caption={"MENU"}
          onPress={() => {
            this.props.closeDrawer();
          }}
          >
             <Icon name='ios-arrow-forward' />
         </Button>
          <View>
            {
              ListMenu.map((item, i) => (
                this.renderItemMenu(item, i)
              ))
            }
          </View>
      </View>
    );
  }
}

const styles = {
  containerMenu: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#333',
    fontSize: 26
  },
  iconBasket: {
    fontSize: 24
  },
  subMenuStyle: {
    marginLeft: 25,
  },
  isActive: {},
  iconSub: {
    color: '#666',
    fontSize: 22
  },
  textSub: {
    color: '#777'
  }

};

export default MenuContents;

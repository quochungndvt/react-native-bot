import React from 'react';
import { Image } from 'react-native';

const bgImg = require('../../asset/image/homepage-bg.jpg');

const BackgroundImage = (props) => {
  const { backgroundImage } = styles;
  return (
    <Image
    style={backgroundImage}
    source={bgImg}
    >
    {props.children}
    </Image>
  );
};
const styles = {
  backgroundImage: {
    flex: 1,
     width: null,
     height: null,
     resizeMode: 'cover',
    backgroundColor: 'transparent'
  }
};
export default BackgroundImage;

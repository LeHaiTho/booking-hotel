import React from 'react';
import {IconType} from '../types/iconType';
import {getIcon} from '../utils/iconUtils';

type IconComponentProps = IconType & {
  icon: IconType;
  size?: number;
  color?: string;
};

const IconComponent: React.FC<IconComponentProps> = ({
  name,
  library,
  size = 24,
  color = '#000',
}) => {
  return getIcon({name, library}, size, color);
};

export default IconComponent;

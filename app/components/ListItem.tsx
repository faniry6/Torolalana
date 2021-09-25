import React, {useState, useEffect, FunctionComponent} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import TouchableIcon from './TouchableIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type LeftIconOptions = null | 'empty-space' | 'arrow-up' | 'arrow-down';
interface ListItemProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  leftIcon?: LeftIconOptions;
  showIcon?: undefined | null | 'plus' | 'check';
}
const ListItem: FunctionComponent<ListItemProps> = props => {
  const [isMenuEnabled, setMenuEnabled] = useState(false);
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.item}>
      {props.leftIcon == 'empty-space' && <View style={styles.leftIcon} />}
      {props.leftIcon != null && props.leftIcon != 'empty-space' && (
        <MaterialCommunityIcons
          style={styles.leftIcon}
          name={props.leftIcon}
          size={14}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        {props.subtitle && (
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        )}
      </View>
      {props.showIcon == 'check' && (
        <TouchableIcon onPress={props.onPress} name="check" size={25} />
      )}
      {props.showIcon == 'plus' && (
        <TouchableIcon onPress={props.onPress} name="plus" size={25} />
      )}
    </TouchableOpacity>
  );
};
export default ListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'green',
    borderRadius: 100,
    justifyContent: 'space-between',
    margin: 5,
  },
  textContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
  },
  leftIcon: {
    width: 30,
  },
});

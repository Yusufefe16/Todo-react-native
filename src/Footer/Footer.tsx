import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Footer.style.tsx';

interface FooterProps {
    onRemoveSelected: () => void;
}

const Footer: React.FC<FooterProps> = ({ onRemoveSelected }) => {
  return (
      <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.footerButton} onPress={onRemoveSelected}>
              <Text style={styles.footerButtonText}>Seçili Olanları Kaldır</Text>
          </TouchableOpacity>
      </View>
  );
};

export default Footer;

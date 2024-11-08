import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const AgeSelector = () => {
  const scrollRef = useRef(null);
  const { width } = Dimensions.get('window');
  const itemWidth = 60; // Largura de cada item de idade
  const centerOffset = (width - itemWidth) / 2;
  const ageRange = 100; // Intervalo de idades de 1 a 100
  const repeatedAges = Array.from({ length: ageRange * 3 }, (_, i) => (i % ageRange) + 1); // Array repetido

  // Configurando a idade selecionada
  const [selectedAge, setSelectedAge] = useState(20);

  useEffect(() => {
    if (scrollRef?.current) {
      // Posiciona o seletor na idade inicial centralizada ao carregar
      scrollRef?.current?.scrollTo({
        x: (ageRange + selectedAge + 1) * itemWidth,
        animated: true,
      });
    }
  }, []);

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / itemWidth);
    const age = repeatedAges[index];
    setSelectedAge(age);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.selectorOverlay} />
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={10}
          contentContainerStyle={{ paddingHorizontal: centerOffset }}
        >
          {repeatedAges.map((age, index) => (
            <View key={index} style={styles.ageItem}>
              <Text style={[styles.ageText, age === selectedAge && styles.selectedAgeText]}>
                {age}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.selectedLabel}>Idade selecionada: {selectedAge}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 50,
  },
  selectorOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: '#E0F7FA',
    opacity: 0.6,
    zIndex: 1,
  },
  ageItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageText: {
    fontSize: 20,
    color: '#B0BEC5',
  },
  selectedAgeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
  },
  selectedLabel: {
    marginTop: 20,
    fontSize: 16,
    color: '#607D8B',
  },
});

export default AgeSelector;

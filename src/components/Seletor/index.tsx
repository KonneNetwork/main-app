import React, { useRef, useState, useEffect, SetStateAction, Dispatch } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const AgeSelector = ({setAge }: { setAge: (value: number) => void}) =>{
  const scrollRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get('screen');
  const itemWidth = 60;
  const centerOffset = (width - itemWidth) / 2.4;
  const ageRange = 150;
  const repeatedAges = Array.from({ length: ageRange * 1 }, (_, i) => (i % ageRange) + 1);


  const initialAge = 18;
  const [selectedAge, setSelectedAge] = useState<number>(initialAge);


  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / itemWidth);
    const age = repeatedAges[index];
    if (age !== selectedAge) setSelectedAge(age); 
  };

  useEffect(() => {
    if (scrollRef.current) {
      
      const initialOffset = (initialAge - 1) * itemWidth;
      scrollRef.current.scrollTo({
        x: initialOffset,
        animated: false,
      });
    }
  }, []);

  useEffect(()=>{setAge(selectedAge)},[selectedAge])

  return (
    <>
      <View style={styles.container}>
        <View style={styles.selectorOverlay} />
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth}
          onScroll={handleScroll}
          //onMomentumScrollEnd={handleScroll}
          // onScrollBeginDrag={removeSelection}
          //onScrollEndDrag={handleScroll}
          scrollEventThrottle={16}
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
      <Text style={styles.selectedLabel}>Anos</Text>
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
    width: 50,
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
    alignSelf: 'center',
  },
});

export default AgeSelector;

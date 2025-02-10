import useGetTags from "@/queries/tags/getTags";
import { useEffect, useState } from "react";
import { Button, Modal, View, Text, TouchableOpacity, FlatList, TextInput } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchFilter({ open, setOpen }: Props) {
  const { data } = useGetTags()
  const [tags, setTags] = useState<any | undefined>()
  const [tagSelects, setTagSelects] = useState<any[] | null>([])
  console.log("🚀 ~ SearchFilter ~ tagSelects:", tagSelects)


  function handleSelect(tag: string) {
    if (tagSelects?.includes(tag) === false) {
      setTagSelects([...tagSelects, tag])
    }
    if (tagSelects?.includes(tag) === true) {

      tagSelects?.splice(tagSelects?.indexOf(tag), 1)

      setTagSelects([...tagSelects])

    }
    // tagSelects?.splice(tagSelects?.indexOf(tag), 1);
  }

  useEffect(() => { setTags(data) }, [data])
  useEffect(() => { setTags(data) }, [data])
  return (
    <Modal
      visible={open}
      className="w-full h-full bg-slate-800"
      presentationStyle="fullScreen"
      animationType='none'
      transparent={false}

    >

      <FlatList
        data={tags}
        renderItem={({ item }) => <TouchableOpacity
          style={{ backgroundColor: tagSelects?.includes(item.tag) ? "#087c50" : "#15dcff" }}
          className=" border-1 flex-1 rounded-md"
          key={item.cd_tag}
          onPress={() => handleSelect(item.tag)}
        >
          <Text style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.tag}</Text>
        </TouchableOpacity>}
        numColumns={2}
        contentContainerClassName="m-8"
        ListHeaderComponent={
          <>
            <Text>Filtro</Text>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Text>Voltar</Text>
            </TouchableOpacity>
            <View className="flex-row border-1 w-[80%]">
              <EvilIcons name="search" size={24} color="black" />
              <TextInput placeholder="Digite o que procura" />
            </View>
          </>
        }
      />
    </Modal>
  )
}

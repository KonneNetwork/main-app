import useGetTags from "@/queries/tags/getTags";
import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList, TextInput } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

const filterSchema = z.object({
  tags: z.array(z.string()),
  search: z.string().optional(),
});

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchFilter({ open, setOpen }: Props) {
  const { data } = useGetTags();
  const [tags, setTags] = useState<string[]>([]);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [tagSelects, setTagSelects] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) {
      setTags(data.map((item: any) => item.tag));
      setFilteredTags(data.map((item: any) => item.tag));
    }
  }, [data]);

  useEffect(() => {
    if (search) {
      setFilteredTags(tags.filter(tag => tag.toLowerCase().includes(search.toLowerCase())));
    } else {
      setFilteredTags(tags);
    }
  }, [search, tags]);

  function handleSelect(tag: string) {
    setTagSelects(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  const filterMutation = useMutation({
    mutationFn: async () => {
      const validatedData = filterSchema.parse({ tags: tagSelects, search });
      return axios.post("/api/filter", validatedData);
    },
    onSuccess: (response) => {
      console.log("Filtros aplicados:", response.data);
      setOpen(false);
    },
    onError: (error) => {
      console.error("Erro ao aplicar filtros:", error);
    }
  });

  return (
    <Modal
      visible={open}
      presentationStyle="fullScreen"
      animationType="slide"
      transparent={false}
    >
      <View className="w-full h-full bg-slate-800 p-4">
        <Text className="text-white text-xl font-bold">Filtro</Text>
        
        <TouchableOpacity onPress={() => setOpen(false)}>
          <Text className="text-red-500">Voltar</Text>
        </TouchableOpacity>
        
        <View className="flex-row items-center border border-gray-400 rounded-md p-2 my-4">
          <EvilIcons name="search" size={24} color="white" />
          <TextInput
            placeholder="Digite o que procura (usuário ou tag)"
            placeholderTextColor="gray"
            value={search}
            onChangeText={setSearch}
            className="text-white flex-1"
          />
        </View>

        <FlatList
          data={filteredTags}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ backgroundColor: tagSelects.includes(item) ? "#087c50" : "#15dcff" }}
              className="border p-2 rounded-md m-1"
              onPress={() => handleSelect(item)}
            >
              <Text className="text-center text-white">{item}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          contentContainerClassName="gap-2"
        />

        <TouchableOpacity
          className="bg-green-500 p-3 rounded-md mt-4"
          onPress={() => filterMutation.mutate()}
          disabled={filterMutation?.isPending}
        >
          <Text className="text-center text-white font-bold">
            {filterMutation?.isPending ? "Aplicando..." : "Aplicar Filtros"}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

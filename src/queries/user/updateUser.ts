import { api } from "@/services/api";
import { User } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";


interface Props { id: string | undefined, data: { latitude: number, longitude: number } }

async function updateUserInfo({ id, data }: Props) {
    try {
        const resultado = await api.put(`user/${id}`, { ...data })
        console.log("🚀 ~ updateUserInfo ~ resultado:", resultado)
        return resultado
    } catch (error) {
        throw error
    }
}

export default function useUpdateUserInfo() {
    return useMutation({

        mutationKey: ["updateUserInfo"],
        mutationFn: ({ id, data }: Props) => updateUserInfo({ id, data })

    })
}
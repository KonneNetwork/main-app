import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function policePrivacy() {
  return (
    <SafeAreaView className='flex-1 bg-white p-8'>
      <StatusBar />
      <View className='flex-row  items-center '>
        <Ionicons name="chevron-back-outline" size={32} color="black" onPress={() => router.back()} />
        <Text className='color-[#528A8C] font-inter-400 text-2xl flex-1 text-center'>Konne</Text>
      </View>
      <Text className='text-center font-inter-600 text-5xl m-5'>Política de Privacidade</Text>

      <ScrollView className='flex-grow w-full'>

        <Text className='color-black text-justify font-inter-700 text-2xl'>1. Introdução</Text>

        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          A <Text className='font-inter-700'>Konne App</Text> valoriza sua privacidade e está comprometida em proteger os dados pessoais de seus usuários, em conformidade com as <Text className='font-inter-700'>leis de proteção de dados vigentes no Brasil (LGPD), na Europa (GDPR), nos EUA (CCPA), em Singapura (PDPA), no Canadá (PIPEDA) e outras regulamentações globais.</Text>{'\n'}
          Ao utilizar o Konne App, você concorda com a coleta e o uso de suas informações conforme descrito nesta política. Se não concordar com esta política, por favor, não utilize nossos serviços.
        </Text>

        <Text className='color-black text-justify font-inter-700 text-2xl'>2. Dados Pessoais Coletados</Text>
        <Text className='color-black text-justify font-inter-700 text-base'>
          2.1. Dados Fornecidos pelo Usuário
        </Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          Informações de Cadastro: Nome, e-mail, número de telefone, data de nascimento, gênero.
          Perfil e Interesses: Foto de perfil, biografia, preferências de networking e localização de interesses.
          Conteúdo Gerado pelo Usuário: Mensagens, publicações, comentários e interações no aplicativo.
        </Text>
        <Text className='color-black text-justify font-inter-700 text-base'>2.2. Dados Coletados Automaticamente</Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          Dados de Localização: Para fornecer conexões precisas com base em proximidade geográfica.
          Dados de Uso: Informações sobre interações com o app, incluindo páginas acessadas, tempo de uso, cliques, etc.
          Dados do Dispositivo: Tipo de dispositivo, sistema operacional, navegador, endereço IP e identificadores exclusivos do dispositivo.
        </Text>

        <Text className='color-black text-justify font-inter-700 text-base'>2.3. Dados Coletados de Terceiros</Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          Redes Sociais e Integrações: Se o usuário optar por se cadastrar ou conectar o perfil via plataformas como Google, Facebook ou LinkedIn, poderemos coletar informações como nome, foto de perfil, lista de contatos e outras informações compartilhadas por meio dessas plataformas.
        </Text>

        <Text className='color-black text-justify font-inter-700 text-2xl'>3. Finalidade e Base Legal para o Tratamento de Dados</Text>
        <Text className='color-black text-justify font-inter-700 text-base'>3.1. Finalidades do Tratamento de Dados</Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          Fornecimento do Serviço: Para gerenciar contas de usuários, fornecer recomendações de conexões, sugerir eventos e personalizar a experiência do usuário.
          Melhoria e Otimização: Para analisar o uso do app, identificar melhorias e otimizar funcionalidades.
          Comunicação com o Usuário: Para enviar notificações, alertas, atualizações e informações relacionadas ao uso do app.
          Marketing e Publicidade: Para fornecer conteúdos personalizados, anúncios direcionados e campanhas de marketing, conforme o consentimento do usuário.
          Segurança e Conformidade Legal: Para garantir a segurança do app, prevenir fraudes e cumprir obrigações legais e regulamentares.
        </Text>

        <Text className='color-black text-justify font-inter-700 text-base'>3.2. Base Legal para o Tratamento de Dados</Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          Consentimento do Titular: Para fins de marketing e publicidade direcionada.
          Execução de Contrato: Para fornecer os serviços solicitados pelo usuário.
          Cumprimento de Obrigações Legais: Para atender requisitos legais e regulamentares.
          Interesses Legítimos: Para melhorar a experiência do usuário, garantir a segurança do aplicativo e personalizar conteúdos.
        </Text>

        <Text className='color-black text-justify font-inter-700 text-2xl'>4. Compartilhamento de Dados Pessoais</Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          A Konne App pode compartilhar dados pessoais com:
          Provedores de Serviços: Empresas terceirizadas que auxiliam na operação do app, como hospedagem, análise de dados, marketing e atendimento ao cliente.
          Parceiros de Negócios: Para integração com serviços externos, como eventos, redes sociais e plataformas de pagamento.
          Publicidade e Anunciantes: Dados anonimizados podem ser compartilhados para fins de publicidade personalizada.
          Autoridades Governamentais e Judiciais: Quando necessário para cumprir obrigações legais, ordens judiciais ou regulatórias.
          ⚠️ A Konne App NÃO vende dados pessoais a terceiros.
        </Text>

        <Text className='color-black text-justify font-inter-700 text-2xl'>5. Armazenamento e Segurança dos Dados</Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          Local de Armazenamento: Os dados pessoais são armazenados em servidores seguros localizados no Brasil, EUA e Europa, conforme as melhores práticas de segurança da informação.
          Tempo de Retenção: Os dados serão retidos enquanto a conta do usuário estiver ativa ou conforme necessário para cumprir obrigações legais.
          Medidas de Segurança: Utilizamos criptografia, firewalls, controles de acesso e monitoramento contínuo para proteger os dados contra acessos não autorizados, perdas ou alterações.
        </Text>

        <Text className='color-black text-justify font-inter-700 text-2xl'>6. Direitos dos Titulares de Dados</Text>
        <Text className='color-black text-justify font-inter-700 text-base'>6.1. Direitos Garantidos</Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          Os usuários têm direito de:
          Acesso e Correção: Solicitar acesso aos seus dados pessoais e corrigir informações incorretas.
          Exclusão dos Dados: Solicitar a exclusão de seus dados pessoais, exceto quando houver obrigação legal para retenção.
          Portabilidade dos Dados: Receber uma cópia de seus dados em formato estruturado e interoperável.
          Revogação de Consentimento: Retirar o consentimento para o tratamento de dados a qualquer momento.
          Oposição ao Tratamento: Contestar o tratamento de dados para marketing ou outras finalidades legítimas.
        </Text>

        <Text className='color-black text-justify font-inter-700 text-base'>6.2. Como Exercer Seus Direitos</Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          Os usuários podem exercer seus direitos enviando um e-mail para [e-mail do DPO]. A Konne App responderá às solicitações em até 30 dias.
        </Text>

        <Text className='color-black text-justify font-inter-700 text-2xl'>7. Transferência Internacional de Dados</Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          A Konne App pode transferir dados pessoais para servidores localizados fora do país de residência do usuário. Garantimos que essas transferências são realizadas em conformidade com:
          Cláusulas Contratuais Padrão da GDPR (para usuários na Europa).
          Requisitos da LGPD (para usuários no Brasil).
          Regulamentações aplicáveis no país do usuário.
        </Text>

        <Text className='color-black text-justify font-inter-700 text-2xl'>8. Alterações nesta Política de Privacidade</Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          A Konne App reserva-se o direito de atualizar esta política a qualquer momento para refletir mudanças na legislação ou em nossas práticas de tratamento de dados. Notificaremos os usuários sobre alterações significativas através do app ou por e-mail.
        </Text>

      </ScrollView>
      <View className='flex-row flex-1 items-end justify-between'>
        <Text className='text-sm color-[#666666] font-inter-400'> © 2023-2024 Konne S.A </Text>
        <TouchableOpacity onPress={() => router.navigate('/(public)/terms-use')}>
          <Text className='text-base color-[#33586C] font-inter-700'> TERMOS DE USO </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

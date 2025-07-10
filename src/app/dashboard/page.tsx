import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

const dashboardItems = [
  {
    title: 'Meu Curso Principal',
    description: 'Acesse o conteúdo do seu curso e continue de onde parou.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'online course',
    buttonText: 'Acessar Curso',
  },
  {
    title: 'Comunidade Exclusiva',
    description: 'Interaja com outros membros e tire suas dúvidas.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'community discussion',
    buttonText: 'Entrar na Comunidade',
  },
  {
    title: 'Recursos Adicionais',
    description: 'Explore materiais de apoio, e-books e ferramentas.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'learning resources',
    buttonText: 'Ver Recursos',
  },
   {
    title: 'Eventos Ao Vivo',
    description: 'Participe de webinars e sessões de Q&A exclusivas.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'live webinar',
    buttonText: 'Ver Agenda',
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-[#003366]">Bem-vindo(a) de volta!</h1>
      <p className="mb-8 text-gray-600">Aqui está um resumo da sua área de membros.</p>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {dashboardItems.map((item, index) => (
          <Card key={index} className="flex flex-col overflow-hidden border-2 border-[#FFD700] shadow-lg transition-transform hover:scale-105">
             <div className="relative h-48 w-full">
              <Image 
                src={item.image} 
                alt={item.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={item.aiHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="text-[#003366]">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button className="w-full bg-[#003366] text-white hover:bg-blue-800">
                {item.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

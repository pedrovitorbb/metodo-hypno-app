import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, User } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="w-full bg-white bg-opacity-70" style={{ background: 'linear-gradient(to bottom, #E5F6FF, white)'}}>
      <div className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-4xl overflow-hidden shadow-2xl">
          <div className="relative h-40 bg-[#3A8DFF]">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <Avatar className="h-32 w-32 border-8 border-blue-500 bg-white">
                <AvatarImage src="https://placehold.co/200x200.png" alt="Foto do Perfil" data-ai-hint="profile photo" />
                <AvatarFallback className="text-4xl">JP</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="pt-20 text-center">
            <h2 className="text-3xl font-bold text-[#003366]">João Pereira</h2>
            <p className="text-gray-500">Membro Premium</p>
          </div>
          <CardContent className="mt-8 p-6">
            <div className="rounded-lg bg-[#3A8DFF] p-6 text-white shadow-inner">
              <h3 className="mb-4 text-xl font-semibold">Informações do Perfil</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5" />
                  <span>João Pereira</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5" />
                  <span>joao.pereira@example.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5" />
                  <span>+55 11 98765-4321</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Button className="bg-[#FFD700] text-[#003366] font-bold border-2 border-blue-500 hover:bg-yellow-400 hover:border-blue-700 transition-all duration-300">
                Editar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

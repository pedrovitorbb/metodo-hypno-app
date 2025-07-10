import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export function FirebaseConfigReminder() {
  return (
    <Card className="w-full max-w-md border-destructive/50 bg-destructive/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle />
          Ação Necessária: Configurar Firebase
        </CardTitle>
        <CardDescription className="text-destructive/90">
          Para que o login e outras funcionalidades funcionem, você precisa
          adicionar as chaves do seu projeto Firebase.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p>
          Siga estes passos:
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Abra o{' '}
            <a
              href="https://console.firebase.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              Console do Firebase
            </a>
            .
          </li>
          <li>
            Vá para <strong>Configurações do Projeto</strong> (clicando no ícone de engrenagem).
          </li>
          <li>
            Na aba <strong>Geral</strong>, role para baixo até a seção "Seus apps".
          </li>
          <li>
            Selecione seu aplicativo da web e encontre o objeto de configuração <code>firebaseConfig</code>.
          </li>
          <li>
            Copie este objeto e cole-o no arquivo{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              src/lib/firebase/config.ts
            </code>
            , substituindo o conteúdo existente.
          </li>
        </ol>
        <div className="rounded-md bg-background/50 p-4">
          <p className="font-semibold">O arquivo <code className="font-mono text-xs">src/lib/firebase/config.ts</code> deve ficar assim:</p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-2 text-xs">
            <code>
{`// IMPORTANT: Os valores aqui são exemplos.
// Substitua com a configuração do seu projeto Firebase.
export const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:12345...:web:abcd..."
};
`}
            </code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

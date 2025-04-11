import { MusicPlayer } from "@/components/studio/music-player";

export default function StudioPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Estúdio de Transmissão</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <MusicPlayer />
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Controles de Transmissão</h2>
          <p className="text-muted-foreground">
            Aqui serão adicionados os controles de transmissão e mixagem.
          </p>
        </div>
      </div>
    </div>
  );
}
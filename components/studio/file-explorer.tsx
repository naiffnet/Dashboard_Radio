"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Folder, File, Music, Video, Image, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { storeAudio } from "@/lib/media-storage";
import { useToast } from "@/components/ui/use-toast";

interface FileItem {
  name: string;
  type: "file" | "directory";
  path: string;
  size?: number;
  lastModified?: Date;
  extension?: string;
}

interface FileExplorerProps {
  onFileSelect?: (files: File[]) => void;
}

export function FileExplorer({ onFileSelect }: FileExplorerProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      
      // Notifica o componente pai sobre os arquivos selecionados
      if (onFileSelect) {
        onFileSelect(files);
      }
      
      // Tenta armazenar cada arquivo de áudio
      for (const file of files) {
        try {
          const url = URL.createObjectURL(file);
          const stored = await storeAudio(url, {
            title: file.name,
            artist: "Biblioteca Local"
          });
          
          if (stored) {
            toast({
              title: "Sucesso",
              description: `Música ${file.name} adicionada com sucesso`
            });
          } else {
            throw new Error("Falha ao armazenar o arquivo");
          }
        } catch (error) {
          console.error(`Erro ao processar arquivo ${file.name}:`, error);
          toast({
            variant: "destructive",
            title: "Erro",
            description: `Falha ao adicionar ${file.name}. Por favor, tente novamente.`
          });
        }
      }
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return <Music className="h-4 w-4 mr-2" />;
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-4 h-full">
      <h3 className="text-lg font-semibold mb-4">Explorador de Arquivos</h3>
      
      <div className="mb-4">
        <Button onClick={handleFileSelect} className="w-full">
          Selecionar Arquivos
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept="audio/*"
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="border rounded-md p-2 h-[calc(100%-6rem)] overflow-y-auto">
          <div className="text-sm font-medium mb-2">Arquivos Selecionados:</div>
          {selectedFiles.map((file, index) => (
            <div 
              key={index}
              className="flex items-center p-2 hover:bg-accent rounded cursor-pointer"
              onClick={() => {}}
            >
              {getFileIcon(file.name)}
              <span className="truncate">{file.name}</span>
            </div>
          ))}
        </div>
      )}
      
      {selectedFiles.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[calc(100%-6rem)] text-muted-foreground">
          <Folder className="h-12 w-12 mb-2" />
          <p>Selecione arquivos para visualizá-los aqui</p>
        </div>
      )}
    </div>
  );
}
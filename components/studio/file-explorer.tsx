"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Folder, File, Music, Video, Image, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileItem {
  name: string;
  type: "file" | "directory";
  path: string;
  size?: number;
  lastModified?: Date;
  extension?: string;
}

export function FileExplorer({ onFileSelect }: { onFileSelect?: (file: File) => void }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      
      // Se houver uma função de callback para seleção de arquivo, chame-a com o primeiro arquivo
      if (onFileSelect && files.length > 0) {
        onFileSelect(files[0]);
      }
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (extension === 'mp3' || extension === 'wav' || extension === 'ogg' || extension === 'flac') {
      return <Music className="h-4 w-4 mr-2" />;
    } else if (extension === 'mp4' || extension === 'avi' || extension === 'mov' || extension === 'wmv') {
      return <Video className="h-4 w-4 mr-2" />;
    } else if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
      return <Image className="h-4 w-4 mr-2" />;
    } else if (extension === 'txt' || extension === 'doc' || extension === 'docx' || extension === 'pdf') {
      return <FileText className="h-4 w-4 mr-2" />;
    } else {
      return <File className="h-4 w-4 mr-2" />;
    }
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
          accept="audio/*,video/*,image/*"
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="border rounded-md p-2 h-[calc(100%-6rem)] overflow-y-auto">
          <div className="text-sm font-medium mb-2">Arquivos Selecionados:</div>
          {selectedFiles.map((file, index) => (
            <div 
              key={index}
              className="flex items-center p-2 hover:bg-accent rounded cursor-pointer"
              onClick={() => onFileSelect && onFileSelect(file)}
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
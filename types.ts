
export interface StyleOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
  color: string;
}

export interface ProcessingState {
  isLoading: boolean;
  error: string | null;
  resultImageUrl: string | null;
  resultDescription: string | null;
}

export interface UserImage {
  file: File;
  preview: string;
  base64: string;
  mimeType: string;
}

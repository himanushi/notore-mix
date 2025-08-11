export interface ContentData {
  id: string;
  type: string;
  data: any;
}

export interface ModuleSettings {
  difficulty?: 'easy' | 'medium' | 'hard';
  [key: string]: any;
}

export interface ContentModule {
  id: string;
  name: string;
  displayName: string;
  generate(settings?: ModuleSettings): ContentData;
  render(data: ContentData): React.ReactElement;
  defaultSettings: ModuleSettings;
}

export interface PrintSettings {
  pageCount: number;
  contentPerPage: number;
  selectedModules: string[];
  moduleWeights: Record<string, number>;
}
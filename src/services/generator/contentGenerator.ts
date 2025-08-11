import { ContentModule, ContentData } from '../../types/content';

interface GeneratorConfig {
  modules: ContentModule[];
  weights?: Record<string, number>;
  count: number;
}

export class ContentGenerator {
  private modules: Map<string, ContentModule>;
  
  constructor(modules: ContentModule[]) {
    this.modules = new Map(modules.map(m => [m.id, m]));
  }
  
  generateContents(config: GeneratorConfig): ContentData[] {
    const { count, weights = {} } = config;
    const contents: ContentData[] = [];
    
    const availableModules = Array.from(this.modules.values());
    const modulePool = this.createWeightedPool(availableModules, weights);
    
    for (let i = 0; i < count; i++) {
      const module = this.selectRandomModule(modulePool);
      const content = module.generate(module.defaultSettings);
      contents.push(content);
    }
    
    return contents;
  }
  
  generatePages(pageCount: number, itemsPerPage: number, moduleIds?: string[]): ContentData[][] {
    const pages: ContentData[][] = [];
    const selectedModules = moduleIds 
      ? Array.from(this.modules.values()).filter(m => moduleIds.includes(m.id))
      : Array.from(this.modules.values());
    
    if (selectedModules.length === 0) {
      return pages;
    }
    
    for (let page = 0; page < pageCount; page++) {
      const pageContents: ContentData[] = [];
      
      for (let item = 0; item < itemsPerPage; item++) {
        const module = selectedModules[Math.floor(Math.random() * selectedModules.length)];
        const content = module.generate(module.defaultSettings);
        pageContents.push(content);
      }
      
      pages.push(pageContents);
    }
    
    return pages;
  }
  
  private createWeightedPool(modules: ContentModule[], weights: Record<string, number>): ContentModule[] {
    const pool: ContentModule[] = [];
    
    modules.forEach(module => {
      const weight = weights[module.id] || 1;
      for (let i = 0; i < weight; i++) {
        pool.push(module);
      }
    });
    
    return pool;
  }
  
  private selectRandomModule(pool: ContentModule[]): ContentModule {
    return pool[Math.floor(Math.random() * pool.length)];
  }
  
  getModule(id: string): ContentModule | undefined {
    return this.modules.get(id);
  }
  
  getAllModules(): ContentModule[] {
    return Array.from(this.modules.values());
  }
}
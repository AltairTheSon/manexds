import { Component, OnInit, OnDestroy } from '@angular/core';
import { FigmaServerService, EnhancedDesignToken, EnhancedFigmaComponent, FigmaFile } from '../../services/figma-server.service';
import { Subject, takeUntil, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-enhanced-design-system',
  templateUrl: './enhanced-design-system.component.html',
  styleUrls: ['./enhanced-design-system.component.scss']
})
export class EnhancedDesignSystemComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data
  enhancedTokens: EnhancedDesignToken[] = [];
  enhancedComponents: EnhancedFigmaComponent[] = [];
  figmaFiles: FigmaFile[] = [];
  
  // Filtering
  selectedFile: FigmaFile | null = null;
  selectedTokenType: string = 'all';
  selectedTokenCategory: string = 'all';
  searchTerm: string = '';
  
  // UI State
  loading = false;
  error: string | null = null;
  activeTab: 'tokens' | 'components' | 'relationships' = 'tokens';
  
  // Token types and categories
  tokenTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'color', label: 'Colors' },
    { value: 'typography', label: 'Typography' },
    { value: 'spacing', label: 'Spacing' },
    { value: 'borderRadius', label: 'Border Radius' },
    { value: 'shadow', label: 'Shadows' },
    { value: 'effect', label: 'Effects' }
  ];

  tokenCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'colors/primary', label: 'Primary Colors' },
    { value: 'colors/secondary', label: 'Secondary Colors' },
    { value: 'colors/neutral', label: 'Neutral Colors' },
    { value: 'colors/semantic', label: 'Semantic Colors' },
    { value: 'colors/background', label: 'Background Colors' },
    { value: 'colors/text', label: 'Text Colors' },
    { value: 'typography/headings', label: 'Heading Typography' },
    { value: 'typography/body', label: 'Body Typography' },
    { value: 'typography/captions', label: 'Caption Typography' },
    { value: 'typography/buttons', label: 'Button Typography' },
    { value: 'spacing/layout', label: 'Layout Spacing' },
    { value: 'spacing/component', label: 'Component Spacing' },
    { value: 'spacing/text', label: 'Text Spacing' },
    { value: 'effects/shadows', label: 'Shadows' },
    { value: 'effects/borders', label: 'Borders' },
    { value: 'effects/radius', label: 'Border Radius' }
  ];

  constructor(private figmaService: FigmaServerService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;
    console.log('Starting to load data...');

    // Load files first
    this.figmaService.getFigmaFiles()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(files => {
          console.log('Files loaded:', files.length, files);
          this.figmaFiles = files;
          if (files.length > 0) {
            this.selectedFile = files[0]; // Select first file by default
            console.log('Selected file:', this.selectedFile);
          }
          console.log('Loading tokens...');
          return this.figmaService.getEnhancedTokens();
        }),
        switchMap(tokens => {
          console.log('Tokens loaded:', tokens.length, tokens);
          this.enhancedTokens = tokens;
          console.log('Loading components...');
          return this.figmaService.getEnhancedComponents();
        }),
        catchError(error => {
          console.error('Error loading data:', error);
          this.error = 'Failed to load enhanced data: ' + error.message;
          return of(null);
        })
      )
      .subscribe(components => {
        if (components) {
          console.log('Components loaded:', components.length, components);
          this.enhancedComponents = components;
        }
        console.log('Data loading complete. Tokens:', this.enhancedTokens.length, 'Components:', this.enhancedComponents.length);
        this.loading = false;
      });
  }

  startEnhancedSync(): void {
    this.loading = true;
    this.error = null;

    this.figmaService.startEnhancedSync('full')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          console.log('Enhanced sync started:', result);
          // Reload data after a delay to allow sync to complete
          setTimeout(() => this.loadData(), 5000);
        },
        error: (error) => {
          this.error = 'Failed to start enhanced sync: ' + error.message;
          this.loading = false;
        }
      });
  }

  // Filtering methods
  get filteredTokens(): EnhancedDesignToken[] {
    let tokens = this.enhancedTokens;
    console.log('Filtering tokens. Total tokens:', tokens.length);

    // Filter by file
    if (this.selectedFile) {
      const beforeFileFilter = tokens.length;
      tokens = tokens.filter(token => token.fileId === this.selectedFile!.id);
      console.log(`File filter: ${beforeFileFilter} -> ${tokens.length} (fileId: ${this.selectedFile.id})`);
    }

    // Filter by type
    if (this.selectedTokenType !== 'all') {
      const beforeTypeFilter = tokens.length;
      tokens = tokens.filter(token => token.type === this.selectedTokenType);
      console.log(`Type filter: ${beforeTypeFilter} -> ${tokens.length} (type: ${this.selectedTokenType})`);
    }

    // Filter by category
    if (this.selectedTokenCategory !== 'all') {
      const beforeCategoryFilter = tokens.length;
      tokens = tokens.filter(token => token.category === this.selectedTokenCategory);
      console.log(`Category filter: ${beforeCategoryFilter} -> ${tokens.length} (category: ${this.selectedTokenCategory})`);
    }

    // Filter by search term
    if (this.searchTerm) {
      const beforeSearchFilter = tokens.length;
      const search = this.searchTerm.toLowerCase();
      tokens = tokens.filter(token => 
        token.name.toLowerCase().includes(search) ||
        token.description?.toLowerCase().includes(search) ||
        token.category.toLowerCase().includes(search)
      );
      console.log(`Search filter: ${beforeSearchFilter} -> ${tokens.length} (search: ${this.searchTerm})`);
    }

    console.log('Final filtered tokens:', tokens.length);
    return tokens;
  }

  get filteredComponents(): EnhancedFigmaComponent[] {
    let components = this.enhancedComponents;

    // Filter by file
    if (this.selectedFile) {
      components = components.filter(component => component.fileId === this.selectedFile!.id);
    }

    // Filter by search term
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      components = components.filter(component => 
        component.name.toLowerCase().includes(search) ||
        component.description?.toLowerCase().includes(search) ||
        component.type.toLowerCase().includes(search)
      );
    }

    return components;
  }

  // Helper methods
  getTokenUsageCount(token: EnhancedDesignToken): number {
    return this.figmaService.getTokenUsageCount(token);
  }

  getComponentTokenCount(component: EnhancedFigmaComponent): number {
    return this.figmaService.getComponentTokenCount(component);
  }

  getComponentTokenTypes(component: EnhancedFigmaComponent): string[] {
    return this.figmaService.getComponentTokenTypes(component);
  }

  getComponentsUsingToken(token: EnhancedDesignToken): EnhancedFigmaComponent[] {
    return this.enhancedComponents.filter(component => 
      this.figmaService.isComponentUsingToken(component, token.id)
    );
  }

  getTokensUsedByComponent(component: EnhancedFigmaComponent): EnhancedDesignToken[] {
    const tokenIds = this.figmaService.getComponentTokenCount(component) > 0 
      ? Object.values(component.usedTokens).flat()
      : [];
    
    return this.enhancedTokens.filter(token => tokenIds.includes(token.id));
  }

  getTokensInUseCount(): number {
    return this.enhancedTokens.filter(token => this.getTokenUsageCount(token) > 0).length;
  }

  getFirstTenTokens(): EnhancedDesignToken[] {
    return this.enhancedTokens.slice(0, 10);
  }

  getComponentsUsingTokenSlice(token: EnhancedDesignToken, count: number): EnhancedFigmaComponent[] {
    return this.getComponentsUsingToken(token).slice(0, count);
  }

  getComponentsUsingTokenCount(token: EnhancedDesignToken): number {
    return this.getComponentsUsingToken(token).length;
  }

  getFileNameById(fileId: string): string {
    const file = this.figmaFiles.find(f => f.id === fileId);
    return file ? file.name : 'Unknown';
  }

  getFileById(fileId: string): FigmaFile | null {
    return this.figmaFiles.find(f => f.id === fileId) || null;
  }

  getSelectedFileId(): string {
    return this.selectedFile?.id || '';
  }

  getComponentDimensions(component: EnhancedFigmaComponent): string {
    const box = component.absoluteBoundingBox;
    if (box && box.width && box.height) {
      return `${box.width}×${box.height}`;
    }
    return 'Unknown';
  }

  // UI methods
  onFileChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const fileId = target.value;
    const file = this.getFileById(fileId);
    this.selectedFile = file;
  }

  onTokenTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTokenType = target.value;
  }

  onTokenCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTokenCategory = target.value;
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  onTabChange(tab: 'tokens' | 'components' | 'relationships'): void {
    this.activeTab = tab;
  }

  // Utility methods
  getTokenColorPreview(token: EnhancedDesignToken): string {
    if (token.type === 'color' && token.value) {
      return token.value;
    }
    return '#ccc';
  }

  getTokenTypeIcon(type: string): string {
    switch (type) {
      case 'color': return 'Color';
      case 'typography': return 'Typography';
      case 'spacing': return 'Spacing';
      case 'borderRadius': return 'Border Radius';
      case 'shadow': return 'Shadow';
      case 'effect': return 'Effect';
      default: return 'Other';
    }
  }

  getComponentTypeIcon(type: string): string {
    switch (type) {
      case 'COMPONENT': return 'Component';
      case 'COMPONENT_SET': return 'Component Set';
      default: return 'Other';
    }
  }

  getFileTypeIcon(type: string): string {
    switch (type) {
      case 'design-system': return 'Design System';
      case 'application': return 'Application';
      case 'prototype': return 'Prototype';
      default: return 'File';
    }
  }

  onImageError(event: any): void {
    // Hide the image and show placeholder when image fails to load
    const img = event.target;
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) {
      parent.innerHTML = `
        <div class="placeholder-content">
          <span class="placeholder-icon">❌</span>
          <span class="placeholder-text">Image failed to load</span>
        </div>
      `;
    }
  }
} 
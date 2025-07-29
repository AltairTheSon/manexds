import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FigmaServerService, PaginatedResponse, FigmaDesignToken, FigmaComponent, FigmaPage } from '../../services/figma-server.service';

@Component({
  selector: 'app-design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss']
})
export class DesignSystemComponent implements OnInit {
  // Data
  tokens: FigmaDesignToken[] = [];
  components: FigmaComponent[] = [];
  pages: FigmaPage[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 20;
  totalItems = 0;
  totalPages = 0;

  // Search
  searchTerm = '';

  // Active tab
  activeTab: 'tokens' | 'components' | 'pages' = 'tokens';

  // Loading states
  isLoadingTokens = false;
  isLoadingComponents = false;
  isLoadingPages = false;
  isRegeneratingAll = false;

  constructor(
    private figmaServerService: FigmaServerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadTokens();
  }

  /**
   * Load design tokens with pagination and search
   */
  loadTokens(page: number = 1) {
    this.isLoadingTokens = true;
    this.currentPage = page;

    this.figmaServerService.getDesignTokens(page, this.itemsPerPage, this.searchTerm).subscribe({
      next: (response: PaginatedResponse<FigmaDesignToken>) => {
        this.tokens = response.data;
        this.totalItems = response.pagination.total;
        this.totalPages = response.pagination.totalPages;
        this.isLoadingTokens = false;
      },
      error: (error) => {
        console.error('Error loading tokens:', error);
        this.isLoadingTokens = false;
      }
    });
  }

  /**
   * Load components with pagination and search
   */
  loadComponents(page: number = 1) {
    this.isLoadingComponents = true;
    this.currentPage = page;

    this.figmaServerService.getComponents(page, this.itemsPerPage, this.searchTerm).subscribe({
      next: (response: PaginatedResponse<FigmaComponent>) => {
        // Initialize activePreviewTab for each component
        this.components = response.data.map(component => ({
          ...component,
          activePreviewTab: 'image' as 'image' | 'html'
        }));
        this.totalItems = response.pagination.total;
        this.totalPages = response.pagination.totalPages;
        this.isLoadingComponents = false;
      },
      error: (error) => {
        console.error('Error loading components:', error);
        this.isLoadingComponents = false;
      }
    });
  }

  /**
   * Load pages with pagination and search
   */
  loadPages(page: number = 1) {
    this.isLoadingPages = true;
    this.currentPage = page;

    this.figmaServerService.getPages(page, this.itemsPerPage, this.searchTerm).subscribe({
      next: (response: PaginatedResponse<FigmaPage>) => {
        this.pages = response.data;
        this.totalItems = response.pagination.total;
        this.totalPages = response.pagination.totalPages;
        this.isLoadingPages = false;
      },
      error: (error) => {
        console.error('Error loading pages:', error);
        this.isLoadingPages = false;
      }
    });
  }

  /**
   * Handle tab changes
   */
  onTabChange(tab: 'tokens' | 'components' | 'pages') {
    this.activeTab = tab;
    this.currentPage = 1;
    this.searchTerm = '';

    switch (tab) {
      case 'tokens':
        this.loadTokens();
        break;
      case 'components':
        this.loadComponents();
        break;
      case 'pages':
        this.loadPages();
        break;
    }
  }

  /**
   * Handle search
   */
  onSearch() {
    this.currentPage = 1;
    
    switch (this.activeTab) {
      case 'tokens':
        this.loadTokens();
        break;
      case 'components':
        this.loadComponents();
        break;
      case 'pages':
        this.loadPages();
        break;
    }
  }

  /**
   * Clear search
   */
  clearSearch() {
    this.searchTerm = '';
    this.onSearch();
  }

  /**
   * Handle page changes
   */
  onPageChange(page: number) {
    switch (this.activeTab) {
      case 'tokens':
        this.loadTokens(page);
        break;
      case 'components':
        this.loadComponents(page);
        break;
      case 'pages':
        this.loadPages(page);
        break;
    }
  }

  /**
   * Format token value for display
   */
  formatTokenValue(token: FigmaDesignToken): string {
    if (token.type === 'color') {
      return token.value;
    }
    if (token.type === 'spacing') {
      return `${token.value}px`;
    }
    if (token.type === 'typography') {
      return `${token.value}px`;
    }
    return token.value;
  }

  /**
   * Get token color preview
   */
  getTokenColorPreview(token: FigmaDesignToken): string {
    if (token.type === 'color') {
      return token.value;
    }
    return 'transparent';
  }

  /**
   * Get component preview
   */
  getComponentPreview(component: FigmaComponent): string {
    // This would typically show a preview image
    return `Component: ${component.name}`;
  }

  /**
   * Get component properties count
   */
  getComponentPropertiesCount(component: FigmaComponent): number {
    return component.properties ? Object.keys(component.properties).length : 0;
  }

  /**
   * Set component preview tab
   */
  setComponentPreviewTab(component: FigmaComponent, tab: 'image' | 'html') {
    component.activePreviewTab = tab;
    // Don't auto-generate HTML preview - let the iframe load it when needed
  }

  /**
   * Get component HTML preview URL
   */
  getComponentHtmlPreviewUrl(component: FigmaComponent): SafeResourceUrl {
    if (!component) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
    // Encode the component ID to handle colons and special characters
    const encodedId = encodeURIComponent(component.id);
    const url = `http://localhost:3200/api/mcp/figma/component-html-preview/${encodedId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * Load HTML preview for component
   */
  loadComponentHtmlPreview(component: FigmaComponent) {
    if (!component) {
      return;
    }
    
    console.log('🔄 Loading HTML preview for component:', component.name);
    
    // Set the HTML preview URL and mark as loaded
    component.htmlPreviewUrl = this.loadComponentHtmlPreviewUrl(component);
    component.htmlPreviewLoaded = true;
  }

  /**
   * Get HTML preview URL for component
   */
  loadComponentHtmlPreviewUrl(component: FigmaComponent): SafeResourceUrl {
    if (!component) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
    // Encode the component ID to handle colons and special characters
    const encodedId = encodeURIComponent(component.id);
    const url = `http://localhost:3200/api/mcp/figma/component-html-preview/${encodedId}?t=${Date.now()}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * Generate component HTML preview
   */
  generateComponentHtmlPreview(component: FigmaComponent) {
    if (!component) {
      return;
    }
    
    console.log('🌐 Generating HTML preview for component:', component.name);
    // The actual HTML generation will be handled by the backend when the iframe loads
  }

  /**
   * Refresh component HTML preview
   */
  refreshComponentHtmlPreview(component: FigmaComponent) {
    console.log('🔄 Refreshing component HTML preview for:', component.name);
    
    // Clear the cache for this component and force regeneration
    this.figmaServerService.clearComponentHtmlPreviewCache(component.id).subscribe({
      next: (response: any) => {
        console.log('🗑️ Cache cleared for component:', component.name);
        // Force regeneration by updating the URL with a new timestamp
        component.htmlPreviewUrl = this.loadComponentHtmlPreviewUrl(component);
      },
      error: (error: any) => {
        console.error('❌ Error clearing cache:', error);
      }
    });
  }

  /**
   * Export component HTML
   */
  exportComponentHtml(component: FigmaComponent) {
    if (!component) {
      return;
    }
    
    console.log('📥 Exporting component HTML for:', component.name);
    // Encode the component ID to handle colons and special characters
    const encodedId = encodeURIComponent(component.id);
    const url = `http://localhost:3200/api/mcp/figma/component-html-preview/${encodedId}/export`;
    window.open(url, '_blank');
  }

  /**
   * Generate Angular component
   */
  generateAngularComponent(component: FigmaComponent) {
    if (!component) {
      return;
    }
    
    console.log('⚡ Generating Angular component for:', component.name);
    
    this.figmaServerService.generateAngularComponent(component.id).subscribe({
      next: (response) => {
        console.log('✅ Angular component generated successfully:', response);
        alert(`Angular component "${component.name}" generated successfully!`);
      },
      error: (error) => {
        console.error('❌ Error generating Angular component:', error);
        alert(`Error generating Angular component: ${error.message}`);
      }
    });
  }

  /**
   * Regenerate all component HTML previews
   */
  regenerateAllComponentPreviews() {
    if (this.isRegeneratingAll) {
      return;
    }
    
    this.isRegeneratingAll = true;
    console.log('🔄 Regenerating all component HTML previews...');
    
    this.figmaServerService.clearAllComponentHtmlPreviewCache().subscribe({
      next: (response: any) => {
        console.log('🗑️ All component HTML preview caches cleared');
        
        // Force reload of all components to trigger regeneration
        this.loadComponents(this.currentPage);
        
        // Reset the flag after a delay to allow for regeneration
        setTimeout(() => {
          this.isRegeneratingAll = false;
          console.log('✅ All component HTML previews regenerated');
        }, 2000);
      },
      error: (error: any) => {
        console.error('❌ Error clearing all component caches:', error);
        this.isRegeneratingAll = false;
      }
    });
  }
} 
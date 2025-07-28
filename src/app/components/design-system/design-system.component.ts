import { Component, OnInit } from '@angular/core';
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

  constructor(private figmaServerService: FigmaServerService) {}

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
        this.components = response.data;
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
} 
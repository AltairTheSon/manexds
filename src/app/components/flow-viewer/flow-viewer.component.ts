import { Component, OnInit } from '@angular/core';
import { FigmaServerService } from '../../services/figma-server.service';

@Component({
  selector: 'app-flow-viewer',
  templateUrl: './flow-viewer.component.html',
  styleUrls: ['./flow-viewer.component.scss']
})
export class FlowViewerComponent implements OnInit {
  containers: any[] = [];
  currentContainer: any = null;
  currentPage: any = null;
  loading = false;
  error: string | null = null;
  activeTab: 'image' | 'html' = 'image';

  constructor(private figmaServerService: FigmaServerService) {}

  ngOnInit() {
    this.loadContainers();
  }

  loadContainers() {
    this.loading = true;
    this.error = null;

    this.figmaServerService.getContainers().subscribe({
      next: (containers) => {
        this.containers = containers;
        this.loading = false;
        console.log('📁 Loaded containers:', containers.length);
        
        // Set first container as current if available
        if (containers.length > 0) {
          this.currentContainer = containers[0];
          this.loadContainerPages(this.currentContainer.id);
        }
      },
      error: (error) => {
        this.error = 'Failed to load containers';
        this.loading = false;
        console.error('❌ Error loading containers:', error);
      }
    });
  }

  loadContainerPages(containerId: string) {
    this.loading = true;
    
    this.figmaServerService.getContainerPages(containerId).subscribe({
      next: (pages) => {
        if (this.currentContainer) {
          this.currentContainer.pages = pages;
          console.log(`📄 Loaded ${pages.length} pages for container: ${this.currentContainer.name}`);
          
          // Set first page as current if available
          if (pages.length > 0) {
            this.currentPage = pages[0];
            console.log('🎯 Set first page:', pages[0].name);
          }
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load container pages';
        this.loading = false;
        console.error('❌ Error loading container pages:', error);
      }
    });
  }

  selectContainer(container: any) {
    this.currentContainer = container;
    this.currentPage = null;
    this.loadContainerPages(container.id);
  }

  selectPage(page: any) {
    this.currentPage = page;
    console.log('🎯 Selected page:', page.name);
  }

  getContainerPages() {
    return this.containers;
  }

  getIndividualPages() {
    return this.currentContainer?.pages || [];
  }

  getClickableElements() {
    return this.currentPage?.flowData?.clickableElements || [];
  }

  getComponentInstances() {
    return this.currentPage?.flowData?.componentInstances || [];
  }

  getNavigationElements() {
    return this.currentPage?.flowData?.navigationElements || [];
  }

  getPageFlowData() {
    return this.currentPage?.flowData || {
      clickableElements: [],
      componentInstances: [],
      navigationElements: [],
      interactions: [],
      connections: []
    };
  }

  onElementClick(element: any) {
    console.log('🖱️ Clicked element:', element);
    // TODO: Implement navigation logic based on element interactions
  }

  getPageThumbnail(page: any): string {
    if (page.preview) {
      return page.preview;
    }
    
    // Generate a fallback placeholder using a data URL instead of external service
    if (page.bounds) {
      const width = Math.round(page.bounds.width);
      const height = Math.round(page.bounds.height);
      const text = page.name || 'Page Preview';
      
      // Create SVG with proper encoding
      const svgContent = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#667eea"/>
          <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dy=".3em">${text}</text>
        </svg>
      `;
      
      try {
        return `data:image/svg+xml;base64,${btoa(svgContent)}`;
      } catch (error) {
        console.warn('Failed to create SVG thumbnail, using default:', error);
      }
    }
    
    // Default fallback with proper encoding
    const defaultSvg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#667eea"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dy=".3em">Page Preview</text>
      </svg>
    `;
    
    try {
      return `data:image/svg+xml;base64,${btoa(defaultSvg)}`;
    } catch (error) {
      console.warn('Failed to create default SVG thumbnail:', error);
      // Return a simple colored div as fallback
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY3ZWVhIi8+PC9zdmc+';
    }
  }

  getPageDisplayName(page: any): string {
    if (page.isContainer) {
      return `📁 ${page.name} (${page.individualPagesCount || 0} pages)`;
    } else {
      return `📄 ${page.name}`;
    }
  }

  setActiveTab(tab: 'image' | 'html') {
    this.activeTab = tab;
    if (tab === 'html' && this.currentPage) {
      this.generateHtmlPreview();
    }
  }

  getHtmlPreviewUrl(): string {
    if (!this.currentPage) {
      return '';
    }
    // Return URL to the HTML preview endpoint
    return `http://localhost:3200/api/mcp/figma/html-preview/${this.currentPage.id}`;
  }

  generateHtmlPreview() {
    if (!this.currentPage) {
      return;
    }
    
    console.log('🌐 Generating HTML preview for:', this.currentPage.name);
    // The actual HTML generation will be handled by the backend
    // This method can be used for any frontend-specific preview logic
  }

  refreshHtmlPreview() {
    console.log('🔄 Refreshing HTML preview...');
    this.generateHtmlPreview();
  }

  exportHtmlPreview() {
    if (!this.currentPage) {
      return;
    }
    
    console.log('📥 Exporting HTML preview for:', this.currentPage.name);
    // Create a download link for the HTML preview
    const url = `http://localhost:3200/api/mcp/figma/html-preview/${this.currentPage.id}/export`;
    window.open(url, '_blank');
  }
} 
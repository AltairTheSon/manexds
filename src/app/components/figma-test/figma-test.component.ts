import { Component } from '@angular/core';

@Component({
  selector: 'app-figma-test',
  templateUrl: './figma-test.component.html',
  styleUrls: ['./figma-test.component.scss']
})
export class FigmaTestComponent {
  accessToken = '';
  fileId = '6zbyXDOYjJsJW52P6iZ3hL';
  isTesting = false;
  result: any = null;
  error: string | null = null;

  async testConnection() {
    if (!this.accessToken || !this.fileId) {
      this.error = 'Please enter both access token and file ID.';
      return;
    }

    this.isTesting = true;
    this.error = null;
    this.result = null;

    try {
      // Make direct request to Figma API
      const response = await fetch(`https://api.figma.com/v1/files/${this.fileId}`, {
        method: 'GET',
        headers: {
          'X-Figma-Token': this.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      this.result = {
        success: true,
        fileInfo: {
          name: data.name,
          lastModified: new Date(data.lastModified).toLocaleString(),
          version: data.version,
          pages: Object.keys(data.document.children || {}).length,
          components: Object.keys(data.components || {}).length,
          styles: Object.keys(data.styles || {}).length
        }
      };

    } catch (error: any) {
      let errorMessage = 'Failed to connect to Figma';
      
      if (error.message.includes('403')) {
        errorMessage = 'Invalid access token. Please check your Figma personal access token.';
      } else if (error.message.includes('404')) {
        errorMessage = 'File not found. Please check your file ID.';
      } else if (error.message.includes('401')) {
        errorMessage = 'Unauthorized. Please check your access token.';
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      
      this.error = errorMessage;
    } finally {
      this.isTesting = false;
    }
  }
}
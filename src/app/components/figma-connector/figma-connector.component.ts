import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FigmaServerService } from '../../services/figma-server.service';

@Component({
  selector: 'app-figma-connector',
  templateUrl: './figma-connector.component.html',
  styleUrls: ['./figma-connector.component.scss']
})
export class FigmaConnectorComponent implements OnInit {
  connectionForm: FormGroup;
  isConnecting = false;
  connectionStatus: 'idle' | 'connecting' | 'success' | 'error' = 'idle';
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private figmaService: FigmaServerService
  ) {
    this.connectionForm = this.fb.group({
      accessToken: ['', [Validators.required]],
      fileId: ['', [Validators.required]],
      teamId: ['']
    });
  }

  ngOnInit(): void {
    // Pre-fill with default file ID if available
    this.connectionForm.patchValue({
      fileId: '6zbyXDOYjJsJW52P6iZ3hL'
    });
  }

  async connectToFigma(): Promise<void> {
    if (this.connectionForm.invalid) {
      return;
    }

    this.isConnecting = true;
    this.connectionStatus = 'connecting';
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const formData = this.connectionForm.value;
      
      // Test the connection directly with Figma API
      const response = await fetch(`https://api.figma.com/v1/files/${formData.fileId}`, {
        method: 'GET',
        headers: {
          'X-Figma-Token': formData.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const fileData = await response.json();
      
      // Connection successful
      this.connectionStatus = 'success';
      this.successMessage = `Successfully connected to Figma! File: ${fileData.name}`;
      
      // Store credentials in localStorage for future use
      localStorage.setItem('figma_access_token', formData.accessToken);
      localStorage.setItem('figma_file_id', formData.fileId);
      
      // Redirect to dashboard after successful connection
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error: any) {
      this.connectionStatus = 'error';
      console.error('Connection error details:', error);
      
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
      
      this.errorMessage = errorMessage;
    } finally {
      this.isConnecting = false;
    }
  }

  getAccessTokenHelp(): string {
    return `To get your Figma access token:
1. Go to Figma.com and sign in
2. Click on your profile icon in the top right
3. Go to Settings > Account
4. Scroll down to Personal access tokens
5. Click "Generate new token"
6. Give it a name and copy the token`;
  }

  getFileIdHelp(): string {
    return `To find your Figma file ID:
1. Open your Figma file in the browser
2. Look at the URL: https://www.figma.com/file/FILE_ID/...
3. Copy the FILE_ID part (it's a long string of letters and numbers)`;
  }

  resetForm(): void {
    this.connectionForm.reset();
    this.connectionForm.patchValue({
      fileId: '6zbyXDOYjJsJW52P6iZ3hL'
    });
    this.connectionStatus = 'idle';
    this.errorMessage = '';
    this.successMessage = '';
  }
}
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
      
      // Test the connection
      const success = await this.figmaService.initializeFigmaConnection({
        accessToken: formData.accessToken,
        fileId: formData.fileId,
        teamId: formData.teamId
      }).toPromise();

      if (success) {
        this.connectionStatus = 'success';
        this.successMessage = 'Successfully connected to Figma! Your design system is now loading.';
        
        // Redirect to dashboard after successful connection
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        this.connectionStatus = 'error';
        this.errorMessage = 'Failed to connect to Figma. Please check your access token and file ID.';
      }
    } catch (error: any) {
      this.connectionStatus = 'error';
      console.error('Connection error details:', error);
      
      if (error.status === 400) {
        this.errorMessage = error.error?.error || 'Invalid credentials. Please check your access token and file ID.';
      } else if (error.status === 0) {
        this.errorMessage = 'Network error. Please check your internet connection and try again.';
      } else {
        this.errorMessage = error.error?.error || error.message || 'An unexpected error occurred while connecting to Figma.';
      }
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
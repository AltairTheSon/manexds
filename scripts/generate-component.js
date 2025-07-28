const fs = require('fs');
const path = require('path');

/**
 * Generate Angular component from Figma design specs
 * 
 * Usage:
 * node scripts/generate-component.js --name Button --variant primary,secondary,outline --size sm,md,lg
 */

// Parse command line arguments
const args = process.argv.slice(2);
const componentName = args.find(arg => arg.startsWith('--name='))?.split('=')[1];
const variants = args.find(arg => arg.startsWith('--variant='))?.split('=')[1]?.split(',') || [];
const sizes = args.find(arg => arg.startsWith('--size='))?.split('=')[1]?.split(',') || [];

if (!componentName) {
  console.error('❌ Please provide a component name: --name=ComponentName');
  process.exit(1);
}

/**
 * Generate component files
 */
function generateComponent(name, variants = [], sizes = []) {
  const kebabName = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  const componentDir = path.join(__dirname, `../src/design-system/components/${kebabName}`);
  
  // Create component directory
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // Generate TypeScript component
  const tsContent = generateTypeScript(name, kebabName, variants, sizes);
  fs.writeFileSync(path.join(componentDir, `${kebabName}.component.ts`), tsContent);

  // Generate HTML template
  const htmlContent = generateHTML(name, kebabName, variants, sizes);
  fs.writeFileSync(path.join(componentDir, `${kebabName}.component.html`), htmlContent);

  // Generate SCSS styles
  const scssContent = generateSCSS(name, kebabName, variants, sizes);
  fs.writeFileSync(path.join(componentDir, `${kebabName}.component.scss`), scssContent);

  // Generate spec file
  const specContent = generateSpec(name, kebabName);
  fs.writeFileSync(path.join(componentDir, `${kebabName}.component.spec.ts`), specContent);

  console.log(`✅ Generated ${name} component in: ${componentDir}`);
}

/**
 * Generate TypeScript component file
 */
function generateTypeScript(name, kebabName, variants, sizes) {
  const variantTypes = variants.length > 0 ? variants.map(v => `'${v}'`).join(' | ') : 'string';
  const sizeTypes = sizes.length > 0 ? sizes.map(s => `'${s}'`).join(' | ') : 'string';

  return `import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

export type ${name}Variant = ${variantTypes || 'string'};
export type ${name}Size = ${sizeTypes || 'string'};

@Component({
  selector: 'ds-${kebabName}',
  templateUrl: './${kebabName}.component.html',
  styleUrls: ['./${kebabName}.component.scss']
})
export class ${name}Component {
  @Input() variant: ${name}Variant = '${variants[0] || 'default'}';
  @Input() size: ${name}Size = '${sizes[0] || 'md'}';
  @Input() disabled = false;
  @Input() loading = false;

  @Output() clicked = new EventEmitter<void>();

  @HostBinding('class') get hostClasses(): string {
    const classes = ['ds-${kebabName}'];
    if (this.variant) classes.push(\`ds-${kebabName}--\${this.variant}\`);
    if (this.size) classes.push(\`ds-${kebabName}--\${this.size}\`);
    if (this.disabled) classes.push('ds-${kebabName}--disabled');
    if (this.loading) classes.push('ds-${kebabName}--loading');
    return classes.join(' ');
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}`;
}

/**
 * Generate HTML template
 */
function generateHTML(name, kebabName, variants, sizes) {
  return `<div class="ds-${kebabName}__container">
  <ng-content></ng-content>
</div>`;
}

/**
 * Generate SCSS styles
 */
function generateSCSS(name, kebabName, variants, sizes) {
  let scss = `.ds-${kebabName} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ds-font-family-sans);
  transition: all var(--ds-transition-base);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--ds-primary-500);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Size variants
`;

  // Add size variants
  sizes.forEach(size => {
    scss += `  &--${size} {
    // Add ${size} size styles from Figma
    // Example: padding, font-size, etc.
  }

`;
  });

  // Add variant styles
  variants.forEach(variant => {
    scss += `  &--${variant} {
    // Add ${variant} variant styles from Figma
    // Example: background-color, color, border, etc.
  }

`;
  });

  scss += `  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--loading {
    position: relative;
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

.ds-${kebabName}__container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-space-2);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

  return scss;
}

/**
 * Generate spec file
 */
function generateSpec(name, kebabName) {
  return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${name}Component } from './${kebabName}.component';

describe('${name}Component', () => {
  let component: ${name}Component;
  let fixture: ComponentFixture<${name}Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ${name}Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(${name}Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event when clicked', () => {
    const spy = jest.spyOn(component.clicked, 'emit');
    component.onClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit when disabled', () => {
    component.disabled = true;
    const spy = jest.spyOn(component.clicked, 'emit');
    component.onClick();
    expect(spy).not.toHaveBeenCalled();
  });
});`;
}

/**
 * Update design system module
 */
function updateDesignSystemModule(componentName, kebabName) {
  const modulePath = path.join(__dirname, '../src/design-system/design-system.module.ts');
  
  if (!fs.existsSync(modulePath)) {
    console.warn('⚠️  Design system module not found. Please add the component manually.');
    return;
  }

  let moduleContent = fs.readFileSync(modulePath, 'utf8');
  
  // Add import
  const importStatement = `import { ${componentName}Component } from './components/${kebabName}/${kebabName}.component';`;
  const importIndex = moduleContent.lastIndexOf('import');
  const nextLineIndex = moduleContent.indexOf('\n', importIndex) + 1;
  
  moduleContent = moduleContent.slice(0, nextLineIndex) + importStatement + '\n' + moduleContent.slice(nextLineIndex);
  
  // Add to COMPONENTS array
  const componentsMatch = moduleContent.match(/const COMPONENTS = \[([\s\S]*?)\];/);
  if (componentsMatch) {
    const components = componentsMatch[1].split('\n').filter(line => line.trim());
    components.push(`  ${componentName}Component`);
    const newComponentsArray = `const COMPONENTS = [\n${components.join(',\n')}\n];`;
    moduleContent = moduleContent.replace(componentsMatch[0], newComponentsArray);
  }
  
  fs.writeFileSync(modulePath, moduleContent);
  console.log(`✅ Updated design system module with ${componentName}Component`);
}

/**
 * Main function
 */
function main() {
  console.log(`🔨 Generating ${componentName} component...`);
  
  generateComponent(componentName, variants, sizes);
  updateDesignSystemModule(componentName, componentName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase());
  
  console.log('\n🎉 Component generation complete!');
  console.log('\nNext steps:');
  console.log('1. Review the generated component files');
  console.log('2. Update the styles with your Figma design values');
  console.log('3. Test the component');
  console.log('4. Add the component to your app');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  generateComponent,
  generateTypeScript,
  generateHTML,
  generateSCSS,
  generateSpec
}; 
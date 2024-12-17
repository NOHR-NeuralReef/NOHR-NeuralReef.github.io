# Neural Reef Website Tasks

## Project Structure
```
src/
├── app/
│   ├── about/                  # About section
│   │   ├── progress/
│   │   ├── vision/
│   │   └── about.component.ts
│   │
│   ├── articles/              # Articles section
│   │   ├── article-detail/
│   │   ├── article-grid/
│   │   └── article-filters/
│   │
│   ├── components/           # Shared components
│   │   ├── error-boundary/
│   │   ├── footer/
│   │   ├── icon/
│   │   ├── loading-spinner/
│   │   └── loading-state/
│   │
│   ├── contact/             # Contact section
│   │
│   ├── home/               # Home section
│   │
│   ├── interfaces/        # TypeScript interfaces
│   │   ├── about.interface.ts
│   │   ├── article.interface.ts
│   │   └── module.interface.ts
│   │
│   ├── modules/          # modules section
│   │   ├── module-detail/
│   │   ├── module-grid/
│   │   └── module-filters/
│   │
│   ├── navbar/          # Navigation
│   │
│   ├── services/       # Application services
│   │   ├── data.service.ts
│   │   ├── icon.service.ts
│   │   └── api.service.ts
│   │
│   └── shared/        # Shared functionality
```

## Cleanup Tasks

### 1. Files to Delete
- [x] src/app/application/**
- [x] src/app/quotes/**
- [x] src/app/quote/**
- [x] src/app/app-article/**
- [x] src/app/admin/**

### 2. Components to Update for Angular 19

#### Core Updates
- [ ] Convert all components to standalone
- [ ] Update to new control flow syntax (@if, @for)
- [ ] Use signals for state management
- [ ] Implement deferrable views with @defer

#### Component Updates
- [ ] app.component.ts
  - Use standalone architecture
  - Implement new router setup
  - Add font loading check

- [ ] navbar.component.ts
  - Convert to standalone
  - Use Material Icons
  - Implement responsive menu

- [ ] footer.component.ts
  - Convert to standalone
  - Use Material Icons
  - Add newsletter form

### 3. Angular 19 Features to Implement
- [ ] New Control Flow
```typescript
@if (condition) {
  // template
} @else {
  // else template
}

@for (item of items; track item.id) {
  // template
}
```

- [ ] Deferrable Views
```typescript
@defer {
  <heavy-component />
} @loading {
  <loading-spinner />
}
```

- [ ] Required Inputs
```typescript
@Input({ required: true }) data!: DataType;
```

### 4. Performance Optimizations
- [ ] Implement SSR (Server-Side Rendering)
- [ ] Add build-time prerendering
- [ ] Enable hydration
- [ ] Optimize images with NgOptimizedImage
- [ ] Implement lazy loading

### 5. Development Guidelines

#### Component Structure
```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (data()) {
      <div>{{ data() }}</div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FeatureComponent {
  data = signal<string>('');
}
```

#### Service Structure
```typescript
@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private data = signal<Data[]>([]);
  
  readonly data$ = computed(() => this.data());
}
```

### 6. Testing Requirements
- [ ] Component tests with TestBed
- [ ] Service tests
- [ ] E2E tests with Cypress
- [ ] Performance testing

## Commands
```bash
# Development server
ng serve

# Production build with SSR
ng build && ng run app-name:server

# Run tests
ng test

# E2E tests
ng e2e
```

## Notes
- Use standalone components
- Implement signals for state management
- Use new control flow syntax
- Enable SSR and hydration
- Follow Angular 19 best practices

## Resources
- [Angular.dev Documentation](https://angular.dev)
- [Angular 19 Update Guide](https://update.angular.io)
- [Angular Performance Guide](https://angular.dev/guide/performance)

## GitHub Pages Specific Tasks

### 1. Static Site Optimization
- [ ] Update angular.json for GitHub Pages
```json
{
  "projects": {
    "neural-reef": {
      "architect": {
        "build": {
          "options": {
            "baseHref": "/neural-reef/",
            "outputPath": "docs"
          }
        }
      }
    }
  }
}
```

- [ ] Configure 404 handling
```html
<!-- docs/404.html -->
<!DOCTYPE html>
<html>
  <head>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
</head>
</html>
```

### 2. Build & Deployment
- [ ] Setup GitHub Actions workflow
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: docs
```

### 3. Performance Optimizations for Static Sites
- [ ] Implement preloading
```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading())
  ]
};
```

- [ ] Add PWA support
```bash
ng add @angular/pwa
```

- [ ] Optimize assets
  - Compress images
  - Use WebP format
  - Implement lazy loading
  - Add caching headers

### 4. Development Guidelines

#### Static Build Configuration
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  baseUrl: '/neural-reef',  // GitHub Pages base URL
  apiUrl: 'https://api.neuralreef.ai'
};
```

#### Commands
```bash
# Development
ng serve

# Build for GitHub Pages
ng build --configuration production --base-href="/neural-reef/"

# Test production build locally
npx angular-http-server --path docs -p 8080
```

### 5. Component Updates
- [ ] Update routing for GitHub Pages
```typescript
@Component({
  // ...
})
export class AppComponent {
  constructor(private router: Router) {
    // Handle GitHub Pages redirect
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
      history.replaceState(null, '', redirect);
    }
  }
}
```

### 6. Asset Management
- [ ] Update asset paths for GitHub Pages
```typescript
// In components
imageUrl = 'assets/images/logo.webp';  // Relative path
```

- [ ] Add cache busting
```json
{
  "projects": {
    "neural-reef": {
      "architect": {
        "build": {
          "options": {
            "outputHashing": "all"
          }
        }
      }
    }
  }
}
```

### 7. Testing
- [ ] Add E2E tests for static deployment
- [ ] Test all routes with base href
- [ ] Verify asset loading
- [ ] Check offline functionality

## Build Process
1. Clean build directory
2. Build with production config
3. Copy 404.html
4. Test build locally
5. Deploy to GitHub Pages

## Notes
- All API calls must be to HTTPS endpoints
- Assets must use relative paths
- Cache static assets aggressively
- Implement proper 404 handling
- Test thoroughly with base href

## Resources
- [Angular GitHub Pages](https://angular.io/guide/deployment#deploy-to-github-pages)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Angular PWA Guide](https://angular.io/guide/service-worker-getting-started)
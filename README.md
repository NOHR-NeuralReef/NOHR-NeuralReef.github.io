# NOHR Neural Reef

## Data Structure and Files

### Core Data Files
- `src/assets/data.min.js` - Main data file containing all application data
- `src/assets/js/init-data.js` - Initializes data structure
- `src/assets/js/dehydrate.js` - Handles data hydration/dehydration
- `src/assets/js/app-loader.js` - Loads application and data

### Type Definitions
- `src/app/types/global.d.ts` - Global window.data interface
- `src/app/interfaces/data.types.ts` - Component interfaces
- `src/assets/data.min.d.ts` - Data structure type definitions

### Service Layer
- `src/app/services/data.service.ts` - Provides typed data access to components

### Build Output
The dist/ folder contains compiled versions:
- `dist/assets/data.min.js`
- `dist/assets/js/init-data.js`
- `dist/assets/js/dehydrate.js`
- `dist/assets/js/app-loader.js`

### Domain Configuration
- `src/CNAME` - Custom domain configuration
- `dist/CNAME` - Built domain configuration

## Making Changes

### Data Updates
1. Modify `src/assets/data.min.js`
2. Update type definitions if structure changes
3. Build and deploy

### Type Updates
1. Update interfaces in `src/app/interfaces/data.types.ts`
2. Update global types in `src/app/types/global.d.ts`
3. Update service if needed

### Build Process
```bash
# Build application
npm run build

# Deploy
npm run deploy -- --no-silent
```

## File Structure
```
src/
├── assets/
│   ├── data.min.js         # Main data
│   ├── data.min.d.ts       # Type definitions
│   └── js/
│       ├── init-data.js    # Data initialization
│       ├── dehydrate.js    # Data hydration
│       └── app-loader.js   # Application loader
├── app/
│   ├── types/
│   │   └── global.d.ts     # Global types
│   ├── interfaces/
│   │   └── data.types.ts   # Component interfaces
│   └── services/
│       └── data.service.ts # Data service
``` 
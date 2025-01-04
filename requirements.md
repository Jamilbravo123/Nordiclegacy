# Nordic Legacy Project Requirements

## Technical Stack

### Frontend
- React 18.3.1 with TypeScript
- Vite for build tooling and development server
- TailwindCSS for styling
- React Router DOM for routing
- Zustand for state management
- Recharts for data visualization
- Lucide React for icons

### Backend
- Supabase for:
  - Authentication
  - Database (PostgreSQL)
  - Row Level Security (RLS)
  - Edge Functions
  - Real-time subscriptions

### Development Tools
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Git for version control

## Code Organization & Best Practices

### File Structure Guidelines
1. Create small and focused files
2. Break down large files into multiple smaller modules
3. Each file should have a single, clear responsibility
4. Extract reusable logic into separate utility files

### Component Organization
- Components should be modular and reusable
- Separate business logic from presentation
- Use hooks for shared functionality
- Keep components focused on a single responsibility

## Project Restrictions

### Protected Migration Files
The following migration files are protected and require explicit permission to modify:
- All files in `supabase/migrations/` directory with prefixes:
  - 0001 through 0046
  - 20241230195107_velvet_oasis.sql
  - 20241230195300_pale_cherry.sql

### Environment Variables
- `.env` file is restricted and not visible to development tools
- Environment variables must be properly configured for:
  - Supabase URL
  - Supabase Anonymous Key
  - Other service credentials

## Features

### Public Website
1. Landing Page
   - Hero section
   - About section
   - Team showcase
   - Portfolio display
   - Contact form

2. Authentication
   - Email/password signup
   - Secure login
   - Password recovery

### Member Dashboard
1. Overview
   - Membership status
   - Points tracking
   - Recent activity

2. Benefits Management
   - View/redeem benefits
   - Benefits history
   - Tier-specific offerings

3. Points System
   - Points tracking
   - History
   - Earning opportunities

4. Profile Management
   - Personal information
   - Preferences
   - Settings

### Admin Dashboard
1. Member Management
   - Directory
   - Status management
   - Tier management

2. Analytics
   - Membership trends
   - Engagement metrics
   - Points analytics

3. Notifications
   - Create/schedule messages
   - Target specific tiers
   - Delivery tracking

4. Access Control
   - Role management
   - Permission settings
   - Security policies

## Security Requirements

### Data Protection
- Row Level Security (RLS) implementation
- Role-based access control
- Secure authentication
- Data encryption
- Session management

### API Security
- Protected endpoints
- Request validation
- Rate limiting
- Error handling

## Performance Requirements

### Optimization
- Image optimization
- Lazy loading
- Code splitting
- Caching strategies
- Database indexing

### Real-time Features
- Live updates
- WebSocket connections
- Efficient data synchronization

## Deployment

### Frontend
- Netlify deployment
- Environment configuration
- Build optimization

### Backend
- Supabase configuration
- Database migrations
- Edge functions setup

## Monitoring

### Error Tracking
- Error logging
- Performance monitoring
- User analytics

### Metrics
- Engagement tracking
- Conversion rates
- System health

## Documentation Requirements

### Code Documentation
- Clear comments
- Type definitions
- Function documentation
- Component documentation

### Technical Documentation
- API documentation
- Deployment guides
- Security protocols
- Maintenance procedures
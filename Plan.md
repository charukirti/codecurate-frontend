# Plan: Frontend Demo for CodeCurate Backend

**TL;DR:** Build a complete end-to-end demo showcasing the CodeCurate platform user journey: anonymous resource discovery → user authentication → community interaction (reviews, likes, replies). This will include 7-8 new pages/components covering browsing, auth, resource details, and user profiles. The demo uses live data—users create accounts, admins add resources, and the community rates/reviews them.

## Steps

### Phase 1: Foundation & Layout
- [ ] **1.1** Update `src/routes/__root.tsx` with a persistent header/nav component containing:
  - Logo/branding
  - Search input
  - Auth state display (login/logout links or user menu)
  - This becomes the shell for all demo pages

- [ ] **1.2** Create `src/components/layout/Header.tsx` with:
  - Navigation links (Home, Resources, Profile)
  - Login/Signup buttons (conditional on auth state)
  - User menu dropdown when authenticated

### Phase 2: Authentication Flow
- [ ] **2.1** Create `src/routes/auth/signup.tsx` - Sign-up page with form:
  - Fields: name, email, password, password confirm
  - Form validation with Zod
  - Success → redirect to resources page or email verification message
  - Link to signin page

- [ ] **2.2** Create `src/routes/auth/signin.tsx` - Login page with:
  - Email/password form
  - "Remember me" option
  - "Forgot password?" link
  - Redirect to resources page on success
  - Link to signup page

- [ ] **2.3** Create `src/features/auth/hooks/useAuth.ts` - Custom hook for:
  - Getting current user from API (`GET /api/v1/users/me`)
  - Loading/error states
  - Token refresh logic (axios already handles this)

- [ ] **2.4** Create `src/features/auth/components/ProtectedRoute.tsx` - Middleware component:
  - Checks authentication status
  - Redirects unauth users to signin
  - Shows loading state while fetching user

### Phase 3: Resource Discovery (Anonymous Browsing)
- [ ] **3.1** Update `src/routes/index.tsx` as home/landing page showing:
  - Hero section with "Discover Coding Tutorials"
  - Resource browsing grid below (reuse resources list component)
  - Optional: Featured/trending resources carousel

- [ ] **3.2** Create `src/routes/resources/index.tsx` - Resources listing page with:
  - Grid/list view of all resources
  - Filters (codeLang, topic dropdown)
  - Search input for title/instructor name
  - Pagination
  - Click resource to view details

- [ ] **3.3** Create `src/features/resources/components/ResourceCard.tsx` - Card component showing:
  - Thumbnail image
  - Title, instructor name, published date
  - Code language & topic badges
  - Average rating stars
  - Link to detail page

- [ ] **3.4** Create `src/features/resources/api/index.ts` - API hooks:
  - `useResources()` - Fetch all with filters/search (React Query)
  - `useResourceDetail(id)` - Fetch single resource + reviews
  - `useRelatedResources(id)` - Fetch related items

### Phase 4: Resource Details & Reviews
- [ ] **4.1** Create `src/routes/resources/$resourceId/index.tsx` - Resource detail page showing:
  - Full resource info (thumbnail, title, description, instructor, stats)
  - YouTube embed or link
  - Average rating and review count
  - List of reviews below
  - "Write a Review" button (if authenticated)
  - Related resources carousel/section

- [ ] **4.2** Create `src/features/resources/components/ReviewList.tsx` - Display all reviews:
  - Reviewer name, avatar placeholder, rating stars
  - Review text, creation timestamp
  - Like count and like button (if authenticated)
  - Reply count with expand/collapse replies section

- [ ] **4.3** Create `src/features/resources/components/ReviewReplyThread.tsx` - Nested replies:
  - List of replies under a review
  - Author, text, timestamp
  - Edit/delete buttons (if current user is author)
  - "Reply" button (if authenticated)

- [ ] **4.4** Create `src/features/resources/components/CreateReviewForm.tsx` - Modal/form for authenticated users:
  - Star rating picker (1-10)
  - Review text textarea
  - Tag selection (multi-select from available tags)
  - Submit/cancel buttons
  - API call to POST review with error handling

- [ ] **4.5** Create `src/features/resources/api/reviewActions.ts` - Mutations:
  - `createReview()` - POST review with React Query mutation
  - `updateReview()` - PATCH existing review
  - `deleteReview()` - DELETE review
  - `likeReview()` - POST like
  - `unlikeReview()` - DELETE like
  - `replyToReview()` - POST reply
  - `deleteReply()` - DELETE reply

### Phase 5: User Profile & Account
- [ ] **5.1** Create `src/routes/profile/index.tsx` - User profile page (protected):
  - Display user name, email, username, avatar placeholder
  - Edit button → profile edit form modal
  - User's review history (list of all reviews by user)
  - Favorites or saved resources section (optional if backend supports)
  - Delete account button (with confirm dialog)

- [ ] **5.2** Create `src/features/auth/api/userActions.ts` - User API mutations:
  - `updateProfile()` - PATCH `/api/v1/users/me`
  - `deleteAccount()` - DELETE `/api/v1/users/me`

### Phase 6: Admin Features (Bonus)
- [ ] **6.1** Create `src/routes/admin/add-resource.tsx` (optional, protected to admins):
  - Form with YouTube URL input
  - Submit button to POST `/api/v1/resources`
  - Admin check middleware in `src/features/auth/components/ProtectedRoute.tsx`

### Phase 7: Polish & UX
- [ ] **7.1** Create `src/components/LoadingSpinner.tsx` & `src/components/ErrorBoundary.tsx` - Shared error/loading states

- [ ] **7.2** Update `src/config/env.ts` with API endpoints if needed

- [ ] **7.3** Add React Query's QueryClientProvider setup in `src/main.tsx` if not already present

## File Summary
- **New pages**: 8 (signup, signin, resources list, resource detail, replies, profile, admin add-resource, profile edit)
- **New components**: 10+ (Header, ProtectedRoute, ResourceCard, ReviewList, ReviewForm, etc.)
- **New API hooks**: ~2 files (resources, reviews)
- **UI Library**: Use existing `src/components/ui/*` (Button, Card, Input, Select, Textarea, etc.)
- **Styling**: Tailwind CSS v4 (already configured)

## Verification

### Manual Testing Flow
- [ ] Visit home → browse resources anonymously ✓
- [ ] Click resource → see details & reviews ✓
- [ ] Click "Sign Up" → create account → verify workflow ✓
- [ ] Post review with rating & tags ✓
- [ ] Like a review ✓
- [ ] Reply to review ✓
- [ ] View own profile & review history ✓
- [ ] (Admin) Add new resource via YouTube URL ✓

### Prerequisites
- Backend running on configured API URL
- At least one admin user + one test resource in database
- Email service configured (or mock for signup verification)

## Key Decisions
- **Feature priority**: Auth → Browse → Review → Profile (MVP → Full demo)
- **Data model**: Live data; users sign up and create real accounts
- **Admin features**: Included as optional bonus demo
- **UI components**: Reuse existing shadcn-style components in `src/components/ui/`
- **State management**: React Query for server state + local component state for forms

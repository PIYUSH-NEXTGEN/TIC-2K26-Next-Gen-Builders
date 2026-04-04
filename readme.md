# Next-Gen Skillforge

> Technocrats Innovation Challenge - 2k26
>
> Team Name: Next-Gen Builders

Next-Gen Skillforge is an AI-assisted career profile analyzer built with Next.js. The app lets users submit professional links such as GitHub, LinkedIn, a resume, a portfolio, Twitter, and Dev.to, then scrapes the public pages, extracts skills, generates AI-powered summaries, recommends roles, and builds a learning path based on the detected profile.

## What It Does

- Scrapes public professional links and extracts skill signals from the content.
- Uses an AI provider to generate technical and soft skill analysis.
- Produces an AI summary with strengths, gaps, industry relevance, and top skills.
- Generates job recommendations with fit reasons, salary ranges, and locations.
- Builds a learning path with books, courses, videos, and documentation links.
- Persists theme, profile links, and analysis state in a browser session.
- Supports a manual profile snapshot endpoint that writes generated profile data to `lib/generatedUserProfile.ts` with a JSON fallback.

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- iron-session
- Axios
- Cheerio

## Project Structure

- `app/page.tsx` - Main dashboard UI and profile analysis flow.
- `app/layout.tsx` - Root layout, metadata, fonts, and theme bootstrapping.
- `app/api/analyze-profile/route.ts` - Scrapes links, calls the AI analysis pipeline, and returns profile insights.
- `app/api/session/preferences/route.ts` - Saves and loads theme, link, and UI preferences.
- `app/api/session/analysis/route.ts` - Stores the latest analysis in the session.
- `app/api/profile/snapshot/route.ts` - Writes a generated profile snapshot to `lib/generatedUserProfile.ts` or `lib/generatedUserProfile.json`.
- `app/components/ProfessionalLinkInputs.tsx` - Early standalone link input component kept in the repo.
- `lib/ai.ts` - AI provider selection and profile analysis helpers.
- `lib/session.ts` - Session configuration and persistence helpers.
- `lib/types.ts` - Shared profile, recommendation, and learning path types.
- `lib/profileDefaults.ts` - Default empty profile state used by the dashboard.
- `lib/utils.ts` - Shared utility helpers.

## User Flow

1. Enter one or more professional links.
2. Click Analyze Profile.
3. The app verifies the links, scrapes public content, and extracts skill signals.
4. The AI layer converts the text into technical skills, soft skills, summary insights, recommendations, and a learning path.
5. Results are saved in the browser session so the dashboard can restore the latest profile on reload.

## API Routes

- `POST /api/analyze-profile` - Accepts social/profile links and returns extracted skills plus AI-generated profile insights.
- `GET /api/session/preferences` - Reads saved theme, link, and UI preferences.
- `POST /api/session/preferences` - Saves theme, link, and UI preferences.
- `GET /api/session/analysis` - Returns the latest saved analysis if it matches the current link set.
- `POST /api/session/analysis` - Saves the current analysis payload to the session.
- `DELETE /api/session/analysis` - Clears the saved analysis from the session.
- `POST /api/profile/snapshot` - Writes a serialized profile snapshot to `lib/generatedUserProfile.ts`, with `lib/generatedUserProfile.json` as fallback.

## Notes

- The app stores session data in an encrypted cookie via `iron-session`.
- The dashboard is designed for public links; private or inaccessible pages may be rejected during verification.
- The generated snapshot files are derived artifacts and can be regenerated at any time.

## Future Enhancements

These are strong next steps that can make the product feel more startup-ready and commercially valuable:

- User accounts and persistent profiles so users can track their growth over time.
- Recruiter and hiring-manager views for evaluating candidates from a single dashboard.
- Skill-gap roadmap with weekly milestones, progress tracking, and reminders.
- Integration with GitHub, LinkedIn, Notion, and Google Drive for deeper profile signals.
- Personalized job feed with saved roles, alerts, and match history.
- Team analytics for bootcamps, colleges, or internal talent programs.
- Multi-provider AI orchestration with fallback routing, cost controls, and response caching.
- Privacy and compliance controls such as consent management, data retention settings, and deletion requests.

If expanded strategically, these features could evolve Next-Gen Skillforge from a profile analyzer into a career intelligence platform.
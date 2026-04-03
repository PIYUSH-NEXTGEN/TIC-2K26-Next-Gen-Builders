import { NextRequest, NextResponse } from 'next/server';

interface SocialLinks {
  github?: string;
  linkedin?: string;
  resume?: string;
  portfolio?: string;
  twitter?: string;
  devto?: string;
}

interface Skill {
  name: string;
  confidence: number;
  source: string;
}

export async function POST(request: NextRequest) {
  try {
    const { links }: { links: SocialLinks } = await request.json();
    const extractedSkills: Skill[] = [];

    // Scrape GitHub
    if (links.github) {
      const githubSkills = await scrapeGitHub(links.github);
      extractedSkills.push(...githubSkills);
    }

    // Scrape LinkedIn (basic - would need LinkedIn API in production)
    if (links.linkedin) {
      const linkedinSkills = await scrapeLinkedIn(links.linkedin);
      extractedSkills.push(...linkedinSkills);
    }

    // Scrape Portfolio
    if (links.portfolio) {
      const portfolioSkills = await scrapePortfolio(links.portfolio);
      extractedSkills.push(...portfolioSkills);
    }

    // Scrape Dev.to
    if (links.devto) {
      const devtoSkills = await scrapeDevTo(links.devto);
      extractedSkills.push(...devtoSkills);
    }

    return NextResponse.json({ skills: extractedSkills });
  } catch (error) {
    console.error('Error analyzing profile:', error);
    return NextResponse.json(
      { error: 'Failed to analyze profile' },
      { status: 500 }
    );
  }
}

async function scrapeGitHub(url: string): Promise<Skill[]> {
  try {
    const username = url.split('/').pop();
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    const skills: Skill[] = [];
    const languageSet = new Set<string>();

    // Extract languages from repositories
    for (const repo of repos.slice(0, 10)) {
      if (repo.language) {
        languageSet.add(repo.language);
      }
    }

    languageSet.forEach((lang) => {
      skills.push({
        name: lang,
        confidence: 0.7,
        source: 'GitHub',
      });
    });

    return skills;
  } catch {
    return [];
  }
}

async function scrapeLinkedIn(url: string): Promise<Skill[]> {
  // LinkedIn scraping requires authentication; return placeholder
  return [
    {
      name: 'Leadership',
      confidence: 0.5,
      source: 'LinkedIn',
    },
  ];
}

async function scrapePortfolio(url: string): Promise<Skill[]> {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Simple keyword extraction from portfolio
    const skillKeywords = [
      'react',
      'javascript',
      'typescript',
      'node',
      'python',
      'vue',
      'angular',
      'tailwind',
      'nextjs',
      'express',
    ];
    const skills: Skill[] = [];

    skillKeywords.forEach((keyword) => {
      if (html.toLowerCase().includes(keyword)) {
        skills.push({
          name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
          confidence: 0.6,
          source: 'Portfolio',
        });
      }
    });

    return skills;
  } catch {
    return [];
  }
}

async function scrapeDevTo(url: string): Promise<Skill[]> {
  try {
    const username = url.split('/').pop();
    const response = await fetch(`https://dev.to/api/articles?username=${username}`);
    const articles = await response.json();

    const skillKeywords = [
      'react',
      'javascript',
      'typescript',
      'python',
      'java',
      'css',
      'html',
    ];
    const skills: Skill[] = [];
    const skillSet = new Set<string>();

    articles.forEach((article: { title: string; description: string }) => {
      skillKeywords.forEach((keyword) => {
        if (
          article.title.toLowerCase().includes(keyword) ||
          article.description?.toLowerCase().includes(keyword)
        ) {
          skillSet.add(keyword);
        }
      });
    });

    skillSet.forEach((skill) => {
      skills.push({
        name: skill.charAt(0).toUpperCase() + skill.slice(1),
        confidence: 0.65,
        source: 'Dev.to',
      });
    });

    return skills;
  } catch {
    return [];
  }
}
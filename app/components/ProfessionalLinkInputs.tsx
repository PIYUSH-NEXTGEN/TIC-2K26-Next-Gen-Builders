'use client';

import { useState } from 'react';
import axios from 'axios';

interface Skill {
  name: string;
  confidence: number;
  source: string;
}

interface SocialLinks {
  github?: string;
  linkedin?: string;
  resume?: string;
  portfolio?: string;
  twitter?: string;
  devto?: string;
}

export default function ProfessionalLinkInputs() {
  const [links, setLinks] = useState<SocialLinks>({
    github: 'https://github.com/alexdev',
    linkedin: 'https://linkedin.com/in/alexdev',
    resume: 'https://alexdev.io/resume.pdf',
    portfolio: 'https://alexdev.io',
    twitter: 'https://twitter.com/alexdev',
    devto: '',
  });

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLinkChange = (key: keyof SocialLinks, value: string) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  };

  const handleAnalyzeProfile = async () => {
    if (!Object.values(links).some((link) => link)) {
      setError('Please provide at least one link.');
      return;
    }

    setLoading(true);
    setError(null);
    setSkills([]);

    try {
      // Call your backend API to scrape and analyze links
      const response = await axios.post('/api/analyze-profile', {
        links,
      });

      const extractedSkills: Skill[] = response.data.skills || [];
      setSkills(extractedSkills);
    } catch (err) {
      setError('Failed to analyze profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <span className="text-3xl">👤</span> Professional Link Inputs
        </h2>
        <button
          onClick={handleAnalyzeProfile}
          disabled={loading}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 font-medium"
        >
          {loading ? 'Analyzing...' : 'Analyze Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* GitHub */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
          <input
            type="url"
            placeholder="https://github.com/username"
            value={links.github || ''}
            onChange={(e) => handleLinkChange('github', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/username"
            value={links.linkedin || ''}
            onChange={(e) => handleLinkChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Resume */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
          <input
            type="url"
            placeholder="https://example.com/resume.pdf"
            value={links.resume || ''}
            onChange={(e) => handleLinkChange('resume', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={links.portfolio || ''}
            onChange={(e) => handleLinkChange('portfolio', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Twitter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
          <input
            type="url"
            placeholder="https://twitter.com/username"
            value={links.twitter || ''}
            onChange={(e) => handleLinkChange('twitter', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Dev.to */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dev.to</label>
          <input
            type="url"
            placeholder="https://dev.to/username"
            value={links.devto || ''}
            onChange={(e) => handleLinkChange('devto', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Error Display */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Display Extracted Skills */}
      {skills.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Extracted Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skills.map((skill, index) => (
              <div key={index} className="p-3 bg-white border border-gray-200 rounded-lg">
                <p className="font-medium">{skill.name}</p>
                <p className="text-sm text-gray-600">Confidence: {(skill.confidence * 100).toFixed(0)}%</p>
                <p className="text-xs text-gray-500">From: {skill.source}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
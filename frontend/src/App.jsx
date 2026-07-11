import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_REPOSITORIES } from './data';

// Component imports
import Navbar from './components/Navbar';
import SyncProgressBar from './components/SyncProgressBar';
import HeroHeader from './components/HeroHeader';
import InsightsPanel from './components/InsightsPanel';
import SearchBar from './components/SearchBar';
import RepositoryCard from './components/RepositoryCard';
import AddRepositoryForm from './components/AddRepositoryForm';
import ProPromoCard from './components/ProPromoCard';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Potential repositories to discover during Sync
const NEW_SYNC_REPOSITORIES = [
  {
    name: 'google-genai-sdk-express',
    owner: 'google-labs',
    url: 'https://github.com/google-labs/google-genai-sdk-express',
    detectedAt: 'Just now',
    languages: ['TypeScript', 'JavaScript'],
    contributors: 12,
    status: 'synced',
    description: 'Ultra-lightweight Express.js proxy server optimized for secure, server-side Google Gemini SDK executions.',
    stars: 890,
    forks: 94
  },
  {
    name: 'tailwind-v4-compiler',
    owner: 'tailwindlabs',
    url: 'https://github.com/tailwindlabs/tailwind-v4-compiler',
    detectedAt: 'Just now',
    languages: ['Rust', 'Go'],
    contributors: 28,
    status: 'synced',
    description: 'High-performance interactive compiler optimizing CSS injection pipelines for Tailwind v4 layouts.',
    stars: 1540,
    forks: 88
  },
  {
    name: 'motion-react-gesture-core',
    owner: 'motion-labs',
    url: 'https://github.com/motion-labs/motion-react-gesture-core',
    detectedAt: 'Just now',
    languages: ['TypeScript', 'React'],
    contributors: 5,
    status: 'synced',
    description: 'Gesture control recognition engines custom-mapped to fluid Framer Motion canvas layout animations.',
    stars: 310,
    forks: 21
  }
];

export default function App() {
  // Global theme state ('light' or 'dark') and viewMode ('grid' or 'list')
  const [theme, setTheme] = useState('light');
  const [viewLayout, setViewLayout] = useState('grid');

  // Repository & Filter States
  const [repositories, setRepositories] = useState(INITIAL_REPOSITORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  
  // Interactive Controls
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [autoSync, setAutoSync] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [newRepoIndex, setNewRepoIndex] = useState(0);

  // Add Repository Form State
  const [isAddingRepo, setIsAddingRepo] = useState(false);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoOwner, setNewRepoOwner] = useState('');
  const [newRepoLanguage, setNewRepoLanguage] = useState('TypeScript');
  const [newRepoDesc, setNewRepoDesc] = useState('');

  // Pro State
  const [isPremium, setIsPremium] = useState(false);

  // Toast System
  const [toast, setToast] = useState(null);

  // Theme toggle helper
  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Dismiss toast automatically
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle Sync
  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncProgress(10);
    
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 25) + 15;
        return Math.min(prev + step, 95);
      });
    }, 130);

    setTimeout(() => {
      clearInterval(interval);
      setSyncProgress(100);
      
      setTimeout(() => {
        setIsSyncing(false);
        setSyncProgress(0);

        // Add a discovered repository if available
        if (newRepoIndex < NEW_SYNC_REPOSITORIES.length) {
          const nextRepo = NEW_SYNC_REPOSITORIES[newRepoIndex];
          const newRepo = {
            ...nextRepo,
            id: `discovered-${Date.now()}`,
            detectedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
          };
          setRepositories(prev => [newRepo, ...prev]);
          setNewRepoIndex(prev => prev + 1);
          setToast({
            message: `Successfully synchronized. Discovered and linked ${newRepo.owner}/${newRepo.name}!`,
            type: 'success'
          });
        } else {
          // Update timestamps of existing repositories
          setRepositories(prev => 
            prev.map(repo => ({
              ...repo,
              detectedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
            }))
          );
          setToast({
            message: 'Sync complete. All collaborations up-to-date.',
            type: 'success'
          });
        }
      }, 300);
    }, 1200);
  };

  // Handle Export to CSV
  const handleExportCSV = () => {
    const headers = ['Repository', 'Owner', 'URL', 'Detected At', 'Languages', 'Contributors', 'Stars', 'Forks'];
    const rows = repositories.map(repo => [
      repo.name,
      repo.owner,
      repo.url,
      repo.detectedAt,
      repo.languages.join(';'),
      repo.contributors,
      repo.stars,
      repo.forks
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `github_sync_report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast({
      message: 'Exported collaboration registry successfully as CSV.',
      type: 'success'
    });
  };

  // Handle Custom Add Repo
  const handleAddCustomRepo = (e) => {
    e.preventDefault();
    if (!newRepoName || !newRepoOwner) {
      setToast({
        message: 'Please fill in both the Repository Name and Owner.',
        type: 'info'
      });
      return;
    }

    const customRepo = {
      id: `custom-${Date.now()}`,
      name: newRepoName.toLowerCase().replace(/\s+/g, '-'),
      owner: newRepoOwner.toLowerCase().replace(/\s+/g, ''),
      url: `https://github.com/${newRepoOwner}/${newRepoName}`,
      detectedAt: 'Just now',
      languages: [newRepoLanguage],
      contributors: 1,
      status: 'synced',
      description: newRepoDesc || 'Custom user-added collaboration repository managed in local space.',
      stars: 1,
      forks: 0
    };

    setRepositories(prev => [customRepo, ...prev]);
    setIsAddingRepo(false);
    setNewRepoName('');
    setNewRepoOwner('');
    setNewRepoDesc('');
    
    setToast({
      message: `Successfully added and tracked ${customRepo.owner}/${customRepo.name}!`,
      type: 'success'
    });
  };

  // Filter Logic
  const filteredRepositories = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          repo.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          repo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'All' || repo.languages.includes(selectedLanguage);
    return matchesSearch && matchesLanguage;
  });

  // Insights statistics calculations
  const totalRepos = repositories.length;
  const totalContributors = repositories.reduce((sum, r) => sum + r.contributors, 0);
  const totalStars = repositories.reduce((sum, r) => sum + r.stars, 0);
  const averageStars = Math.round(totalStars / totalRepos) || 0;

  // Language count calculation
  const languageShare = repositories.reduce((acc, repo) => {
    repo.languages.forEach(lang => {
      acc[lang] = (acc[lang] || 0) + 1;
    });
    return acc;
  }, {});
  const topLanguages = Object.entries(languageShare)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className={`min-h-screen font-sans selection:bg-[#0969da]/20 selection:text-[#0969da] relative antialiased flex flex-col transition-colors duration-200 ${
      theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-[#ffffff] text-[#24292f]'
    }`}>
      
      {/* Navigation */}
      <Navbar 
        isPremium={isPremium} 
        isSyncing={isSyncing} 
        onSync={handleSync} 
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Sync Progress Loading Bar */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`overflow-hidden border-b ${theme === 'dark' ? 'border-zinc-850' : 'border-[#d0d7de]'}`}
          >
            <SyncProgressBar syncProgress={syncProgress} theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 flex-grow w-full flex flex-col">
        
        {/* Hero Header Section */}
        <HeroHeader 
          onExportCSV={handleExportCSV} 
          showInsights={showInsights} 
          onToggleInsights={() => setShowInsights(!showInsights)} 
          theme={theme}
        />

        {/* Telemetry/Insights Panel */}
        <AnimatePresence>
          {showInsights && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <InsightsPanel 
                onClose={() => setShowInsights(false)}
                totalRepos={totalRepos}
                totalContributors={totalContributors}
                averageStars={averageStars}
                topLanguages={topLanguages}
                theme={theme}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar: Search & Language Pills Filters */}
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          autoSync={autoSync}
          onToggleAutoSync={() => {
            setAutoSync(!autoSync);
            setToast({
              message: `Daily Auto-Sync is now ${!autoSync ? 'enabled' : 'disabled'}.`,
              type: 'info'
            });
          }}
          theme={theme}
          viewLayout={viewLayout}
          setViewLayout={setViewLayout}
        />

        {/* Grid and interactive cards */}
        <main className="flex-grow">
          <motion.div 
            layout
            className={viewLayout === 'list' ? "flex flex-col gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}
          >
            <AnimatePresence mode="popLayout">
              {filteredRepositories.map((repo) => (
                <motion.div
                  layout
                  key={repo.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className={viewLayout === 'list' ? 'w-full' : ''}
                >
                  <RepositoryCard 
                    repo={repo} 
                    onSelectLanguage={setSelectedLanguage} 
                    theme={theme}
                    viewLayout={viewLayout}
                  />
                </motion.div>
              ))}

              {/* Add Custom Repository Block */}
              <motion.div
                layout
                key="add-repo-form-wrapper"
                className={viewLayout === 'list' ? 'w-full' : ''}
              >
                <AddRepositoryForm 
                  isAddingRepo={isAddingRepo}
                  setIsAddingRepo={setIsAddingRepo}
                  newRepoName={newRepoName}
                  setNewRepoName={setNewRepoName}
                  newRepoOwner={newRepoOwner}
                  setNewRepoOwner={setNewRepoOwner}
                  newRepoLanguage={newRepoLanguage}
                  setNewRepoLanguage={setNewRepoLanguage}
                  newRepoDesc={newRepoDesc}
                  setNewRepoDesc={setNewRepoDesc}
                  onSubmit={handleAddCustomRepo}
                  theme={theme}
                />
              </motion.div>

              {/* Pro Promotion Action Card */}
              <motion.div
                layout
                key="pro-promo-card-wrapper"
                className={viewLayout === 'list' ? 'w-full' : ''}
              >
                <ProPromoCard 
                  isPremium={isPremium}
                  onTogglePremium={() => {
                    setIsPremium(!isPremium);
                    setToast({
                      message: isPremium 
                        ? 'Workspace tier reverted back to standard community space.' 
                        : 'Upgrade successful! Welcome to Sync Pro. Multi-node synchronization is now live.',
                      type: 'success'
                    });
                  }}
                  theme={theme}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Empty Filtering Fallback State */}
          {filteredRepositories.length === 0 && (
            <EmptyState 
              searchQuery={searchQuery}
              selectedLanguage={selectedLanguage}
              onClearFilters={() => {
                setSearchQuery('');
                setSelectedLanguage('All');
              }}
              theme={theme}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer 
        onReset={() => {
          setRepositories(INITIAL_REPOSITORIES);
          setNewRepoIndex(0);
          setIsPremium(false);
          setToast({ message: 'Reset collaboration synced state to defaults.', type: 'info' });
        }}
        theme={theme}
      />

      {/* Floating Notifications System */}
      <AnimatePresence>
        {toast && (
          <Toast 
            toast={toast} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

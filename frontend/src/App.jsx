import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gitSyncService } from './services/gitSyncService';

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

export default function App() {
  // Global theme state ('light' or 'dark') and viewMode ('grid' or 'list')
  const [theme, setTheme] = useState('light');
  const [viewLayout, setViewLayout] = useState('grid');

  // Repository & Filter States
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  
  // Interactive Controls
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [autoSync, setAutoSync] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

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

  // Fetch repositories on initial load
  useEffect(() => {
    const fetchRepos = async () => {
      const data = await gitSyncService.getRepositories();
      setRepositories(data);
    };
    fetchRepos();
  }, []);

  // Decoupled sync event listener registration (perfect for WebSockets later!)
  useEffect(() => {
    const unsubscribe = gitSyncService.subscribe((event) => {
      switch (event.type) {
        case 'start':
          setIsSyncing(true);
          setSyncProgress(10);
          break;
        case 'progress':
          setSyncProgress(event.progress);
          break;
        case 'success':
          setIsSyncing(false);
          setSyncProgress(0);
          setRepositories(event.data);
          setToast({
            message: event.message,
            type: 'success'
          });
          break;
        case 'error':
          setIsSyncing(false);
          setSyncProgress(0);
          setToast({
            message: event.message || 'Synchronization failed.',
            type: 'error'
          });
          break;
        default:
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  // Dismiss toast automatically
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle Sync - initiated via the service call
  const handleSync = async () => {
    if (isSyncing) return;
    await gitSyncService.triggerSync();
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

  // Handle Custom Add Repo - persistent via API service call
  const handleAddCustomRepo = async (e) => {
    e.preventDefault();
    if (!newRepoName || !newRepoOwner) {
      setToast({
        message: 'Please fill in both the Repository Name and Owner.',
        type: 'info'
      });
      return;
    }

    const newRepoData = {
      name: newRepoName,
      owner: newRepoOwner,
      description: newRepoDesc,
      language: newRepoLanguage
    };

    const createdRepo = await gitSyncService.addRepository(newRepoData);
    
    // Fetch refreshed repository listing reflecting the insert
    const updatedRepos = await gitSyncService.getRepositories();
    setRepositories(updatedRepos);

    setIsAddingRepo(false);
    setNewRepoName('');
    setNewRepoOwner('');
    setNewRepoDesc('');
    
    setToast({
      message: `Successfully added and tracked ${createdRepo.owner}/${createdRepo.name}!`,
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
          const resetRepos = gitSyncService.resetLocalState();
          setRepositories(resetRepos);
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

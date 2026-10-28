import React, { useState, useEffect } from 'react';
import { UserProfile, SRSItem, DailyStudyRecord, SRSRating } from './types';
import { StorageService } from './services/storageService';
import { ProgressService } from './services/progressService';
import { Navbar } from './components/layout/Navbar';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { OnboardingModal } from './features/onboarding/OnboardingModal';
import { DashboardView } from './features/dashboard/DashboardView';
import { LearningPathView } from './features/learning-path/LearningPathView';
import { WritingLabView } from './features/writing-lab/WritingLabView';
import { VocabListView } from './features/vocabulary/VocabListView';
import { VocabTrainerModal } from './features/vocabulary/VocabTrainerModal';
import { GrammarAcademyView } from './features/grammar/GrammarAcademyView';
import { ListeningLabView } from './features/listening/ListeningLabView';
import { ConversationSimulatorView } from './features/conversation/ConversationSimulatorView';
import { GamesHubView } from './features/games/GamesHubView';
import { GradedReaderView } from './features/reading/GradedReaderView';
import { CultureView } from './features/culture/CultureView';
import { StudyPlannerView } from './features/planner/StudyPlannerView';
import { DictionaryView } from './features/dictionary/DictionaryView';
import { FavoritesView } from './features/favorites/FavoritesView';
import { ProgressStatsView } from './features/progress/ProgressStatsView';
import { SettingsView } from './features/settings/SettingsView';
import { LessonModal } from './features/learning-path/LessonModal';
import { SRSService } from './services/srsService';

const VALID_TABS: ActiveTab[] = [
  'dashboard',
  'learning-path',
  'writing-lab',
  'vocabulary',
  'grammar',
  'listening',
  'conversation',
  'games',
  'reading',
  'culture',
  'planner',
  'dictionary',
  'favorites',
  'progress',
  'settings'
];

export function App() {
  const [profile, setProfile] = useState<UserProfile>(StorageService.getUserProfile());
  const [srsItems, setSRSItems] = useState<SRSItem[]>(StorageService.getSRSItems());
  const [studyRecords, setStudyRecords] = useState<DailyStudyRecord[]>(StorageService.getDailyStudyRecords());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!StorageService.isOnboardingCompleted());
  const [isSRSModalOpen, setIsSRSModalOpen] = useState<boolean>(false);
  const [activeLessonModalId, setActiveLessonModalId] = useState<string | null>(null);

  // Sync theme to document element
  useEffect(() => {
    if (profile.preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile.preferences.theme]);

  // Sync with URL Hash routing (#favorites, #learning-path, #dashboard, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
      if (rawHash && VALID_TABS.includes(rawHash as ActiveTab)) {
        setActiveTab(rawHash as ActiveTab);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
  };

  const dueItems = SRSService.getDueItems(srsItems);

  // Update profile preferences
  const handleUpdatePreferences = (updated: Partial<UserProfile['preferences']>) => {
    const updatedProfile: UserProfile = {
      ...profile,
      preferences: { ...profile.preferences, ...updated },
      lastActivityDate: new Date().toISOString()
    };
    setProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);
  };

  // Update entire profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    const updatedProfile: UserProfile = {
      ...profile,
      ...updated,
      lastActivityDate: new Date().toISOString()
    };
    setProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);
  };

  // Complete onboarding
  const handleCompleteOnboarding = (data: Partial<UserProfile>) => {
    let startingLessonId = 'l0-phonetics';
    let startingModuleId = 'module-0';

    if (data.knownHiragana && data.knownKatakana) {
      startingLessonId = 'l3-particles-wa-ga';
      startingModuleId = 'module-3';
    } else if (data.knownHiragana) {
      startingLessonId = 'l2-katakana-rules';
      startingModuleId = 'module-2';
    }

    const updatedProfile: UserProfile = {
      ...profile,
      ...data,
      lastActiveLessonId: startingLessonId,
      currentModuleId: startingModuleId,
      lastActivityDate: new Date().toISOString()
    };

    setProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);
    StorageService.setOnboardingCompleted(true);
    setShowOnboarding(false);
  };

  // SRS item review callback
  const handleItemReviewed = (updatedItem: SRSItem, _rating: SRSRating) => {
    const updatedItems = srsItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setSRSItems(updatedItems);
    StorageService.saveSRSItems(updatedItems);
  };

  // Complete SRS session
  const handleCompleteSRSSession = (reviewsDone: number, xpEarned: number) => {
    StorageService.logSession(Math.round(reviewsDone * 0.5), xpEarned, reviewsDone, 0);
    setProfile(StorageService.getUserProfile());
    setStudyRecords(StorageService.getDailyStudyRecords());
  };

  // Lesson completed callback with single source of truth in ProgressService
  const handleLessonCompleted = (lessonId: string, xpEarned: number = 50) => {
    const result = ProgressService.completeLesson(profile, lessonId, xpEarned);
    setProfile(result.updatedProfile);
    StorageService.saveUserProfile(result.updatedProfile);
    StorageService.logSession(10, xpEarned, 0, 1);
    setStudyRecords(StorageService.getDailyStudyRecords());
  };

  // Toggle favorite items (Vocab, Kanji, Grammar, Custom)
  const handleToggleFavorite = (itemId: string) => {
    const { updatedProfile } = ProgressService.toggleFavorite(profile, itemId);
    setProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);
  };

  // Add word from dictionary or stories to SRS deck
  const handleAddWordToSRS = (word: string, reading: string, spanish: string) => {
    const newItem: SRSItem = {
      id: `srs-user-${Date.now()}`,
      type: 'vocab',
      japanese: word,
      reading,
      romaji: reading,
      spanish,
      category: 'Diccionario Personal',
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      errorCount: 0,
      tags: ['personal', 'vocab'],
      history: []
    };

    const updated = [newItem, ...srsItems];
    setSRSItems(updated);
    StorageService.saveSRSItems(updated);
  };

  // Reload all data after import or clear
  const handleDataReload = () => {
    setProfile(StorageService.getUserProfile());
    setSRSItems(StorageService.getSRSItems());
    setStudyRecords(StorageService.getDailyStudyRecords());
  };

  return (
    <div className="min-h-screen flex flex-col bg-washi-pattern text-sumi dark:text-washi transition-colors">
      {/* Top Navigation */}
      <Navbar
        profile={profile}
        onUpdatePreferences={handleUpdatePreferences}
        onOpenMobileMenu={() => setShowMobileSidebar(true)}
        dueSRSCount={dueItems.length}
        onOpenSRSReviews={() => setIsSRSModalOpen(true)}
        onOpenFavorites={() => handleSelectTab('favorites')}
      />

      <div className="flex-1 flex w-full">
        {/* Desktop and Mobile Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          isOpenMobile={showMobileSidebar}
          onCloseMobile={() => setShowMobileSidebar(false)}
          dueSRSCount={dueItems.length}
          favoritesCount={profile.favorites?.length || 0}
        />

        {/* Main Content View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              srsItems={srsItems}
              studyRecords={studyRecords}
              onNavigate={handleSelectTab}
              onStartReview={() => setIsSRSModalOpen(true)}
              onStartLesson={lessonId => setActiveLessonModalId(lessonId)}
            />
          )}

          {activeTab === 'learning-path' && (
            <LearningPathView
              profile={profile}
              onLessonCompleted={handleLessonCompleted}
            />
          )}

          {activeTab === 'writing-lab' && <WritingLabView />}

          {activeTab === 'vocabulary' && (
            <VocabListView
              srsItems={srsItems}
              onStartReview={() => setIsSRSModalOpen(true)}
              showRomaji={profile.preferences.showRomaji}
              favorites={profile.favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'grammar' && <GrammarAcademyView />}

          {activeTab === 'listening' && <ListeningLabView />}

          {activeTab === 'conversation' && <ConversationSimulatorView />}

          {activeTab === 'games' && <GamesHubView />}

          {activeTab === 'reading' && (
            <GradedReaderView onAddWordToSRS={handleAddWordToSRS} />
          )}

          {activeTab === 'culture' && <CultureView />}

          {activeTab === 'planner' && (
            <StudyPlannerView
              profile={profile}
              onNavigate={handleSelectTab}
              onLogStudySession={(mins, xp, rev, nw) => {
                StorageService.logSession(mins, xp, rev, nw);
                setProfile(StorageService.getUserProfile());
                setStudyRecords(StorageService.getDailyStudyRecords());
              }}
            />
          )}

          {activeTab === 'dictionary' && (
            <DictionaryView
              onAddWordToSRS={handleAddWordToSRS}
              favorites={profile.favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              profile={profile}
              onToggleFavorite={handleToggleFavorite}
              onAddWordToSRS={handleAddWordToSRS}
              onNavigate={handleSelectTab}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressStatsView
              profile={profile}
              srsItems={srsItems}
              studyRecords={studyRecords}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              profile={profile}
              onUpdatePreferences={handleUpdatePreferences}
              onUpdateProfile={handleUpdateProfile}
              onDataReload={handleDataReload}
            />
          )}

          {/* Fallback to prevent blank screen if route/tab is unknown */}
          {!VALID_TABS.includes(activeTab) && (
            <DashboardView
              profile={profile}
              srsItems={srsItems}
              studyRecords={studyRecords}
              onNavigate={handleSelectTab}
              onStartReview={() => setIsSRSModalOpen(true)}
              onStartLesson={lessonId => setActiveLessonModalId(lessonId)}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenMore={() => setShowMobileSidebar(true)}
        dueSRSCount={dueItems.length}
      />

      {/* Modals */}
      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleCompleteOnboarding}
      />

      <VocabTrainerModal
        isOpen={isSRSModalOpen}
        dueItems={dueItems}
        onClose={() => setIsSRSModalOpen(false)}
        onItemReviewed={handleItemReviewed}
        onCompleteSession={handleCompleteSRSSession}
        showRomaji={profile.preferences.showRomaji}
      />

      {activeLessonModalId && (
        <LessonModal
          lessonId={activeLessonModalId}
          onClose={() => setActiveLessonModalId(null)}
          onCompleteLesson={handleLessonCompleted}
          isCompleted={profile.completedLessons.includes(activeLessonModalId)}
          onNavigateLesson={nextId => setActiveLessonModalId(nextId)}
        />
      )}
    </div>
  );
}

export default App;

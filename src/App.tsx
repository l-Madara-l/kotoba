import React, { useState, useEffect } from 'react';
import { UserProfile, SRSItem, DailyStudyRecord, SRSRating } from './types';
import { StorageService } from './services/storageService';
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
import { ProgressStatsView } from './features/progress/ProgressStatsView';
import { SettingsView } from './features/settings/SettingsView';
import { LessonModal } from './features/learning-path/LessonModal';
import { SRSService } from './services/srsService';

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

  const dueItems = SRSService.getDueItems(srsItems);

  // Update profile preferences
  const handleUpdatePreferences = (updated: Partial<UserProfile['preferences']>) => {
    const updatedProfile = {
      ...profile,
      preferences: { ...profile.preferences, ...updated }
    };
    setProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);
  };

  // Update entire profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    const updatedProfile = { ...profile, ...updated };
    setProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);
  };

  // Complete onboarding
  const handleCompleteOnboarding = (data: Partial<UserProfile>) => {
    const updatedProfile = { ...profile, ...data };
    setProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);
    StorageService.setOnboardingCompleted(true);
    setShowOnboarding(false);
  };

  // SRS item review callback
  const handleItemReviewed = (updatedItem: SRSItem, rating: SRSRating) => {
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

  // Lesson completed callback
  const handleLessonCompleted = (lessonId: string, xpEarned: number) => {
    const completed = new Set(profile.completedLessons);
    completed.add(lessonId);

    // Also award hanko badges if milestones hit
    const badges = new Set(profile.hankoBadges);
    badges.add('badge-first-step');
    if (lessonId.startsWith('l1-')) {
      badges.add('badge-hiragana-master');
    }

    const updatedProfile: UserProfile = {
      ...profile,
      completedLessons: Array.from(completed),
      hankoBadges: Array.from(badges),
      xp: profile.xp + xpEarned,
      level: Math.floor((profile.xp + xpEarned) / 200) + 1
    };

    setProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);
    StorageService.logSession(10, xpEarned, 0, 1);
    setStudyRecords(StorageService.getDailyStudyRecords());
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

  // Reload all data after import
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
      />

      <div className="flex-1 flex w-full">
        {/* Desktop and Mobile Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={tab => setActiveTab(tab)}
          isOpenMobile={showMobileSidebar}
          onCloseMobile={() => setShowMobileSidebar(false)}
          dueSRSCount={dueItems.length}
        />

        {/* Main Content View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              srsItems={srsItems}
              studyRecords={studyRecords}
              onNavigate={setActiveTab}
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
              onNavigate={setActiveTab}
              onLogStudySession={(mins, xp, rev, nw) => {
                StorageService.logSession(mins, xp, rev, nw);
                setProfile(StorageService.getUserProfile());
                setStudyRecords(StorageService.getDailyStudyRecords());
              }}
            />
          )}

          {activeTab === 'dictionary' && (
            <DictionaryView onAddWordToSRS={handleAddWordToSRS} />
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
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
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
        />
      )}
    </div>
  );
}

export default App;
